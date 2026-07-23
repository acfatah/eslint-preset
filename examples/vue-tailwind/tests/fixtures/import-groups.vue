<!--
  Regression fixture: `.vue` import grouping.

  Five blocks, one blank line between them and none within:
  types, packages, alias, relative, side effect.

  Guard: `./mod2`, `./mod9`, `./mod10` must stay in that order. Alphabetical
  sorting would give `mod10, mod2, mod9`.

  See `examples/default/tests/fixtures/import-groups.ts` for the `.ts`
  counterpart, which groups differently.
-->

<script setup lang="ts">
import type { Buffer } from 'node:buffer'
import type { Ref } from 'vue'
import type { AliasType } from '@/types'
import type { Parent } from '../types'

import axios from 'axios'
import { readFile } from 'node:fs/promises'
import { computed, ref } from 'vue'

import { helper } from '@/utils'

import Child from './Child.vue'
import mod2 from './mod2'
import mod9 from './mod9'
import mod10 from './mod10'

import './styles.css'

const buffer: Ref<Buffer | null> = ref(null)
const alias: Ref<AliasType | null> = ref(null)
const parent: Ref<Parent | null> = ref(null)
const total = computed(() => mod2 + mod9 + mod10)
const source = readFile('README.md', 'utf8')
const remote = axios.get(helper('/api'))
</script>

<template>
  <Child />
  <p>{{ total }} {{ buffer }} {{ alias }} {{ parent }} {{ source }} {{ remote }}</p>
</template>
