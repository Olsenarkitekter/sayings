import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { proverbs, languages } from './proverbs';

const STORAGE = {
  language: 'daily-sayings:language',
  index: 'daily-sayings:index',
  favorites: 'daily-sayings:favorites',
  notifications: 'daily-sayings:notifications',
  notificationTime: 'daily-sayings:notificationTime',
  installId: 'daily-sayings:installId'
};

const NOTIFICATION_TIMES = ['08:00', '10:00', '12:00', '18:00', '21:00'];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

function todayIndex(offset = 0) {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now - start) / 86400000) + offset;
  return day % proverbs.length;
}

function nextNotificationDate(offsetDays, time) {
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(hour, minute, 0, 0);
  if (offsetDays === 0 && date <= new Date()) date.setDate(date.getDate() + 1);
  return date;
}

async function ensureInstallId() {
  const existing = await AsyncStorage.getItem(STORAGE.installId);
  if (existing) return existing;
  const id = `anon_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  await AsyncStorage.setItem(STORAGE.installId, id);
  return id;
}

async function scheduleDailyProverbs(language, time = '10:00') {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily-proverbs', {
      name: 'Daily proverb',
      importance: Notifications.AndroidImportance.DEFAULT
    });
  }

  const permission = await Notifications.requestPermissionsAsync();
  if (!permission.granted) {
    await AsyncStorage.setItem(STORAGE.notifications, 'off');
    return false;
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

  for (let day = 0; day < 30; day += 1) {
    const proverbIndex = todayIndex(day);
    const item = proverbs[proverbIndex][language];
    await Notifications.scheduleNotificationAsync({
      content: {
        title: item.saying,
        body: item.explanation,
        data: { proverbId: proverbs[proverbIndex].id }
      },
      trigger: { type: 'date', date: nextNotificationDate(day, time), channelId: 'daily-proverbs' }
    });
  }

  await AsyncStorage.setItem(STORAGE.notifications, 'on');
  return true;
}

export default function App() {
  const [language, setLanguage] = useState('en');
  const [index, setIndex] = useState(todayIndex());
  const [favorites, setFavorites] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationTime, setNotificationTime] = useState('10:00');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const current = proverbs[index];
  const copy = current[language];
  const isFavorite = favorites.includes(current.id);

  const savedProverbs = useMemo(
    () => favorites.map((id) => proverbs.find((item) => item.id === id)).filter(Boolean),
    [favorites]
  );

  useEffect(() => {
    (async () => {
      await ensureInstallId();
      const [storedLanguage, storedIndex, storedFavorites, storedNotifications, storedTime] = await Promise.all([
        AsyncStorage.getItem(STORAGE.language),
        AsyncStorage.getItem(STORAGE.index),
        AsyncStorage.getItem(STORAGE.favorites),
        AsyncStorage.getItem(STORAGE.notifications),
        AsyncStorage.getItem(STORAGE.notificationTime)
      ]);

      const lang = storedLanguage || 'en';
      const time = storedTime || '10:00';
      if (storedLanguage) setLanguage(storedLanguage);
      if (storedIndex) setIndex(Number(storedIndex));
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
      setNotificationTime(time);

      const wantsNotifications = storedNotifications !== 'off';
      setNotificationsEnabled(wantsNotifications);
      setReady(true);

      if (wantsNotifications) scheduleDailyProverbs(lang, time).catch(() => {});
    })();
  }, []);

  async function changeLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    await AsyncStorage.setItem(STORAGE.language, nextLanguage);
    if (notificationsEnabled) scheduleDailyProverbs(nextLanguage, notificationTime).catch(() => {});
  }

  async function setCurrentIndex(next) {
    setIndex(next);
    await AsyncStorage.setItem(STORAGE.index, String(next));
  }

  async function previous() {
    await setCurrentIndex((index - 1 + proverbs.length) % proverbs.length);
  }

  async function refresh() {
    let next = index;
    while (next === index && proverbs.length > 1) {
      next = Math.floor(Math.random() * proverbs.length);
    }
    await setCurrentIndex(next);
  }

  async function toggleFavorite() {
    const next = isFavorite ? favorites.filter((id) => id !== current.id) : [...favorites, current.id];
    setFavorites(next);
    await AsyncStorage.setItem(STORAGE.favorites, JSON.stringify(next));
  }

  async function toggleNotifications(value) {
    setNotificationsEnabled(value);
    if (value) {
      const ok = await scheduleDailyProverbs(language, notificationTime);
      if (!ok) Alert.alert('Notifications are off', 'Turn on notifications in settings to receive the daily proverb.');
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
      await AsyncStorage.setItem(STORAGE.notifications, 'off');
    }
  }

  async function changeNotificationTime(time) {
    setNotificationTime(time);
    await AsyncStorage.setItem(STORAGE.notificationTime, time);
    if (notificationsEnabled) scheduleDailyProverbs(language, time).catch(() => {});
  }

  if (!ready) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.center}><Text style={styles.loading}>Loading…</Text></View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable accessibilityLabel="Settings" onPress={() => setSettingsOpen((value) => !value)} hitSlop={14} style={styles.iconTap}>
            <Text style={styles.headerIcon}>⚙</Text>
          </Pressable>
          <Text style={styles.adText}>ADVERTISEMENT</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.content}>
          <Text style={styles.saying}>{copy.saying}</Text>
          <Text style={styles.explanation}>{copy.explanation}</Text>
        </View>

        <View style={styles.controls}>
          <Pressable accessibilityLabel="Previous proverb" onPress={previous} style={styles.controlButton}>
            <Text style={styles.controlIcon}>‹</Text>
          </Pressable>
          <Pressable accessibilityLabel="Refresh proverb" onPress={refresh} style={styles.refreshButton}>
            <Text style={styles.refreshIcon}>↻</Text>
          </Pressable>
          <Pressable accessibilityLabel="Save proverb" onPress={toggleFavorite} style={styles.controlButton}>
            <Text style={[styles.controlIcon, isFavorite && styles.favoriteIcon]}>{isFavorite ? '★' : '☆'}</Text>
          </Pressable>
        </View>

        {settingsOpen && (
          <View style={styles.settingsPanel}>
            <View style={styles.settingsHeader}>
              <Text style={styles.sectionTitle}>Settings</Text>
              <Pressable onPress={() => setSettingsOpen(false)} hitSlop={12}>
                <Text style={styles.closeIcon}>×</Text>
              </Pressable>
            </View>

            <Text style={styles.sectionTitle}>Language</Text>
            <View style={styles.languageRow}>
              {languages.map((item) => (
                <Pressable key={item.key} onPress={() => changeLanguage(item.key)} style={styles.symbolButton}>
                  <Text style={[styles.langText, language === item.key && styles.activeText]}>{item.label}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingTitle}>Daily notification</Text>
                <Text style={styles.muted}>Current time: {notificationTime}</Text>
              </View>
              <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
            </View>

            <View style={styles.timeRow}>
              {NOTIFICATION_TIMES.map((time) => (
                <Pressable key={time} onPress={() => changeNotificationTime(time)} style={styles.timeButton}>
                  <Text style={[styles.timeText, notificationTime === time && styles.activeText]}>{time}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Saved proverbs</Text>
            <ScrollView style={styles.savedList} contentContainerStyle={styles.savedListContent}>
              {savedProverbs.length === 0 ? (
                <Text style={styles.muted}>No saved proverbs yet. Tap the star to save one.</Text>
              ) : (
                savedProverbs.map((item) => (
                  <Pressable key={item.id} onPress={() => setCurrentIndex(proverbs.findIndex((p) => p.id === item.id))} style={styles.savedItem}>
                    <Text style={styles.savedSaying}>{item[language].saying}</Text>
                    <Text style={styles.savedExplanation}>{item[language].explanation}</Text>
                  </Pressable>
                ))
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000000' },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 18, paddingBottom: 26 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' },
  loading: { fontSize: 18, color: '#ffffff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  headerSpacer: { width: 42 },
  adText: { color: '#555555', letterSpacing: 3, fontSize: 11, textAlign: 'center' },
  languageRow: { flexDirection: 'row', gap: 18, marginBottom: 22 },
  symbolButton: { paddingVertical: 8, paddingRight: 4 },
  langText: { color: '#777777', fontSize: 15, fontWeight: '800', letterSpacing: 1 },
  activeText: { color: '#ffffff' },
  iconTap: { padding: 6 },
  headerIcon: { color: '#ffffff', fontSize: 30, lineHeight: 34, fontWeight: '700' },
  closeIcon: { color: '#ffffff', fontSize: 34, lineHeight: 36, fontWeight: '300' },
  content: { flex: 1, justifyContent: 'center', paddingBottom: 20 },
  saying: { fontSize: 46, lineHeight: 52, fontWeight: '900', textAlign: 'center', color: '#ffffff' },
  explanation: { marginTop: 28, fontSize: 20, lineHeight: 30, textAlign: 'center', color: '#d9d9d9' },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 34, marginBottom: 8 },
  controlButton: { width: 58, height: 58, alignItems: 'center', justifyContent: 'center' },
  controlIcon: { color: '#ffffff', fontSize: 46, lineHeight: 50, fontWeight: '300' },
  favoriteIcon: { color: '#ffd166' },
  refreshButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },
  refreshIcon: { color: '#000000', fontSize: 42, lineHeight: 46, fontWeight: '700' },
  settingsPanel: { maxHeight: '45%', paddingTop: 18, borderTopWidth: 1, borderTopColor: '#222222', marginTop: 16 },
  settingsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { color: '#ffffff', fontSize: 18, fontWeight: '900', marginBottom: 12 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  settingTitle: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  muted: { color: '#8f8f8f', fontSize: 14, lineHeight: 20 },
  timeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, marginBottom: 24 },
  timeButton: { paddingVertical: 4, paddingRight: 4 },
  timeText: { color: '#777777', fontSize: 16, fontWeight: '800' },
  savedList: { flexGrow: 0 },
  savedListContent: { gap: 14, paddingBottom: 12 },
  savedItem: { paddingVertical: 8 },
  savedSaying: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  savedExplanation: { color: '#a6a6a6', fontSize: 14, marginTop: 3, lineHeight: 20 }
});
