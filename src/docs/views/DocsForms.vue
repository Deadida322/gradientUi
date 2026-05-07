<script setup lang="ts">
	import DocsCode from '@/docs/components/DocsCode.vue';

	const scriptClose = '<' + '/script>';

	const formControls = [
		{
			title: 'Text fields',
			components: 'GInput, GTextarea',
			description:
				'Single-line and multiline controls with label, message, icons, clear action and validation rules.'
		},
		{
			title: 'Choice fields',
			components: 'GSelect',
			description:
				'Field-style selection powered by GDropdown and GMenu, with single, multiple and object-value modes.'
		},
		{
			title: 'Boolean controls',
			components: 'GCheckbox, GSwitch',
			description:
				'Independent yes/no controls with shared size, color, state, label and message behavior.'
		},
		{
			title: 'Option groups',
			components: 'GCheckboxGroup, GRadio',
			description:
				'Grouped selection controls for multi-select and single-select lists with item slots.'
		}
	];

	const fieldApiRows = [
		{
			name: 'v-model',
			description:
				'The controlled value. Text fields use string values, boolean controls use boolean values, groups and selects use typed selection values.'
		},
		{
			name: 'label',
			description:
				'Floating or group label that keeps the form scannable without additional layout wrappers.'
		},
		{
			name: 'message',
			description:
				'Supporting text. When validation fails, the first visible validation error takes priority.'
		},
		{
			name: 'rules',
			description:
				'Array of validation functions. Each rule returns true for valid values or a string error message.'
		},
		{
			name: 'state',
			description:
				'Semantic visual tone: success, warning or error. Validation can drive this automatically at app level.'
		},
		{
			name: 'size, color, disabled',
			description:
				'Shared Gradient UI props used across field, check and selection controls.'
		}
	];

	const installCode = `npm install gradient-ui gib-validate`;

	const validationCode = `
<script setup lang="ts">
	import { computed, reactive } from 'vue';
	import { required, isEmail, minLength, useValidation } from 'gib-validate';
	import { GButton, GInput, GTextarea } from 'gradient-ui';

	const form = reactive({
		email: '',
		password: '',
		bio: ''
	});

	const v$ = useValidation(form, {
		email: [required('Email is required'), isEmail('Use a real email')],
		password: [
			required('Password is required'),
			minLength(8, 'Use at least 8 characters')
		]
	});

	const emailRules = computed(() => [
		() => v$.value.$errors.email?.[0] || true
	]);
	const passwordRules = computed(() => [
		() => v$.value.$errors.password?.[0] || true
	]);

	function submit() {
		v$.value.$touch();
		if (v$.value.$errors.email || v$.value.$errors.password) return;
		// send form
	}
${scriptClose}

<template>
	<form @submit.prevent="submit">
		<g-input
			v-model="form.email"
			label="Email"
			:rules="emailRules" />
		<g-input
			v-model="form.password"
			type="password"
			label="Password"
			:rules="passwordRules" />
		<g-textarea
			v-model="form.bio"
			label="Bio"
			message="Optional public profile text" />
		<g-button
			type="submit"
			label="Create account"
			variant="filled" />
	</form>
</template>`;

	const inlineRulesCode = `
<script setup lang="ts">
	import { required, minLength } from 'gib-validate';

	const nameRules = [
		required('Name is required'),
		minLength(2, 'Name is too short')
	];
${scriptClose}

<template>
	<g-input
		label="Name"
		:rules="nameRules" />
</template>`;
</script>

<template>
	<article class="docs-page docs-forms">
		<header class="docs-page__header">
			<p class="docs-page__eyebrow">Forms</p>
			<h1>Forms</h1>
			<p>
				Gradient UI form components share one field language: labels,
				messages, validation rules, semantic states and compact slots
				for icons or custom item rendering.
			</p>
		</header>

		<section class="docs-page__section">
			<span
				id="components"
				class="docs-page__anchor"></span>
			<h2>Form components</h2>
			<p>
				Use text fields for typed data, choice fields for compact option
				sets, boolean controls for independent toggles and option groups
				when the available values should stay visible.
			</p>

			<div class="docs-forms__cards">
				<section
					v-for="control in formControls"
					:key="control.title"
					class="docs-forms__card">
					<h3>{{ control.title }}</h3>
					<strong>{{ control.components }}</strong>
					<p>{{ control.description }}</p>
				</section>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="field-model"
				class="docs-page__anchor"></span>
			<h2>Field model</h2>
			<p>
				Fields are intentionally predictable. The same props appear
				across inputs, textarea, select, checkbox, switch, radio and
				checkbox groups, so validation and layout code can be reused.
			</p>

			<div class="docs-forms__table">
				<div
					v-for="row in fieldApiRows"
					:key="row.name"
					class="docs-forms__table-row">
					<code>{{ row.name }}</code>
					<span>{{ row.description }}</span>
				</div>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="validation"
				class="docs-page__anchor"></span>
			<h2>Validation</h2>
			<p>
				Validation is designed around <code>gib-validate</code>, a small
				Vue 3 validation package. Install it next to Gradient UI and
				pass rules into form components through the
				<code>rules</code> prop.
			</p>
			<docs-code
				:code="installCode"
				language="bash"
				title="Install" />

			<div class="docs-forms__callout">
				<strong>Public direction</strong>
				<p>
					Gradient UI currently has an internal validation helper with
					the same mental model, but documentation and future examples
					should point to <code>gib-validate</code>. The internal
					helper is implementation detail and can be removed later.
				</p>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="rules"
				class="docs-page__anchor"></span>
			<h2>Rules</h2>
			<p>
				A rule is a function that receives a value and returns
				<code>true</code> when it passes, or a string when it fails.
				Async rules can return a promise with the same result.
			</p>
			<docs-code
				:code="inlineRulesCode"
				title="Inline rules" />
		</section>

		<section class="docs-page__section">
			<span
				id="form-example"
				class="docs-page__anchor"></span>
			<h2>Form example</h2>
			<p>
				For complete forms, keep the canonical validation state in
				<code>gib-validate</code>, then map visible field errors into
				component rules. This keeps submit validation, touched state and
				field messages in one place.
			</p>
			<docs-code
				:code="validationCode"
				title="AccountForm.vue" />
		</section>
	</article>
</template>

<style scoped lang="scss">
	.docs-forms {
		&__cards {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
			gap: var(--g-token-space-4);
		}

		&__card,
		&__callout,
		&__table {
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);
			background: rgba(var(--g-theme-surface), 0.72);
		}

		&__card {
			display: grid;
			gap: var(--g-token-space-3);
			align-content: start;
			padding: var(--g-token-space-5);

			h3,
			p {
				margin: 0;
			}

			h3 {
				font-size: var(--g-token-font-size-lg);
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-color-on-surface);
			}

			strong {
				width: fit-content;
				padding: var(--g-token-space-1) var(--g-token-space-3);
				border-radius: var(--g-token-radius-pill);

				font-size: var(--g-token-font-size-sm);
				color: var(--g-token-color-primary);

				background: rgba(var(--g-theme-primary), 0.08);
			}

			p {
				font-size: var(--g-token-font-size-sm);
				line-height: var(--g-token-line-height-lg);
				color: var(--g-token-text-soft);
			}
		}

		&__table {
			overflow: hidden;
			display: grid;
		}

		&__table-row {
			display: grid;
			grid-template-columns: minmax(150px, 220px) minmax(0, 1fr);
			gap: var(--g-token-space-4);

			padding: var(--g-token-space-4);
			border-bottom: 1px solid var(--g-token-border-subtle);

			&:last-child {
				border-bottom: 0;
			}

			span {
				color: var(--g-token-text-soft);
			}
		}

		&__callout {
			display: grid;
			gap: var(--g-token-space-2);
			padding: var(--g-token-space-5);
			background:
				linear-gradient(
					135deg,
					rgba(var(--g-theme-primary), 0.1),
					transparent 58%
				),
				rgba(var(--g-theme-surface), 0.78);

			strong {
				color: var(--g-token-color-on-surface);
			}

			p {
				margin: 0;
				color: var(--g-token-text-soft);
			}
		}
	}

	@media (width <= 640px) {
		.docs-forms__table-row {
			grid-template-columns: 1fr;
			gap: var(--g-token-space-2);
		}
	}
</style>
