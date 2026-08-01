# Gradient UI

Gradient UI is a Vue 3 component library built around Material You inspired
tokens, expressive gradients, compact form controls, floating layers,
directives and service helpers.

It is designed for product interfaces that need a polished default look without
giving up explicit TypeScript APIs.

The npm package is published as `@gradient-ui/core`.

Documentation: https://gradient-ui-docs.netlify.app/docs/get-started

## 0.5 RC

Gradient UI `0.5` is the release-candidate line for the new color and gradient
architecture.

- The standalone `@gradient-ui/gradient-engine` package powers gradient
  materials, recipes, effects and animation output.
- Component variants now treat `default` as the regular material fill and
  `gradient` as the explicit gradient surface.
- `filled` has been replaced by `gradient` for gradient-backed controls.
- Color tokens are generated through the new palette layer, while components can
  still resolve semantic colors such as `primary`, `error`, `warning` and
  `success`.

Install the RC when validating the next version:

```bash
npm install @gradient-ui/core@rc
```

The gradient engine can also be installed independently:

```bash
npm install @gradient-ui/gradient-engine
```

## Install

```bash
npm install @gradient-ui/core
```

Gradient UI expects Vue 3. `vue-router` is optional: navigation components use
the globally registered `RouterLink` when your app installs a router, and fall
back to regular anchors for string `to` values when it does not.

## Full Registration

Import the stylesheet once near your app entry and install the plugin.

```ts
import { createApp } from 'vue';
import { createGradientUI } from '@gradient-ui/core';
import '@gradient-ui/core/style.css';
import App from './App.vue';

const gradientUI = createGradientUI({
	theme: {
		seed: '#704aff',
		mode: 'light'
	},
	icons: true,
	defaults: {
		global: {
			color: 'primary'
		},
		GButton: {
			rounded: true,
			variant: 'default'
		},
		GInput: {
			variant: 'outlined'
		}
	}
});

createApp(App).use(gradientUI).mount('#app');
```

The default export is also available for simple installs:

```ts
import GradientUI from '@gradient-ui/core';

app.use(GradientUI);
```

## Manual Imports

Components, directives, services, theme helpers and composables are exposed as
subpath exports.

```ts
import { GButton, GInput, GModal } from '@gradient-ui/core/components';
import { vRipple, vMask, vTooltip } from '@gradient-ui/core/directives';
import { useSnackbar, useLoading } from '@gradient-ui/core/services';
import { createTheme, useTheme } from '@gradient-ui/core/theme';
import { useBreakpoints, useMask } from '@gradient-ui/core/use';
import '@gradient-ui/core/style.css';
```

You can also import public APIs from the root package:

```ts
import { GButton, createGradientUI, useSnackbar } from '@gradient-ui/core';
```

## Optional Router

Navigation components such as `GNavItem` and `GAsideItem` support both `href`
and `to`.

With Vue Router installed in the host app, `to` renders through `RouterLink`:

```ts
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import GradientUI from '@gradient-ui/core';
import App from './App.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: []
});

createApp(App).use(router).use(GradientUI).mount('#app');
```

```vue
<g-nav-item label="Docs" to="/docs" />
```

Without Vue Router, string `to` values become regular links. Object `to` values
need Vue Router and otherwise render as non-navigation actions.

## Theme

Gradient UI can generate Material You style CSS tokens from a seed color.

```ts
app.use(
	createGradientUI({
		theme: '#704aff'
	})
);
```

Use object syntax when you need more control:

```ts
app.use(
	createGradientUI({
		theme: {
			seed: '#704aff',
			mode: 'dark',
			autoApply: true
		}
	})
);
```

Pass `theme: false` when your host application owns the CSS variables.

## Defaults

Component defaults let an application define shared prop values once.

```ts
app.use(
	createGradientUI({
		defaults: {
			global: {
				color: 'primary'
			},
			GButton: {
				variant: 'default',
				size: 'm'
			},
			GInput: {
				variant: 'outlined'
			}
		}
	})
);
```

Local props always win over configured defaults.

Use `variant: 'gradient'` when a component should render an expressive gradient
surface:

```vue
<g-button label="Save" />
<g-button label="Launch" variant="gradient" gradient-recipe="glare" />
```

## Gradient Engine

Gradient UI uses `@gradient-ui/gradient-engine` as its material generation
layer. The engine is framework-free and can be used outside Vue:

```ts
import { createGradientMaterial } from '@gradient-ui/gradient-engine';

const material = createGradientMaterial('#704aff', {
	preset: 'materialAction',
	recipe: 'glare',
	animation: {
		preset: 'shift',
		duration: 6000
	}
});
```

The returned material contains CSS variables, CSS text, keyframes and effect
descriptors that can be applied by Vue, React, vanilla JavaScript or SSR
adapters.

## Directives

The full plugin registers all public directives:

- `v-gradient-icon`
- `v-gradient-text`
- `v-loading`
- `v-mask`
- `v-ripple`
- `v-tooltip`

Manual registration is available too:

```ts
import { vRipple } from '@gradient-ui/core/directives';

app.directive('ripple', vRipple);
```

## Services

Service helpers are regular named exports.

```ts
import { useLoading, useSnackbar } from '@gradient-ui/core/services';

const snackbar = useSnackbar();
const loading = useLoading();

snackbar.success('Saved');
loading.show({ text: 'Syncing' });
```

## Forms And Validation

Form components accept validation rules compatible with `gib-validate`.

```ts
import { required, isEmail } from 'gib-validate';
```

Gradient UI includes the runtime integration used by form components. Install
`gib-validate` directly when your application wants to author rules or use its
validation composables.

## Fonts

Gradient UI does not bundle webfont CSS. The default font token uses a system
font stack.

Import your own font, or opt into Manrope and MDI font glyphs when you need
them:

```bash
npm install @fontsource/manrope @mdi/font
```

```ts
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/700.css';
import '@mdi/font/css/materialdesignicons.css';
```

```css
:root {
	--g-token-font-family-base: manrope, sans-serif;
}
```

## Package Exports

```ts
import '@gradient-ui/core/style.css';
import { createGradientUI } from '@gradient-ui/core';
import { GButton } from '@gradient-ui/core/components';
import { vRipple } from '@gradient-ui/core/directives';
import { useSnackbar } from '@gradient-ui/core/services';
import { createTheme } from '@gradient-ui/core/theme';
import { useBreakpoints } from '@gradient-ui/core/use';
```

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

## Publish Checklist

```bash
npm run build
npm pack --dry-run
npm publish --access public
```

## License

MIT
