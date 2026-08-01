<script setup lang="ts">
	import { ref } from 'vue';
	import { minLength, required } from 'gib-validate';
	import { GButton, GForm, GInput, GTextarea } from '@/components';

	defineOptions({ name: 'FormErrorsExample' });

	const title = ref('');
	const description = ref('');
	const titleRules = [
		required('Title is required'),
		minLength(4, 'Use at least 4 characters')
	];
	const descriptionRules = [
		required('Description is required'),
		minLength(12, 'Use at least 12 characters')
	];
</script>

<template>
	<g-form
		v-slot="{ errors, errorCount }"
		class="docs-component-detail__form-preview"
		scroll-to-error
		focus-first-error>
		<g-input
			v-model="title"
			label="Title"
			:rules="titleRules" />
		<g-textarea
			v-model="description"
			label="Description"
			:rules="descriptionRules" />
		<g-button
			type="submit"
			label="Submit"
			variant="gradient" />
		<div class="docs-component-detail__value-line">
			<span>errors={{ errorCount }}</span>
			<span
				v-for="error in errors"
				:key="`${error.path}-${error.message}`">
				{{ error.message }}
			</span>
		</div>
	</g-form>
</template>
