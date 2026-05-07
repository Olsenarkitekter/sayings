import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const indexPath = 'dist/index.html';
const html = readFileSync(indexPath, 'utf8')
  .replaceAll('src="/_expo/', 'src="./_expo/')
  .replaceAll('href="/_expo/', 'href="./_expo/');

writeFileSync(indexPath, html);

const jsDir = 'dist/_expo/static/js/web';
for (const file of readdirSync(jsDir).filter((name) => name.endsWith('.js'))) {
  const filePath = join(jsDir, file);
  const js = readFileSync(filePath, 'utf8')
    .replaceAll('uri:"/assets/', 'uri:"/sayings/assets/');
  writeFileSync(filePath, js);
}

console.log('Fixed GitHub Pages asset paths in dist/index.html and web bundle assets');
