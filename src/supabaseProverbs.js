import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProverbVariant, languages, proverbs as localProverbs } from './proverbs';

const SUPABASE_URL = 'https://piccvnrbwqlxnhkgfklc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpY2N2bnJid3FseG5oa2dma2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0OTY0MjAsImV4cCI6MjA3OTA3MjQyMH0.YyD5VeiIQd0Apz8WQCsAuqWPog_NtBB6Sw0uuaFPb34';
const PROVERBS_CACHE_KEY = 'daily-sayings:supabaseProverbs';

function normalizeText(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function rowKey(row) {
  return `${row.language || 'da'}:${normalizeText(row.quote)}`;
}

function makeHeaders() {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
}

function mergeRowsWithLocalProverbs(rows, baseProverbs = localProverbs) {
  const byLanguageAndQuote = new Map();
  rows.forEach((row) => {
    if (row?.quote) byLanguageAndQuote.set(rowKey(row), row);
  });

  const usedRowIds = new Set();
  const merged = baseProverbs.map((proverb) => {
    const variants = { ...(proverb.variants || {}) };
    const remoteIdsByLanguage = { ...(proverb.remoteIdsByLanguage || {}) };
    const favoriteCountsByLanguage = { ...(proverb.favoriteCountsByLanguage || {}) };
    const imageUrlsByLanguage = { ...(proverb.imageUrlsByLanguage || {}) };

    languages.forEach(({ key: language }) => {
      const variant = getProverbVariant(proverb, language);
      const row = byLanguageAndQuote.get(`${language}:${normalizeText(variant.saying)}`);
      if (!row) return;

      usedRowIds.add(row.id);
      variants[language] = {
        ...variant,
        saying: row.quote,
        imageUrl: row.image_url || variant.imageUrl || null,
        remoteId: row.id,
        favoriteCount: row.favorite_count || 0
      };
      remoteIdsByLanguage[language] = row.id;
      favoriteCountsByLanguage[language] = row.favorite_count || 0;
      if (row.image_url) imageUrlsByLanguage[language] = row.image_url;
    });

    return {
      ...proverb,
      variants,
      remoteIdsByLanguage,
      favoriteCountsByLanguage,
      imageUrlsByLanguage,
      favorite_count: favoriteCountsByLanguage.en ?? favoriteCountsByLanguage.dk ?? proverb.favorite_count ?? 0
    };
  });

  const localQuoteKeys = new Set();
  baseProverbs.forEach((proverb) => {
    languages.forEach(({ key: language }) => {
      localQuoteKeys.add(`${language}:${normalizeText(getProverbVariant(proverb, language).saying)}`);
    });
  });

  const newRows = rows
    .filter((row) => row?.id && row?.quote && !usedRowIds.has(row.id) && !localQuoteKeys.has(rowKey(row)))
    .map((row) => ({
      id: row.id,
      category: row.category || 'life',
      kind: row.image_url ? 'image' : 'dilemma',
      oppositeId: null,
      remoteIdsByLanguage: { [row.language || 'da']: row.id },
      favoriteCountsByLanguage: { [row.language || 'da']: row.favorite_count || 0 },
      imageUrlsByLanguage: row.image_url ? { [row.language || 'da']: row.image_url } : {},
      favorite_count: row.favorite_count || 0,
      variants: {
        [row.language || 'da']: {
          saying: row.quote,
          explanation: '',
          origin: '',
          imageUrl: row.image_url || null,
          remoteId: row.id,
          favoriteCount: row.favorite_count || 0
        },
        en: {
          saying: row.quote,
          explanation: '',
          origin: '',
          imageUrl: row.image_url || null,
          remoteId: row.id,
          favoriteCount: row.favorite_count || 0
        }
      }
    }));

  return [...merged, ...newRows];
}

export async function loadCachedSupabaseProverbs(baseProverbs = localProverbs) {
  const cached = await AsyncStorage.getItem(PROVERBS_CACHE_KEY);
  if (!cached) return baseProverbs;
  try {
    const rows = JSON.parse(cached);
    return Array.isArray(rows) ? mergeRowsWithLocalProverbs(rows, baseProverbs) : baseProverbs;
  } catch {
    return baseProverbs;
  }
}

export async function fetchSupabaseProverbs(baseProverbs = localProverbs) {
  const url = `${SUPABASE_URL}/rest/v1/proverbs?select=*&order=created_at.desc`;
  const response = await fetch(url, { headers: makeHeaders() });
  if (!response.ok) {
    throw new Error(`Supabase proverbs failed: ${response.status}`);
  }
  const rows = await response.json();
  await AsyncStorage.setItem(PROVERBS_CACHE_KEY, JSON.stringify(rows));
  return mergeRowsWithLocalProverbs(rows, baseProverbs);
}

export async function adjustSupabaseFavoriteCount(proverbId, amount) {
  if (!proverbId || ![-1, 1].includes(amount)) return null;
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/adjust_proverb_favorite_count`, {
    method: 'POST',
    headers: makeHeaders(),
    body: JSON.stringify({ proverb_id: proverbId, amount })
  });

  if (!response.ok) {
    throw new Error(`Supabase favorite failed: ${response.status}`);
  }

  return response.json();
}
