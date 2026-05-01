import { readFileSync } from 'node:fs';

const source = readFileSync('src/proverbs.js', 'utf8');
const match = source.match(/export const proverbs = (\[[\s\S]*?\n\]);/);
if (!match) throw new Error('Could not find proverbs export');
const proverbs = Function(`return ${match[1]}`)();
const languages = ['en', 'dk', 'fo'];
const ids = new Set();

if (proverbs.length < 60) throw new Error(`Expected at least 60 proverbs, got ${proverbs.length}`);

for (const item of proverbs) {
  if (!item.id) throw new Error('Missing id');
  if (ids.has(item.id)) throw new Error(`Duplicate id: ${item.id}`);
  ids.add(item.id);
  for (const lang of languages) {
    if (!item[lang]?.saying || !item[lang]?.explanation) {
      throw new Error(`Missing ${lang} text for ${item.id}`);
    }
  }
}

console.log(`OK: ${proverbs.length} proverbs with EN/DK/FO text.`);
