import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

const partials = new Map(
  ['header', 'footer'].map((name) => [
    `./partials/${name}.html`,
    fileURLToPath(new URL(`./partials/${name}.html`, import.meta.url)),
  ]),
);

function htmlIncludes() {
  return {
    name: 'html-includes',
    transformIndexHtml: {
      order: 'pre',
      handler(html, context) {
        return html.replace(/<include src="([^"]+)"><\/include>/g, (_, source) => {
          const file = partials.get(source);
          if (!file) throw new Error(`Unknown HTML partial: ${source}`);

          const markup = readFileSync(file, 'utf8');
          const page = context.filename.split('/').pop();
          return markup.replaceAll(`href="/${page}"`, `href="/${page}" aria-current="page"`);
        });
      },
    },
    configureServer(server) {
      const files = [...partials.values()];
      server.watcher.add(files);
      server.watcher.on('change', (file) => {
        if (files.includes(file)) server.ws.send({ type: 'full-reload' });
      });
    },
  };
}

export default defineConfig({
  plugins: [htmlIncludes()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        contact: fileURLToPath(new URL('./contact.html', import.meta.url)),
        comparison: fileURLToPath(new URL('./comparison.html', import.meta.url)),
      },
    },
  },
});
