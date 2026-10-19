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
synchronizes the publishable workspace versions, runs the SSR release gate,
publishes `gradient-engine`, `core` and `nuxt` in dependency order, then creates
the GitHub release. See [DEPLOYMENT.md](DEPLOYMENT.md) for the release and
trusted-publishing setup.

## License

[MIT](LICENSE)
