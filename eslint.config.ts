import { defineConfig, markdown, typescript } from './src'

export default defineConfig(
  {
    type: 'lib',

    ignores: [
      '**/coverage/**',
      '**/dist/**',
      '**/logs/**',
      '**/tsconfig.*',
      'bun.lock',

      // Ignoring test fixtures.
      'tests/fixtures/**',
    ],
  },

  typescript,
  markdown,
)
