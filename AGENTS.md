# Gradient UI Agent Notes

## Project

- Vue 3 + Vite + TypeScript component library.
- Source code lives in `src`.
- UI components live in `src/components/ui/<ComponentName>`.
- Transition components live in `src/components/transitions`.
- Shared composables live in `src/use`.
- Shared types live in `src/types`.
- SCSS tokens and mixins live in `src/styles`.
- Playground/demo components live in `src/components/Playground*.vue` and views live in `src/views`.

## Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`
- Type-check: `npm run type-check`
- Lint TypeScript/Vue: `npm run eslint`
- Fix TypeScript/Vue lint: `npm run eslint:fix`
- Lint styles: `npm run lint:css`
- Fix style lint: `npm run lint:css:fix`

## Code Style

- Prefer Vue SFCs with `<script setup lang="ts">`.
- Keep component names prefixed with `G`.
- Keep public component exports wired through `src/components/index.ts`.
- For component folders, prefer the existing local pattern: `GComponent.vue`, `types.ts`, and `index.ts` when needed.
- Use existing composables and helpers from `src/use` and `src/utils` before adding new abstractions.
- Use `propsFactory` for reusable prop factories when following existing component patterns.
- Use path alias imports such as `@/use/...`, `@/components/...`, and `@/types/...` where the repo already does.
- Keep changes scoped to the requested behavior. Do not rewrite unrelated files or refactor broadly unless asked.
- Use propsFactory to make default component props
- Use strong TS-types
- Use arrow functions

## Styling

- Use SCSS in component `<style lang="scss">` blocks.
- Prefer existing tokens, CSS variables, and mixins from `src/styles`.
- Follow BEM-like class naming already used in components, for example `g-button`, `g-button__content`, `g-button_disabled`.
- Avoid hard-coded colors, spacing, z-indexes, or focus styles when tokens/mixins exist.
- Preserve responsive layout and ensure text does not overflow controls.

## Accessibility

- Follow WAI-ARIA APG patterns for interactive widgets such as menus, dialogs, dropdowns, selects, tabs, accordions, checkboxes, radios, switches, and tooltips.
- Keyboard interaction is required for interactive components.
- Maintain visible focus states using existing focus-ring styles or local component conventions.
- Prefer native HTML semantics first, then ARIA where custom behavior requires it.
- Keep ARIA state in sync with visual state, for example `aria-expanded`, `aria-selected`, `aria-checked`, `aria-disabled`, and `aria-controls`.

## Component API

- Keep prop names consistent with nearby components: `variant`, `size`, `color`, `disabled`, `rounded`, `placement`, `state`, and similar shared props.
- Define exported TypeScript interfaces/types in `types.ts` when a component has a public API.
- Emit typed events with `defineEmits`.
- Use slots intentionally and type them with existing shared slot types when appropriate.
- Preserve backwards compatibility unless the user explicitly asks for a breaking change.

## Verification

- For component or composable changes, run `npm run type-check` when relevant.
- Run `npm run eslint` for TypeScript/Vue changes when relevant.
- Run `npm run lint:css` for SCSS changes when relevant.
- Run `npm run build` before finishing larger or cross-cutting changes.
- If a command cannot be run or fails due to unrelated existing issues, report that clearly.

## Git Safety

- The worktree may contain user changes.
- Never revert or overwrite unrelated user changes.
- Before editing files, inspect the relevant current code and work with it.
- Avoid destructive git commands unless the user explicitly requests them.

## References

* Architecture reference is vuetify and shadcn/vue
* Design reference is material you, gradients, Vuesax/alpha
