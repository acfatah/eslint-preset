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
  },
}
