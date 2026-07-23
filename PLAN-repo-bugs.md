# PLAN: repo bugs

Defects found while implementing TODO 01 (`.vue` import grouping). Each is
independent of that change and of the others. Execute later, one commit each.

Everything below was verified against the reconciled tree:
`@antfu/eslint-config` 7.7.3, `eslint-plugin-perfectionist` 5.6.0, `eslint`
10.0.3.

---

## 1. `inspect:default` and `inspect:vue-tailwind` are broken two ways

`package.json`:

```
"inspect:default": "cd templates/default && bunx --bun eslint --inspect-config",
"inspect:vue-tailwind": "cd templates/vue-tailwind && bunx --bun eslint --inspect-config",
```

- `templates/` has never existed on any ref. `git log --all -- templates`
  returns nothing. The directory is `examples/`, renamed in `9cec083`.
- `bunx --bun eslint --inspect-config` crashes with
  `[crossws] Using Node.js adapter in an incompatible environment`. Drop
  `--bun`.

`README.md` documents both commands under "Inspect Example Configs", so the
docs are wrong too.

Fix:

```
"inspect:default": "cd examples/default && bunx eslint --inspect-config",
"inspect:vue-tailwind": "cd examples/vue-tailwind && bunx eslint --inspect-config",
```

Commit: `fix(scripts): point inspect commands at examples`

---

## 2. `space-before-function-paren` conflicts with its stylistic twin

`src/configs/typescript.ts` configures the **core** rule:

```
'space-before-function-paren': ['error', {
  anonymous: 'never',
  named: 'never',
  asyncArrow: 'always',
}],
```

antfu separately enables `style/space-before-function-paren` with
`anonymous: 'always'`. Both resolve active on `.ts`, confirmed with
`eslint --print-config`. Two autofixers in direct contradiction for anonymous
functions.

The core rule is deprecated, not removed: present in ESLint 10 with
`deprecatedSince: "8.53.0"` and `availableUntil: "11.0.0"`. It will disappear
in ESLint 11.

Fix: drop the core rule and configure `style/space-before-function-paren`
instead, so the preset's stated intent actually takes effect.

Commit: `fix(typescript): configure style/space-before-function-paren`

---

## 3. `eslint.config.ts` ignores a directory that has never existed

```
// Ignoring test fixtures.
'tests/fixtures/**',
```

`git log --all -- tests/fixtures` returns nothing. This is a live trap:
`lint:staged` passes `--no-warn-ignored`, so anything placed there would be
silently skipped forever with no diagnostic.

The fixtures added by TODO 01 deliberately live under
`examples/*/tests/fixtures/` instead. The root ignore glob has no leading
`**/`, so it is anchored to the repo root and does not reach them.

Fix: delete the glob.

Commit: `fix(eslint): remove dead tests/fixtures ignore`

---

## 4. `.vue` still misses three `typescript.ts` rules

TODO 01 closed one of four gaps. These still resolve to `undefined` in SFCs:

- `perfectionist/sort-exports`
- `space-before-function-paren` (see item 2)
- `style/padding-line-between-statements`

Widening the `typescript` config's `files` glob to include `.vue`, as
`tailwind.ts` already does, would close all three at once. It would also start
enforcing "blank line before `return`" inside every `<script setup>` block,
which is an unrequested style change. Decide deliberately, do not drift into
it.

---

## 5. Two-block SFCs are corrupted by `import/first`

In an SFC with both `<script>` and `<script setup>`, `export default { ... }`
is relocated out of `<script>` into `<script setup>`, after which
`vue/no-export-in-script-setup` errors.

Pre-existing `@antfu/eslint-config` behaviour, verified with and without the
TODO 01 change. Upstream issue, not something this preset introduced. Record
only.

---

## 6. `bun lint` runs nowhere in CI

- `release.yml` runs `changelogithub` only.
- `publish.yml` runs `bun run build` only.
- `weekly-update.yml` has a commented-out `bun test` step.

`weekly-update.yml` runs `bun update` on a cron and opens a PR. That is exactly
how `node_modules` drifted to `@antfu/eslint-config` 6.7.3 against a lockfile
pinning 7.7.3. A `bun lint` step **after** the update would make
dependency-bump regressions fail loudly instead of landing in a green PR.

This matters more than usual here: the `.vue` group names are perfectionist v5
vocabulary, and the coupling is `@antfu/eslint-config: ^7.7.3` to
`eslint-plugin-perfectionist: ^5.6.0`. A caret range can ship a perfectionist
major inside an antfu minor, at which point an unknown group name aborts the
lint run with `Invalid group(s)`.

Fix: add a lint step to `weekly-update.yml` after `bun update`, and consider a
plain `on: push` lint workflow.

Commit: `ci: run bun lint after weekly dependency update`

---

## 7. README names the wrong markdown plugin

Intro bullet says "Markdown files support via `eslint-plugin-markdown`". The
dependency is `@eslint/markdown`.

Commit: `docs: correct markdown plugin name`

---

## 8. All four exported configs are unnamed

`typescript`, `markdown`, `tailwind`, and `vue` are the only unnamed entries in
the resolved config array, so `composer.override()` cannot target them.

If names are added, use the `acfatah/` namespace, not `registry/` as `TODO.md`
suggested. `eslint-flat-config-utils` resolves names with `findIndex`, so a
consumer with their own `registry/*` config would get a silently mis-targeted
override.

Splitting `vue` into two named configs (`acfatah/vue` and
`acfatah/vue/import-groups`) was considered during TODO 01 and rejected as
unnecessary churn. Revisit alongside naming the other three.

Commit: `feat(configs): name exported configs`

---

## 9. Markdown `vue` fences fall in scope of the new rule

`files: ['**/*.vue']` matches `@eslint/markdown`'s virtual `DOC.md/0_0.vue`
path, so `perfectionist/sort-imports` fires inside fenced Vue snippets and
`--fix` rewrites documentation. `src/configs/markdown.ts`
(`files: ['**/*.md']`) does not protect them, because the virtual path is not
`*.md`.

This is intentional for now: docs stay consistent with code. `README.md`'s Vue
snippet is already in canonical layout and `bun lint` passes.

If it ever becomes a problem, add `ignores: ['**/*.md/**']` to the `vue`
config.
