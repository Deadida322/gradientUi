<script setup lang="ts">
	import DocsCode from '@docs/components/DocsCode.vue';

	const installCode = 'npm install @gradient-ui/core @gradient-ui/nuxt';
	const moduleCode = `export default defineNuxtConfig({
  modules: ['@nuxtjs/color-mode', '@gradient-ui/nuxt'],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: 'g-theme--',
    classSuffix: '',
    storage: 'cookie'
  },

  gradientUI: {
    colorMode: true,
    theme: { seed: '#704aff' },
    ssr: {
      initialWidth: 1024,
      initialHeight: 768
    }
  }
});`;
	const viewportCode = `export default defineNuxtConfig({
  gradientUI: {
    ssr: {
      // Deterministic fallback when no viewport hint is available.
      initialWidth: 1024,
      initialHeight: 768,

      // Optional header forwarded by your proxy or edge.
      viewportWidthHeader: 'x-viewport-width'
    }
  }
});`;
	const servicesCode = `export default defineNuxtRouteMiddleware(() => {
  const { snackbar, loading } = useGradientUI();

  snackbar.show('Route changed');
  loading.show({ target: '#content', text: 'Loading…' });
});`;
	const cspCode = `export default defineNuxtConfig({
  modules: ['nuxt-security', '@gradient-ui/nuxt'],
  security: {
    nonce: true,
    headers: {
      contentSecurityPolicy: {
        'style-src': [
          "'self'",
          "'unsafe-inline'",
          "'nonce-{{nonce}}'"
        ],
        'style-src-attr': ["'unsafe-inline'"]
      }
    }
  }
});`;
</script>

<template>
	<article class="docs-page docs-ssr">
		<header class="docs-page__header">
			<p class="docs-page__eyebrow">Integration</p>
			<h1>SSR and Nuxt</h1>
			<p>
				Gradient UI renders deterministic markup on the server. The Nuxt
				module connects request-scoped state, head styles, teleports,
				component auto-imports and optional color-mode integration.
			</p>
		</header>

		<section class="docs-page__section">
			<span
				id="guarantees"
				class="docs-page__anchor"></span>
			<h2>SSR guarantees</h2>
			<div class="docs-page__grid">
				<div class="docs-page__tile">
					<h3>Request isolation</h3>
					<p>
						Themes, services and viewport state are installed per
						Vue application. They are not shared through a
						process-global singleton.
					</p>
				</div>
				<div class="docs-page__tile">
					<h3>Stable first render</h3>
					<p>
						Theme tokens and both color palettes are emitted into
						the server head. Browser-only behavior starts after
						mount.
					</p>
				</div>
				<div class="docs-page__tile">
					<h3>Tree-shakable components</h3>
					<p>
						Nuxt auto-imports dedicated component entries, while
						explicit imports remain available without the module.
					</p>
				</div>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="install"
				class="docs-page__anchor"></span>
			<h2>Install the Nuxt module</h2>
			<p>
				Use <code>@gradient-ui/nuxt</code> when Nuxt owns the
				application lifecycle. Core remains framework-independent and
				can still be used through named imports in any Vue 3 SSR setup.
			</p>
			<docs-code
				:code="installCode"
				language="shell"
				title="Terminal" />
			<docs-code
				:code="moduleCode"
				language="ts"
				title="nuxt.config.ts" />
		</section>

		<section class="docs-page__section">
			<span
				id="module"
				class="docs-page__anchor"></span>
			<h2>What the module installs</h2>
			<ul class="docs-ssr__list">
				<li>
					Components are auto-imported from dedicated package entries;
					<code>components: false</code> disables this behavior.
				</li>
				<li>
					<code>useGradientTheme</code>, <code>useGradientUI</code>,
					<code>useSnackbar</code> and <code>useLoading</code> are
					auto-imported.
				</li>
				<li>
					The shared stylesheet is added once unless
					<code>css: false</code> is configured.
				</li>
				<li>
					Default overlays target Nuxt's server-rendered
					<code>#teleports</code> container.
				</li>
				<li>
					Theme CSS is registered through Nuxt head so it exists
					before hydration.
				</li>
			</ul>
		</section>

		<section class="docs-page__section">
			<span
				id="viewport"
				class="docs-page__anchor"></span>
			<h2>Responsive SSR</h2>
			<p>
				The server cannot read the browser viewport directly. The module
				tries <code>Sec-CH-Viewport-Width</code>, then
				<code>Viewport-Width</code>, and finally the configured
				fallback. Use CSS media queries for layout visibility whenever
				possible; use the SSR viewport for behavior that genuinely
				requires a composable value.
			</p>
			<docs-code
				:code="viewportCode"
				language="ts"
				title="nuxt.config.ts" />
		</section>

		<section class="docs-page__section">
			<span
				id="color-mode"
				class="docs-page__anchor"></span>
			<h2>Theme before hydration</h2>
			<p>
				With <code>@nuxtjs/color-mode</code>, the preference cookie and
				early HTML class select the palette before Vue hydrates.
				Gradient UI generates the tokens; Color Mode owns persistence
				and system preference. Preference-dependent controls should use
				<code>ColorScheme</code> with a fixed-size placeholder.
			</p>
		</section>

		<section class="docs-page__section">
			<span
				id="services"
				class="docs-page__anchor"></span>
			<h2>Services outside component setup</h2>
			<p>
				Inside component setup, use the service composables directly.
				Middleware and ordinary functions should resolve the runtime
				with
				<code>useGradientUI()</code>. Visual service calls remain no-ops
				on the server.
			</p>
			<docs-code
				:code="servicesCode"
				language="ts"
				title="middleware/feedback.ts" />
		</section>

		<section class="docs-page__section">
			<span
				id="csp"
				class="docs-page__anchor"></span>
			<h2>Content Security Policy</h2>
			<p>
				CSP restricts which scripts, styles and resources a browser may
				load. A per-request nonce authorizes Gradient UI's generated
				<code>&lt;style&gt;</code> blocks under a strict policy. Never
				hard-code a nonce: it must be random for every SSR response.
				Dynamic Vue style attributes require a separate
				<code>style-src-attr</code>
				rule.
			</p>
			<docs-code
				:code="cspCode"
				language="ts"
				title="nuxt.config.ts" />
		</section>
	</article>
</template>

<style scoped lang="scss">
	.docs-ssr__list {
		display: grid;
		gap: var(--g-token-space-3);

		max-width: 780px;
		margin: 0;
		padding-inline-start: var(--g-token-space-6);

		font-size: var(--g-token-font-size-md);
		line-height: var(--g-token-line-height-lg);
		color: var(--g-token-text-soft);
	}
</style>
