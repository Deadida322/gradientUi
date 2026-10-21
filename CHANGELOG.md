# Changelog

## 1.1.0 - Unreleased

### Added

- Added `GDropdown` to the public component exports and Nuxt auto-import list.
- Added `rounded` and `hide-message` props to `GInput`, `GTextarea`, `GSelect`
  and `GCombobox`.
- Added component documentation and examples for `GDropdown` and `GNavbar`,
  including controlled dropdown state, varied activators and large-logo navbar
  layouts.

### Changed

- Decoupled `GNavbarItem` and `GNavbarMenu` height from the navbar shell. Use
  `--g-navbar-height` for the shell and `--g-navbar-item-height` for navigation
  items.
- Consolidated `GIcon` onto one implementation with a predictable square
  `inline-flex` layout and centered glyphs.
- Improved prepend and append alignment in button content.
- Improved the release workflow so interrupted multi-package releases can be
  resumed safely and local workspace dependencies are built before publishing.

### Fixed

- Fixed controlled `GDropdown` state synchronization.
- Fixed dropdown activators opening and immediately closing on their first
  pointer click when both click and focus activation are enabled.
- Fixed navbar menus stretching to match oversized logos or other tall header
  content.
- Fixed `GIcon` alignment in standalone usage and composed controls.
- Fixed compact fields reserving helper-message space when messages are hidden.

### Breaking Changes

- No required API migrations. Custom styles that depended on `GIcon` being a
  block-level flex container may need to move layout rules to a wrapper.

### Package Notes

- `@gradient-ui/core`, `@gradient-ui/gradient-engine` and `@gradient-ui/nuxt`
  are released as a synchronized `1.1.0` version set.
- `@gradient-ui/gradient-engine` and `@gradient-ui/nuxt` have no direct
  implementation changes in this release.

## 1.0.1 - 2026-10-20

### Fixed

- Fixed Nuxt module type preparation by using the official module builder and
  resolving setup types from the installed Nuxt kit.
- Declared the Nuxt schema dependency required by generated module types.
- Fixed documentation builds resolving Nuxt Fonts and the Linux Lightning CSS
  binary in CI.
- Hardened the release workflow and restored a consistent `1.0.1` package
  baseline after a partial publish.

## 1.0.0 - 2026-10-20

### Added

- Added `GAvatar` and `GAvatarGroup` with image, initials, icon, shape, size,
  material variant and texture support.
- Added `GCard` with composable anatomy, layout options, material variants,
  media-friendly slots and texture support.
- Added `GDivider` with horizontal and vertical orientation, labels, icon and
  content slots, material variants, gradient-aware styling and textures.
- Added `GCombobox` as an editable select built on shared select primitives,
  with typed props and slots, filtering, multiple chips, custom add flow and
  `add` event support.
- Added `GStepper`, `GStepPanel` and `GStepperActions` for declarative ordered
  flows with typed item, panel and actions slots.
- Added shared navigation controller and keyboard handling for tab-like and
  step-like components.
- Added reusable state icon resolution for semantic indicators and per-item
  stepper icon overrides.
- Added `@gradient-ui/nuxt` for Nuxt 3/4 SSR, theme head styles, request-local
  runtime state, Teleports, component auto-imports and optional Color Mode
  integration.
- Added public SSR utilities for deterministic theme head output, CSP nonces,
  request-local viewport values and stable IDs.
- Added `GImg` with aspect ratio, responsive image attributes, lazy placeholder,
  gradient overlay, object fit and content slots.
- Added `useGradientUI()` for access to the Nuxt service runtime outside Vue
  component setup.
- Added Nuxt SSG documentation, SSR/CSP guidance, Figma plugin documentation,
  SEO metadata, sitemap and favicon support.

### Changed

- Refactored select-like field behavior so combobox reuses shared item
  normalization, selection, keyboard and field-control composables.
- Refactored `GTabs` onto the shared navigation controller used by `GStepper`.
- Improved input surface variants with clearer `default`, `tonal`, `glass`,
  `outlined` and `text` behavior.
- Moved the documentation application from Vite to Nuxt SSG.
- Consolidated publishing into one release workflow with workspace-version
  synchronization and npm Trusted Publishing through GitHub OIDC.

### Breaking Changes

- `GChip` remove interactions now use the `remove` event as the preferred Vue
  API.
- Removed `createAppScopedState`; use `defineAppScopedState`.
- `useSnackbar()` and `useLoading()` now require an active Vue setup context.
  Use `useGradientUI()` in Nuxt code outside setup or
  `getGradientUIServices(app)` in a plain Vue host.

## 0.5.0

Gradient UI `0.5.0` is a stable release focused on the new color,
material and gradient architecture.

### Added

- Added the standalone `@gradient-ui/gradient-engine` package.
- Added gradient recipes for `glare`, `monochrome`, `complementary`,
  `split-complementary`, `analogous`, `triadic`, `tetradic`, `rectangle`,
  `square` and `duotone`.
- Added engine output for CSS gradients, SVG gradients, canvas descriptors,
  shadows, drop-shadows, morph effects and animation CSS.
- Added material token generation through `createGradientMaterial`.
- Added a client runtime layer in Gradient UI for generated keyframes and morph
  SVG filters.
- Added gradient-engine documentation and playground examples.

### Changed

- Reworked color generation around the new palette and color-system layer.
- Reworked gradient-backed component surfaces to use gradient material output.
- Changed the main component variant model: `default` is now the regular
  material fill, while `gradient` is the explicit gradient surface.
- Improved gradient text contrast by choosing foreground color from generated
  gradient stops.
- Improved gradient border animation behavior for supported animation presets.

### Breaking Changes

- Replaced gradient `variant="filled"` usage with `variant="gradient"`.
- `default` should be used for the normal non-gradient material fill.
- Gradient animation and morph effects are now material/runtime concerns rather
  than ad hoc component CSS.

### Package Notes

- `@gradient-ui/gradient-engine@0.6.0` is used as the standalone engine package.
- The engine package is framework-free and does not mount DOM nodes by itself.
- SSR support should use generated `cssVars`, `cssText` and `keyframes`, while
  client adapters mount optional runtime effects.

### Migration

```vue
<!-- before -->
<g-button variant="filled" />

<!-- after -->
<g-button variant="gradient" />
```

```ts
// before
createGradientUI({
	defaults: {
		GButton: {
			variant: 'filled'
		}
	}
});

// after
createGradientUI({
	defaults: {
		GButton: {
			variant: 'default'
		}
	}
});
```

Use `variant="gradient"` only when the component should render the expressive
gradient background.
