// import { betterTailwindcssPlugin, defineConfig, markdown, tailwind, typescript, vue } from '@acfatah/eslint-preset'
import { betterTailwindcssPlugin, defineConfig, markdown, tailwind, typescript, vue } from '../../src'

export default defineConfig(
  {
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

    settings: {
      // See: https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md
      // 'better-tailwindcss': {
      //   // Required to work properly. Adjust accordingly.
      //   entryPoint: 'src/styles/global.css',
      //   // Optional variable names used to store Tailwind class names
      //   variables: [
      //     ['variant', [{ match: 'objectValues' }]],
      //     ['size', [{ match: 'objectValues' }]],
      //   ],
      // },
    },
  },

  typescript,
  vue,
  tailwind,
  markdown,
)
