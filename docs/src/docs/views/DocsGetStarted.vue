<script setup lang="ts">
	import DocsCode from '@docs/components/DocsCode.vue';

	const installCode = 'npm install @gradient-ui/core';
	const fullRegistrationCode = `
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
      variant: 'filled'
    }
  }
});

createApp(App)
  .use(gradientUI)
  .mount('#app');`;

	const pluginOptionsCode = `
import { createGradientUI } from '@gradient-ui/core';

app.use(createGradientUI({
  // String/number keeps the short seed-color API.
  theme: '#704aff',

  // Object form exposes mode and manual apply control.
  // theme: { seed: '#704aff', mode: 'dark', autoApply: true },

  // Use false when your app controls tokens manually.
  // theme: false,

  // Use false or pass a custom icon registry.
  icons: true,

  // Component defaults are merged before local props.
  defaults: {
    global: { color: 'primary' },
    GButton: { rounded: true },
    GInput: { variant: 'outlined' }
  }
}));`;

	const manualComponentsCode = `
import { createApp } from 'vue';
import { GButton, GInput, GModal } from '@gradient-ui/core';
import '@gradient-ui/core/style.css';
import App from './App.vue';

const app = createApp(App);
app.component('GButton', GButton);
app.component('GInput', GInput);
app.component('GModal', GModal);
app.mount('#app');`;

	const manualDirectivesCode = `
import { createApp } from 'vue';
import {
  vGradientIcon,
  vGradientText,
  vLoading,
  vMask,
  vRipple,
  vTooltip
} from '@gradient-ui/core';
import '@gradient-ui/core/style.css';
import App from './App.vue';

const app = createApp(App);
app.directive('gradient-icon', vGradientIcon);
app.directive('gradient-text', vGradientText);
app.directive('loading', vLoading);
app.directive('mask', vMask);
app.directive('ripple', vRipple);
app.directive('tooltip', vTooltip);
app.mount('#app');`;

	const servicesCode = `
import { useLoading, useSnackbar } from '@gradient-ui/core';

const snackbar = useSnackbar();
const loading = useLoading();

snackbar.success('Saved');
loading.show({ text: 'Syncing' });`;
	const fontsCode = `
// Optional. Install and import only if you want bundled Manrope + MDI font glyphs.
npm install @fontsource/manrope @mdi/font

// main.ts
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/700.css';
import '@mdi/font/css/materialdesignicons.css';

// app.css
:root {
  --g-token-font-family-base: manrope, sans-serif;
}`;

	const componentCode =
		`
<script setup lang="ts">
	import { GButton, GInput } from '@gradient-ui/core';
<` +
		`/script>

<template>
	<form class="account-form">
		<g-input label="Email" placeholder="you@example.com" />
		<g-button label="Continue" variant="filled" />
	</form>
</template>`;
</script>

<template>
	<article class="docs-page">
		<header class="docs-page__header">
			<p class="docs-page__eyebrow">Guide</p>
			<h1>Get started</h1>
			<p>
				Install Gradient UI into any Vue 3 application and compose
				interfaces with Material You inspired surfaces, gradient accents
				and compact TypeScript APIs.
			</p>
		</header>

		<section class="docs-page__section">
			<span
				id="install"
				class="docs-page__anchor"></span>
			<h2>Install</h2>
			<docs-code
				:code="installCode"
				language="shell"
				title="Terminal" />
		</section>

		<section class="docs-page__section">
			<span
				id="register-theme"
				class="docs-page__anchor"></span>
			<h2>Full library registration</h2>
			<p>
				Import the package stylesheet once near your app entry. Register
				the plugin when you want every public component, directive,
				service helper and default icon configuration available
				application-wide.
			</p>
			<docs-code
				:code="fullRegistrationCode"
				language="ts"
				title="main.ts" />
		</section>

		<section class="docs-page__section">
			<span
				id="plugin-options"
				class="docs-page__anchor"></span>
			<h2>Plugin options</h2>
			<p>
				Use the plugin options to control generated theme tokens, the
				default icon registry and shared component defaults. Passing
				<code>theme: false</code> is useful when a host application owns
				CSS variables itself.
			</p>
			<docs-code
				:code="pluginOptionsCode"
				language="ts"
				title="GradientUI options" />
		</section>

		<section class="docs-page__section">
			<span
				id="fonts"
				class="docs-page__anchor"></span>
			<h2>Fonts are opt-in</h2>
			<p>
				Gradient UI ships system font tokens by default and does not
				bundle webfont packages into the library stylesheet. Import
				Manrope, MDI font CSS or your own brand font only when your app
				needs them. MDI font CSS is useful for raw glyph usage and
				<code>v-gradient-icon</code>
				demos that target
				<code>.mdi</code>.
			</p>
			<docs-code
				:code="fontsCode"
				language="ts"
				title="Optional font setup" />
		</section>

		<section class="docs-page__section">
			<span
				id="use-components"
				class="docs-page__anchor"></span>
			<h2>Manual component registration</h2>
			<p>
				Every public component is available as a named export, so your
				bundler can keep imports explicit and tree-shake unused UI.
			</p>
			<docs-code
				:code="manualComponentsCode"
				language="ts"
				title="main.ts" />
			<docs-code
				:code="componentCode"
				title="AccountForm.vue" />
		</section>

		<section class="docs-page__section">
			<span
				id="directives"
				class="docs-page__anchor"></span>
			<h2>Manual directive registration</h2>
			<p>
				Directives are exported individually for apps that prefer
				targeted registration over the full plugin. This is the same
				public API used by the full library install.
			</p>
			<docs-code
				:code="manualDirectivesCode"
				language="ts"
				title="main.ts" />
		</section>

		<section class="docs-page__section">
			<span
				id="services"
				class="docs-page__anchor"></span>
			<h2>Services</h2>
			<p>
				Service helpers are regular named exports. Import them directly
				where you need application-level feedback such as loading layers
				or snackbars.
			</p>
			<docs-code
				:code="servicesCode"
				language="ts"
				title="services.ts" />
		</section>
	</article>
</template>
