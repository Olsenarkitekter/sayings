import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProverbVariant, languages, proverbs as localProverbs } from './proverbs';

const SUPABASE_URL = 'https://tgndxvfmkolmibtoeuti.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_gkpLsDT2NuNziAV8WWGgJw_GgMOjLeH';
const PROVERBS_CACHE_KEY = 'daily-sayings:supabaseProverbs:v3';

const languageColumns = {
  en: 'en',
  dk: 'da',
  de: 'de',
  es: 'es',
  no: 'no',
  la: 'la',
  it: 'it',
  fr: 'fr',
  fo: 'fo'
};

function makeHeaders() {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
}

function rowQuote(row, language) {
  return row?.[`quote_${languageColumns[language] || language}`] || '';
}

function rowDescription(row, language) {
  return row?.[`description_${languageColumns[language] || language}`] || '';
}

function rowToVariants(row, fallbackProverb = null) {
  return Object.fromEntries(languages.map(({ key: language }) => {
    const fallback = fallbackProverb ? getProverbVariant(fallbackProverb, language) : null;
    const englishFallback = fallbackProverb ? getProverbVariant(fallbackProverb, 'en') : null;
    const saying = rowQuote(row, language) || fallback?.saying || rowQuote(row, 'en') || '';
    const explanation = rowDescription(row, language) || fallback?.explanation || rowDescription(row, 'en') || '';
    const origin = fallback?.origin || englishFallback?.origin || '';
    return [language, {
      ...(fallback || {}),
      saying,
      explanation,
      origin,
      imageUrl: row.image_url || fallback?.imageUrl || null,
      remoteId: row.id,
      favoriteCount: row.favorite_count || 0
    }];
  }));
}

function mergeRowsWithLocalProverbs(rows, baseProverbs = localProverbs) {
  const rowsById = new Map();
  rows.forEach((row) => {
    if (row?.id) rowsById.set(row.id, row);
  });

  const usedRowIds = new Set();
  const merged = baseProverbs.map((proverb) => {
    const row = rowsById.get(proverb.id);
    if (!row) return proverb;

    usedRowIds.add(row.id);
    const variants = rowToVariants(row, proverb);
    const favoriteCountsByLanguage = Object.fromEntries(languages.map(({ key }) => [key, row.favorite_count || 0]));
    const remoteIdsByLanguage = Object.fromEntries(languages.map(({ key }) => [key, row.id]));
    const imageUrlsByLanguage = row.image_url
      ? Object.fromEntries(languages.map(({ key }) => [key, row.image_url]))
      : {};

    return {
      ...proverb,
      category: row.category || proverb.category,
      variants,
      remoteIdsByLanguage,
      favoriteCountsByLanguage,
      imageUrlsByLanguage,
      favorite_count: row.favorite_count || 0
    };
  });

  const newRows = rows
    .filter((row) => row?.id && !usedRowIds.has(row.id))
    .map((row) => ({
      id: row.id,
      category: row.category || 'life',
      kind: row.image_url ? 'image' : 'dilemma',
      oppositeId: null,
      remoteIdsByLanguage: Object.fromEntries(languages.map(({ key }) => [key, row.id])),
      favoriteCountsByLanguage: Object.fromEntries(languages.map(({ key }) => [key, row.favorite_count || 0])),
      imageUrlsByLanguage: row.image_url
        ? Object.fromEntries(languages.map(({ key }) => [key, row.image_url]))
        : {},
      favorite_count: row.favorite_count || 0,
      variants: rowToVariants(row)
    }));

  return [...newRows, ...merged];
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
