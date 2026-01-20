import type { Rules } from '@antfu/eslint-config'

export const preset = {
  // https://perfectionist.dev/rules/sort-imports.html
  'sort-imports': 'off',
  'perfectionist/sort-imports': ['error', {
    ignoreCase: false,
    newlinesBetween: 1,
    partitionByComment: true,
  }],

  'perfectionist/sort-exports': ['error', {
    ignoreCase: false,
    newlinesBetween: 1,
    partitionByComment: true,
  }],

  // https://eslint.style/rules/space-before-function-paren
  'space-before-function-paren': ['error', {
    anonymous: 'never',
    named: 'never',
    asyncArrow: 'always',
    // catch: 'never',
  }],

  // https://eslint.style/rules/padding-line-between-statements
  'style/padding-line-between-statements': ['error',
    // require blank line before all return statements
    {
      blankLine: 'always',
      prev: '*',
      next: 'return',
    }],
} satisfies Rules
