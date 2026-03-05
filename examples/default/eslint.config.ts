// import { defineConfig, markdown, typescript } from '@acfatah/eslint-preset'
import { defineConfig, markdown, typescript } from '../../src'

export default defineConfig(
  {
    // Type of the project. 'lib' for libraries, the default is 'app'
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
    // Optionally when using some plugins
    plugins: {
      // ...
    },
  },

  typescript,
  markdown,
)
