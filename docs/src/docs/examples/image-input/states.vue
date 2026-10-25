<script setup lang="ts">
	defineOptions({ name: 'GImageInputStatesExample' });
	import { shallowRef } from 'vue';
	import { GImageInput, GForm } from '@/components';
	import type { FileInputValue } from '@/use/file';
	const value = shallowRef<FileInputValue>(null);
</script>
<template>
	<div class="file-example-states">
		<g-image-input
			v-model="value"
			label="Single file" />
		<g-form disabled><g-image-input label="Disabled by form" /></g-form>
		<g-image-input
			:min-image-width="64"
			label="Minimum 64 pixels wide" />
		<g-image-input
			readonly
			label="Read only" />
		<g-image-input
			state="error"
			message="A file is required"
			label="Error" />
	</div>
</template>
<style scoped lang="scss">
	.file-example-states {
		display: grid;
		gap: var(--g-token-space-4);
		width: 100%;
		min-width: 0;
	}
</style>
