import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Image, ImageBackground, Keyboard, Linking, Platform, Pressable, SafeAreaView, ScrollView, Share, StatusBar, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { proverbs, languages, categories, getProverbVariant } from './proverbs';

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
  backgroundImageScale: 'daily-sayings:backgroundImageScale',
  backgroundRounded: 'daily-sayings:backgroundRounded',
  shareBackgroundMode: 'daily-sayings:shareBackgroundMode',
  shareBackgroundColor: 'daily-sayings:shareBackgroundColor',
  shareFont: 'daily-sayings:shareFont',
  shareUppercase: 'daily-sayings:shareUppercase'
};

const NOTIFICATION_TIMES = ['08:00', '10:00', '12:00', '18:00', '21:00'];

const EDIT_EMAIL = 'olsenarkitekter@gmail.com';
const BRAND_NAME = 'Visay';
const BRAND_TAGLINE = 'Visual sayings.';
const BRAND_LOGO_SOURCE = require('../assets/logo.png');
const ICON_SYMBOLS = {
  search: '⌕',
  menu: '☰',
  info: 'i',
  star: '☆',
  'star-active': '★',
  check: '✓',
  'edit-3': '✎',
  sliders: '☷',
  list: '≡',
  send: '↗',
  x: '×',
  'chevron-up': '⌃',
  'chevron-down': '⌄'
};
const SHARE_COLORS = [
  { key: '#000000', label: 'Sort' },
  { key: '#16302b', label: 'Grøn' },
  { key: '#1f3a5f', label: 'Blå' },
  { key: '#40231d', label: 'Rødbrun' },
  { key: '#5a1f2e', label: 'Vinrød' },
  { key: '#6f3f12', label: 'Rav' },
  { key: '#2f2a45', label: 'Indigo' },
  { key: '#5b5b3a', label: 'Mos' },
  { key: '#f1eee6', label: 'Lys' },
  { key: '#d7b58d', label: 'Papir' },
  { key: '#b94d3d', label: 'Koral' },
  { key: '#303030', label: 'Grafit' }
];
const SHARE_FONTS = [
  { key: 'system', label: 'Klassisk', family: undefined },
  { key: 'serif', label: 'Bog', family: Platform.select({ web: 'Georgia, serif', default: 'serif' }) },
  { key: 'italic', label: 'Skrå', family: Platform.select({ web: 'Georgia, serif', default: 'serif' }), fontStyle: 'italic' },
  { key: 'hand', label: 'Hånd', family: Platform.select({ web: '"Bradley Hand", "Segoe Print", cursive', default: 'casual' }) },
  { key: 'script', label: 'Script', family: Platform.select({ web: '"Brush Script MT", "Snell Roundhand", cursive', default: 'cursive' }) },
  { key: 'mono', label: 'Mono', family: Platform.select({ web: 'Menlo, monospace', default: 'monospace' }) }
];

function BrandLogo() {
  return (
    <View style={styles.brandRow}>
      <Image source={BRAND_LOGO_SOURCE} style={styles.logoImage} />
      <View style={styles.brandCopy}>
        <Text style={styles.brandText}>{BRAND_NAME}</Text>
        <Text style={styles.brandTagline}>{BRAND_TAGLINE}</Text>
      </View>
    </View>
  );
}

function ActionIcon({ name, active, size = 22 }) {
  const symbol = ICON_SYMBOLS[active && name === 'star' ? 'star-active' : name] || '•';
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.symbolIcon,
        {
          color: active ? '#ffd166' : '#ffffff',
          fontSize: size,
          lineHeight: size + 3
        }
      ]}
    >
      {symbol}
    </Text>
  );
}

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

function getBrandLogoUri() {
  const resolved = Image.resolveAssetSource?.(BRAND_LOGO_SOURCE);
  if (resolved?.uri) return resolved.uri;
  if (typeof BRAND_LOGO_SOURCE === 'string') return BRAND_LOGO_SOURCE;
  if (typeof BRAND_LOGO_SOURCE?.uri === 'string') return BRAND_LOGO_SOURCE.uri;
  if (typeof BRAND_LOGO_SOURCE?.default === 'string') return BRAND_LOGO_SOURCE.default;
  return null;
}

async function createShareImageFile({
  text,
  backgroundImageUri,
  imageFit = 'cover',
  imagePosition = { x: 0, y: 0 },
  imageScale = 1,
  backgroundMode = 'image',
  backgroundColor = '#000000',
  fontFamily = 'Arial, Helvetica, sans-serif',
  fontStyle = 'normal',
  logoUri
}) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  const size = 1080;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) return null;

  if (backgroundMode === 'image' && backgroundImageUri) {
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
    context.fillStyle = backgroundColor || '#000000';
    context.fillRect(0, 0, size, size);
  }

  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = `${fontStyle} 900 76px ${fontFamily}`;
  context.shadowColor = 'rgba(0, 0, 0, 0.65)';
  context.shadowBlur = 18;
  context.shadowOffsetY = 6;

  let lines = wrapCanvasText(context, text, 820);
  if (lines.length > 7) {
    context.font = `${fontStyle} 900 62px ${fontFamily}`;
    lines = wrapCanvasText(context, text, 860);
  }

  const lineHeight = lines.length > 5 ? 78 : 92;
  const startY = size / 2 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, lineIndex) => {
    context.fillText(line, size / 2, startY + lineIndex * lineHeight);
  });

  context.shadowColor = 'transparent';
  context.shadowBlur = 0;
  context.shadowOffsetY = 0;
  context.globalAlpha = 0.82;
  if (logoUri) {
    try {
      const logo = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = logoUri;
      });
      context.drawImage(logo, 50, size - 122, 64, 64);
    } catch {
      // The wordmark still carries the brand if the browser cannot load the logo asset.
    }
  }
  context.fillStyle = '#ffffff';
  context.textAlign = 'left';
  context.textBaseline = 'alphabetic';
  context.font = '900 28px Arial, Helvetica, sans-serif';
  context.fillText(BRAND_NAME.toUpperCase(), 130, size - 92);
  context.font = '700 14px Arial, Helvetica, sans-serif';
  context.fillText(BRAND_TAGLINE, 130, size - 70);
  context.globalAlpha = 1;

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

function detectPreferredLanguage() {
  const locale = (
    (typeof navigator !== 'undefined' && (navigator.language || navigator.languages?.[0])) ||
    (typeof Intl !== 'undefined' && Intl.DateTimeFormat?.().resolvedOptions?.().locale) ||
    'en'
  ).toLowerCase();
  const languageCode = locale.split('-')[0];
  const normalized = { da: 'dk', nb: 'no', nn: 'no' }[languageCode] || languageCode;
  return languages.some((item) => item.key === normalized) ? normalized : 'en';
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
  const [languageOpen, setLanguageOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shareOpen, setShareOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [oppositeOpen, setOppositeOpen] = useState(false);
  const [editText, setEditText] = useState('');
  const [addSayingOpen, setAddSayingOpen] = useState(false);
  const [newSaying, setNewSaying] = useState('');
  const [newSayingName, setNewSayingName] = useState('');
  const [newSayingMeaning, setNewSayingMeaning] = useState('');
  const [newSayingOrigin, setNewSayingOrigin] = useState('');
  const [edits, setEdits] = useState({});
  const [ownerMode, setOwnerMode] = useState(false);
  const [backgroundImageUri, setBackgroundImageUri] = useState(null);
  const [backgroundImageFit, setBackgroundImageFit] = useState('cover');
  const [backgroundImagePosition, setBackgroundImagePosition] = useState({ x: 0, y: 0 });
  const [backgroundImageScale, setBackgroundImageScale] = useState(1);
  const [backgroundRounded, setBackgroundRounded] = useState(false);
  const [shareBackgroundMode, setShareBackgroundMode] = useState('color');
  const [shareBackgroundColor, setShareBackgroundColor] = useState('#000000');
  const [shareFont, setShareFont] = useState('system');
  const [shareUppercase, setShareUppercase] = useState(false);
  const [imageEditorOpen, setImageEditorOpen] = useState(false);
  const [detailLineCount, setDetailLineCount] = useState(0);
  const [ready, setReady] = useState(false);
  const shareCardRef = useRef(null);
  const backgroundGestureRef = useRef(null);
  const cardGestureRef = useRef(null);

  const filteredProverbs = useMemo(
    () => proverbs.filter((item) => selectedCategories.length === 0 || selectedCategories.includes(item.category)),
    [selectedCategories]
  );
  const current = filteredProverbs[index % filteredProverbs.length] || proverbs[0];
  const opposite = current.oppositeId ? proverbs.find((item) => item.id === current.oppositeId) : null;
  const displayedProverb = oppositeOpen && opposite ? opposite : current;
  const currentEdit = edits[displayedProverb.id]?.[language];
  const selectedVariant = getProverbVariant(displayedProverb, language);
  const copy = currentEdit ? { ...selectedVariant, saying: currentEdit } : selectedVariant;
  const currentCategory = categories.find((item) => item.key === displayedProverb.category);
  const currentKindLabel = displayedProverb.kind === 'image' ? 'Billede' : 'Dilemma';
  const oppositeCopy = opposite ? getProverbVariant(opposite, language) : null;
  const englishCopy = getProverbVariant(displayedProverb, 'en');
  const meaningText = englishCopy.explanation || copy.explanation;
  const rawOrigin = englishCopy.origin || copy.origin || '';
  const primaryOrigin = /^origin unknown\b/i.test(rawOrigin.trim()) ? null : rawOrigin;
  const englishSayingText = englishCopy.saying ? `English: ${englishCopy.saying}` : null;
  const meaningLine = meaningText ? `Meaning: ${meaningText}` : null;
  const detailText = [primaryOrigin, meaningLine, englishSayingText].filter(Boolean).join('\n\n');
  const hasLongDetails = detailText.length > 92;
  const shouldShowReadMore = hasLongDetails || detailLineCount > 2;
  const infoText = detailText;
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  useEffect(() => {
    setDetailLineCount(0);
  }, [displayedProverb.id, language, detailText]);

  function handleDetailTextLayout(event) {
    const nextLineCount = event?.nativeEvent?.lines?.length || 0;
    if (nextLineCount && nextLineCount !== detailLineCount) setDetailLineCount(nextLineCount);
  }

  const searchResults = normalizedSearchQuery
    ? proverbs
        .map((item) => ({ item, variant: getProverbVariant(item, language) }))
        .filter(({ item, variant }) => {
          const english = getProverbVariant(item, 'en');
          return [variant.saying, english.saying, variant.explanation, english.explanation]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(normalizedSearchQuery));
        })
        .sort((a, b) => {
          const aSaying = a.variant.saying.toLowerCase();
          const bSaying = b.variant.saying.toLowerCase();
          const aStarts = aSaying.startsWith(normalizedSearchQuery) ? 0 : 1;
          const bStarts = bSaying.startsWith(normalizedSearchQuery) ? 0 : 1;
          return aStarts - bStarts || aSaying.localeCompare(bSaying);
        })
    : [];
  const displaySaying = shareUppercase ? copy.saying.toUpperCase() : copy.saying;
  const shareText = displaySaying;
  const isFavorite = favorites.includes(displayedProverb.id);
  const selectedCategoryLabel = selectedCategories.length === 0
    ? categories[0].label
    : selectedCategories
      .map((key) => categories.find((item) => item.key === key)?.label)
      .filter(Boolean)
      .join(', ');
  const selectedLanguageLabel = languages.find((item) => item.key === language)?.name || 'English';
  const selectedShareFont = SHARE_FONTS.find((item) => item.key === shareFont) || SHARE_FONTS[0];
  const shareFontStyle = {
    ...(selectedShareFont.family ? { fontFamily: selectedShareFont.family } : {}),
    ...(selectedShareFont.fontStyle ? { fontStyle: selectedShareFont.fontStyle } : {})
  };
  const hasImageBackground = shareBackgroundMode === 'image' && !!backgroundImageUri;
  const cardBackgroundStyle = shareBackgroundMode === 'color' ? { backgroundColor: shareBackgroundColor } : null;
  const logoUri = getBrandLogoUri();

  const savedProverbs = useMemo(
    () => favorites.map((id) => proverbs.find((item) => item.id === id)).filter(Boolean),
    [favorites]
  );

  useEffect(() => {
    setInfoOpen(false);
    setEditOpen(false);
    setLanguageOpen(false);
    setShareOpen(false);
    setOppositeOpen(false);
  }, [index, language]);

  useEffect(() => {
    if (!backgroundImageUri && shareBackgroundMode === 'image') setShareBackgroundMode('color');
  }, [backgroundImageUri, shareBackgroundMode]);

  useEffect(() => {
    if (editOpen) setEditText(copy.saying);
  }, [editOpen, copy.saying]);

  useEffect(() => {
    (async () => {
      await ensureInstallId();
      const [storedLanguage, storedIndex, storedFavorites, storedNotifications, storedTime, storedCategory, storedEdits, storedOwnerMode, storedBackgroundImage, storedBackgroundFit, storedBackgroundPosition, storedBackgroundScale, storedBackgroundRounded, storedShareBackgroundMode, storedShareBackgroundColor, storedShareFont, storedShareUppercase] = await Promise.all([
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
        AsyncStorage.getItem(STORAGE.backgroundImageScale),
        AsyncStorage.getItem(STORAGE.backgroundRounded),
        AsyncStorage.getItem(STORAGE.shareBackgroundMode),
        AsyncStorage.getItem(STORAGE.shareBackgroundColor),
        AsyncStorage.getItem(STORAGE.shareFont),
        AsyncStorage.getItem(STORAGE.shareUppercase)
      ]);

      const lang = storedLanguage || detectPreferredLanguage();
      const time = storedTime || '10:00';
      const owner = isOwnerUrl() || storedOwnerMode === 'on';
      if (owner) await AsyncStorage.setItem(STORAGE.ownerMode, 'on');

      setLanguage(lang);
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
      if (storedBackgroundRounded === 'on') {
        await AsyncStorage.setItem(STORAGE.backgroundRounded, 'off');
      }
      if (storedShareBackgroundMode === 'image' || storedShareBackgroundMode === 'color') setShareBackgroundMode(storedShareBackgroundMode);
      if (SHARE_COLORS.some((item) => item.key === storedShareBackgroundColor)) setShareBackgroundColor(storedShareBackgroundColor);
      if (SHARE_FONTS.some((item) => item.key === storedShareFont)) setShareFont(storedShareFont);
      if (storedShareUppercase === 'on') setShareUppercase(true);

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

    const subject = encodeURIComponent(`Visay edit suggestion: ${current.id} (${language.toUpperCase()})`);
    const body = encodeURIComponent(`Proverb ID: ${current.id}\nLanguage: ${language.toUpperCase()}\n\nCurrent text:\n${copy.saying}\n\nSuggested text:\n${suggestion}`);
    const mailUrl = `mailto:${EDIT_EMAIL}?subject=${subject}&body=${body}`;
    setEditOpen(false);
    await Linking.openURL(mailUrl);
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
    setBackgroundRounded(false);
    setShareBackgroundMode('image');
    setImageEditorOpen(true);
    await AsyncStorage.multiSet([
      [STORAGE.backgroundImage, nextUri],
      [STORAGE.backgroundImageFit, 'cover'],
      [STORAGE.backgroundImagePosition, JSON.stringify({ x: 0, y: 0 })],
      [STORAGE.backgroundImageScale, '1'],
      [STORAGE.backgroundRounded, 'off'],
      [STORAGE.shareBackgroundMode, 'image']
    ]);
  }

  function startCardGesture(evt) {
    const touches = evt.nativeEvent?.touches || [];
    const point = eventPoint(evt.nativeEvent);
    cardGestureRef.current = { startPoint: point, lastPoint: point, didSwipe: false };

    if (hasImageBackground && imageEditorOpen) {
      backgroundGestureRef.current = {
        startPoint: point,
        startPosition: backgroundImagePosition,
        startScale: backgroundImageScale,
        startDistance: touchDistance(touches),
        lastPosition: backgroundImagePosition,
        lastScale: backgroundImageScale
      };
    }
  }

  function moveCardGesture(evt) {
    const cardGesture = cardGestureRef.current;
    const point = eventPoint(evt.nativeEvent);
    if (cardGesture) cardGesture.lastPoint = point;

    const gesture = backgroundGestureRef.current;
    if (!gesture || !hasImageBackground) return;
    const touches = evt.nativeEvent?.touches || [];
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

  async function finishCardGesture() {
    const cardGesture = cardGestureRef.current;
    cardGestureRef.current = null;
    const gesture = backgroundGestureRef.current;
    backgroundGestureRef.current = null;

    if (gesture && hasImageBackground && imageEditorOpen) {
      await AsyncStorage.multiSet([
        [STORAGE.backgroundImagePosition, JSON.stringify(gesture.lastPosition)],
        [STORAGE.backgroundImageScale, String(gesture.lastScale)]
      ]);
      return;
    }

    if (cardGesture) {
      const dx = cardGesture.lastPoint.x - cardGesture.startPoint.x;
      const dy = cardGesture.lastPoint.y - cardGesture.startPoint.y;
      const isHorizontalSwipe = Math.abs(dx) > 72 && Math.abs(dx) > Math.abs(dy) * 1.25;
      if (isHorizontalSwipe) {
        if (dx < 0) await setCurrentIndex(index + 1);
        else await setCurrentIndex(index - 1);
      }
    }
  }

  async function changeBackgroundImageFit(nextFit) {
    setBackgroundImageFit(nextFit);
    await AsyncStorage.setItem(STORAGE.backgroundImageFit, nextFit);
  }

  function acceptImageEdit() {
    setImageEditorOpen(false);
  }

  async function toggleBackgroundRounded() {
    const next = !backgroundRounded;
    setBackgroundRounded(next);
    await AsyncStorage.setItem(STORAGE.backgroundRounded, next ? 'on' : 'off');
  }

  async function selectSearchResult(item) {
    const itemIndex = filteredProverbs.findIndex((proverb) => proverb.id === item.id);
    if (itemIndex >= 0) {
      await setCurrentIndex(itemIndex);
    } else {
      setSelectedCategories([]);
      await persistSelectedCategories([]);
      const globalIndex = proverbs.findIndex((proverb) => proverb.id === item.id);
      setIndex(globalIndex);
      await AsyncStorage.setItem(STORAGE.index, String(globalIndex));
    }
    setSearchOpen(false);
    setSearchQuery('');
  }

  async function clearBackgroundImage() {
    setBackgroundImageUri(null);
    setImageEditorOpen(false);
    setShareBackgroundMode('color');
    setBackgroundImageFit('cover');
    setBackgroundImagePosition({ x: 0, y: 0 });
    setBackgroundImageScale(1);
    setBackgroundRounded(false);
    await AsyncStorage.multiRemove([STORAGE.backgroundImage, STORAGE.backgroundImageFit, STORAGE.backgroundImagePosition, STORAGE.backgroundImageScale, STORAGE.backgroundRounded]);
    await AsyncStorage.setItem(STORAGE.shareBackgroundMode, 'color');
  }

  async function changeShareBackgroundMode(nextMode) {
    if (nextMode === 'image' && !backgroundImageUri) {
      await chooseBackgroundImage();
      return;
    }
    setShareBackgroundMode(nextMode);
    await AsyncStorage.setItem(STORAGE.shareBackgroundMode, nextMode);
  }

  async function changeShareBackgroundColor(nextColor) {
    setShareBackgroundMode('color');
    setShareBackgroundColor(nextColor);
    await AsyncStorage.multiSet([
      [STORAGE.shareBackgroundMode, 'color'],
      [STORAGE.shareBackgroundColor, nextColor]
    ]);
  }

  async function changeShareFont(nextFont) {
    setShareFont(nextFont);
    await AsyncStorage.setItem(STORAGE.shareFont, nextFont);
  }

  async function toggleShareUppercase() {
    const next = !shareUppercase;
    setShareUppercase(next);
    await AsyncStorage.setItem(STORAGE.shareUppercase, next ? 'on' : 'off');
  }

  async function createCurrentShareImage() {
    if (Platform.OS === 'web') {
      return createShareImageFile({
        text: displaySaying,
        backgroundImageUri,
        imageFit: backgroundImageFit,
        imagePosition: backgroundImagePosition,
        imageScale: backgroundImageScale,
        backgroundMode: shareBackgroundMode,
        backgroundColor: shareBackgroundColor,
        fontFamily: selectedShareFont.family || 'Arial, Helvetica, sans-serif',
        fontStyle: selectedShareFont.fontStyle || 'normal',
        logoUri
      });
    }

    if (!shareCardRef.current) return null;
    return captureRef(shareCardRef, {
      format: 'png',
      quality: 1,
      result: 'tmpfile'
    });
  }

  async function shareProverb() {
    try {
      setShareOpen(false);
      const image = await createCurrentShareImage();
      if (Platform.OS === 'web') {
        const webNavigator = typeof navigator !== 'undefined' ? navigator : null;
        const webSharePayload = image ? { title: displaySaying, text: shareText, files: [image] } : null;
        if (webNavigator?.share && webSharePayload && (!webNavigator.canShare || webNavigator.canShare(webSharePayload))) {
          await webNavigator.share(webSharePayload);
          return;
        }
        if (image) await downloadShareImage(image);
        await Share.share({ title: displaySaying, message: shareText });
        return;
      }

      if (image && await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(image, {
          mimeType: 'image/png',
          dialogTitle: `Share ${BRAND_NAME}`,
          UTI: 'public.png'
        });
        return;
      }

      await Share.share({ title: displaySaying, message: shareText });
    } catch {
      Alert.alert('Share unavailable', 'Sharing is not available on this device right now.');
    }
  }

  async function saveShareImage() {
    try {
      setShareOpen(false);
      const image = await createCurrentShareImage();
      if (!image) throw new Error('No image created');

      if (Platform.OS === 'web') {
        await downloadShareImage(image);
        return;
      }

      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Photo access needed', 'Allow photo access to save the saying as an image.');
        return;
      }
      await MediaLibrary.saveToLibraryAsync(image);
      Alert.alert('Saved', 'The saying image was saved to your photos.');
    } catch {
      Alert.alert('Could not save', 'The image could not be saved right now.');
    }
  }

  async function shareBySms() {
    setShareOpen(false);
    const separator = Platform.OS === 'ios' ? '&' : '?';
    const smsUrl = `sms:${separator}body=${encodeURIComponent(shareText)}`;
    if (await Linking.canOpenURL(smsUrl)) await Linking.openURL(smsUrl);
    else await Share.share({ title: displaySaying, message: shareText });
  }

  async function shareToNetwork(network) {
    if (network === 'sms') {
      await shareBySms();
      return;
    }

    if (Platform.OS !== 'web' || network === 'instagram' || network === 'messenger') {
      await shareProverb();
      return;
    }

    const url = 'https://olsenarkitekter.github.io/sayings/';
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(displaySaying);
    const targets = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}&redirect_uri=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    };

    const target = targets[network];
    if (target && typeof window !== 'undefined') window.open(target, '_blank', 'noopener,noreferrer');
  }

  function openSavedList() {
    setSettingsOpen(true);
    setSavedOpen(true);
    setSearchOpen(false);
    setShareOpen(false);
  }

  async function toggleFavorite() {
    const next = isFavorite
      ? favorites.filter((id) => id !== displayedProverb.id)
      : [...new Set([...favorites, displayedProverb.id])];
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

  function closeEditMode() {
    Keyboard.dismiss();
    setEditOpen(false);
  }

  async function submitNewSaying() {
    const saying = newSaying.trim();
    if (!saying) {
      Alert.alert('Saying required', 'Write the saying first. The other fields are optional.');
      return;
    }

    const subject = encodeURIComponent('Visay new saying suggestion');
    const body = encodeURIComponent(`Saying:\n${saying}\n\nName:\n${newSayingName.trim()}\n\nMeaning in English:\n${newSayingMeaning.trim()}\n\nOrigin story:\n${newSayingOrigin.trim()}`);
    const mailUrl = `mailto:${EDIT_EMAIL}?subject=${subject}&body=${body}`;
    Keyboard.dismiss();
    await Linking.openURL(mailUrl);
    setNewSaying('');
    setNewSayingName('');
    setNewSayingMeaning('');
    setNewSayingOrigin('');
    setAddSayingOpen(false);
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
          <BrandLogo />

          <View style={styles.topRightActions}>
            <Pressable accessibilityLabel="Search sayings" onPress={() => { setSearchOpen((value) => !value); setSettingsOpen(false); }} hitSlop={14} style={styles.iconTap}>
              <ActionIcon name="search" size={23} />
            </Pressable>
            <Pressable accessibilityLabel="Settings" onPress={() => { setSettingsOpen((value) => !value); setSearchOpen(false); }} hitSlop={14} style={styles.iconTap}>
              <ActionIcon name="menu" size={25} />
            </Pressable>
          </View>
        </View>

        {searchOpen && !editOpen && (
          <View style={styles.searchPanel}>
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              placeholder="Search sayings…"
              placeholderTextColor="#777777"
              style={styles.searchInput}
            />
            {normalizedSearchQuery ? (
              <ScrollView style={styles.searchResults} keyboardShouldPersistTaps="handled">
                {searchResults.length ? searchResults.map(({ item, variant }) => (
                  <Pressable key={item.id} onPress={() => selectSearchResult(item)} style={styles.searchResultItem}>
                    <Text style={styles.searchResultSaying}>{variant.saying}</Text>
                    <Text style={styles.searchResultMeaning} numberOfLines={1}>{getProverbVariant(item, 'en').explanation}</Text>
                  </Pressable>
                )) : <Text style={styles.searchEmpty}>No sayings found</Text>}
              </ScrollView>
            ) : null}
          </View>
        )}

        <View style={styles.content}>
          {editOpen && (
            <View style={styles.editPanelTop}>
              <Text style={styles.editTitle}>{ownerMode ? 'Edit saying' : `Suggest edit by email`}</Text>
              <View style={styles.editActions}>
                <Pressable onPress={closeEditMode} style={styles.editSecondaryButton}>
                  <Text style={styles.editSecondaryText}>Cancel</Text>
                </Pressable>
                <Pressable onPress={() => { Keyboard.dismiss(); submitEdit(); }} style={styles.editPrimaryButton}>
                  <Text style={styles.editPrimaryText}>{ownerMode ? 'Save' : 'Send email'}</Text>
                </Pressable>
              </View>
            </View>
          )}

          <View style={styles.cardShell}>
            {!editOpen && (
              <Pressable accessibilityRole="button" accessibilityLabel="Previous saying" onPress={() => setCurrentIndex(index - 1)} style={[styles.sideArrowButton, styles.leftArrowButton]}>
                <Text style={styles.sideArrowText}>‹</Text>
              </Pressable>
            )}
            <View
              collapsable={false}
              style={[styles.shareCard, cardBackgroundStyle]}
              onStartShouldSetResponder={() => !editOpen}
              onMoveShouldSetResponder={() => !editOpen}
              onResponderGrant={editOpen ? undefined : startCardGesture}
              onResponderMove={editOpen ? undefined : moveCardGesture}
              onResponderRelease={editOpen ? undefined : finishCardGesture}
              onResponderTerminate={editOpen ? undefined : finishCardGesture}
            >
              {hasImageBackground ? (
                <ImageBackground
                  source={{ uri: backgroundImageUri }}
                  resizeMode={backgroundImageFit}
                  style={styles.shareCardBackground}
                  imageStyle={[styles.shareCardImage, { transform: [{ translateX: backgroundImagePosition.x }, { translateY: backgroundImagePosition.y }, { scale: backgroundImageScale }] }]}
                >
                  <View style={styles.shareCardOverlay}>
                    {editOpen ? (
                      <TextInput value={editText} onChangeText={setEditText} multiline autoFocus style={[styles.saying, styles.editSayingInput]} placeholder="Write corrected saying…" placeholderTextColor="#777777" />
                    ) : (
                      <Text style={[styles.saying, shareFontStyle]}>{displaySaying}</Text>
                    )}
                  </View>
                </ImageBackground>
              ) : (
                <>
                    {editOpen ? (
                      <TextInput value={editText} onChangeText={setEditText} multiline autoFocus style={[styles.saying, styles.editSayingInput]} placeholder="Write corrected saying…" placeholderTextColor="#777777" />
                    ) : (
                      <Text style={[styles.saying, shareFontStyle]}>{displaySaying}</Text>
                    )}
                </>
              )}
            </View>
            {!editOpen && (
              <View style={styles.cardFooter}>
                <View style={styles.cardMetaRow}>
                  <Text style={styles.cardMetaText}>{currentCategory?.label || 'Ordsprog'}</Text>
                  <Text style={styles.cardMetaDot}>·</Text>
                  <Text style={styles.cardMetaText}>{currentKindLabel}</Text>
                </View>
                <View style={styles.cardControlRow}>
                  {oppositeCopy && (
                    <Pressable accessibilityRole="button" accessibilityLabel="Toggle opposite proverb" onPress={() => setOppositeOpen((value) => !value)} style={[styles.oppositeButton, oppositeOpen && styles.activeOppositeButton]}>
                      <Text style={styles.oppositeButtonText}>Modsigelse</Text>
                    </Pressable>
                  )}
                  <Pressable accessibilityRole="button" accessibilityLabel="Show proverb information" onPress={() => setInfoOpen(true)} style={styles.inlineInfoButton}>
                    <ActionIcon name="info" size={16} />
                  </Pressable>
                  <Pressable accessibilityRole="button" accessibilityLabel={isFavorite ? 'Remove saved proverb' : 'Save proverb'} onPress={toggleFavorite} style={[styles.inlineInfoButton, isFavorite && styles.activeInlineIconButton]}>
                    <ActionIcon name="star" size={16} active={isFavorite} />
                  </Pressable>
                </View>
              </View>
            )}
            {Platform.OS !== 'web' && (
              <View
                ref={shareCardRef}
                collapsable={false}
                style={[styles.exportCard, { backgroundColor: shareBackgroundColor }]}
              >
                {hasImageBackground ? (
                  <ImageBackground
                    source={{ uri: backgroundImageUri }}
                    resizeMode={backgroundImageFit}
                    style={styles.exportCardFill}
                    imageStyle={{ transform: [{ translateX: backgroundImagePosition.x }, { translateY: backgroundImagePosition.y }, { scale: backgroundImageScale }] }}
                  >
                    <View style={[styles.exportOverlay, styles.exportImageOverlay]}>
                      <Text style={[styles.exportSaying, shareFontStyle]}>{displaySaying}</Text>
                      <View style={styles.exportWatermark}><Image source={BRAND_LOGO_SOURCE} style={styles.exportLogo} /><View><Text style={styles.exportBrand}>{BRAND_NAME.toUpperCase()}</Text><Text style={styles.exportTagline}>{BRAND_TAGLINE}</Text></View></View>
                    </View>
                  </ImageBackground>
                ) : (
                  <View style={styles.exportOverlay}>
                    <Text style={[styles.exportSaying, shareFontStyle]}>{displaySaying}</Text>
                    <View style={styles.exportWatermark}><Image source={BRAND_LOGO_SOURCE} style={styles.exportLogo} /><View><Text style={styles.exportBrand}>{BRAND_NAME.toUpperCase()}</Text><Text style={styles.exportTagline}>{BRAND_TAGLINE}</Text></View></View>
                  </View>
                )}
              </View>
            )}
            {!editOpen && (
              <Pressable accessibilityRole="button" accessibilityLabel="Next saying" onPress={() => setCurrentIndex(index + 1)} style={[styles.sideArrowButton, styles.rightArrowButton]}>
                <Text style={styles.sideArrowText}>›</Text>
              </Pressable>
            )}
          </View>

        </View>

        {editOpen ? null : imageEditorOpen ? (
          <View style={styles.imageEditorPanel}>
            <View style={styles.imageEditorHeader}>
              <View>
                <Text style={styles.imageEditorTitle}>Share style</Text>
                <Text style={styles.imageEditorHint}>{hasImageBackground ? 'Drag the image. Pinch/scroll to zoom.' : 'Choose what the shared image will use.'}</Text>
              </View>
              <Pressable accessibilityRole="button" accessibilityLabel="Accept image changes" onPress={acceptImageEdit} style={styles.imageEditCloseButton}>
                <ActionIcon name="check" size={20} />
              </Pressable>
            </View>
            <View style={styles.styleSection}>
              <Text style={styles.styleSectionTitle}>Background</Text>
              <View style={styles.imageEditBar}>
                <Pressable accessibilityRole="button" accessibilityLabel="Use color background" onPress={() => changeShareBackgroundMode('color')} style={[styles.imageEditButton, shareBackgroundMode === 'color' && styles.activeImageEditButton]}>
                  <Text style={styles.imageEditButtonText}>Color</Text>
                </Pressable>
                <Pressable accessibilityRole="button" accessibilityLabel="Use image background" onPress={() => changeShareBackgroundMode('image')} style={[styles.imageEditButton, shareBackgroundMode === 'image' && styles.activeImageEditButton]}>
                  <Text style={styles.imageEditButtonText}>Image</Text>
                </Pressable>
              </View>
              {shareBackgroundMode === 'color' && (
                <View style={styles.colorRow}>
                  {SHARE_COLORS.map((item) => (
                    <Pressable key={item.key} accessibilityRole="button" accessibilityLabel={`Use ${item.label} background`} onPress={() => changeShareBackgroundColor(item.key)} style={[styles.colorSwatchButton, shareBackgroundColor === item.key && styles.activeSwatchButton]}>
                      <View style={[styles.colorSwatch, { backgroundColor: item.key }]} />
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.styleSection}>
              <Text style={styles.styleSectionTitle}>Font</Text>
              <View style={styles.imageEditBar}>
                {SHARE_FONTS.map((item) => (
                  <Pressable key={item.key} accessibilityRole="button" accessibilityLabel={`Use ${item.label} font`} onPress={() => changeShareFont(item.key)} style={[styles.imageEditButton, shareFont === item.key && styles.activeImageEditButton]}>
                    <Text style={[styles.imageEditButtonText, item.family ? { fontFamily: item.family } : null, item.fontStyle ? { fontStyle: item.fontStyle } : null]}>{item.label}</Text>
                  </Pressable>
                ))}
              </View>
              <View style={styles.imageEditBar}>
                <Pressable accessibilityRole="button" accessibilityLabel="Toggle uppercase text" onPress={toggleShareUppercase} style={[styles.imageEditButton, shareUppercase && styles.activeImageEditButton]}>
                  <Text style={styles.imageEditButtonText}>ALL CAPS</Text>
                </Pressable>
              </View>
            </View>
            {hasImageBackground && (
            <View style={styles.imageEditBar}>
              <Pressable accessibilityRole="button" accessibilityLabel="Use full screen image" onPress={() => changeBackgroundImageFit('cover')} style={[styles.imageEditButton, backgroundImageFit === 'cover' && styles.activeImageEditButton]}>
                <Text style={styles.imageEditButtonText}>Full screen</Text>
              </Pressable>
              <Pressable accessibilityRole="button" accessibilityLabel="Show whole image" onPress={() => changeBackgroundImageFit('contain')} style={[styles.imageEditButton, backgroundImageFit === 'contain' && styles.activeImageEditButton]}>
                <Text style={styles.imageEditButtonText}>See whole image</Text>
              </Pressable>
              <Pressable accessibilityRole="button" accessibilityLabel="Remove image" onPress={clearBackgroundImage} style={styles.imageEditButton}>
                <Text style={styles.imageEditButtonText}>Remove image</Text>
              </Pressable>
            </View>
            )}
          </View>
        ) : (
          <View style={styles.actionBar}>
            <Pressable accessibilityRole="button" accessibilityLabel="Edit proverb" onPress={() => { setOppositeOpen(false); setEditOpen(true); }} style={styles.bottomIconButton}>
              <ActionIcon name="edit-3" />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Choose share style"
              onPress={() => setImageEditorOpen(true)}
              style={[styles.bottomIconButton, backgroundImageUri && styles.activeIconButton]}
            >
              <ActionIcon name="sliders" />
            </Pressable>
            <Pressable accessibilityLabel="Show saved proverbs" onPress={openSavedList} style={styles.bottomIconButton}>
              <ActionIcon name="list" />
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Send proverb" onPress={() => setShareOpen((value) => !value)} style={styles.bottomIconButton}>
              <ActionIcon name="send" />
            </Pressable>
          </View>
        )}

        {shareOpen && !editOpen && (
          <View style={styles.shareMenu}>
            <Pressable onPress={shareProverb} style={styles.shareMenuPrimaryItem}><Text style={styles.shareMenuPrimaryText}>Send image</Text></Pressable>
            <Pressable onPress={saveShareImage} style={styles.shareMenuItem}><Text style={styles.shareMenuText}>Save image to Photos</Text></Pressable>
            <Pressable onPress={() => shareToNetwork('sms')} style={styles.shareMenuItem}><Text style={styles.shareMenuText}>SMS / Messages</Text></Pressable>
            <Pressable onPress={() => shareToNetwork('messenger')} style={styles.shareMenuItem}><Text style={styles.shareMenuText}>Messenger</Text></Pressable>
            <Pressable onPress={() => shareToNetwork('instagram')} style={styles.shareMenuItem}><Text style={styles.shareMenuText}>Instagram</Text></Pressable>
            <Pressable onPress={() => shareToNetwork('facebook')} style={styles.shareMenuItem}><Text style={styles.shareMenuText}>Facebook</Text></Pressable>
            <Pressable onPress={() => shareToNetwork('linkedin')} style={styles.shareMenuItem}><Text style={styles.shareMenuText}>LinkedIn</Text></Pressable>
          </View>
        )}

        {infoOpen && (
          <View style={styles.infoOverlay}>
            <View style={styles.infoPanel}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoTitle}>{copy.saying}</Text>
                <Pressable onPress={() => setInfoOpen(false)} hitSlop={12}>
                  <ActionIcon name="x" size={24} />
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
                  <ActionIcon name="x" size={24} />
                </Pressable>
              </View>

              <View style={styles.categoryBlock}>
                <Text style={styles.settingTitle}>Language</Text>
                <Pressable accessibilityRole="button" accessibilityLabel="Choose language" onPress={() => setLanguageOpen((value) => !value)} style={styles.settingMenuButton}>
                  <View style={styles.settingMenuTextBlock}>
                    <Text style={styles.settingMenuTitle}>App language</Text>
                    <Text style={styles.settingMenuSubtitle}>{selectedLanguageLabel}</Text>
                  </View>
                  <View style={styles.toggleIconBox}><ActionIcon name={languageOpen ? 'chevron-up' : 'chevron-down'} size={18} /></View>
                </Pressable>

                {languageOpen && (
                  <View style={styles.categoryOptions}>
                    {languages.map((item) => (
                      <Pressable key={item.key} onPress={() => { changeLanguage(item.key); setLanguageOpen(false); }} style={styles.categoryOption}>
                        <Text style={[styles.categoryOptionText, language === item.key && styles.activeText]}>{language === item.key ? '✓ ' : ''}{item.label} · {item.name}</Text>
                      </Pressable>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.categoryBlock}>
                <Text style={styles.settingTitle}>Library</Text>
                <View style={styles.settingsStack}>
                  <Pressable accessibilityLabel="Show saved proverbs" onPress={() => setSavedOpen((value) => !value)} style={styles.settingMenuButton}>
                    <View style={styles.settingMenuTextBlock}>
                      <Text style={styles.settingMenuTitle}>Saved proverbs</Text>
                      <Text style={styles.settingMenuSubtitle}>{savedProverbs.length} saved</Text>
                    </View>
                    <View style={styles.toggleIconBox}><ActionIcon name={savedOpen ? 'chevron-up' : 'chevron-down'} size={18} /></View>
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

                <Pressable accessibilityRole="button" accessibilityLabel="Add a saying" onPress={() => setAddSayingOpen((value) => !value)} style={styles.settingMenuButton}>
                  <View style={styles.settingMenuTextBlock}>
                    <Text style={styles.settingMenuTitle}>Add a saying</Text>
                    <Text style={styles.settingMenuSubtitle}>Suggest one by email</Text>
                  </View>
                  <View style={styles.toggleIconBox}><ActionIcon name={addSayingOpen ? 'chevron-up' : 'chevron-down'} size={18} /></View>
                </Pressable>

                {addSayingOpen && (
                  <View style={styles.addSayingPanel}>
                    <TextInput
                      value={newSaying}
                      onChangeText={setNewSaying}
                      placeholder="Saying *"
                      placeholderTextColor="#777777"
                      multiline
                      style={[styles.addSayingInput, styles.addSayingRequiredInput]}
                    />
                    <TextInput
                      value={newSayingName}
                      onChangeText={setNewSayingName}
                      placeholder="Your name (optional)"
                      placeholderTextColor="#777777"
                      style={styles.addSayingInput}
                    />
                    <TextInput
                      value={newSayingMeaning}
                      onChangeText={setNewSayingMeaning}
                      placeholder="Meaning in English (optional)"
                      placeholderTextColor="#777777"
                      multiline
                      style={styles.addSayingInput}
                    />
                    <TextInput
                      value={newSayingOrigin}
                      onChangeText={setNewSayingOrigin}
                      placeholder="Origin story (optional)"
                      placeholderTextColor="#777777"
                      multiline
                      style={styles.addSayingInput}
                    />
                    <Pressable onPress={submitNewSaying} style={styles.addSayingSubmitButton}>
                      <Text style={styles.addSayingSubmitText}>Send saying</Text>
                    </Pressable>
                  </View>
                )}
                </View>
              </View>

              <View style={styles.categoryBlock}>
                <Text style={styles.settingTitle}>Category</Text>
                <Pressable accessibilityRole="button" accessibilityLabel="Choose category" onPress={() => setCategoryOpen((value) => !value)} style={styles.settingMenuButton}>
                  <View style={styles.settingMenuTextBlock}>
                    <Text style={styles.settingMenuTitle}>Shown categories</Text>
                    <Text style={styles.settingMenuSubtitle}>{selectedCategoryLabel}</Text>
                  </View>
                  <View style={styles.toggleIconBox}><ActionIcon name={categoryOpen ? 'chevron-up' : 'chevron-down'} size={18} /></View>
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
  container: { flex: 1, width: '100%', maxWidth: 430, alignSelf: 'center', paddingHorizontal: 22, paddingTop: 18, paddingBottom: 26, position: 'relative' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' },
  loading: { fontSize: 18, color: '#ffffff' },
  adArea: { minHeight: 42, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  topActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 18 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9, flexShrink: 1, minWidth: 0 },
  logoImage: { width: 52, height: 52, resizeMode: 'contain' },
  brandCopy: { minWidth: 0, flexShrink: 1 },
  brandText: { color: '#ffffff', fontSize: 20, lineHeight: 22, fontWeight: '900', letterSpacing: 0 },
  brandTagline: { color: '#8f8f8f', fontSize: 10, lineHeight: 13, fontWeight: '800', marginTop: 1 },
  symbolIcon: { fontWeight: '900', textAlign: 'center', includeFontPadding: false },
  topRightActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  adText: { color: '#555555', letterSpacing: 3, fontSize: 11, textAlign: 'center' },
  activeText: { color: '#ffffff' },
  iconTap: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  headerIcon: { color: '#ffffff', fontSize: 34, lineHeight: 38, fontWeight: '300' },
  closeIcon: { color: '#ffffff', fontSize: 34, lineHeight: 36, fontWeight: '300' },
  searchPanel: { marginTop: -8, marginBottom: 12, borderWidth: 1, borderColor: '#242424', borderRadius: 18, backgroundColor: '#050505', padding: 10, zIndex: 14 },
  searchInput: { minHeight: 44, borderRadius: 14, backgroundColor: '#101010', color: '#ffffff', fontSize: 17, fontWeight: '800', paddingHorizontal: 14 },
  searchResults: { maxHeight: 250, marginTop: 8 },
  searchResultItem: { minHeight: 58, justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#171717', paddingVertical: 8, paddingHorizontal: 6 },
  searchResultSaying: { color: '#ffffff', fontSize: 16, lineHeight: 21, fontWeight: '900' },
  searchResultMeaning: { color: '#8f8f8f', fontSize: 13, lineHeight: 18, marginTop: 2 },
  searchEmpty: { color: '#8f8f8f', fontSize: 14, fontWeight: '800', textAlign: 'center', paddingVertical: 18 },
  content: { flex: 1, justifyContent: 'center', paddingBottom: 20 },
  cardShell: { position: 'relative', justifyContent: 'center' },
  sideArrowButton: { position: 'absolute', bottom: -28, zIndex: 8, width: 34, height: 52, alignItems: 'center', justifyContent: 'center' },
  leftArrowButton: { left: -10 },
  rightArrowButton: { right: -10 },
  sideArrowText: { color: '#ffffff', fontSize: 34, lineHeight: 36, fontWeight: '200', opacity: 0.72 },
  shareCard: { backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center', minHeight: 390, overflow: 'hidden' },
  shareCardBackground: { width: '100%', minHeight: 390, alignItems: 'center', justifyContent: 'center' },
  shareCardImage: {},
  shareCardOverlay: { width: '100%', minHeight: 390, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 28, backgroundColor: 'rgba(0, 0, 0, 0.42)' },
  cardFooter: { marginTop: 12, alignItems: 'flex-start', gap: 10, paddingHorizontal: 4 },
  cardMetaRow: { maxWidth: '100%', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start', gap: 5 },
  cardMetaText: { color: '#8f8f8f', fontSize: 10, lineHeight: 13, fontWeight: '900', textAlign: 'left', textTransform: 'uppercase' },
  cardMetaDot: { color: '#777777', fontSize: 13, lineHeight: 16, fontWeight: '900' },
  saying: { fontSize: 42, lineHeight: 48, fontWeight: '900', textAlign: 'center', color: '#ffffff', textShadowColor: 'rgba(0, 0, 0, 0.7)', textShadowOffset: { width: 0, height: 3 }, textShadowRadius: 10 },
  originLine: { marginTop: 22, color: '#8f8f8f', fontSize: 13, lineHeight: 18, textAlign: 'center', fontWeight: '700', paddingHorizontal: 8 },
  cardReadMoreButton: { alignSelf: 'center', marginTop: 8 },
  cardControlRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 8 },
  oppositeButton: { minHeight: 36, borderRadius: 18, borderWidth: 1, borderColor: '#555555', justifyContent: 'center', paddingHorizontal: 15, backgroundColor: '#080808' },
  activeOppositeButton: { borderColor: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.12)' },
  oppositeButtonText: { color: '#ffffff', fontSize: 12, lineHeight: 16, fontWeight: '900', textAlign: 'center' },
  inlineInfoButton: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: '#555555', alignItems: 'center', justifyContent: 'center', backgroundColor: '#080808' },
  activeInlineIconButton: { borderColor: '#ffd166', backgroundColor: '#17120a' },
  inlineInfoText: { color: '#ffffff', fontSize: 15, lineHeight: 18, fontWeight: '900', fontStyle: 'italic' },
  exportCard: { position: 'absolute', left: -1200, top: 0, width: 1080, height: 1080, overflow: 'hidden' },
  exportCardFill: { width: '100%', height: '100%' },
  exportOverlay: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 86, paddingVertical: 90 },
  exportImageOverlay: { backgroundColor: 'rgba(0, 0, 0, 0.42)' },
  exportSaying: { color: '#ffffff', fontSize: 76, lineHeight: 92, fontWeight: '900', textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.65)', textShadowOffset: { width: 0, height: 6 }, textShadowRadius: 18 },
  exportWatermark: { position: 'absolute', left: 58, bottom: 58, flexDirection: 'row', alignItems: 'center', gap: 12, opacity: 0.82 },
  exportLogo: { width: 58, height: 58, resizeMode: 'contain' },
  exportBrand: { color: '#ffffff', fontSize: 28, lineHeight: 34, fontWeight: '900' },
  exportTagline: { color: '#ffffff', fontSize: 14, lineHeight: 17, fontWeight: '700', opacity: 0.82 },
  activeIconButton: { borderColor: '#ffffff' },
  infoOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 20, backgroundColor: 'rgba(0, 0, 0, 0.82)', paddingHorizontal: 18, paddingTop: 92, paddingBottom: 116, justifyContent: 'center' },
  infoPanel: { maxHeight: '78%', borderWidth: 1, borderColor: '#242424', borderRadius: 24, backgroundColor: '#050505', padding: 18 },
  infoHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, marginBottom: 10 },
  infoTitle: { flex: 1, color: '#ffffff', fontSize: 20, lineHeight: 26, fontWeight: '900' },
  infoClose: { color: '#ffffff', fontSize: 34, lineHeight: 36, fontWeight: '300' },
  infoScrollContent: { paddingBottom: 12 },
  explanation: { fontSize: 18, lineHeight: 28, textAlign: 'left', color: '#d9d9d9' },
  readMoreText: { color: '#ffffff', fontSize: 13, lineHeight: 18, fontWeight: '900', textAlign: 'center' },
  editPanelTop: { marginBottom: 12, borderWidth: 1, borderColor: '#242424', borderRadius: 18, padding: 12, backgroundColor: '#080808', zIndex: 12 },
  editPanel: { marginTop: 18, borderWidth: 1, borderColor: '#242424', borderRadius: 18, padding: 14, backgroundColor: '#080808' },
  editTitle: { color: '#ffffff', fontSize: 15, fontWeight: '900', marginBottom: 10, textAlign: 'center' },
  editSayingInput: { width: '100%', minHeight: 300, maxHeight: 340, paddingHorizontal: 14, paddingVertical: 14, textAlign: 'left', textAlignVertical: 'top', fontSize: 24, lineHeight: 32, fontWeight: '800', borderWidth: 1.5, borderColor: '#ffffff', borderRadius: 16, backgroundColor: 'rgba(0, 0, 0, 0.42)' },
  editActions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 12 },
  editSecondaryButton: { height: 36, minWidth: 88, borderRadius: 18, borderWidth: 1, borderColor: '#555555', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
  editSecondaryText: { color: '#d9d9d9', fontSize: 14, fontWeight: '900' },
  editPrimaryButton: { height: 36, minWidth: 88, borderRadius: 18, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
  editPrimaryText: { color: '#000000', fontSize: 14, fontWeight: '900' },
  actionBar: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, width: '100%' },
  bottomIconButton: { width: 48, height: 48, borderRadius: 24, borderWidth: 1.5, borderColor: '#777777', alignItems: 'center', justifyContent: 'center' },
  shareMenu: { position: 'absolute', left: 22, right: 22, bottom: 92, zIndex: 25, borderWidth: 1, borderColor: '#242424', borderRadius: 18, backgroundColor: '#050505', padding: 8, gap: 4 },
  shareMenuPrimaryItem: { minHeight: 46, borderRadius: 13, justifyContent: 'center', paddingHorizontal: 12, backgroundColor: '#ffffff' },
  shareMenuPrimaryText: { color: '#000000', fontSize: 15, fontWeight: '900', textAlign: 'center' },
  shareMenuItem: { minHeight: 42, borderRadius: 12, justifyContent: 'center', paddingHorizontal: 12 },
  shareMenuText: { color: '#ffffff', fontSize: 15, fontWeight: '800', textAlign: 'center' },
  imageEditorPanel: { marginBottom: 8, borderWidth: 1, borderColor: '#242424', borderRadius: 22, padding: 10, backgroundColor: '#050505', gap: 10 },
  imageEditorHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  imageEditorTitle: { color: '#ffffff', fontSize: 14, fontWeight: '900' },
  imageEditorHint: { color: '#8f8f8f', fontSize: 11, lineHeight: 15, marginTop: 2 },
  imageEditBar: { minHeight: 44, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  styleSection: { gap: 8 },
  styleSectionTitle: { color: '#bdbdbd', fontSize: 11, lineHeight: 14, fontWeight: '900', textTransform: 'uppercase' },
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 10 },
  colorSwatchButton: { width: 42, height: 42, borderRadius: 21, borderWidth: 1.5, borderColor: '#555555', alignItems: 'center', justifyContent: 'center' },
  activeSwatchButton: { borderColor: '#ffffff' },
  colorSwatch: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: '#777777' },
  imageEditButton: { minHeight: 42, minWidth: 92, flexGrow: 1, borderRadius: 21, borderWidth: 1.5, borderColor: '#555555', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  activeImageEditButton: { borderColor: '#ffffff', backgroundColor: '#101010' },
  imageEditButtonText: { color: '#ffffff', fontSize: 11, lineHeight: 14, fontWeight: '900', textAlign: 'center' },
  imageEditCloseButton: { width: 42, height: 42, borderRadius: 21, borderWidth: 1.5, borderColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },
  imageEditCloseText: { color: '#ffffff', fontSize: 28, lineHeight: 30, fontWeight: '300' },
  settingsPanel: { position: 'absolute', top: 66, left: 0, right: 0, bottom: 0, zIndex: 10, backgroundColor: '#000000', paddingHorizontal: 22, paddingTop: 18, borderTopWidth: 1, borderTopColor: '#222222' },
  settingsContent: { paddingBottom: 42 },
  settingsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  sectionTitle: { color: '#ffffff', fontSize: 18, fontWeight: '900', marginBottom: 12 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingTop: 2 },
  settingTitle: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  categoryBlock: { marginBottom: 26 },
  settingsStack: { gap: 10, marginTop: 10 },
  categorySelect: { marginTop: 10, minHeight: 48, borderWidth: 1, borderColor: '#242424', borderRadius: 14, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stackSelect: { marginTop: 0 },
  categorySelectText: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  settingMenuButton: { minHeight: 58, borderWidth: 1, borderColor: '#242424', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#080808', marginTop: 10 },
  settingMenuTextBlock: { flex: 1, paddingRight: 12 },
  settingMenuTitle: { color: '#ffffff', fontSize: 16, lineHeight: 20, fontWeight: '900' },
  settingMenuSubtitle: { color: '#8f8f8f', fontSize: 13, lineHeight: 18, fontWeight: '700', marginTop: 2 },
  toggleIconBox: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  categorySelectArrow: { color: '#ffffff', fontSize: 26, lineHeight: 30, fontWeight: '300', textAlign: 'center' },
  categoryOptions: { marginTop: 10, borderWidth: 1, borderColor: '#242424', borderRadius: 14, paddingVertical: 6 },
  addSayingPanel: { marginTop: 10, borderWidth: 1, borderColor: '#242424', borderRadius: 14, padding: 10, gap: 10, backgroundColor: '#050505' },
  addSayingInput: { minHeight: 44, borderRadius: 12, borderWidth: 1, borderColor: '#242424', color: '#ffffff', fontSize: 15, lineHeight: 20, fontWeight: '700', paddingHorizontal: 12, paddingVertical: 10, textAlignVertical: 'top' },
  addSayingRequiredInput: { borderColor: '#555555' },
  addSayingSubmitButton: { minHeight: 42, borderRadius: 21, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14 },
  addSayingSubmitText: { color: '#000000', fontSize: 14, fontWeight: '900' },
  categoryOption: { minHeight: 42, justifyContent: 'center', paddingHorizontal: 16 },
  categoryOptionText: { color: '#777777', fontSize: 16, fontWeight: '800' },
  muted: { color: '#8f8f8f', fontSize: 14, lineHeight: 20 },
  timeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, marginBottom: 24 },
  timeButton: { paddingVertical: 4, paddingRight: 4 },
  timeText: { color: '#777777', fontSize: 16, fontWeight: '800' },
  savedList: { borderWidth: 1, borderColor: '#242424', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, gap: 12, backgroundColor: '#050505' },
  savedItem: { paddingVertical: 8 },
  savedSaying: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  savedExplanation: { color: '#a6a6a6', fontSize: 14, marginTop: 3, lineHeight: 20 }
});
