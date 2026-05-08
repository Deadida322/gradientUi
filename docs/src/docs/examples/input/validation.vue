<script setup lang="ts">
	defineOptions({ name: 'InputValidationExample' });
	import { ref } from 'vue';
	import { GInput } from '@/components';

	const name = ref('');
	const nameRules = [
		(value: string) => Boolean(value.trim()) || 'Name is required',
		(value: string) => value.length >= 2 || 'Use at least 2 characters'
	];
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-input
			v-model="name"
			label="Name"
			:rules="nameRules"
			message="Validation runs when the field loses focus." />
	</div>
</template>
