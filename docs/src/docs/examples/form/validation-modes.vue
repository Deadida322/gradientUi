<script setup lang="ts">
	import { ref } from 'vue';
	import { isEmail, required } from 'gib-validate';
	import { GButton, GForm, GInput } from '@/components';

	defineOptions({ name: 'FormValidationModesExample' });

	const email = ref('');
	const password = ref('');
	const emailRules = [
		required('Email is required'),
		isEmail('Use a real email')
	];
	const passwordRules = [required('Password is required')];
</script>

<template>
	<g-form
		v-slot="{ errorCount, firstError }"
		class="docs-component-detail__form-preview"
		validate-on="input"
		focus-first-error>
		<g-input
			v-model="email"
			label="Email"
			placeholder="team@gradient.dev"
			:rules="emailRules" />
		<g-input
			v-model="password"
			label="Password"
			type="password"
			:rules="passwordRules" />
		<div class="docs-component-detail__removable-list">
			<g-button
				type="submit"
				label="Validate"
				variant="gradient" />
			<span class="docs-component-detail__value-line">
				errors={{ errorCount }}
				<span v-if="firstError">{{ firstError.message }}</span>
			</span>
		</div>
	</g-form>
</template>
