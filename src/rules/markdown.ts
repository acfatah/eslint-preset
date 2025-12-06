/**
 * Eslint preset for Markdown files.
 *
 * This preset integrates the `@eslint/markdown` plugin.
 * See: https://github.com/eslint/markdown
 */

import eslintMarkdown from '@eslint/markdown'

export const markdown = eslintMarkdown.configs.recommended
