// import { betterTailwindcssPlugin, config, markdown, preset, tailwind, vue } from '@acfatah/eslint-preset'
import { betterTailwindcssPlugin, config, markdown, preset, tailwind, vue } from '../../src'

export default config(
  {
    formatters: true,
    vue: true,

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
    plugins: {
      ...betterTailwindcssPlugin,
    },

    rules: {
      ...preset,
      ...vue,
      ...tailwind,
      ...markdown,
    },

    settings: {
      // See: https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md
      // 'better-tailwindcss': {
      //   // Required to work properly. Adjust accordingly.
      //   entryPoint: 'src/styles/global.css',
      //   // Optional variable names used to store Tailwind class names
      //   variables: ['size', 'variant'],
      // },
    },
  },
)
