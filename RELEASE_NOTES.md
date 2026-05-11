# Gradient UI v0.1.0

First public release of Gradient UI, a Vue 3 component library focused on
Material You inspired tokens, gradient-aware surfaces, compact controls and
typed APIs.

## Highlights

- Added the core Gradient UI plugin with full library registration through
  `createGradientUI` and the default `GradientUI` plugin export.
- Added subpath exports for focused imports:
    - `@gib/gradient-ui/components`
    - `@gib/gradient-ui/directives`
    - `@gib/gradient-ui/services`
    - `@gib/gradient-ui/theme`
    - `@gib/gradient-ui/use`
    - `@gib/gradient-ui/style.css`
- Added Material You inspired theme generation, CSS tokens, gradient helpers,
  surface helpers and component defaults.
- Added documentation app with routed pages for getting started, design tokens,
  core conceptions, forms, directives, CSS helpers and component APIs.
- Added Netlify and Vercel configuration for documentation hosting.
- Added GitHub Actions for CI and npm package publishing.

## Components

This release includes the first public component set:

- Actions and containment: `GButton`, `GChip`, `GBadge`, `GFAB`,
  `GQuickActions`, `GExpansion`, `GExpansionGroup`, `GModal`, `GDrawer`,
  `GMenu`, `GDropdown`, `GTooltip`.
- Navigation: `GNavbar`, `GAside`, `GNavList`, `GTabs`.
- Forms and selection: `GInput`, `GTextarea`, `GSelect`, `GCheckbox`,
  `GCheckboxGroup`, `GRadio`, `GSwitch`.
- Feedback: `GAlert`, `GLoading`, `GProgress`, `GSnackbar`.
- Foundation: `GGradient`, `GIcon`, `GText`, `GSquircle`.

## Directives And Services

- Added public directives:
    - `v-gradient-icon`
    - `v-gradient-text`
    - `v-loading`
    - `v-mask`
    - `v-ripple`
    - `v-tooltip`
- Added services:
    - `useLoading`
    - `useSnackbar`

## Forms And Validation

- Form components integrate with validation rules compatible with
  `gib-validate`.
- `gib-validate` is the recommended public validation package for applications
  that need to author rules or use validation composables directly.
- Added docs examples for validation flows across input, textarea and select
  components.

## Packaging

- Added library build outputs for ESM and CJS.
- Added generated declaration files.
- Added npm package metadata, public package exports and `prepack` build.
- `vue` is the only peer dependency.
- `vue-router` is optional. Navigation components use a globally registered
  `RouterLink` when the host app installs Vue Router, and fall back to regular
  anchors for string `to` values when it does not.

## Documentation And Deployment

- Documentation builds separately through `npm run build:docs`.
- Library builds separately through `npm run build:lib`.
- Full validation build is available through `npm run build`.
- Netlify deploys documentation from `dist-docs`.
- Vercel is configured with the same docs build and output directory.

## Installation

```bash
npm install @gib/gradient-ui
```

```ts
import { createApp } from 'vue';
import GradientUI from '@gib/gradient-ui';
import '@gib/gradient-ui/style.css';
import App from './App.vue';

createApp(App).use(GradientUI).mount('#app');
```

## Verification

The release was checked locally with:

```bash
npm run type-check
npm run eslint
npm run lint:css
npm run build
npm pack --dry-run
```
