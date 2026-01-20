import { defineConfig, markdown, preset } from './src'

export default defineConfig(
  {
    type: 'lib',

    // Files and directories to ignore. Adjust accordingly.
    ignores: [
      '**/coverage/**',
      '**/dist/**',
      '**/logs/**',
      '**/tsconfig.*',
      'bun.lock',
    ],
  },

  {
    rules: {
      ...preset,
      ...markdown,
    },
  },
)
