<script setup lang="ts">
	defineOptions({ name: 'GFileDropzoneStatesExample' });
	import { shallowRef } from 'vue';
	import { GFileDropzone, GForm, GButton } from '@/components';
	import type { FileInputValue } from '@/use/file';
	const value = shallowRef<FileInputValue>(null);
</script>
<template>
	<div class="file-example-states">
		<g-file-dropzone
			v-model="value"
			label="Single file" />
		<g-file-dropzone
			icon="upload"
			:button-props="{ variant: 'tonal', color: 'primary' }"
			label="Upload icon" />
		<g-file-dropzone label="Custom icon">
			<template #icon
				><span
					data-file-icon
					aria-hidden="true"
					>?</span
				></template
			>
		</g-file-dropzone>
		<g-file-dropzone label="Custom button">
			<template #trigger="{ open, disabled, error, state }"
				><g-button
					:disabled="disabled"
					:state="state"
					:aria-invalid="error || undefined"
					@click="open"
					>Browse files</g-button
				></template
			>
		</g-file-dropzone>

		<g-form disabled><g-file-dropzone label="Disabled by form" /></g-form>
		<g-file-dropzone
			readonly
			label="Read only" />
		<g-file-dropzone
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
