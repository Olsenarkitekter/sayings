import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';
import { proverbs, languages } from './proverbs';

const STORAGE = {
  language: 'daily-sayings:language',
  index: 'daily-sayings:index',
  favorites: 'daily-sayings:favorites',
  notifications: 'daily-sayings:notifications',
  installId: 'daily-sayings:installId'
};

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

function nextTenDate(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(10, 0, 0, 0);
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

async function scheduleDailyProverbs(language) {
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

  // Schedule the next month individually so the notification can contain the actual proverb of the day.
  for (let day = 0; day < 30; day += 1) {
    const item = proverbs[todayIndex(day)][language];
    await Notifications.scheduleNotificationAsync({
      content: {
        title: item.saying,
        body: item.explanation,
        data: { proverbId: proverbs[todayIndex(day)].id }
      },
      trigger: { type: 'date', date: nextTenDate(day), channelId: 'daily-proverbs' }
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
  const [ready, setReady] = useState(false);

  const current = proverbs[index];
  const copy = current[language];
  const isFavorite = favorites.includes(current.id);

  const favoriteCount = useMemo(() => favorites.length, [favorites]);

  useEffect(() => {
    (async () => {
      await ensureInstallId();
      const [storedLanguage, storedIndex, storedFavorites, storedNotifications] = await Promise.all([
        AsyncStorage.getItem(STORAGE.language),
        AsyncStorage.getItem(STORAGE.index),
        AsyncStorage.getItem(STORAGE.favorites),
        AsyncStorage.getItem(STORAGE.notifications)
      ]);

      if (storedLanguage) setLanguage(storedLanguage);
      if (storedIndex) setIndex(Number(storedIndex));
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));

      const wantsNotifications = storedNotifications !== 'off';
      setNotificationsEnabled(wantsNotifications);
      setReady(true);

      if (wantsNotifications) {
        const lang = storedLanguage || 'en';
        scheduleDailyProverbs(lang).catch(() => {});
      }
    })();
  }, []);

  async function changeLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    await AsyncStorage.setItem(STORAGE.language, nextLanguage);
    if (notificationsEnabled) scheduleDailyProverbs(nextLanguage).catch(() => {});
  }

  async function go(direction) {
    const next = (index + direction + proverbs.length) % proverbs.length;
    setIndex(next);
    await AsyncStorage.setItem(STORAGE.index, String(next));
  }

  async function toggleFavorite() {
    const next = isFavorite ? favorites.filter((id) => id !== current.id) : [...favorites, current.id];
    setFavorites(next);
    await AsyncStorage.setItem(STORAGE.favorites, JSON.stringify(next));
  }

  async function toggleNotifications(value) {
    setNotificationsEnabled(value);
    if (value) {
      const ok = await scheduleDailyProverbs(language);
      if (!ok) Alert.alert('Notifications are off', 'Turn on notifications in settings to receive the daily proverb at 10:00.');
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
      await AsyncStorage.setItem(STORAGE.notifications, 'off');
    }
  }

  if (!ready) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.center}><Text style={styles.loading}>Loading…</Text></View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.adSlot}>
          <Text style={styles.adText}>AD SPACE</Text>
        </View>

        <View style={styles.topRow}>
          <View style={styles.languageRow}>
            {languages.map((item) => (
              <Pressable
                key={item.key}
                onPress={() => changeLanguage(item.key)}
                style={[styles.langButton, language === item.key && styles.langButtonActive]}
              >
                <Text style={[styles.langText, language === item.key && styles.langTextActive]}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable onPress={toggleFavorite} hitSlop={12} style={styles.starButton}>
            <Ionicons name={isFavorite ? 'star' : 'star-outline'} size={34} color={isFavorite ? '#f2b84b' : '#2d2a26'} />
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.counter}>{index + 1} / {proverbs.length}</Text>
          <Text style={styles.saying}>{copy.saying}</Text>
          <Text style={styles.explanation}>{copy.explanation}</Text>
        </View>

        <View style={styles.arrows}>
          <Pressable accessibilityLabel="Previous proverb" onPress={() => go(-1)} style={styles.arrowButton}>
            <Ionicons name="chevron-back" size={42} color="#2d2a26" />
          </Pressable>
          <Pressable accessibilityLabel="Next proverb" onPress={() => go(1)} style={styles.arrowButton}>
            <Ionicons name="chevron-forward" size={42} color="#2d2a26" />
          </Pressable>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.footerTitle}>Daily 10:00 proverb</Text>
            <Text style={styles.footerSub}>Default on • {favoriteCount} saved</Text>
          </View>
          <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f7f2e8' },
  container: { flex: 1, padding: 20, gap: 18 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loading: { fontSize: 18, color: '#6d655c' },
  adSlot: {
    height: 70,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#cdbf9f',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffaf0'
  },
  adText: { letterSpacing: 2, color: '#9b8d72', fontWeight: '700' },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  languageRow: { flexDirection: 'row', gap: 8 },
  langButton: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999, backgroundColor: '#e9ddc7' },
  langButtonActive: { backgroundColor: '#2d2a26' },
  langText: { fontWeight: '800', color: '#2d2a26' },
  langTextActive: { color: '#fffaf0' },
  starButton: { padding: 4 },
  card: {
    flex: 1,
    borderRadius: 32,
    padding: 28,
    backgroundColor: '#fffaf0',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4
  },
  counter: { textAlign: 'center', color: '#9b8d72', fontWeight: '700', marginBottom: 18 },
  saying: { fontSize: 42, lineHeight: 48, fontWeight: '900', textAlign: 'center', color: '#2d2a26' },
  explanation: { marginTop: 24, fontSize: 19, lineHeight: 28, textAlign: 'center', color: '#6d655c' },
  arrows: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  arrowButton: {
    width: 96,
    height: 64,
    borderRadius: 22,
    backgroundColor: '#e9ddc7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    borderRadius: 22,
    padding: 16,
    backgroundColor: '#fffaf0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerTitle: { fontSize: 16, fontWeight: '800', color: '#2d2a26' },
  footerSub: { marginTop: 3, color: '#8c806c' }
});
