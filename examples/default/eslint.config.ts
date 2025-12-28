// import { config, markdown, preset } from '@acfatah/eslint-preset'
import { config, markdown, preset } from '../../src'

export default config(
  {
    formatters: true,

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

    rules: {
      ...preset,
      ...markdown,
    },
  },
)
