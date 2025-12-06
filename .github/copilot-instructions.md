# Copilot Instructions

## Coding Style

- Always fix lint errors as the last task, only after all other tasks are completed.
- Use `bun run format [..file]` to format code or files.
- We are using ESLint: `@antfu/eslint-config` via `eslint.config.js`
  - two-space indent
  - single quotes
  - alphabetised imports with `perfectionist/sort-imports`
  - empty line before `return`
- Naming Vue components/composables
  - components use PascalCase
  - component file use script setup syntax, with `<script setup lang="ts">`
  - composables/hooks/helpers/files use kebab-case
  - always use `use` prefix for composables/hooks but filename
- Naming React components/Redux
  - slices use PascalCase
  - hooks/helpers/files use camelCase
  - config keys use UPPER_SNAKE_CASE

## Contribution Rules

- Keep changes minimal and focused; avoid unrelated refactors.
- Do not change filenames/exports unless requested.
- Prefer fixing root causes over surface patches.
- Do not add license/copyright headers.
- Use Conventional Commits (conventionalcommits.org): `feat(scope): ...`,
  `fix(scope): ...`, `chore(scope): ...` (≤72 chars). Document verification steps
  and note env vars/migrations in the body.
- PRs: concise summary, linked issues, UI screenshots/GIFs, and env/monitoring notes
  as needed.

## Testing & Verification

- Do not merge Bun.env and process.env. Find where dotenv files are located,
  cd into that directory and run commands from there.
- Start with specific tests near changed code, then broaden.
- Don’t fix unrelated broken tests.

## Code Comments

- Limit lines around 80 characters. Insert line breaks with correct indents so line
  stays between 80 characters.
- Be concise, use bullets.
- Use fenced block for code snippets and commands.
- Wrap commands, file paths, env vars, and code identifiers in backticks.

## Documentation

- Use markdown formatting.
- Limit lines around 80 characters. Insert line breaks with correct indents so line
  stays between 80 characters.
- Be concise, use bullets.
- Wrap commands, file paths, env vars, and code identifiers in backticks.
- Use bullets and short sections for scanability.
- Use tables whenever helpful.
- Use fenced block for code snippets and commands.
- Wrap commands, file paths, env vars, and code identifiers in backticks.

## Response & Output Style

- Formatting is the same as Documentation above.
- Be concise and friendly; prioritize actionable guidance.
- Use what, why, and how to explain concepts.
- Include tips, gotchas, and common pitfalls; something that need to be aware of.
- Provide bash-ready commands in fenced blocks when giving steps.
- When editing code, prefer minimal diffs and preserve existing style.
- If you create multiple files or non-trivial code, include a short run/test snippet.
- Never use emojis, en or em dashes in responses.
