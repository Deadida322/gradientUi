# Gradient UI 1.1.0

## Highlights

- Promoted `GDropdown` to the public component API and added documentation for
  controlled state, placement and button, chip, avatar and icon activators.
- Added `rounded` and `hide-message` field props for compact and pill-shaped
  form controls.
- Added complete `GNavbar` documentation and decoupled navbar item height from
  the height of the navbar shell.
- Fixed icon alignment in standalone icons, buttons and slotted action content.

## Upgrade notes

### GDropdown is now public

`GDropdown` can now be imported from `@gradient-ui/core` or auto-imported by
`@gradient-ui/nuxt`. Its controlled state uses the standard `v-model` API.

```vue
<script setup lang="ts">
	import { ref } from 'vue';
	import { GButton, GDropdown } from '@gradient-ui/core';

	const open = ref(false);
</script>

<template>
	<GDropdown v-model="open">
		<template #activator="{ activatorAttrs, activatorRef }">
			<GButton
				:ref="activatorRef"
				v-bind="activatorAttrs"
				label="Open menu" />
		</template>

		Menu content
	</GDropdown>
</template>
```

Click activation no longer opens and immediately closes the dropdown when the
activator also uses focus activation.

### Compact and rounded fields

`GInput`, `GTextarea`, `GSelect` and `GCombobox` now accept `rounded` and
`hide-message`.

```vue
<GInput
	hide-message
	rounded
	size="s"
	aria-label="Search"
	placeholder="Search" />
```

`hide-message` removes the helper area and its reserved space while keeping
validation active. Use an accessible label or `aria-label` when the visible
field label is omitted.

### Independent navbar heights

Navbar density now controls the height of navigation items independently from
the navbar shell. This prevents menus from stretching when a large logo or
other tall content increases the header height.

```css
.app-navbar {
	--g-navbar-height: 96px;
	--g-navbar-item-height: 48px;
}
```

- `--g-navbar-height` controls the minimum height of the navbar shell.
- `--g-navbar-item-height` overrides the height of `GNavbarItem` and
  `GNavbarMenu`.
- Without an explicit item height, the selected navbar density is used.

### Icon layout

`GIcon` now has a predictable square `1em` layout, uses `inline-flex` and
centers its glyph on both axes. The obsolete duplicate internal implementation
was removed; this does not remove a public entry point.

If application styles depended on `GIcon` behaving as a block-level flex
container, move those layout rules to a wrapper or override the icon display
locally.

## Breaking changes

There are no required API migrations in this release. The `GIcon` display
change described above can affect custom layout overrides that relied on its
previous block-level behavior.

## Compatibility

- `@gradient-ui/core` and `@gradient-ui/nuxt` require Node.js 20.19+.
- `@gradient-ui/core` requires Vue 3.5+.
- `@gradient-ui/nuxt` supports Nuxt 3.15+ and Nuxt 4.
