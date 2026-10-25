# Gradient UI

[![CI](https://github.com/Deadida322/gradientUi/actions/workflows/ci.yml/badge.svg)](https://github.com/Deadida322/gradientUi/actions/workflows/ci.yml)
[![core](https://img.shields.io/npm/v/%40gradient-ui%2Fcore?label=core)](https://www.npmjs.com/package/@gradient-ui/core)
[![gradient-engine](https://img.shields.io/npm/v/%40gradient-ui%2Fgradient-engine?label=gradient%20engine)](https://www.npmjs.com/package/@gradient-ui/gradient-engine)
[![nuxt](https://img.shields.io/npm/v/%40gradient-ui%2Fnuxt?label=Nuxt)](https://www.npmjs.com/package/@gradient-ui/nuxt)
[![license](https://img.shields.io/npm/l/%40gradient-ui%2Fcore)](LICENSE)

Gradient UI is a Vue 3 component library for expressive product interfaces. It
combines accessible components, Material You-inspired design tokens and a
deterministic gradient engine. It supports client rendering, SSR and SSG.

[Documentation](https://gradient-ui-docs.netlify.app/docs/get-started) · [Nuxt and SSR](https://gradient-ui-docs.netlify.app/docs/ssr-nuxt) · [Figma plugin](https://gradient-ui-docs.netlify.app/docs/figma-plugin) · [Playground](https://gradient-ui-docs.netlify.app/playground)

## Packages

| Package                                                                                      | Purpose                                                             |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| [`@gradient-ui/core`](https://www.npmjs.com/package/@gradient-ui/core)                       | Vue components, directives, theme system and SSR utilities.         |
| [`@gradient-ui/gradient-engine`](https://www.npmjs.com/package/@gradient-ui/gradient-engine) | Framework-free gradient, material, effect and animation generation. |
| [`@gradient-ui/nuxt`](https://www.npmjs.com/package/@gradient-ui/nuxt)                       | Nuxt 3/4 module with SSR-aware theme and runtime integration.       |

## Install

Gradient UI requires Vue 3.5+ and Node.js 20.19+.

```bash
npm install @gradient-ui/core
```

Import the stylesheet once, then install the plugin when the whole component
catalogue and default directives are needed:

```ts
import { createApp } from 'vue';
import { createGradientUI } from '@gradient-ui/core';
import '@gradient-ui/core/style.css';
import App from './App.vue';

createApp(App)
	.use(
		createGradientUI({
			theme: { seed: '#704aff', mode: 'light' }
		})
	)
	.mount('#app');
```

Use explicit imports if only selected components are needed:

```ts
import { GButton, GInput } from '@gradient-ui/core/components';
import '@gradient-ui/core/style.css';
```

## Nuxt 3 and 4

Install the core package and Nuxt module:

```bash
npm install @gradient-ui/core @gradient-ui/nuxt
```

```ts
export default defineNuxtConfig({
	modules: ['@gradient-ui/nuxt'],
	gradientUI: {
		theme: { seed: '#704aff', mode: 'light' }
	}
});
```

The module emits initial theme styles during SSR, creates isolated state per
Nuxt application/request and offers component auto-imports. For request-aware
responsive rendering, color mode, CSP and services outside component setup, see
the [Nuxt and SSR guide](https://gradient-ui-docs.netlify.app/docs/ssr-nuxt).

## Components and responsive SCSS

The upcoming `1.2.0` release adds these public components:

| Components                                                                                                                                                                     | Purpose                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| [`GBottomNavigation`, `GBottomNavigationItem`](https://gradient-ui-docs.netlify.app/docs/components/bottom-navigation)                                                         | Destination navigation with `v-model`, native/optional router links, material variants and morph. |
| [`GFileInput`](https://gradient-ui-docs.netlify.app/docs/components/file-input), [`GImageInput`](https://gradient-ui-docs.netlify.app/docs/components/image-input)             | Standard fields for local files and images.                                                       |
| [`GFileDropzone`](https://gradient-ui-docs.netlify.app/docs/components/file-dropzone), [`GImageDropzone`](https://gradient-ui-docs.netlify.app/docs/components/image-dropzone) | Drag-and-drop selection with shared validation, rejection messages and image previews.            |
| [`GSpacer`](https://gradient-ui-docs.netlify.app/docs/components/spacer)                                                                                                       | Flexible space between items in a flex layout.                                                    |

File components select local `File` values; the application owns server upload.
They share field validation and disabled state with `GForm`. Image checks expose
`pending`; form validation waits for these checks before reporting a valid submit.

Bottom navigation supports `tonal`, `glass`, `gradient`, `default` and `outlined`
surfaces, gradient recipes and morph options. Its moving indicator is shared with
`GNavbar` and horizontal/vertical line tabs. Use `position="fixed"` only when the
application reserves space for the navigation bar; the default is `static`.

`GButton` supports `to` with optional Vue Router integration and a native anchor
fallback for string destinations. Nuxt is not required. `GQuickActions` supports
controlled open state, selection events and closing after selection.

For responsive styles, import the Sass module independently from the compiled CSS:

```scss
@use '@gradient-ui/core/styles/media';

.catalog {
	@include media.up(md) {
		display: grid;
	}

	@include media.between(sm, lg) {
		gap: var(--g-token-space-4);
	}
}
```

`up`, `down` and `between` use inclusive boundaries. Defaults match CSS helpers
and `useBreakpoints`: `sm: 600px`, `md: 900px`, `lg: 1200px`, `xl: 1536px`.
See [CSS helpers and SCSS media mixins](https://gradient-ui-docs.netlify.app/docs/css-helpers#scss-media)
for custom breakpoint maps and the Sass Node package importer.

## Gradient engine

The engine is independent from Vue and can power other renderers or design
tools:

```bash
npm install @gradient-ui/gradient-engine
```

```ts
import { createGradientMaterial } from '@gradient-ui/gradient-engine';

const material = createGradientMaterial('#704aff', {
	preset: 'materialAction',
	recipe: 'glare'
});
```

## Figma plugin

Gradient UI Builder turns a seed color into editable Figma gradients, design
tokens, glow layers and morph backgrounds. The plugin creates native Figma
objects so a design can be refined after generation. Read the
[Figma plugin guide](https://gradient-ui-docs.netlify.app/docs/figma-plugin).

## Development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run type-check
npm run eslint
npm run lint:css
npm run build
```

## Releases

Releases are created through the `Release Package` GitHub Actions workflow. It
releases the selected package (`core`, `gradient-engine` or `nuxt`) independently,
runs the SSR release gate and creates its GitHub release. Dependency ranges
describe compatibility and are updated explicitly when required; releasing core
does not bump engine or Nuxt. See [DEPLOYMENT.md](DEPLOYMENT.md) for the release and
trusted-publishing setup.

## License

[MIT](LICENSE)
