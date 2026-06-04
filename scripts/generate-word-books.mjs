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

const CM_TO_TWIPS = 567;
const pageWidth = Math.round(15 * CM_TO_TWIPS);
const pageHeight = Math.round(21 * CM_TO_TWIPS);
const bodyMargin = Math.round(1.75 * CM_TO_TWIPS);
const quoteTopSpace = Math.round(5 * CM_TO_TWIPS);

const languages = [
  { key: 'en', label: 'English', file: 'english', title: 'Visual Sayings' },
  { key: 'da', label: 'Dansk', file: 'dansk', title: 'Visual Sayings' },
  { key: 'de', label: 'Deutsch', file: 'deutsch', title: 'Visual Sayings' },
  { key: 'es', label: 'Español', file: 'espanol', title: 'Visual Sayings' },
  { key: 'no', label: 'Norsk', file: 'norsk', title: 'Visual Sayings' },
  { key: 'la', label: 'Latina', file: 'latin', title: 'Visual Sayings' },
  { key: 'it', label: 'Italiano', file: 'italiano', title: 'Visual Sayings' },
  { key: 'fr', label: 'Français', file: 'francais', title: 'Visual Sayings' },
  { key: 'fo', label: 'Føroyskt', file: 'foroyskt', title: 'Visual Sayings' }
];

const categoryLabels = {
  biblical: 'Biblical',
  experience: 'Experience',
  humour: 'Humour',
  life: 'Life',
  love: 'Love',
  slang: 'Slang',
  time: 'Time',
  work: 'Work'
};

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function titleCaseCategory(category) {
  return categoryLabels[category] || text(category).replace(/[-_]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
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

function footer() {
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
        alignment: AlignmentType.CENTER,
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
      run(`This Word draft contains ${rowCount} sayings from the Visay proverb database. Categories are used as chapters, each saying is set as a heading, and the quote itself is centered with generous white space above it.`, { size: 21 })
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
    paragraph([run(titleCaseCategory(category), { size: 34, bold: true })], {
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { before: 3600, after: 260 }
    }),
    pageBreak()
  ];
}

function quotePage(row, language) {
  const quote = text(row[`quote_${language.key}`]);
  const description = text(row[`description_${language.key}`]);
  const title = quote || text(row.quote_en) || text(row.id);

  return [
    paragraph([run(title, { size: 24, bold: true })], {
      heading: HeadingLevel.HEADING_2,
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: quoteTopSpace }
    }),
    paragraph([run(quote, { size: 28, italics: true })], {
      alignment: AlignmentType.CENTER,
      spacing: { after: 340 },
    }),
    paragraph([run(description, { size: 21 })], {
      alignment: AlignmentType.CENTER,
      spacing: { after: 0 }
    }),
    pageBreak()
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

function buildDocument(rows, language) {
  const children = introPages(language, rows.length);
  let currentCategory = null;

  for (const row of rows) {
    const category = text(row.category) || 'Uncategorized';
    if (category !== currentCategory) {
      currentCategory = category;
      children.push(...chapterPage(category));
    }
    children.push(...quotePage(row, language));
  }

  children.push(...closingPages(language));

  return new Document({
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
          run: { font: 'Helvetica', size: 34, bold: true },
          paragraph: { spacing: { before: 720, after: 280 } }
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          basedOn: 'Normal',
          next: 'Normal',
          quickFormat: true,
          run: { font: 'Helvetica', size: 24, bold: true },
          paragraph: { spacing: { before: 0, after: quoteTopSpace } }
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
          default: footer()
        },
        children
      }
    ]
  });
}

async function main() {
  const rows = sortRows(await fetchProverbs());
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const outputs = [];
  for (const language of languages) {
    const doc = buildDocument(rows, language);
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
