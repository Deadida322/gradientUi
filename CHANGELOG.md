# Changelog

## 0.7.0


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

### Changed

- Refactored select-like field behavior so combobox reuses shared item
  normalization, selection, keyboard and field-control composables.
- Refactored `GTabs` onto the shared navigation controller used by `GStepper`.
- Improved input surface variants with clearer `default`, `tonal`, `glass`,
  `outlined` and `text` behavior.

### Breaking Changes
- `GChip` remove interactions now use the `remove` event as the preferred Vue

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
