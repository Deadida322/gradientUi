<script setup lang="ts">
	import DocsCode from '@/docs/components/DocsCode.vue';

	const installCode = 'npm install gradient-ui';
	const usageCode = `
import { createApp } from 'vue';
import { GButton, GInput } from 'gradient-ui';
import 'gradient-ui/style.css';
import App from './App.vue';

const app = createApp(App);

app.component('GButton', GButton);
app.component('GInput', GInput);
app.mount('#app');`;

	const componentCode =
		`
<script setup lang="ts">
	import { GButton, GInput } from 'gradient-ui';
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
			<h2>Register theme and styles</h2>
			<p>
				Import the package stylesheet once near your app entry. Then
				register components globally or import them directly in Vue
				single-file components.
			</p>
			<docs-code
				:code="usageCode"
				language="ts"
				title="main.ts" />
		</section>

		<section class="docs-page__section">
			<span
				id="use-components"
				class="docs-page__anchor"></span>
			<h2>Use components</h2>
			<p>
				Every public component is available as a named export, so your
				bundler can keep examples explicit and tree-shake unused UI.
			</p>
			<docs-code
				:code="componentCode"
				title="AccountForm.vue" />
		</section>
	</article>
</template>
