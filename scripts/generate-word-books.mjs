import fs from 'node:fs/promises';
import path from 'node:path';
import {
  AlignmentType,
  Document,
  Footer,
  HeadingLevel,
  Packer,
  PageBreak,
  PageNumber,
  Paragraph,
  TextRun
} from 'docx';

const SUPABASE_URL = 'https://tgndxvfmkolmibtoeuti.supabase.co';
const SUPABASE_KEY = 'sb_publishable_gkpLsDT2NuNziAV8WWGgJw_GgMOjLeH';
const OUTPUT_DIR = path.resolve('outputs/word-books');
const LOCAL_PROVERBS_PATH = path.resolve('src/proverbs.js');

const CM_TO_TWIPS = 567;
const pageWidth = Math.round(15 * CM_TO_TWIPS);
const pageHeight = Math.round(21 * CM_TO_TWIPS);
const bodyMargin = Math.round(1.75 * CM_TO_TWIPS);
const entryTopSpace = Math.round(1.25 * CM_TO_TWIPS);

const languages = [
  { key: 'en', appKey: 'en', label: 'English', file: 'english', title: 'Visual Sayings' },
  { key: 'da', appKey: 'dk', label: 'Dansk', file: 'dansk', title: 'Visual Sayings' },
  { key: 'de', appKey: 'de', label: 'Deutsch', file: 'deutsch', title: 'Visual Sayings' },
  { key: 'es', appKey: 'es', label: 'Español', file: 'espanol', title: 'Visual Sayings' },
  { key: 'no', appKey: 'no', label: 'Norsk', file: 'norsk', title: 'Visual Sayings' },
  { key: 'la', appKey: 'la', label: 'Latina', file: 'latin', title: 'Visual Sayings' },
  { key: 'it', appKey: 'it', label: 'Italiano', file: 'italiano', title: 'Visual Sayings' },
  { key: 'fr', appKey: 'fr', label: 'Français', file: 'francais', title: 'Visual Sayings' },
  { key: 'fo', appKey: 'fo', label: 'Føroyskt', file: 'foroyskt', title: 'Visual Sayings' }
];

const categoryLabels = {
  time: {
    en: 'Time, Patience and Timing',
    da: 'Tid, tålmodighed og timing',
    de: 'Zeit, Geduld und Timing',
    es: 'Tiempo, paciencia y momento oportuno',
    no: 'Tid, tålmodighet og timing',
    la: 'Tempus, patientia et momentum',
    it: 'Tempo, pazienza e tempismo',
    fr: 'Temps, patience et moment juste',
    fo: 'Tíð, tol og røtt løta'
  },
  'work-results': {
    en: 'Action, Work and Results',
    da: 'Handling, arbejde og resultater',
    de: 'Handlung, Arbeit und Ergebnisse',
    es: 'Acción, trabajo y resultados',
    no: 'Handling, arbeid og resultater',
    la: 'Actio, labor et eventus',
    it: 'Azione, lavoro e risultati',
    fr: 'Action, travail et résultats',
    fo: 'Gerðir, arbeiði og úrslit'
  },
  truth: {
    en: 'Truth, Clarity and Direct Speech',
    da: 'Sandhed, klarhed og direkte tale',
    de: 'Wahrheit, Klarheit und direkte Rede',
    es: 'Verdad, claridad y habla directa',
    no: 'Sannhet, klarhet og direkte tale',
    la: 'Veritas, claritas et oratio directa',
    it: 'Verità, chiarezza e parole dirette',
    fr: 'Vérité, clarté et parole directe',
    fo: 'Sannleiki, greiðleiki og beinleiðis tala'
  },
  relations: {
    en: 'People, Boundaries and Relations',
    da: 'Mennesker, grænser og relationer',
    de: 'Menschen, Grenzen und Beziehungen',
    es: 'Personas, límites y relaciones',
    no: 'Mennesker, grenser og relasjoner',
    la: 'Homines, fines et relationes',
    it: 'Persone, confini e relazioni',
    fr: 'Personnes, limites et relations',
    fo: 'Fólk, mørk og sambond'
  },
  risk: {
    en: 'Courage, Risk and Decisions',
    da: 'Mod, risiko og beslutninger',
    de: 'Mut, Risiko und Entscheidungen',
    es: 'Coraje, riesgo y decisiones',
    no: 'Mot, risiko og beslutninger',
    la: 'Fortitudo, periculum et consilia',
    it: 'Coraggio, rischio e decisioni',
    fr: 'Courage, risque et décisions',
    fo: 'Dirvi, váði og avgerðir'
  },
  'images-humour': {
    en: 'Body, Humour and Sharp Images',
    da: 'Krop, humor og skarpe billeder',
    de: 'Körper, Humor und scharfe Bilder',
    es: 'Cuerpo, humor e imágenes precisas',
    no: 'Kropp, humor og skarpe bilder',
    la: 'Corpus, iocus et imagines acres',
    it: 'Corpo, umorismo e immagini taglienti',
    fr: 'Corps, humour et images fortes',
    fo: 'Kroppur, skemt og hvassar myndir'
  },
  'origin-stories': {
    en: 'The Stories Behind the Words',
    da: 'Historierne bag ordene',
    de: 'Die Geschichten hinter den Worten',
    es: 'Las historias detrás de las palabras',
    no: 'Historiene bak ordene',
    la: 'Fabulae post verba',
    it: 'Le storie dietro le parole',
    fr: 'Les histoires derrière les mots',
    fo: 'Søgurnar handan orðini'
  },
  experience: {
    en: 'Experience, Adversity and Reflection',
    da: 'Erfaring, modgang og eftertanke',
    de: 'Erfahrung, Widerstand und Nachdenken',
    es: 'Experiencia, adversidad y reflexión',
    no: 'Erfaring, motgang og ettertanke',
    la: 'Experientia, adversitas et meditatio',
    it: 'Esperienza, avversità e riflessione',
    fr: 'Expérience, adversité et réflexion',
    fo: 'Royndir, mótburður og umhugsan'
  }
};

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function titleCaseCategory(category) {
  return categoryLabels[category] || text(category).replace(/[-_]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function categoryForLanguage(row, language) {
  const translatedCategory = text(row[`category_${language.key}`]);
  if (translatedCategory) return translatedCategory;
  return categoryLabels[row.category]?.[language.key] || titleCaseCategory(row.category);
}

async function loadLocalProverbData() {
  const source = await fs.readFile(LOCAL_PROVERBS_PATH, 'utf8');
  const transformed = source
    .replace(/export const categories = /, 'const categories = ')
    .replace(/export const languages = /, 'const languages = ')
    .replace(/export const proverbs = /, 'const proverbs = ')
    .replace(/export function getProverbVariant/g, 'function getProverbVariant')
    .replace(/export function getLanguageLabel/g, 'function getLanguageLabel')
    .replace(/export function getLanguageName/g, 'function getLanguageName');
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(`${transformed}\nexport { proverbs };`).toString('base64')}`;
  const { proverbs } = await import(moduleUrl);
  return new Map(proverbs.map((proverb) => [proverb.id, proverb]));
}

function paragraph(children, options = {}) {
  return new Paragraph({
    children,
    spacing: { line: 276, ...options.spacing },
    ...options
  });
}

function run(textValue, options = {}) {
  return new TextRun({
    text: textValue,
    font: 'Helvetica',
    ...options
  });
}

function pageBreak() {
  return paragraph([new PageBreak()]);
}

function footer(alignment) {
  return new Footer({
    children: [
      paragraph([
        run('', { size: 18 }),
        new TextRun({
          children: [PageNumber.CURRENT],
          font: 'Helvetica',
          size: 18
        })
      ], {
        alignment,
        spacing: { before: 0, after: 0 }
      })
    ]
  });
}

async function fetchProverbs() {
  const url = `${SUPABASE_URL}/rest/v1/proverbs?select=*&order=category.asc,created_at.asc`;
  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Could not fetch proverbs from Supabase: ${response.status} ${await response.text()}`);
  }

  const rows = await response.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error('Supabase returned no proverbs.');
  }
  return rows;
}

function sortRows(rows) {
  return [...rows].sort((a, b) => {
    const categoryCompare = text(a.category).localeCompare(text(b.category));
    if (categoryCompare !== 0) return categoryCompare;
    return text(a.quote_en || a.id).localeCompare(text(b.quote_en || b.id));
  });
}

function introPages(language, rowCount) {
  return [
    paragraph([run('Visual Sayings', { size: 42, bold: true })], {
      alignment: AlignmentType.CENTER,
      spacing: { before: 3400, after: 220 }
    }),
    paragraph([run(language.label, { size: 22 })], {
      alignment: AlignmentType.CENTER,
      spacing: { after: 900 }
    }),
    paragraph([run('A collection of short sayings arranged by category.', { size: 20 })], {
      alignment: AlignmentType.CENTER
    }),
    pageBreak(),
    paragraph([run('About This Draft', { size: 30, bold: true })], {
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 900, after: 260 }
    }),
    paragraph([
      run(`This Word draft contains ${rowCount} sayings from the Visay proverb database. Categories are used as chapters, and the sayings flow as continuous text inside each chapter.`, { size: 21 })
    ], {
      alignment: AlignmentType.LEFT,
      spacing: { after: 260 }
    }),
    paragraph([
      run('Format: 15 x 21 cm. Typeface: Helvetica or Word fallback equivalent.', { size: 21 })
    ], {
      alignment: AlignmentType.LEFT
    }),
    pageBreak()
  ];
}

function chapterPage(category) {
  return [
    paragraph([run(category, { size: 44, bold: true })], {
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.LEFT,
      spacing: { before: 980, after: 500 }
    })
  ];
}

function quotePage(row, language, localById) {
  const local = localById.get(row.id);
  const localVariant = local?.variants?.[language.appKey] || local?.variants?.en;
  const quote = text(row[`quote_${language.key}`]);
  const description = text(row[`description_${language.key}`]);
  const story = text(row[`story_${language.key}`]) || text(localVariant?.origin);
  const title = quote || text(row.quote_en) || text(row.id);

  return [
    paragraph([run(title, { size: 28, bold: true })], {
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.CENTER,
      spacing: { before: entryTopSpace, after: 260 }
    }),
    paragraph([run(description, { size: 21, italics: true })], {
      alignment: AlignmentType.CENTER,
      spacing: { after: story ? 220 : 420 }
    }),
    ...(story ? [paragraph([run(story, { size: 21 })], {
      alignment: AlignmentType.LEFT,
      spacing: { after: 420 }
    })] : [])
  ];
}

function closingPages(language) {
  return [
    paragraph([run('Notes', { size: 30, bold: true })], {
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { before: 1100, after: 600 }
    }),
    paragraph([run(' ', { size: 21 })], { spacing: { after: 720 } }),
    paragraph([run(' ', { size: 21 })], { spacing: { after: 720 } }),
    paragraph([run(' ', { size: 21 })], { spacing: { after: 720 } }),
    pageBreak(),
    paragraph([run('Visual Sayings', { size: 30, bold: true })], {
      alignment: AlignmentType.CENTER,
      spacing: { before: 3300, after: 240 }
    }),
    paragraph([run(`Draft prepared from the Visay proverb database for ${language.label}.`, { size: 20 })], {
      alignment: AlignmentType.CENTER
    })
  ];
}

function buildDocument(rows, language, localById) {
  const children = introPages(language, rows.length);
  let currentCategory = null;

  for (const row of rows) {
    const category = categoryForLanguage(row, language) || 'Uncategorized';
    if (category !== currentCategory) {
      currentCategory = category;
      children.push(...chapterPage(category));
    }
    children.push(...quotePage(row, language, localById));
  }

  children.push(...closingPages(language));

  return new Document({
    evenAndOddHeaderAndFooters: true,
    styles: {
      default: {
        document: {
          run: {
            font: 'Helvetica',
            size: 21
          },
          paragraph: {
            spacing: { line: 276 }
          }
        }
      },
      paragraphStyles: [
        {
          id: 'Heading1',
          name: 'Heading 1',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { font: 'Helvetica', size: 44, bold: true },
          paragraph: { spacing: { before: 720, after: 280 } }
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { font: 'Helvetica', size: 28, bold: true },
          paragraph: { spacing: { before: entryTopSpace, after: 260 } }
        }
      ]
    },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: pageWidth,
              height: pageHeight
            },
            margin: {
              top: bodyMargin,
              right: bodyMargin,
              bottom: bodyMargin,
              left: bodyMargin
            }
          }
        },
        footers: {
          default: footer(AlignmentType.RIGHT),
          even: footer(AlignmentType.LEFT)
        },
        children
      }
    ]
  });
}

async function main() {
  const rows = sortRows(await fetchProverbs());
  const localById = await loadLocalProverbData();
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const outputs = [];
  for (const language of languages) {
    const doc = buildDocument(rows, language, localById);
    const buffer = await Packer.toBuffer(doc);
    const filePath = path.join(OUTPUT_DIR, `visual-sayings-${language.file}.docx`);
    await fs.writeFile(filePath, buffer);
    outputs.push(filePath);
  }

  console.log(`Created ${outputs.length} Word documents from ${rows.length} Supabase rows:`);
  outputs.forEach((filePath) => console.log(filePath));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
