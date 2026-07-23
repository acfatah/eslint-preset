// Regression fixture: `.ts` import grouping.
//
// Counterpart to `examples/vue-tailwind/tests/fixtures/import-groups.vue`.
// The two layouts differ on purpose, and the diff between them is the point:
//
// - `.ts` uses the preset's `typescript` config, which restates
//   `perfectionist/sort-imports` without `groups`, so perfectionist's own
//   default groups apply. Those have no `side-effect` entry, so
//   `import './styles.css'` is an unmovable barrier that fragments the block.
// - `.vue` pins an explicit `groups` list, so type imports hoist into one
//   leading block and side effect imports collect at the end.
//
// Practical consequence: if a side effect import has to run before another
// import, keep it in a `.ts` module.
//
// Guard: `./mod2`, `./mod9`, `./mod10` must stay in that order. Alphabetical
// sorting would give `mod10, mod2, mod9`.

import type { Buffer } from 'node:buffer'

import axios from 'axios'

import './styles.css'
import { readFile } from 'node:fs/promises'

import type { AliasType } from '@/types'

import { helper } from '@/utils'

import type { Parent } from '../types'

import mod2 from './mod2'
import mod9 from './mod9'
import mod10 from './mod10'

export const buffer: Buffer | null = null
export const alias: AliasType | null = null
export const parent: Parent | null = null
export const total = mod2 + mod9 + mod10
export const source = readFile('README.md', 'utf8')
export const remote = axios.get(helper('/api'))
