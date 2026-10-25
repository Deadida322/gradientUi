<script setup lang="ts">
	defineOptions({ name: 'GFileInputStatesExample' });
	import { shallowRef } from 'vue';
	import { GFileInput, GForm } from '@/components';
	import type { FileInputValue } from '@/use/file';
	const value = shallowRef<FileInputValue>(null);
</script>
<template>
	<div class="file-example-states">
		<g-file-input
			v-model="value"
			label="Single file" />
		<g-form disabled><g-file-input label="Disabled by form" /></g-form>
		<g-file-input
			readonly
			label="Read only" />
		<g-file-input
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
