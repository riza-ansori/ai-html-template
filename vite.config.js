import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

function htmlComponentsPlugin() {
  return {
    name: 'html-components',

    transformIndexHtml: {
      order: 'pre',

      handler(html) {
        const componentsDir = path.resolve(
          process.cwd(),
          'src/components'
        )

        return html.replace(
          /<div\s+data-component="([^"]+)"\s*><\/div>/g,
          (match, componentName) => {
            const componentPath = path.join(
              componentsDir,
              `${componentName}.html`
            )

            if (!fs.existsSync(componentPath)) {
              console.warn(
                `Component not found: ${componentName}`
              )

              return match
            }

            return fs.readFileSync(
              componentPath,
              'utf-8'
            )
          }
        )
      },
    },
  }
}

export default defineConfig({
  base: './',

  plugins: [
    htmlComponentsPlugin(),
    tailwindcss(),
  ],

  build: {
    rollupOptions: {
      input: {
        index: path.resolve(process.cwd(), 'index.html'),
        pricing: path.resolve(process.cwd(), 'pricing.html'),
        login: path.resolve(process.cwd(), 'login.html'),
        register: path.resolve(process.cwd(), 'register.html'),
        'ai-generator': path.resolve(
          process.cwd(),
          'ai-generator.html'
        ),
        dashboard: path.resolve(
          process.cwd(),
          'dashboard.html'
        ),
      },

      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',

        chunkFileNames: 'assets/js/[name]-[hash].js',

        assetFileNames: (assetInfo) => {
          const ext = path
            .extname(assetInfo.name || '')
            .toLowerCase()

          if (
            [
              '.png',
              '.jpg',
              '.jpeg',
              '.webp',
              '.avif',
              '.gif',
              '.svg',
            ].includes(ext)
          ) {
            return 'assets/img/[name]-[hash][extname]'
          }

          if (
            ['.ttf', '.woff', '.woff2', '.otf'].includes(ext)
          ) {
            return 'assets/fonts/[name]-[hash][extname]'
          }

          if (ext === '.css') {
            return 'assets/css/[name]-[hash][extname]'
          }

          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})