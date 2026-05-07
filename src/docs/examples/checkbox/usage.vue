<script setup lang="ts">
	defineOptions({ name: 'CheckboxUsageExample' });
	import { ref } from 'vue';
	import { GCheckbox } from '@/components';

	const accepted = ref(true);
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-checkbox
			v-model="accepted"
			label="Accept terms"
			message="Required before continuing." />
	</div>
</template>
