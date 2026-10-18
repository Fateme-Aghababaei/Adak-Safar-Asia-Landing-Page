import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { readFile } from 'node:fs/promises';

// Keep discovery files at the project root and publish them at the site root.
const discoveryFiles = ['llms.txt', 'robots.txt', 'sitemap.xml'];

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: 'root-discovery-files',
      async generateBundle() {
        for (const fileName of discoveryFiles) {
          const file = new URL(fileName, import.meta.url);
          this.addWatchFile(file.pathname);
          this.emitFile({
            type: 'asset',
            fileName,
            source: await readFile(file),
          });
        }
      },
    },
  ],
});
