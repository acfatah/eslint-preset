import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
  },

  {
    rules: {
      // https://perfectionist.dev/rules/sort-imports.html
      'sort-imports': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          partitionByNewLine: true,
          newlinesBetween: 'ignore',
        },
      ],

      // https://eslint.style/rules/space-before-function-paren
      'space-before-function-paren': ['error', {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
        // catch: 'never',
      }],

      // https://eslint.style/rules/padding-line-between-statements
      'style/padding-line-between-statements': [
        'error',
        // require blank line before all return statements
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      'bun.lock',
      'logs',
      'tsconfig.*',
    ],
  },
)
