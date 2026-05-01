import { readFileSync } from 'node:fs';

const source = readFileSync('src/proverbs.js', 'utf8');
const match = source.match(/export const proverbs = (\[[\s\S]*?\n\]);/);
if (!match) throw new Error('Could not find proverbs export');
const proverbs = Function(`return ${match[1]}`)();
const languages = ['en', 'dk', 'fo'];
const ids = new Set();

if (proverbs.length < 40) throw new Error(`Expected at least 40 curated proverbs, got ${proverbs.length}`);

const sayingsByLanguage = Object.fromEntries(languages.map((lang) => [lang, new Set()]));

for (const item of proverbs) {
  if (!item.id) throw new Error('Missing id');
  if (ids.has(item.id)) throw new Error(`Duplicate id: ${item.id}`);
  ids.add(item.id);
  for (const lang of languages) {
    if (!item[lang]?.saying || !item[lang]?.explanation) {
      throw new Error(`Missing ${lang} text for ${item.id}`);
    }
    const normalized = item[lang].saying.toLowerCase();
    if (sayingsByLanguage[lang].has(normalized)) {
      throw new Error(`Duplicate ${lang} saying: ${item[lang].saying}`);
    }
    sayingsByLanguage[lang].add(normalized);
  }
}

console.log(`OK: ${proverbs.length} proverbs with EN/DK/FO text.`);
