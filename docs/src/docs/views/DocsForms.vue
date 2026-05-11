<script setup lang="ts">
	import DocsCode from '@docs/components/DocsCode.vue';
	import DocsPropsTable from '@docs/components/DocsPropsTable.vue';
	import type { DocsPropRow } from '@docs/types';

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

	const validationApiRows: DocsPropRow[] = [
		{
			name: 'useValidation',
			type: '(state, rules, name?) => ValidationResult',
			defaultValue: '-',
			description:
				'Creates validation state for a reactive object. Optional name registers it for access through useNamedValidation.'
		},
		{
			name: '$validate',
			type: '() => Promise<boolean>',
			defaultValue: '-',
			description:
				'Touches fields, runs async rules and returns whether the current validation tree is valid.'
		},
		{
			name: '$message',
			type: 'Record<field, string>',
			defaultValue: '{}',
			description:
				'First visible error message per touched field. Bind it to Gradient UI message props.'
		},
		{
			name: '$errors',
			type: 'Record<field, string[]>',
			defaultValue: '{}',
			description:
				'Visible errors for touched fields. Use it to derive error visual state.'
		},
		{
			name: '$pending',
			type: 'boolean',
			defaultValue: 'false',
			description:
				'True while async rules are running, including nested validation children.'
		},
		{
			name: '$setExternalErrors',
			type: '(errors) => void',
			defaultValue: '-',
			description:
				'Adds server-side errors to the same message and error pipeline as local rules.'
		}
	];

	const installCode = `npm install @gib/gradient-ui gib-validate`;

	const validationCode = `
<script setup lang="ts">
	import { computed, reactive } from 'vue';
	import { required, isEmail, minLength, useValidation } from 'gib-validate';
	import { GButton, GInput, GTextarea } from '@gib/gradient-ui';

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

	const emailState = computed(() =>
		v$.value.$errors.email ? 'error' : undefined
	);
	const passwordState = computed(() =>
		v$.value.$errors.password ? 'error' : undefined
	);

	async function submit() {
		const valid = await v$.value.$validate();
		if (!valid) return;
		// send form
	}
${scriptClose}

<template>
	<form @submit.prevent="submit">
		<g-input
			v-model="form.email"
			label="Email"
			:message="v$.$message.email"
			:state="emailState" />
		<g-input
			v-model="form.password"
			type="password"
			label="Password"
			:message="v$.$message.password"
			:state="passwordState" />
		<g-textarea
			v-model="form.bio"
			label="Bio"
			message="Optional public profile text" />
		<g-button
			type="submit"
			label="Create account"
			:disabled="v$.$pending"
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

	const serverErrorsCode = `
<script setup lang="ts">
	import { reactive } from 'vue';
	import { required, useValidation } from 'gib-validate';

	const form = reactive({
		email: ''
	});

	const v$ = useValidation(form, {
		email: [required('Email is required')]
	});

	async function submit() {
		v$.value.$clearExternalErrors();

		const valid = await v$.value.$validate();
		if (!valid) return;

		try {
			// send form to your API
			await createAccount(form);
		} catch {
			v$.value.$setExternalErrors({
				email: ['This email is already registered']
			});
			v$.value.$touchField('email');
		}
	}
${scriptClose}

<template>
	<form @submit.prevent="submit">
		<g-input
			v-model="form.email"
			label="Email"
			:message="v$.$message.email"
			:state="v$.$errors.email ? 'error' : undefined" />
	</form>
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
				Vue 3 validation package. Install it next to Gradient UI and use
				it as the canonical state for form submit, async rules, touched
				fields and server errors.
			</p>
			<docs-code
				:code="installCode"
				language="bash"
				title="Install" />

			<div class="docs-forms__callout">
				<strong>Validation package</strong>
				<p>
					Gradient UI uses the same rule contract as
					<code>gib-validate</code>: return <code>true</code> for a
					valid value or a string message for an invalid one. Use
					component <code>rules</code> for compact field-level checks,
					and <code>useValidation</code> when a form needs submit
					validation, named validation or nested sections.
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
				id="validation-api"
				class="docs-page__anchor"></span>
			<h2>Validation API</h2>
			<p>
				<code>gib-validate</code> exposes a Vuelidate-like state object
				with explicit submit validation, async pending state, nested
				children and external errors for backend responses.
			</p>
			<docs-props-table
				:rows="validationApiRows"
				name-label="API"
				default-label="Default" />
		</section>

		<section class="docs-page__section">
			<span
				id="form-example"
				class="docs-page__anchor"></span>
			<h2>Form example</h2>
			<p>
				For complete forms, keep the canonical validation state in
				<code>gib-validate</code>, then bind <code>$message</code> and
				<code>$errors</code> to Gradient UI fields. This keeps submit
				validation, touched state and field messages in one place.
			</p>
			<docs-code
				:code="validationCode"
				title="AccountForm.vue" />
		</section>

		<section class="docs-page__section">
			<span
				id="server-errors"
				class="docs-page__anchor"></span>
			<h2>Server errors</h2>
			<p>
				Use <code>$setExternalErrors</code> when the backend rejects a
				valid-looking form. External errors flow through the same
				<code>$message</code> and <code>$errors</code> bindings as local
				rules, so fields do not need a separate error API.
			</p>
			<docs-code
				:code="serverErrorsCode"
				title="Server errors" />
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
