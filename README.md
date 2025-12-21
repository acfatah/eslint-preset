# Eslint Preset

<p>
  <a href="https://github.com/antfu/eslint-config">
    <img
      alt="Code Style"
      src="https://antfu.me/badge-code-style.svg"></a>
  <a href="https://www.npmjs.com/package/@acfatah/eslint-preset">
    <img
      alt="NPM Version"
      src="https://img.shields.io/npm/v/%40acfatah%2Feslint-preset"></a>
  <a href="https://github.com/antfu/eslint-config">
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

## Installation

To install the config, run:

```bash
bun add --dev @acfatah/eslint-preset
```

Add `eslint.config.ts` file with the following content. `config` is just a wrapper
to the `antfu` factory function. See [antfu Customization][antfu-factory-fuction]
section for more details.

```typescript
import { config } from '@acfatah/eslint-preset'
import { markdown, preset, vue } from '@acfatah/eslint-preset/rules'

export default config(
  {
    formatters: true,

    // Type of the project. 'lib' for libraries, the default is 'app'
    type: 'lib',

    // Specifically for Vue projects
    vue: true,

    // Files and directories to ignore. Adjust accordingly.
    ignores: [
      '**/coverage/**',
      '**/dist/**',
      '**/logs/**',
      'bun.lock',
      'tsconfig.*',
    ],
  },

  {
    // Optionally when using some plugins
    plugins: {
      // ...
    },

    rules: {
      ...preset,

      // Specifically for Vue projects
      ...vue,
    },
  },
)
```

### Tailwind CSS Support

Add the following configurations respectively.

```typescript
import { betterTailwindcssPlugin, tailwind } from '@acfatah/eslint-preset'
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // other configs...
  },

  {
    plugins: {
      ...betterTailwindcssPlugin,
    },

    rules: {
      // other rules...

      ...tailwind,
    },

    settings: {
      // See: https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md
      'better-tailwindcss': {
        // Required to work properly. Adjust accordingly.
        entryPoint: 'src/styles/global.css',
        // Optional variable names used to store Tailwind class names
        variables: ['size', 'variant'],
      },
    }
  },

  // other flat configs...
)
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
[antfu-factory-fuction]: https://github.com/antfu/eslint-config?tab=readme-ov-file#customization
