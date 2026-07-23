import type antfu from '@antfu/eslint-config'

type Config = Parameters<typeof antfu>[1]

/**
 * Eslint preset for Vue.js files.
 *
 * This preset integrates the `eslint-plugin-vue` plugin.
 * See: https://eslint.vuejs.org/
 */
export const vue: Config = {
  files: [
    '**/*.vue',
  ],

  rules: {
    'vue/object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: true,
    }],

    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 2 },
      multiline: { max: 1 },
    }],

    // Import grouping for `.vue` SFCs.
    //
    // The `typescript` config scopes `perfectionist/sort-imports` to
    // `**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}`, and antfu configures
    // `processorVueBlocks` with `script`/`scriptSetup` off, so SFC script
    // blocks are never virtual `.ts` files and that glob cannot reach them.
    // `.vue` fell back to the antfu default, which uses
    // `newlinesBetween: 'ignore'`. Import order was enforced, blank lines
    // were not, so the separators drifted. Pin them here.
    //
    // Layout, five blocks:
    //
    //   1. types       - every `import type`, ordered builtin, external,
    //                    alias, then relative, with no blank line between
    //                    those tiers
    //   2. packages    - npm and builtin value imports, merged
    //   3. alias       - `@/` and `~/` value imports
    //   4. relative    - `./` and `../` value imports
    //   5. side effect - bare `import './styles.css'`
    //
    // Notes:
    // - Flat-config rule options replace rather than merge, so every option
    //   antfu sets has to be restated or it reverts to the perfectionist
    //   default. `type` in particular defaults to `alphabetical`, which would
    //   sort `./mod10` ahead of `./mod2`.
    // - Groups resolve by selector specificity, not list position, so a
    //   leading `type-import` does not shadow `type-internal` or
    //   `type-parent`. It is the catch-all for type imports matching no tier.
    // - Builtin and external values are merged on purpose, so `axios` can
    //   sort before `node:fs/promises`.
    // - `side-effect` cannot be nested inside a group array. ESLint rejects
    //   mixing side effect and non side effect groups.
    // - Group names are perfectionist v5 vocabulary, supplied to the plugin
    //   instance `@antfu/eslint-config` registers. An unknown name aborts the
    //   lint run with `Invalid group(s)`, so a perfectionist major landing
    //   inside an antfu minor fails loudly rather than silently.
    // - `partitionByComment` splits the block into independent sort domains.
    //   A comment anchors to its partition boundary while the import it
    //   describes can sort away, so `--fix` may leave a comment sitting above
    //   a different import. Kept for parity with the `typescript` config.
    'perfectionist/sort-imports': ['error', {
      type: 'natural',
      ignoreCase: false,
      newlinesBetween: 1,
      newlinesInside: 0,
      partitionByComment: true,
      groups: [
        'type-import',
        { newlinesBetween: 0 },
        ['type-builtin', 'type-external'],
        { newlinesBetween: 0 },
        'type-internal',
        { newlinesBetween: 0 },
        ['type-parent', 'type-sibling', 'type-index'],
        ['value-builtin', 'value-external'],
        'value-internal',
        ['value-parent', 'value-sibling', 'value-index'],
        'side-effect',
        'ts-equals-import',
        'unknown',
      ],
    }],
  },
}
