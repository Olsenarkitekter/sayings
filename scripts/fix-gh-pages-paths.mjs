import { readFileSync, writeFileSync } from 'node:fs';

const indexPath = 'dist/index.html';
const html = readFileSync(indexPath, 'utf8')
  .replaceAll('src="/_expo/', 'src="./_expo/')
  .replaceAll('href="/_expo/', 'href="./_expo/');

writeFileSync(indexPath, html);
console.log('Fixed GitHub Pages asset paths in dist/index.html');
