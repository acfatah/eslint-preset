import type { Rules } from '@antfu/eslint-config'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

/**
 * Eslint preset for Tailwind CSS.
 *
 * This preset integrates the `eslint-plugin-better-tailwindcss` plugin.
 * See: https://github.com/schoero/eslint-plugin-better-tailwindcss
 */
export const tailwind = {
  ...eslintPluginBetterTailwindcss.configs['recommended-warn']?.rules,
  ...eslintPluginBetterTailwindcss.configs['recommended-error']?.rules,
  'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', {
    printWidth: 100,
  }],
  'better-tailwindcss/no-restricted-classes': 'off',
  'better-tailwindcss/no-unknown-classes': 'off',
} satisfies Rules
