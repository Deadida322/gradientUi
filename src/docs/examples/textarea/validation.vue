<script setup lang="ts">
	defineOptions({ name: 'TextareaValidationExample' });
	import { ref } from 'vue';
	import { GTextarea } from '@/components';

	const notes = ref('');
	const noteRules = [
		(value: string) => value.length <= 140 || 'Keep it under 140 characters'
	];
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-textarea
			v-model="notes"
			label="Release note"
			:rules="noteRules"
			message="Short notes are easier to scan." />
	</div>
</template>
