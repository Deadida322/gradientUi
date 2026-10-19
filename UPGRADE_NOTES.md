# Gradient UI 1.0.0

## Highlights

- Added `@gradient-ui/nuxt` for Nuxt 3/4 applications. It installs SSR-aware
  theme styles, request-scoped runtime state, Teleport support, optional
  component auto-imports and Color Mode integration.
- Added an SSR foundation to `@gradient-ui/core`: deterministic head styles,
  CSP nonce support, request-local viewport values and SSR-safe IDs.
- Added `GImg`, an SSR-friendly image component with aspect ratio, responsive
  source attributes, lazy placeholder, gradient overlay, object fit and content
  slots.
- Added `useGradientUI()` for Nuxt middleware and other code outside component
  setup, without introducing process-global service state.
- Added user documentation for SSR, Nuxt, CSP, the Figma plugin, static SEO and
  package installation.

## Upgrade notes

### Nuxt applications

Install the module alongside core and add it to `nuxt.config.ts`:

```bash
npm install @gradient-ui/core @gradient-ui/nuxt
```

```ts
export default defineNuxtConfig({
	modules: ['@gradient-ui/nuxt']
});
```

Use `useGradientUI()` in Nuxt middleware, plugins and ordinary functions that
run outside Vue component setup. `useSnackbar()` and `useLoading()` remain the
preferred APIs inside setup.

### SSR and CSP

Use the Nuxt module for Nuxt SSR. It emits theme styles before hydration and
keeps theme, services and viewport state isolated per request. Projects with a
strict Content Security Policy should configure a per-request nonce through
their Nuxt CSP solution; never add a fixed nonce to `nuxt.config.ts`.

For plain Vue SSR, use the public `@gradient-ui/core/ssr` helpers to render
Gradient UI head descriptors and install a request-local viewport when a
responsive composable needs one.

### Breaking changes

- `createAppScopedState` was removed. Rename imports to
  `defineAppScopedState`.
- Calling `useSnackbar()` or `useLoading()` without an active Vue setup context
  now throws instead of falling back to shared process state. In a Nuxt runtime,
  resolve services with `useGradientUI()`; in a plain Vue host, use
  `getGradientUIServices(app)`.

## Compatibility

- `@gradient-ui/core` and `@gradient-ui/nuxt` require Node.js 20.19+.
- `@gradient-ui/core` requires Vue 3.5+.
- `@gradient-ui/nuxt` supports Nuxt 3.15+ and Nuxt 4.
