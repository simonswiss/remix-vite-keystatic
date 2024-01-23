import { unstable_vitePlugin as remix } from '@remix-run/dev'
import mdx from '@mdx-js/rollup'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ['**/.*'],
    }),
    tsconfigPaths(),
    mdx(),
  ],
  ssr: {
    noExternal: [/^@keystatic\//, 'minimatch'],
  },
})
