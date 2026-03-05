import type antfu from '@antfu/eslint-config'

type Config = Parameters<typeof antfu>[1]

/**
 * Eslint preset for Markdown files.
 *
 * This preset integrates the `@eslint/markdown` plugin.
 * See: https://github.com/eslint/markdown
 */
export const markdown: Config = {
  files: [
    '**/*.md',
  ],

  rules: {
    'perfectionist/sort-exports': 'off',
    'perfectionist/sort-imports': 'off',
  },
}
