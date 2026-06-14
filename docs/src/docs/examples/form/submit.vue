<script setup lang="ts">
	import { ref } from 'vue';
	import { minLength, required } from 'gib-validate';
	import { GButton, GForm, GInput, GTextarea } from '@/components';

	defineOptions({ name: 'FormSubmitExample' });

	const name = ref('');
	const bio = ref('');
	const result = ref('Nothing submitted yet');
	const nameRules = [
		required('Name is required'),
		minLength(2, 'Use at least 2 characters')
	];

	const save = () => {
		result.value = `Saved ${name.value}`;
	};
</script>

<template>
	<g-form
		v-slot="{ pending, valid, errorCount, firstError }"
		class="docs-component-detail__form-preview"
		validate-on="input"
		scroll-to-error
		focus-first-error
		@submit-valid="save"
		@submit-invalid="result = 'Form has validation errors'">
		<g-input
			v-model="name"
			label="Display name"
			:rules="nameRules" />
		<g-textarea
			v-model="bio"
			label="Bio"
			message="Optional profile text" />
		<div class="docs-component-detail__removable-list">
			<g-button
				type="submit"
				label="Save profile"
				variant="filled"
				:disabled="pending" />
			<g-button
				type="reset"
				label="Reset validation"
				variant="tonal" />
		</div>
		<p class="docs-component-detail__value-line">
			<span>{{ result }}</span>
			valid={{ valid }} errors={{ errorCount }}
			<span v-if="firstError">first={{ firstError.message }}</span>
		</p>
	</g-form>
</template>
