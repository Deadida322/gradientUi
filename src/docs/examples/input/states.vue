<script setup lang="ts">
	defineOptions({ name: 'InputStatesExample' });
	import { GInput } from '@/components';
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-input
			model-value="Ready"
			label="Success"
			state="success"
			message="The value is available." />
		<g-input
			model-value="Almost there"
			label="Warning"
			state="warning"
			message="Double-check this value." />
		<g-input
			model-value="Wrong value"
			label="Error"
			state="error"
			message="This field needs attention." />
		<g-input
			model-value="Disabled"
			label="Disabled"
			disabled />
	</div>
</template>
