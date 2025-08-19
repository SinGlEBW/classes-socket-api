import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { extname, relative, resolve } from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { splitVendorChunkPlugin } from 'vite'
import packageJson from './package.json';

import { fileURLToPath } from 'node:url';
import { glob } from 'glob'


const namePackage = packageJson.name;
const entryPathLib = "src/lib"

export default defineConfig({
  plugins: [
    dts({ include: entryPathLib })
  ],
  resolve: {
    alias: {
      "@lib": resolve(__dirname, './src/lib/index'),
      "@deps": resolve(__dirname, './src/lib/SocketApi/deps'),
    }
  },
  server: { open: true },
  
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, entryPathLib),
      formats: ['es'],
      name: namePackage,
    },
    rollupOptions: {
      input: Object.fromEntries(
          glob.sync(entryPathLib + '/**/*.{ts,tsx}').map(file => [
            relative(
              entryPathLib,
              file.slice(0, file.length - extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url))
          ])
        ),
      output: {
        entryFileNames: '[name].js',
      }
    }
  },
})
