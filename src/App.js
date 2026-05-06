import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, ImageBackground, Linking, Platform, Pressable, SafeAreaView, ScrollView, Share, StatusBar, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import { proverbs, languages, categories, getLanguageLabel, getLanguageName, getProverbVariant } from './proverbs';

const STORAGE = {
  language: 'daily-sayings:language',
  index: 'daily-sayings:index',
  favorites: 'daily-sayings:favorites',
  notifications: 'daily-sayings:notifications',
  notificationTime: 'daily-sayings:notificationTime',
  category: 'daily-sayings:category',
  edits: 'daily-sayings:edits',
  ownerMode: 'daily-sayings:ownerMode',
  installId: 'daily-sayings:installId',
  backgroundImage: 'daily-sayings:backgroundImage',
  backgroundImageFit: 'daily-sayings:backgroundImageFit',
  backgroundImagePosition: 'daily-sayings:backgroundImagePosition',
  backgroundImageScale: 'daily-sayings:backgroundImageScale'
};

const NOTIFICATION_TIMES = ['08:00', '10:00', '12:00', '18:00', '21:00'];

const SHARE_LABELS = {
  en: 'Share',
  de: 'Teilen',
  es: 'Compartir',
  no: 'Del',
  la: 'Share',
  zh: '分享',
  ja: '共有',
  it: 'Condividi',
  hi: 'साझा करें',
  el: 'Κοινοποίηση',
  fr: 'Partager',
  ar: 'مشاركة',
  fo: 'Deil'
};

const ORIGIN_LABEL = 'Origin';

function wrapCanvasText(context, text, maxWidth) {
  const lines = [];
  const words = text.split(/\s+/).filter(Boolean);
  let line = '';

  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });

  if (line) lines.push(line);
  return lines;
}

function clampImageScale(value) {
  return Math.max(0.5, Math.min(3, Math.round((Number(value) || 1) * 100) / 100));
}

function eventPoint(nativeEvent) {
  const touch = nativeEvent?.touches?.[0] || nativeEvent?.changedTouches?.[0];
  return {
    x: Number(touch?.pageX ?? nativeEvent?.pageX ?? nativeEvent?.locationX ?? 0),
    y: Number(touch?.pageY ?? nativeEvent?.pageY ?? nativeEvent?.locationY ?? 0)
  };
}

function touchDistance(touches = []) {
  if (touches.length < 2) return 0;
  const [a, b] = touches;
  return Math.hypot((a.pageX || 0) - (b.pageX || 0), (a.pageY || 0) - (b.pageY || 0));
}

async function createShareImageFile(text, backgroundImageUri, imageFit = 'cover', imagePosition = { x: 0, y: 0 }, imageScale = 1) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  const size = 1080;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) return null;

  if (backgroundImageUri) {
    try {
      const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = backgroundImageUri;
      });
      const baseScale = imageFit === 'contain'
        ? Math.min(size / image.width, size / image.height)
        : Math.max(size / image.width, size / image.height);
      const scale = baseScale * (Number(imageScale) || 1);
      const width = image.width * scale;
      const height = image.height * scale;
      const positionX = Number(imagePosition?.x) || 0;
      const positionY = Number(imagePosition?.y) || 0;
      context.drawImage(image, ((size - width) / 2) + (positionX * 4), ((size - height) / 2) + (positionY * 4), width, height);
      context.fillStyle = 'rgba(0, 0, 0, 0.42)';
      context.fillRect(0, 0, size, size);
    } catch {
      context.fillStyle = '#000000';
      context.fillRect(0, 0, size, size);
    }
  } else {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, size, size);
  }

  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = '900 76px Arial, Helvetica, sans-serif';
  context.shadowColor = 'rgba(0, 0, 0, 0.65)';
  context.shadowBlur = 18;
  context.shadowOffsetY = 6;

  let lines = wrapCanvasText(context, text, 820);
  if (lines.length > 7) {
    context.font = '900 62px Arial, Helvetica, sans-serif';
    lines = wrapCanvasText(context, text, 860);
  }

  const lineHeight = lines.length > 5 ? 78 : 92;
  const startY = size / 2 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, lineIndex) => {
    context.fillText(line, size / 2, startY + lineIndex * lineHeight);
  });

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.95));
  if (!blob) return null;
  return new File([blob], 'proverb.png', { type: 'image/png' });
}

async function downloadShareImage(file) {
  if (!file || typeof document === 'undefined' || typeof URL === 'undefined') return;
  const objectUrl = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}

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

function normalizeEdits(value) {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function isOwnerUrl() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('owner') === '1';
}

function normalizeFavoriteIds(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    const list = Array.isArray(parsed) ? parsed : [];
    return [...new Set(
      list
        .map((item) => (typeof item === 'string' ? item : item?.id))
        .filter((id) => proverbs.some((proverb) => proverb.id === id))
    )];
  } catch {
    return [];
  }
}

function normalizeSelectedCategories(value) {
  if (!value || value === 'all') return [];

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return [...new Set(parsed.filter((key) => key !== 'all' && categories.some((item) => item.key === key)))];
    }
  } catch {
    // Older versions stored one category as plain text.
  }

  return categories.some((item) => item.key === value && value !== 'all') ? [value] : [];
}

async function persistSelectedCategories(nextCategories) {
  await AsyncStorage.setItem(STORAGE.category, nextCategories.length ? JSON.stringify(nextCategories) : 'all');
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
    const item = getProverbVariant(proverbs[proverbIndex], language);
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editText, setEditText] = useState('');
  const [edits, setEdits] = useState({});
  const [ownerMode, setOwnerMode] = useState(false);
  const [backgroundImageUri, setBackgroundImageUri] = useState(null);
  const [backgroundImageFit, setBackgroundImageFit] = useState('cover');
  const [backgroundImagePosition, setBackgroundImagePosition] = useState({ x: 0, y: 0 });
  const [backgroundImageScale, setBackgroundImageScale] = useState(1);
  const [ready, setReady] = useState(false);
  const shareCardRef = useRef(null);
  const backgroundGestureRef = useRef(null);

  const filteredProverbs = useMemo(
    () => proverbs.filter((item) => selectedCategories.length === 0 || selectedCategories.includes(item.category)),
    [selectedCategories]
  );
  const current = filteredProverbs[index % filteredProverbs.length] || proverbs[0];
  const currentEdit = edits[current.id]?.[language];
  const selectedVariant = getProverbVariant(current, language);
  const copy = currentEdit ? { ...selectedVariant, saying: currentEdit } : selectedVariant;
  const englishCopy = getProverbVariant(current, 'en');
  const showEnglishPair = language !== 'en' && englishCopy?.saying && englishCopy.saying !== copy.saying;
  const selectedLanguageName = getLanguageName(language);
  const infoText = [
    copy.explanation,
    copy.origin ? `${ORIGIN_LABEL}: ${copy.origin}` : null,
    showEnglishPair ? `\nEnglish equivalent: ${englishCopy.saying}` : null,
    showEnglishPair && englishCopy.explanation ? englishCopy.explanation : null,
    showEnglishPair && englishCopy.origin ? `${ORIGIN_LABEL}: ${englishCopy.origin}` : null
  ].filter(Boolean).join('\n\n');
  const shareLabel = SHARE_LABELS[language] || SHARE_LABELS.en;
  const isFavorite = favorites.includes(current.id);
  const selectedCategoryLabel = selectedCategories.length === 0
    ? categories[0].label
    : selectedCategories
      .map((key) => categories.find((item) => item.key === key)?.label)
      .filter(Boolean)
      .join(', ');

  const savedProverbs = useMemo(
    () => favorites.map((id) => proverbs.find((item) => item.id === id)).filter(Boolean),
    [favorites]
  );

  useEffect(() => {
    setInfoOpen(false);
    setEditOpen(false);
  }, [index, language]);

  useEffect(() => {
    if (editOpen) setEditText(copy.saying);
  }, [editOpen, copy.saying]);

  useEffect(() => {
    (async () => {
      await ensureInstallId();
      const [storedLanguage, storedIndex, storedFavorites, storedNotifications, storedTime, storedCategory, storedEdits, storedOwnerMode, storedBackgroundImage, storedBackgroundFit, storedBackgroundPosition, storedBackgroundScale] = await Promise.all([
        AsyncStorage.getItem(STORAGE.language),
        AsyncStorage.getItem(STORAGE.index),
        AsyncStorage.getItem(STORAGE.favorites),
        AsyncStorage.getItem(STORAGE.notifications),
        AsyncStorage.getItem(STORAGE.notificationTime),
        AsyncStorage.getItem(STORAGE.category),
        AsyncStorage.getItem(STORAGE.edits),
        AsyncStorage.getItem(STORAGE.ownerMode),
        AsyncStorage.getItem(STORAGE.backgroundImage),
        AsyncStorage.getItem(STORAGE.backgroundImageFit),
        AsyncStorage.getItem(STORAGE.backgroundImagePosition),
        AsyncStorage.getItem(STORAGE.backgroundImageScale)
      ]);

      const lang = storedLanguage || 'en';
      const time = storedTime || '10:00';
      const owner = isOwnerUrl() || storedOwnerMode === 'on';
      if (owner) await AsyncStorage.setItem(STORAGE.ownerMode, 'on');

      if (storedLanguage) setLanguage(storedLanguage);
      setSelectedCategories(normalizeSelectedCategories(storedCategory));
      if (storedIndex) setIndex(Number(storedIndex));
      setFavorites(normalizeFavoriteIds(storedFavorites));
      setEdits(normalizeEdits(storedEdits));
      setOwnerMode(owner);
      setNotificationTime(time);
      if (storedBackgroundImage) setBackgroundImageUri(storedBackgroundImage);
      if (storedBackgroundFit === 'contain' || storedBackgroundFit === 'cover') setBackgroundImageFit(storedBackgroundFit);
      try {
        const parsedPosition = storedBackgroundPosition ? JSON.parse(storedBackgroundPosition) : null;
        if (parsedPosition && Number.isFinite(parsedPosition.x) && Number.isFinite(parsedPosition.y)) {
          setBackgroundImagePosition(parsedPosition);
        }
      } catch {}
      const parsedScale = Number(storedBackgroundScale);
      if (Number.isFinite(parsedScale) && parsedScale >= 0.5 && parsedScale <= 3) setBackgroundImageScale(parsedScale);

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
    const normalized = ((next % filteredProverbs.length) + filteredProverbs.length) % filteredProverbs.length;
    setIndex(normalized);
    await AsyncStorage.setItem(STORAGE.index, String(normalized));
  }

  async function changeCategory(nextCategory) {
    const nextCategories = nextCategory === 'all'
      ? []
      : selectedCategories.includes(nextCategory)
        ? selectedCategories.filter((key) => key !== nextCategory)
        : [...selectedCategories, nextCategory];

    setSelectedCategories(nextCategories);
    setIndex(0);
    await Promise.all([
      persistSelectedCategories(nextCategories),
      AsyncStorage.setItem(STORAGE.index, '0')
    ]);
  }

  async function previous() {
    await setCurrentIndex(index - 1);
  }

  async function refresh() {
    let next = index;
    while (next === index && filteredProverbs.length > 1) {
      next = Math.floor(Math.random() * filteredProverbs.length);
    }
    await setCurrentIndex(next);
  }

  async function submitEdit() {
    const suggestion = editText.trim();
    if (!suggestion) return;

    if (ownerMode) {
      const next = {
        ...edits,
        [current.id]: {
          ...(edits[current.id] || {}),
          [language]: suggestion
        }
      };
      setEdits(next);
      setEditOpen(false);
      await AsyncStorage.setItem(STORAGE.edits, JSON.stringify(next));
      Alert.alert('Saved', 'Your edit has been saved on this device.');
      return;
    }

    const title = encodeURIComponent(`Edit suggestion: ${current.id} (${language.toUpperCase()})`);
    const body = encodeURIComponent(`Proverb ID: ${current.id}\nLanguage: ${language.toUpperCase()}\n\nCurrent text:\n${copy.saying}\n\nSuggested text:\n${suggestion}`);
    const issueUrl = `https://github.com/Olsenarkitekter/proverbs-poison/issues/new?title=${title}&body=${body}`;
    setEditOpen(false);
    await Linking.openURL(issueUrl);
  }

  async function chooseBackgroundImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access needed', 'Allow photo access to use a picture as the proverb background.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.92
    });

    if (result.canceled || !result.assets?.[0]?.uri) return;
    const nextUri = result.assets[0].uri;
    setBackgroundImageUri(nextUri);
    setBackgroundImageFit('cover');
    setBackgroundImagePosition({ x: 0, y: 0 });
    setBackgroundImageScale(1);
    await AsyncStorage.multiSet([
      [STORAGE.backgroundImage, nextUri],
      [STORAGE.backgroundImageFit, 'cover'],
      [STORAGE.backgroundImagePosition, JSON.stringify({ x: 0, y: 0 })],
      [STORAGE.backgroundImageScale, '1']
    ]);
  }

  function startBackgroundGesture(evt) {
    if (!backgroundImageUri) return;
    const touches = evt.nativeEvent?.touches || [];
    const point = eventPoint(evt.nativeEvent);
    backgroundGestureRef.current = {
      startPoint: point,
      startPosition: backgroundImagePosition,
      startScale: backgroundImageScale,
      startDistance: touchDistance(touches),
      lastPosition: backgroundImagePosition,
      lastScale: backgroundImageScale
    };
  }

  function moveBackgroundGesture(evt) {
    const gesture = backgroundGestureRef.current;
    if (!gesture || !backgroundImageUri) return;
    const touches = evt.nativeEvent?.touches || [];
    const point = eventPoint(evt.nativeEvent);
    const nextPosition = {
      x: gesture.startPosition.x + (point.x - gesture.startPoint.x),
      y: gesture.startPosition.y + (point.y - gesture.startPoint.y)
    };
    const currentDistance = touchDistance(touches);
    const nextScale = touches.length >= 2 && gesture.startDistance > 0
      ? clampImageScale(gesture.startScale * (currentDistance / gesture.startDistance))
      : gesture.startScale;

    gesture.lastPosition = nextPosition;
    gesture.lastScale = nextScale;
    setBackgroundImagePosition(nextPosition);
    setBackgroundImageScale(nextScale);
  }

  async function finishBackgroundGesture() {
    const gesture = backgroundGestureRef.current;
    if (!gesture) return;
    backgroundGestureRef.current = null;
    await AsyncStorage.multiSet([
      [STORAGE.backgroundImagePosition, JSON.stringify(gesture.lastPosition)],
      [STORAGE.backgroundImageScale, String(gesture.lastScale)]
    ]);
  }

  async function clearBackgroundImage() {
    setBackgroundImageUri(null);
    setBackgroundImageFit('cover');
    setBackgroundImagePosition({ x: 0, y: 0 });
    setBackgroundImageScale(1);
    await AsyncStorage.multiRemove([STORAGE.backgroundImage, STORAGE.backgroundImageFit, STORAGE.backgroundImagePosition, STORAGE.backgroundImageScale]);
  }

  async function shareProverb() {
    const url = 'https://olsenarkitekter.github.io/sayings/';
    const shareText = `${infoText}\n\n${url}`;

    try {
      const imageFile = await createShareImageFile(copy.saying, backgroundImageUri, backgroundImageFit, backgroundImagePosition, backgroundImageScale);
      const webNavigator = typeof navigator !== 'undefined' ? navigator : null;
      const webSharePayload = imageFile ? {
        title: copy.saying,
        text: shareText,
        files: [imageFile]
      } : null;

      if (webNavigator?.share && webSharePayload && (!webNavigator.canShare || webNavigator.canShare(webSharePayload))) {
        await webNavigator.share(webSharePayload);
        return;
      }

      if (imageFile) {
        await downloadShareImage(imageFile);
        await Share.share({ title: copy.saying, message: shareText, url });
        return;
      }

      if (shareCardRef.current && await Sharing.isAvailableAsync()) {
        const imageUri = await captureRef(shareCardRef, { format: 'png', quality: 1 });
        await Sharing.shareAsync(imageUri, { mimeType: 'image/png', dialogTitle: copy.saying });
        await Share.share({ title: copy.saying, message: shareText, url });
        return;
      }

      await Share.share({ title: copy.saying, message: `${copy.saying}\n\n${shareText}`, url });
    } catch {
      Alert.alert('Share unavailable', 'Sharing is not available on this device right now.');
    }
  }

  async function toggleFavorite() {
    const next = isFavorite
      ? favorites.filter((id) => id !== current.id)
      : [...new Set([...favorites, current.id])];
    setFavorites(next);
    setSavedOpen(true);
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
        <View style={styles.adArea}>
          <Text style={styles.adText}>ADVERTISEMENT</Text>
        </View>

        <View style={styles.topActions}>
          <Pressable accessibilityLabel="Settings" onPress={() => setSettingsOpen((value) => !value)} hitSlop={14} style={styles.iconTap}>
            <Text style={styles.headerIcon}>≡</Text>
          </Pressable>

          <View style={styles.topLanguageRow}>
            <Text style={styles.topLanguageText}>EN</Text>
            {language !== 'en' && <Text style={styles.topLanguageDivider}>+</Text>}
            {language !== 'en' && <Text style={[styles.topLanguageText, styles.activeText]}>{getLanguageLabel(language)}</Text>}
          </View>
        </View>

        <View style={styles.content}>
          <View
            ref={shareCardRef}
            collapsable={false}
            style={styles.shareCard}
            onStartShouldSetResponder={() => !!backgroundImageUri}
            onMoveShouldSetResponder={() => !!backgroundImageUri}
            onResponderGrant={startBackgroundGesture}
            onResponderMove={moveBackgroundGesture}
            onResponderRelease={finishBackgroundGesture}
            onResponderTerminate={finishBackgroundGesture}
          >
            {backgroundImageUri ? (
              <ImageBackground
                source={{ uri: backgroundImageUri }}
                resizeMode={backgroundImageFit}
                style={styles.shareCardBackground}
                imageStyle={[styles.shareCardImage, { transform: [{ translateX: backgroundImagePosition.x }, { translateY: backgroundImagePosition.y }, { scale: backgroundImageScale }] }]}
              >
                <View style={styles.shareCardOverlay}>
                  <Text style={styles.languageEyebrow}>{getLanguageLabel(language)} · {selectedLanguageName}</Text>
                  <Text style={styles.saying}>{copy.saying}</Text>
                  {showEnglishPair && <Text style={styles.englishSaying}>EN · {englishCopy.saying}</Text>}
                  {copy.origin && <Text style={styles.originLine}>{copy.origin}</Text>}
                </View>
              </ImageBackground>
            ) : (
              <>
                <Text style={styles.languageEyebrow}>{getLanguageLabel(language)} · {selectedLanguageName}</Text>
                <Text style={styles.saying}>{copy.saying}</Text>
                {showEnglishPair && <Text style={styles.englishSaying}>EN · {englishCopy.saying}</Text>}
                {copy.origin && <Text style={styles.originLine}>{copy.origin}</Text>}
              </>
            )}
          </View>
          <View style={styles.quickActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={infoOpen ? 'Hide explanation' : 'Show explanation'}
              onPress={() => setInfoOpen((value) => !value)}
              style={styles.infoButton}
            >
              <Text style={styles.infoIcon}>i</Text>
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Share proverb" onPress={shareProverb} style={styles.shareButton}>
              <Text style={styles.shareText}>{shareLabel}</Text>
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Edit proverb" onPress={() => setEditOpen(true)} style={styles.iconButton}>
              <Text style={styles.actionIcon}>✎</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Choose background image"
              onPress={chooseBackgroundImage}
              onLongPress={clearBackgroundImage}
              style={[styles.iconButton, backgroundImageUri && styles.activeIconButton]}
            >
              <Text style={styles.actionIcon}>▧</Text>
            </Pressable>
          </View>

          {editOpen && (
            <View style={styles.editPanel}>
              <Text style={styles.editTitle}>{ownerMode ? 'Edit saying' : 'Suggest edit'}</Text>
              <TextInput
                value={editText}
                onChangeText={setEditText}
                multiline
                autoFocus
                style={styles.editInput}
                placeholder="Write corrected saying…"
                placeholderTextColor="#777777"
              />
              <View style={styles.editActions}>
                <Pressable onPress={() => setEditOpen(false)} style={styles.editSecondaryButton}>
                  <Text style={styles.editSecondaryText}>Cancel</Text>
                </Pressable>
                <Pressable onPress={submitEdit} style={styles.editPrimaryButton}>
                  <Text style={styles.editPrimaryText}>{ownerMode ? 'Save' : 'Send'}</Text>
                </Pressable>
              </View>
            </View>
          )}
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

        {infoOpen && (
          <View style={styles.infoOverlay}>
            <View style={styles.infoPanel}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoTitle}>{copy.saying}</Text>
                <Pressable onPress={() => setInfoOpen(false)} hitSlop={12}>
                  <Text style={styles.infoClose}>×</Text>
                </Pressable>
              </View>
              <ScrollView contentContainerStyle={styles.infoScrollContent} showsVerticalScrollIndicator>
                <Text style={styles.explanation}>{infoText}</Text>
              </ScrollView>
            </View>
          </View>
        )}

        {settingsOpen && (
          <View style={styles.settingsPanel}>
            <ScrollView contentContainerStyle={styles.settingsContent}>
              <View style={styles.settingsHeader}>
                <Text style={styles.sectionTitle}>Settings</Text>
                <Pressable onPress={() => setSettingsOpen(false)} hitSlop={12}>
                  <Text style={styles.closeIcon}>×</Text>
                </Pressable>
              </View>

              <View style={styles.languageBlock}>
                <Text style={styles.settingTitle}>Language</Text>
                <Text style={styles.muted}>Shown together with English in the top right.</Text>
                <View style={styles.languageGrid}>
                  {languages.map((item) => (
                    <Pressable key={item.key} onPress={() => changeLanguage(item.key)} style={[styles.languageOption, language === item.key && styles.activeLanguageOption]}>
                      <Text style={[styles.languageOptionLabel, language === item.key && styles.activeText]}>{item.label}</Text>
                      <Text style={styles.languageOptionName}>{item.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <Pressable accessibilityLabel="Show saved proverbs" onPress={() => setSavedOpen((value) => !value)} style={styles.savedToggle}>
                <Text style={styles.savedToggleIcon}>☆</Text>
                <Text style={styles.savedToggleText}>Saved proverbs ({savedProverbs.length})</Text>
                <Text style={styles.savedToggleArrow}>{savedOpen ? '−' : '+'}</Text>
              </Pressable>

              {savedOpen && (
                <View style={styles.savedList}>
                  {savedProverbs.length === 0 ? (
                    <Text style={styles.muted}>No saved proverbs yet. Tap the star to save one.</Text>
                  ) : (
                    savedProverbs.map((item) => (
                      <Pressable
                        key={item.id}
                        onPress={() => {
                          const savedIndex = filteredProverbs.findIndex((p) => p.id === item.id);
                          if (savedIndex >= 0) {
                            setCurrentIndex(savedIndex);
                          } else {
                            const allIndex = proverbs.findIndex((p) => p.id === item.id);
                            setSelectedCategories([]);
                            setCategoryOpen(false);
                            setIndex(allIndex);
                            persistSelectedCategories([]).catch(() => {});
                            AsyncStorage.setItem(STORAGE.index, String(allIndex)).catch(() => {});
                          }
                          setSettingsOpen(false);
                        }}
                        style={styles.savedItem}
                      >
                        <Text style={styles.savedSaying}>{edits[item.id]?.[language] || getProverbVariant(item, language).saying}</Text>
                        <Text style={styles.savedExplanation}>{getProverbVariant(item, language).explanation}</Text>
                      </Pressable>
                    ))
                  )}
                </View>
              )}

              <View style={styles.categoryBlock}>
                <Text style={styles.settingTitle}>Category</Text>
                <Pressable accessibilityRole="button" accessibilityLabel="Choose category" onPress={() => setCategoryOpen((value) => !value)} style={styles.categorySelect}>
                  <Text style={styles.categorySelectText}>{selectedCategoryLabel}</Text>
                  <Text style={styles.categorySelectArrow}>{categoryOpen ? '−' : '+'}</Text>
                </Pressable>

                {categoryOpen && (
                  <View style={styles.categoryOptions}>
                    {categories.map((item) => {
                      const isSelected = item.key === 'all' ? selectedCategories.length === 0 : selectedCategories.includes(item.key);
                      return (
                        <Pressable key={item.key} onPress={() => changeCategory(item.key)} style={styles.categoryOption}>
                          <Text style={[styles.categoryOptionText, isSelected && styles.activeText]}>{isSelected ? '✓ ' : ''}{item.label}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
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
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000000' },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 18, paddingBottom: 26, position: 'relative' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' },
  loading: { fontSize: 18, color: '#ffffff' },
  adArea: { minHeight: 42, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  topActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  adText: { color: '#555555', letterSpacing: 3, fontSize: 11, textAlign: 'center' },
  topLanguageRow: { flexDirection: 'row', gap: 8, alignItems: 'center', borderWidth: 1, borderColor: '#242424', borderRadius: 16, paddingHorizontal: 12, minHeight: 34 },
  topLanguageDivider: { color: '#555555', fontSize: 13, fontWeight: '900' },
  topLanguageText: { color: '#777777', fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  activeText: { color: '#ffffff' },
  iconTap: { width: 58, height: 42, alignItems: 'flex-start', justifyContent: 'center' },
  headerIcon: { color: '#ffffff', fontSize: 38, lineHeight: 40, fontWeight: '300' },
  closeIcon: { color: '#ffffff', fontSize: 34, lineHeight: 36, fontWeight: '300' },
  content: { flex: 1, justifyContent: 'center', paddingBottom: 20 },
  shareCard: { backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center', minHeight: 390, borderRadius: 28, overflow: 'hidden' },
  shareCardBackground: { width: '100%', minHeight: 390, alignItems: 'center', justifyContent: 'center' },
  shareCardImage: { borderRadius: 28 },
  shareCardOverlay: { width: '100%', minHeight: 390, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 28, backgroundColor: 'rgba(0, 0, 0, 0.42)' },
  languageEyebrow: { color: '#8f8f8f', fontSize: 13, lineHeight: 18, fontWeight: '900', letterSpacing: 1.2, textAlign: 'center', marginBottom: 14, textTransform: 'uppercase' },
  saying: { fontSize: 42, lineHeight: 48, fontWeight: '900', textAlign: 'center', color: '#ffffff', textShadowColor: 'rgba(0, 0, 0, 0.7)', textShadowOffset: { width: 0, height: 3 }, textShadowRadius: 10 },
  englishSaying: { marginTop: 24, color: '#d9d9d9', fontSize: 21, lineHeight: 28, fontWeight: '800', textAlign: 'center' },
  originLine: { marginTop: 18, color: '#8f8f8f', fontSize: 13, lineHeight: 18, textAlign: 'center', fontWeight: '700' },
  quickActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 22, gap: 12 },
  infoButton: { width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, borderColor: '#777777', alignItems: 'center', justifyContent: 'center' },
  infoIcon: { color: '#d9d9d9', fontSize: 16, lineHeight: 18, fontWeight: '900', fontStyle: 'italic' },
  shareButton: { minWidth: 70, height: 34, borderRadius: 17, borderWidth: 1.5, borderColor: '#777777', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
  shareText: { color: '#d9d9d9', fontSize: 14, lineHeight: 18, fontWeight: '900' },
  iconButton: { width: 34, height: 34, borderRadius: 17, borderWidth: 1.5, borderColor: '#777777', alignItems: 'center', justifyContent: 'center' },
  activeIconButton: { borderColor: '#ffffff' },
  actionIcon: { color: '#d9d9d9', fontSize: 20, lineHeight: 22, fontWeight: '900' },
  infoOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 20, backgroundColor: 'rgba(0, 0, 0, 0.82)', paddingHorizontal: 18, paddingTop: 92, paddingBottom: 116, justifyContent: 'center' },
  infoPanel: { maxHeight: '78%', borderWidth: 1, borderColor: '#242424', borderRadius: 24, backgroundColor: '#050505', padding: 18 },
  infoHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 10 },
  infoTitle: { flex: 1, color: '#ffffff', fontSize: 20, lineHeight: 26, fontWeight: '900' },
  infoClose: { color: '#ffffff', fontSize: 34, lineHeight: 36, fontWeight: '300' },
  infoScrollContent: { paddingBottom: 12 },
  explanation: { fontSize: 18, lineHeight: 28, textAlign: 'left', color: '#d9d9d9' },
  editPanel: { marginTop: 18, borderWidth: 1, borderColor: '#242424', borderRadius: 18, padding: 14, backgroundColor: '#080808' },
  editTitle: { color: '#ffffff', fontSize: 15, fontWeight: '900', marginBottom: 10, textAlign: 'center' },
  editInput: { minHeight: 86, color: '#ffffff', borderWidth: 1, borderColor: '#333333', borderRadius: 12, padding: 12, fontSize: 18, lineHeight: 24, textAlignVertical: 'top' },
  editActions: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 12 },
  editSecondaryButton: { height: 36, minWidth: 88, borderRadius: 18, borderWidth: 1, borderColor: '#555555', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
  editSecondaryText: { color: '#d9d9d9', fontSize: 14, fontWeight: '900' },
  editPrimaryButton: { height: 36, minWidth: 88, borderRadius: 18, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
  editPrimaryText: { color: '#000000', fontSize: 14, fontWeight: '900' },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 34, marginBottom: 8 },
  controlButton: { width: 58, height: 58, alignItems: 'center', justifyContent: 'center' },
  controlIcon: { color: '#ffffff', fontSize: 46, lineHeight: 50, fontWeight: '300' },
  favoriteIcon: { color: '#ffd166' },
  refreshButton: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },
  refreshIcon: { color: '#000000', fontSize: 42, lineHeight: 46, fontWeight: '700' },
  settingsPanel: { position: 'absolute', top: 66, left: 0, right: 0, bottom: 0, zIndex: 10, backgroundColor: '#000000', paddingHorizontal: 22, paddingTop: 18, borderTopWidth: 1, borderTopColor: '#222222' },
  settingsContent: { paddingBottom: 36 },
  settingsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { color: '#ffffff', fontSize: 18, fontWeight: '900', marginBottom: 12 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  settingTitle: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  languageBlock: { marginBottom: 24 },
  languageGrid: { marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  languageOption: { width: '31%', minHeight: 64, borderWidth: 1, borderColor: '#242424', borderRadius: 14, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'center' },
  activeLanguageOption: { borderColor: '#ffffff', backgroundColor: '#101010' },
  languageOptionLabel: { color: '#777777', fontSize: 14, lineHeight: 18, fontWeight: '900' },
  languageOptionName: { color: '#8f8f8f', fontSize: 11, lineHeight: 15, marginTop: 3 },
  categoryBlock: { marginBottom: 24 },
  categorySelect: { marginTop: 10, minHeight: 48, borderWidth: 1, borderColor: '#242424', borderRadius: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  categorySelectText: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  categorySelectArrow: { color: '#ffffff', fontSize: 28, lineHeight: 32, fontWeight: '300' },
  categoryOptions: { marginTop: 10, borderWidth: 1, borderColor: '#242424', borderRadius: 14, paddingVertical: 6 },
  categoryOption: { minHeight: 42, justifyContent: 'center', paddingHorizontal: 16 },
  categoryOptionText: { color: '#777777', fontSize: 16, fontWeight: '800' },
  muted: { color: '#8f8f8f', fontSize: 14, lineHeight: 20 },
  timeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, marginBottom: 24 },
  timeButton: { paddingVertical: 4, paddingRight: 4 },
  timeText: { color: '#777777', fontSize: 16, fontWeight: '800' },
  savedToggle: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 48, marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#1d1d1d' },
  savedToggleIcon: { color: '#ffffff', fontSize: 28, lineHeight: 32, fontWeight: '300' },
  savedToggleText: { flex: 1, color: '#ffffff', fontSize: 16, fontWeight: '800' },
  savedToggleArrow: { color: '#ffffff', fontSize: 28, lineHeight: 32, fontWeight: '300' },
  savedList: { marginBottom: 24, gap: 14 },
  savedItem: { paddingVertical: 8 },
  savedSaying: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  savedExplanation: { color: '#a6a6a6', fontSize: 14, marginTop: 3, lineHeight: 20 }
});
