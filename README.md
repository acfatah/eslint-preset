# Eslint Preset

<p>
  <a href="https://github.com/antfu/eslint-config">
    <img
      alt="Code Style"
      src="https://antfu.me/badge-code-style.svg"></a>
  <a href="./LICENSE">
    <img alt="GitHub" src="https://img.shields.io/github/license/acfatah/eslint-preset?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@acfatah/eslint-preset">
    <img
      alt="NPM Version"
      src="https://img.shields.io/npm/v/%40acfatah%2Feslint-preset"></a>
  <a href="https://github.com/acfatah/eslint-preset/commits/main">
    <img
      alt="GitHub last commit (by committer)"
      src="https://img.shields.io/github/last-commit/acfatah/eslint-preset?display_timestamp=committer&style=flat-square"></a>
</p>

An opinionated ESLint configuration preset for TypeScript projects, based on
[`antfu/eslint-config`][1]. I use this preset across my personal and professional
projects to maintain a consistent code style and quality.

Additional rules included are:

- Markdown files support via `eslint-plugin-markdown`
- Vue files support via `eslint-plugin-vue`
- Tailwind CSS support via `eslint-plugin-better-tailwindcss`
- Import grouping in `.vue` SFCs, one blank line between groups and none within

## Installation

To install ESLint and this preset with Bun, run:

```bash
bun add --dev eslint @acfatah/eslint-preset
```

This preset declares `@antfu/eslint-config`, `@eslint/markdown`, `eslint`,
`eslint-plugin-better-tailwindcss`, `eslint-plugin-format`, and
`eslint-plugin-vue` as dependencies. Bun, will install these packages
automatically when you add the preset, so you do not need to list each plugin
manually in your `package.json`.

Add an `eslint.config.ts` file with the following content. `defineConfig` is a
wrapper around the `antfu` factory function. See [antfu
Customization][antfu-factory-fuction] for details.

```typescript
import { defineConfig, markdown, typescript, vue } from '@acfatah/eslint-preset'

export default defineConfig(
  {
    formatters: true, // Optional since v1.4.0. Default to true.
    typescript: true, // Optional since v1.4.0. Default to true.

    // Type of the project. 'lib' for libraries, the default is 'app'
    type: 'lib',

    // Specifically for Vue projects
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
    // Optionally when using some plugins
    plugins: {
      // ...
    },
  },

  typescript,
  markdown,
  vue,
)
```

### Vue Import Grouping

The `vue` config pins `perfectionist/sort-imports` for `.vue` SFCs: one blank
line between groups, none within. Without it, `.vue` falls back to the
`@antfu/eslint-config` default, which enforces import order but leaves blank
lines alone, so the separators drift.

Five blocks, fully autofixable:

```vue
<script setup lang="ts">
import type { Buffer } from 'node:buffer'
import type { Ref } from 'vue'
import type { AliasType } from '@/types'
import type { Parent } from '../types'

import axios from 'axios'
import { readFile } from 'node:fs/promises'
import { computed } from 'vue'

import { helper } from '@/utils'

import Child from './Child.vue'

import './styles.css'
</script>
```

| Block | Contents                                                             |
| ----- | -------------------------------------------------------------------- |
| 1     | Every `import type`, ordered builtin, external, alias, then relative |
| 2     | Package value imports, npm and builtin merged                        |
| 3     | Alias value imports, `@/` and `~/`                                   |
| 4     | Relative value imports, `./` and `../`                               |
| 5     | Side effect imports                                                  |

The `.vue` layout differs from `.ts` on purpose:

- In `.vue`, every `import type` is hoisted into one leading block and side
  effect imports collect at the end.
- In `.ts`, type and value imports interleave per tier, and a side effect
  import acts as a barrier that fragments the block.

Gotcha: if a side effect import has to run before another import, keep it in a
`.ts` module. Working examples of both layouts live in
`examples/vue-tailwind/tests/fixtures/` and `examples/default/tests/fixtures/`.

### Tailwind CSS Support

Add the following configurations respectively.

```typescript
import { betterTailwindcssPlugin, defineConfig, tailwind } from '@acfatah/eslint-preset'

export default defineConfig(
  {
    // other configs...
  },

  {
    plugins: {
      ...betterTailwindcssPlugin,
    },

    settings: {
      // See: https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md
      'better-tailwindcss': {
        // Required to work properly. Adjust accordingly.
        entryPoint: 'src/styles/global.css',
        // Optional variable names used to store Tailwind class names
        variables: [
          ['variant', [{ match: 'objectValues' }]],
          ['size', [{ match: 'objectValues' }]],
        ],
      },
    }
  },

  tailwind,

  // other flat configs...
)
```

## Inspect Example Configs

You can inspect the fully resolved configs shipped in this repo. These commands
run from the project root and run the [ESLint config inspector][4] against the
templates used.

### Default TypeScript preset

```bash
bun inspect:default
```

### Vue + Tailwind preset

```bash
bun inspect:vue-tailwind
```

## VS Code Support

Install the [VS Code ESLint extension][2].

Add the following vscode configuration to `.vscode/settings.json`,

File: `src/files/.vscode/settings.json`

```jsonc
{
  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": true,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off", "fixable": true },
    { "rule": "format/*", "severity": "off", "fixable": true },
    { "rule": "*-indent", "severity": "off", "fixable": true },
    { "rule": "*-spacing", "severity": "off", "fixable": true },
    { "rule": "*-spaces", "severity": "off", "fixable": true },
    { "rule": "*-order", "severity": "off", "fixable": true },
    { "rule": "*-dangle", "severity": "off", "fixable": true },
    { "rule": "*-newline", "severity": "off", "fixable": true },
    { "rule": "*quotes", "severity": "off", "fixable": true },
    { "rule": "*semi", "severity": "off", "fixable": true }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "gql",
    "graphql",
    "astro",
    "svelte",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ],

  // https://github.com/tailwindlabs/tailwindcss-intellisense?tab=readme-ov-file#recommended-vs-code-settings
  "files.associations": {
    "*.css": "tailwindcss"
  },

  // https://github.com/tailwindlabs/tailwindcss-intellisense?tab=readme-ov-file#recommended-vs-code-settings
  "editor.quickSuggestions": {
    "strings": "on"
  }
}
```

### Tailwind CSS Support

Install the [Tailwind CSS IntelliSense extension][3].

Add the following custom Tailwind CSS v4 functions and directives lines to the `.vscode/settings.json` file:

```jsonc
{
  // other settings...

  // Custom Tailwind CSS v4 functions and directives
  // See:
  // - https://tailwindcss.com/docs/functions-and-directives
  // - https://grok.com/share/bGVnYWN5_1cf7d218-282e-46e5-acc6-efb07d12d35e
  "css.customData": [
    ".vscode/tailwind.json"
  ]

  // other settings...
}
```

Then, copy `src/files/.vscode/tailwind.json` file to `.vscode/tailwind.json`.

```bash
curl -s https://raw.githubusercontent.com/acfatah/eslint-preset/refs/heads/main/src/files/.vscode/tailwind.json -o .vscode/tailwind.json
```

## Acknowledgments

- [antfu/eslint-config][1]

[1]: https://github.com/antfu/eslint-config
[2]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[3]: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
[4]: https://github.com/eslint/config-inspector
[antfu-factory-fuction]: https://github.com/antfu/eslint-config?tab=readme-ov-file#customization
