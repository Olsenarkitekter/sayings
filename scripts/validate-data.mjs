import { readFileSync } from 'node:fs';

const source = readFileSync('src/proverbs.js', 'utf8');
const rawMatch = source.match(/const rawProverbs = (\[[\s\S]*?\n\]);/);
if (!rawMatch) throw new Error('Could not find rawProverbs data');
const rawProverbs = Function(`return ${rawMatch[1]}`)();

const categoriesMatch = source.match(/export const categories = (\[[\s\S]*?\n\]);/);
if (!categoriesMatch) throw new Error('Could not find categories data');
const categories = Function(`return ${categoriesMatch[1]}`)();

const languagesMatch = source.match(/export const languages = (\[[\s\S]*?\n\]);/);
if (!languagesMatch) throw new Error('Could not find languages data');
const languages = Function(`return ${languagesMatch[1]}`)();

const equivalentsMatch = source.match(/const languageEquivalentsById = ({[\s\S]*?\n});/);
if (!equivalentsMatch) throw new Error('Could not find languageEquivalentsById data');
const languageEquivalentsById = Function(`return ${equivalentsMatch[1]}`)();

const overridesMatch = source.match(/const imagePreservingOverridesById = ({[\s\S]*?\n});/);
if (!overridesMatch) throw new Error('Could not find imagePreservingOverridesById data');
const imagePreservingOverridesById = Function(`return ${overridesMatch[1]}`)();

const requiredLanguages = ['en', 'de', 'es', 'no', 'la', 'it', 'fr', 'fo'];
const removedLanguages = ['zh', 'ja', 'hi', 'el', 'ar'];
const languageKeys = languages.map((item) => item.key);
for (const language of requiredLanguages) {
  if (!languageKeys.includes(language)) throw new Error(`Missing language: ${language}`);
}
for (const language of removedLanguages) {
  if (languageKeys.includes(language)) throw new Error(`Removed language still selectable: ${language}`);
}

const categoryKeys = categories.map((item) => item.key);
for (const removed of ['wisdom', 'weather', 'sea']) {
  if (categoryKeys.includes(removed)) throw new Error(`Removed category still present: ${removed}`);
}
for (const category of ['all', 'life', 'love', 'work', 'biblical', 'slang', 'humour']) {
  if (!categoryKeys.includes(category)) throw new Error(`Missing category: ${category}`);
}

if (rawProverbs.length < 40) throw new Error(`Expected at least 40 curated meanings, got ${rawProverbs.length}`);

const weakEnglishSayings = new Set([
  'old habits die hard',
  'after rain comes sunshine',
  'every beginning is hard',
  'do not judge a book by its cover',
  'do not put all your eggs in one basket',
  'there is no smoke without fire',
  'can i pick your brain?',
  'i have a bone to pick with you',
  'put on the spot',
  'spill the beans'
]);

const imagePreservingRequirements = {
  'horses-mouth': {
    requiredImage: /horse|hest|ross|Pferd|caballo|cheval|cavallo|άλογ|αλόγ|حصان|马|馬|घोड़े|equi/i,
    forbiddenMeaningOnly: /kild|source|første hånd|first hand|primera mano|première main|prima mano|πρώτο χέρι|المصدر|स्रोत/i
  },
  'old-habits-die-hard': {
    requiredImage: /dog|hund|perro|chien|cane|σκυλ|كلب|狗|犬|कुत्ते|canem/i,
    forbiddenMeaningOnly: /habit|vane|Gewohn|costumbre|consuetud|習|习|abitud|आदत|συνήθει|عادة/i
  },
  'go-bananas': {
    requiredImage: /banana|bananas|banane|bananen|plátano|μπανάνα|mوز|موز|केले|香蕉/i,
    forbiddenMeaningOnly: /amok|vild|villur|crazy|loco|mad|insan|fuori di testa|plombs|ausflippen/i
  },
  'pick-your-brain': {
    requiredImage: /brain|hjerne|heila|cerebr|cervell|Hirn|cerebro|cerveau/i,
    forbiddenMeaningOnly: /mening|opinion|advice|råd|idé|idea|conseil|advies/i
  },
  'bone-to-pick': {
    requiredImage: /bone|ben|bein|Knochen|hueso|osso|os\b/i,
    forbiddenMeaningOnly: /complaint|klage|problem|issue|uenighed|tale|tosa|controv|compte|cuenta/i
  },
  'under-the-weather': {
    requiredImage: /weather|vejr|veðr|Wetter|tiempo|tempo|været|tempestate|temps/i,
    forbiddenMeaningOnly: /toppen|patraque|höhe|ill|syg|sick|træt|tired/i
  },
  'elephant-room': {
    requiredImage: /elephant|elefant|Elephant|elefante|éléphant/i,
    forbiddenMeaningOnly: /obvious|åbenlys|nobody|ingen|discuss|loquitur|manifesta/i
  },
  'look-before-leap': {
    requiredImage: /look|se|hygg|schau|mira|regarde|aspice|saltar|spring|leyp|hop|salt|saut|sali/i,
    forbiddenMeaningOnly: /think|tænk|handl|agir|penser|denken|respice finem/i
  },
  'many-hands-light-work': {
    requiredImage: /hands|hænder|hendur|Hände|manos|mains|mani|manus|hender/i,
    forbiddenMeaningOnly: /fous|rit|laugh|party|sjov/i
  },
  'bite-the-bullet': {
    requiredImage: /bullet|kugle|kúlu|Kugel|bala|kula|glans|proiettile|balle/i,
    forbiddenMeaningOnly: /tænder|tenn|sauren Apfel|tripas|dura|serrer/i
  },
  'no-brainer': {
    requiredImage: /brain|hjerne|heila|Hirn|cerebro|cervello|cerveau/i,
    forbiddenMeaningOnly: /selvfølge|sjálvsagt|obvious|pens|tænk|tænke|self|sens|manifesta/i
  },
  'push-envelope': {
    requiredImage: /envelope|konvolut|brævbjálv|Umschlag|sobre|busta|enveloppe|involucr/i,
    forbiddenMeaningOnly: /grænse|mørk|limit|gren|fines|repousser/i
  },
  'wet-blanket': {
    requiredImage: /wet|våd|vátt|nass|mojad|vått|madid|bagnat|mouill|blanket|tæppe|teppi|Decke|manta|stragulum|coperta|couverture/i,
    forbiddenMeaningOnly: /lyseslukker|gleðissløkkjari|spoil|fun|rabat|aguafiestas|guastafeste|gledesdreper/i
  }
};

const activeVariantLanguages = new Set([...requiredLanguages.filter((language) => language !== 'en'), 'dk']);

const ids = new Set();
const englishSayings = new Set();
for (const item of rawProverbs) {
  if (!item.id) throw new Error('Missing id');
  if (ids.has(item.id)) throw new Error(`Duplicate id: ${item.id}`);
  ids.add(item.id);
  if (!item.en?.saying || !item.en?.explanation) throw new Error(`Missing English canonical text for ${item.id}`);
  if (!item.fo?.saying || !item.fo?.explanation) throw new Error(`Missing Faroese text for ${item.id}`);
  const normalized = item.en.saying.toLowerCase();
  if (weakEnglishSayings.has(normalized)) throw new Error(`Weak/literal English saying should be replaced or removed: ${item.en.saying}`);
  if (englishSayings.has(normalized)) throw new Error(`Duplicate English saying: ${item.en.saying}`);
  englishSayings.add(normalized);
}

for (const [id, requirement] of Object.entries(imagePreservingRequirements)) {
  const proverb = rawProverbs.find((item) => item.id === id);
  if (!proverb) throw new Error(`Missing image-preserving proverb: ${id}`);
  const variants = { ...languageEquivalentsById[id], ...imagePreservingOverridesById[id], dk: proverb.dk, fo: imagePreservingOverridesById[id]?.fo || proverb.fo };
  for (const [language, variant] of Object.entries(variants)) {
    if (!activeVariantLanguages.has(language)) continue;
    const saying = variant?.saying || '';
    if (!requirement.requiredImage.test(saying)) throw new Error(`Image-preserving saying lost concrete image for ${id}/${language}: ${saying}`);
    if (requirement.forbiddenMeaningOnly.test(saying)) throw new Error(`Image-preserving saying fell back to meaning-only wording for ${id}/${language}: ${saying}`);
  }
}

console.log(`OK: ${rawProverbs.length} meaning-first proverbs, ${languages.length} languages, ${categories.length - 1} selectable categories.`);
