# Gradient UI

Gradient UI is a Vue 3 component library built around Material You inspired
tokens, expressive gradients, compact form controls, floating layers,
directives and service helpers.

It is designed for product interfaces that need a polished default look without
giving up explicit TypeScript APIs.

The npm package is published as `@gib/gradient-ui`.

## Install

```bash
npm install @gib/gradient-ui
```

Gradient UI expects Vue 3. `vue-router` is optional: navigation components use
the globally registered `RouterLink` when your app installs a router, and fall
back to regular anchors for string `to` values when it does not.

## Full Registration

Import the stylesheet once near your app entry and install the plugin.

```ts
import { createApp } from 'vue';
import { createGradientUI } from '@gib/gradient-ui';
import '@gib/gradient-ui/style.css';
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
			variant: 'filled'
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
import GradientUI from '@gib/gradient-ui';

app.use(GradientUI);
```

## Manual Imports

Components, directives, services, theme helpers and composables are exposed as
subpath exports.

```ts
import { GButton, GInput, GModal } from '@gib/gradient-ui/components';
import { vRipple, vMask, vTooltip } from '@gib/gradient-ui/directives';
import { useSnackbar, useLoading } from '@gib/gradient-ui/services';
import { createTheme, useTheme } from '@gib/gradient-ui/theme';
import { useBreakpoints, useMask } from '@gib/gradient-ui/use';
import '@gib/gradient-ui/style.css';
```

You can also import public APIs from the root package:

```ts
import { GButton, createGradientUI, useSnackbar } from '@gib/gradient-ui';
```

## Optional Router

Navigation components such as `GNavItem` and `GAsideItem` support both `href`
and `to`.

With Vue Router installed in the host app, `to` renders through `RouterLink`:

```ts
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import GradientUI from '@gib/gradient-ui';
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
				variant: 'filled',
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
import { vRipple } from '@gib/gradient-ui/directives';

app.directive('ripple', vRipple);
```

## Services

Service helpers are regular named exports.

```ts
import { useLoading, useSnackbar } from '@gib/gradient-ui/services';

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
import '@gib/gradient-ui/style.css';
import { createGradientUI } from '@gib/gradient-ui';
import { GButton } from '@gib/gradient-ui/components';
import { vRipple } from '@gib/gradient-ui/directives';
import { useSnackbar } from '@gib/gradient-ui/services';
import { createTheme } from '@gib/gradient-ui/theme';
import { useBreakpoints } from '@gib/gradient-ui/use';
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
