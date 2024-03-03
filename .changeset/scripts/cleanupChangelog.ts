import { readFile, writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

async function replaceInMarkdownFile(filePath) {
  try {
    const dateFormatter = new Intl.DateTimeFormat('nl', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const date = dateFormatter.format(Date.now());

    let content = await readFile(filePath, 'utf8');

    const modifiedContent = content
      .replace(/## (\d+\.\d+\.\d+)/, `## ${date} ($1)`)
      .replace('### Minor Changes', '### Features')
      .replace('### Patch Changes', '### Bug fixes');

    await writeFile(filePath, modifiedContent, 'utf8');
  } catch (err) {
    console.error(err);
  }
}

const currentDir = dirname(fileURLToPath(import.meta.url));
replaceInMarkdownFile(resolve(currentDir, '../../CHANGELOG.md'));
