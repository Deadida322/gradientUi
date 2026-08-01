<script setup lang="ts">
	import { ref } from 'vue';
	import { required, isEmail } from 'gib-validate';
	import { GButton, GForm, GInput } from '@/components';

	defineOptions({ name: 'FormUsageExample' });

	const email = ref('');
	const status = ref('Waiting for submit');
	const rules = [required('Email is required'), isEmail('Use a real email')];

	const submit = () => {
		status.value = `Ready to submit ${email.value}`;
	};
</script>

<template>
	<g-form
		class="docs-component-detail__form-preview"
		validate-on="input"
		focus-first-error
		@submit-valid="submit"
		@submit-invalid="status = 'Fix the highlighted fields'">
		<g-input
			v-model="email"
			label="Email"
			placeholder="team@gradient.dev"
			:rules="rules" />
		<g-button
			type="submit"
			label="Create account"
			variant="gradient" />
		<p class="docs-component-detail__value-line">
			<span>{{ status }}</span>
		</p>
	</g-form>
</template>
