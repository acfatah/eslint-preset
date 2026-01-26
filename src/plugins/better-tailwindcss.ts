import type { ESLint } from 'eslint'

import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export const betterTailwindcssPlugin: Record<string, ESLint.Plugin> = {
  // https://github.com/schoero/eslint-plugin-better-tailwindcss
  'better-tailwindcss': eslintPluginBetterTailwindcss,
}
