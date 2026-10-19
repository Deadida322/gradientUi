# @gradient-ui/nuxt

Nuxt 3/4 integration for `@gradient-ui/core`.

```bash
npm install @gradient-ui/core @gradient-ui/nuxt
```

```ts
export default defineNuxtConfig({
	modules: ['@gradient-ui/nuxt'],
	gradientUI: {
		theme: {
			seed: '#6750a4',
			mode: 'light'
		}
	}
});
```

Use `configFile` when the configuration contains functions or custom icon
components:

```ts
export default defineNuxtConfig({
	modules: ['@gradient-ui/nuxt'],
	gradientUI: {
		configFile: './gradient-ui.config.ts'
	}
});
```

## SSR and auto-imports

Components are auto-imported on use, with Gradient UI defaults preserved.
`components: false` disables these auto-imports; explicit Vue imports still work.
`useGradientTheme`, `useGradientUI`, `useSnackbar` and `useLoading` are also
auto-imported.
The runtime installs defaults, icons and directives without globally registering
the component catalogue. CSS is still a shared stylesheet, not per-component CSS.
Auto-imports resolve dedicated component entries such as
`@gradient-ui/core/components/GButton`, allowing unused component JavaScript to
be removed from the production bundle. The global stylesheet remains shared.

Default `body` overlays use Nuxt's server-rendered `#teleports` target. Explicit
custom targets retain the client-mount fallback. Without the Nuxt module, core's
body Teleports remain inline until mounted.

## SSR viewport

Responsive components receive an app-local SSR viewport. The module reads
`sec-ch-viewport-width` for each request by default, then `viewport-width`, and
finally `ssr.initialWidth` (or `0` when none is usable). Values that are not
finite non-negative numbers are ignored, so one request cannot affect another.

```ts
export default defineNuxtConfig({
	gradientUI: {
		ssr: {
			initialWidth: 1024,
			initialHeight: 768,
			viewportWidthHeader: 'x-viewport-width'
		}
	}
});
```

`initialHeight` is a deterministic fallback only; no client-height request
header is read. For the most accurate first render, configure your edge or
client-hint policy to forward `Sec-CH-Viewport-Width`.

## Color mode before hydration

Install `@nuxtjs/color-mode` separately and opt in:

```ts
export default defineNuxtConfig({
	modules: ['@nuxtjs/color-mode', '@gradient-ui/nuxt'],
	colorMode: {
		preference: 'system',
		fallback: 'light',
		classPrefix: 'g-theme--',
		classSuffix: '',
		storage: 'cookie'
	},
	gradientUI: { colorMode: true, theme: { seed: '#6750a4' } }
});
```

Both palettes are included in SSR HTML. Color Mode owns preference/storage and
the early mode class; Gradient UI owns token generation and head styles.
Use `useColorMode().preference` for `system` support. Theme `setMode`/`toggleMode`
also update the preference. Wrap preference-dependent controls in `ColorScheme`
with a fixed-size placeholder; SSG cannot know a visitor's preference at build time.
Core has no Nuxt or Color Mode dependency. `theme: false` disables generated themes.

## Services outside component setup

`useSnackbar()` and `useLoading()` are Vue composables. Call them in component,
composable or setup-store setup. The module installs one service runtime per Nuxt
application/request, so consumers in the same app share state without leaking it
to another SSR request.

Nuxt middleware, actions and ordinary functions that run outside Vue setup must
resolve the installed runtime through `useGradientUI()`:

```ts
export default defineNuxtRouteMiddleware(() => {
	const { snackbar, loading } = useGradientUI();

	snackbar.show('Route changed');
	loading.show({ target: '#content', text: 'Loading…' });
});
```

For framework-independent Vue code, keep the `App` returned by `createApp` and
resolve its runtime explicitly:

```ts
import { getGradientUIServices } from '@gradient-ui/core/services';

const app = createApp(App);
app.use(GradientUI);

const { snackbar } = getGradientUIServices(app);
```

Calling `useSnackbar()` or `useLoading()` with no active setup context throws a
descriptive error. This prevents an accidental process-global singleton during
SSR. `show()` remains a no-op on the server because services represent browser UI;
invoke it in client-side middleware, an event handler or `onMounted` when visual
output is expected.

## Content Security Policy (CSP)

CSP is an HTTP security policy that limits which scripts, styles, fonts and other
resources a browser may execute or load. It reduces the impact of injected HTML
and cross-site scripting (XSS). Gradient UI emits theme tokens as inline `<style>`
elements, so a strict `style-src` policy must explicitly authorize them.

The recommended Nuxt setup is `nuxt-security`; no Gradient UI nonce option is
needed. In SSR mode Nuxt Security adds its per-request nonce to the three theme
styles registered by Gradient UI through `useHead`. In SSG mode it can generate
CSP hashes instead:

```ts
export default defineNuxtConfig({
	modules: ['nuxt-security', '@gradient-ui/nuxt'],
	security: {
		nonce: true,
		headers: {
			contentSecurityPolicy: {
				'style-src': [
					"'self'",
					// Used by generated static pages; modern SSR browsers prefer the nonce.
					"'unsafe-inline'",
					"'nonce-{{nonce}}'"
				],
				// Vue components use dynamic style attributes for geometry and tokens.
				'style-src-attr': ["'unsafe-inline'"]
			}
		}
	}
});
```

Do not put a fixed nonce in `nuxt.config`: a nonce must be random and unique for
every SSR response. A nonce authorizes `<style>` elements, but not Vue's dynamic
`style` attributes; those need the separate `style-src-attr` rule above.

SSG has no per-request nonce. The example keeps `'unsafe-inline'` as its static
fallback and Nuxt Security's default `hashStyles: false`. Enable `hashStyles`
only after testing hydration and client navigation in the production output;
Nuxt Security recommends leaving style hashing disabled because client-side
style updates may not match build-time hashes.

References: [Color Mode](https://color-mode.nuxtjs.org/usage/configuration),
[Nuxt Teleport](https://nuxt.com/docs/3.x/api/components/teleports),
[Nuxt Security CSP](https://nuxt-security.vercel.app/headers/csp).
