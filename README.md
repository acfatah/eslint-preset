# Eslint Preset

<p>
  <a href="https://github.com/antfu/eslint-config">
    <img
      alt="Code Style"
      src="https://antfu.me/badge-code-style.svg"></a>
  <a href="https://github.com/antfu/eslint-config">
    <img
      alt="GitHub last commit (by committer)"
      src="https://img.shields.io/github/last-commit/acfatah/eslint-preset?display_timestamp=committer&style=flat-square"></a>
</p>

An opinionated ESLint configuration preset for TypeScript projects, based on [`antfu/eslint-config`][1].

Additional rules included are:

- Markdown files support via `eslint-plugin-markdown`
- Vue files support via `eslint-plugin-vue`
- Tailwind CSS support via `eslint-plugin-better-tailwindcss`

## Installation

To install the config, run:

```bash
bun add --dev @acfatah/eslint-preset
```

Add `eslint.config.ts` file with the following content,

```typescript
import { markdown, preset, vue } from '@acfatah/eslint-preset/rules'
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,

    // Specifically for Vue projects
    vue: true,
  },

  {
    rules: {
      ...preset,
      ...markdown,

      // Specifically for Vue projects
      ...vue,
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/coverage/**',
      '**/dist/**',
      '**/logs/**',
      'bun.lock',
      'tsconfig.*',
    ],
  },
)
```

### Tailwind CSS Support

Add the following configurations respectively.

```typescript
import { tailwind } from '@acfatah/eslint-preset/rules'
import antfu from '@antfu/eslint-config'

export default antfu(
  // other configs...

  {
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

  // other configs...
)
```

## VS Code Support

Install the [VS Code ESLint extension][2].

Add the following vscode configuration to `.vscode/settings.json`,

```jsonc
{
  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

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

Then, add the following configurations to `.vscode/tailwindcss.json`.

```jsonc
{
  "version": 1.1,
  "atDirectives": [
    {
      "name": "@apply",
      "description": "Inline any existing utility classes into custom CSS.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#apply-directive"
        }
      ]
    },
    {
      "name": "@config",
      "description": "Load legacy JavaScript-based configuration file (compatibility with v3.x).",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#config-directive"
        }
      ]
    },
    {
      "name": "@custom-variant",
      "description": "Add a custom variant in the project.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#custom-variant-directive"
        }
      ]
    },
    {
      "name": "@import",
      "description": "Use the @import directive to inline import CSS files, including Tailwind itself.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#import-directive"
        }
      ]
    },
    {
      "name": "@plugin",
      "description": "Load legacy JavaScript-based plugin (compatibility with v3.x).",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/upgrading-to-v4#plugins"
        }
      ]
    },
    {
      "name": "@reference",
      "description": "Import main stylesheet for reference without including styles, for use with frameworks like React, Svelte, etc.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#reference-directive"
        }
      ]
    },
    {
      "name": "@source",
      "description": "Specify source files not picked up by automatic content detection.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#source-directive"
        }
      ]
    },
    {
      "name": "@theme",
      "description": "Define custom design tokens like fonts, colors, breakpoints.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#theme-directive"
        }
      ]
    },
    {
      "name": "@utility",
      "description": "Add custom utilities that work with variants like hover, focus, lg.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#utility-directive"
        }
      ]
    },
    {
      "name": "@variant",
      "description": "Apply a Tailwind variant to styles in CSS.",
      "references": [
        {
          "name": "Tailwind Documentation",
          "url": "https://tailwindcss.com/docs/functions-and-directives#variant-directive"
        }
      ]
    }
  ]
}
```

## Acknowledgments

- [antfu/eslint-config][1]

[1]: https://github.com/antfu/eslint-config
[2]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[3]: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
