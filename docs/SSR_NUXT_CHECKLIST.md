# Nuxt and SSR support

Status is based on automated checks, not only code inspection.

## Shared SSR foundation

- [x] Public `@gradient-ui/core/ssr` ESM/CJS entrypoint with declarations.
- [x] Keep all SSR code under `src/ssr`, split into `utils` and `use` subfolders.
- [x] Environment checks: `canUseDom`, client `window`/`document` getters and type guards.
- [x] Client lifecycle helpers: `runOnClient`, `onClientMounted`, `useHydrated`.
- [x] Hydration-safe Teleport state through `useSsrTeleport`.
- [x] Declarative component/style mounts that become no-ops on the server.
- [x] Ref-counted client element registry for shared DOM resources.
- [x] App-scoped state factory for request/application isolation.
- [x] Deterministic component IDs backed by Vue `useId()`.

## Core adoption

- [x] Overlay layer stack is scoped to a Vue application.
- [x] Vue body Teleports stay inline until mounted; Nuxt uses SSR `#teleports`.
- [x] Theme generation is pure on the server and exposes CSS text/classes.
- [x] Snackbar and loading services are safe server no-ops.
- [x] Loading and tooltip directives use the shared mount abstraction.
- [x] Floating, breakpoint, overlay and scroll-lock browser access is guarded.
- [x] Gradient runtime styles use the shared ref-counted registry.
- [x] Transition, focus and navbar DOM checks use the shared type guards.
- [x] Raw environment detection and imperative Vue mounting are centralized in `src/ssr`.

## Nuxt integration

- [x] `@gradient-ui/nuxt` module adds core CSS and a runtime plugin.
- [x] Runtime plugin installs a fresh Gradient UI instance per Nuxt app/request.
- [x] Initial theme CSS and HTML classes are emitted into the SSR head.
- [x] External config files support non-serializable options such as functions/icons.
- [x] Nuxt module package build.
- [x] End-to-end Nuxt playground production build.
- [x] Runtime HTTP smoke verifies rendered components, theme classes and head styles.
- [x] Browser hydration smoke checks mismatches, errors, Teleports and interactions.

The Nuxt module is useful even though core is SSR-safe: it centralizes CSS setup,
creates request-local plugin state, and puts initial theme data into server HTML.
Without it, users must repeat this wiring in their own `plugins/*.ts` and Nuxt config.

Vuetify needs the same integration category for the same reasons, plus its larger
runtime services (display/breakpoints, defaults, locale, icons and date adapters).
Its Nuxt module also owns build-time conveniences such as component/directive
imports and asset/style configuration. Gradient UI currently keeps auto-import as
an optional later step.

## Verification

- [x] Documentation runs as a Nuxt SSR application and consumes the local module.
- [x] Documentation uses file-based pages and a shared Nuxt layout.
- [x] `nuxt generate` prerenders guide, playground and component API routes.
- [x] Static hosting publishes `docs/.output/public` with generated 404 fallback.
- [x] Vue server-render smoke coverage for representative components and services.
- [x] Concurrent deterministic renders cover request-state isolation.
- [x] Server no-op coverage for checks, mounts and DOM registries.
- [x] Library build and declaration generation.
- [x] ESLint for every changed source file.
- [x] Full repository ESLint check on Windows and CI-compatible line endings.
- [x] Published ESM keeps stable identifiers while retaining esbuild syntax
      minification, so Nuxt/Rollup can safely bundle it again.
- [x] Generated build output uses guarded retry cleanup for repeatable Windows
      release runs.
- [x] Browser hydration test with mismatch/error assertions.
- [x] Official `@nuxt/test-utils` fixture verifies server-rendered output.
- [x] Clean packed consumer installs npm tarballs instead of workspace sources.
- [x] Packed consumer checks package exports, Nuxt types, SSR and hydration.
- [x] Published tarballs exclude transient TypeScript build caches.
- [x] Generated static site is served and hydrated in a real browser.
- [x] SSR and hydration smoke tests are wired into CI.
- [x] CI matrix is configured for Node 20.19/22, latest Nuxt 3 and Nuxt 4.
- [x] CI matrix is configured for minimum and latest supported Vue 3 versions.
- [ ] Confirm the new compatibility matrix is green in GitHub Actions.
- [x] Repository declares Node 20.19+ and pins development to Node 22.
- [x] One `npm run release:ssr:check` gate covers lint, types, styles, SSR,
      hydration, fixtures, SSG and packed package contents.

## Later enhancements

- [x] Component auto-imports and a separate runtime entry without global registration.
- [ ] Optional selective directive installation (directives remain globally installed).
- [ ] Additional test-utils fixtures for `css: false`, `theme: false` and
      external `configFile` options.
- [ ] Nitro build smoke for non-Node deployment presets.
- [x] Optional Nuxt Color Mode integration, both palettes before hydration and cookie persistence.
- [x] Documentation uses Nuxt Fonts with local Manrope files and generated fallback metrics.
- [x] SVG cutout matches surface geometry without the half-pixel overlap visible through glass.
- [ ] Shared service host: explicitly deferred; see `graphify-out/TODO.md` and graphify memory.
- [x] App-scoped service runtime and `useGradientUI()` for calls outside Vue setup.
- [x] Dedicated component entries keep unused component JavaScript out of Nuxt bundles.
- [ ] Viewport and reduced-motion Client Hints.
- [x] Document CSP support through per-request nonces for SSR and hashes for SSG.
