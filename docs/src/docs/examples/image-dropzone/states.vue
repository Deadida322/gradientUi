<script setup lang="ts">
	defineOptions({ name: 'GImageDropzoneStatesExample' });
	import { shallowRef } from 'vue';
	import { GImageDropzone, GForm, GButton } from '@/components';
	import type { FileInputValue } from '@/use/file';
	const value = shallowRef<FileInputValue>(null);
</script>
<template>
	<div class="file-example-states">
		<g-image-dropzone
			v-model="value"
			label="Single file" />
		<g-image-dropzone
			icon="upload"
			:button-props="{ variant: 'tonal', color: 'primary' }"
			label="Upload icon" />
		<g-image-dropzone label="Custom icon">
			<template #icon
				><span
					data-file-icon
					aria-hidden="true"
					>?</span
				></template
			>
		</g-image-dropzone>
		<g-image-dropzone label="Custom button">
			<template #trigger="{ open, disabled, error, state }"
				><g-button
					:disabled="disabled"
					:state="state"
					:aria-invalid="error || undefined"
					@click="open"
					>Browse files</g-button
				></template
			>
		</g-image-dropzone>

		<g-form disabled><g-image-dropzone label="Disabled by form" /></g-form>
		<g-image-dropzone
			:min-image-width="64"
			label="Minimum 64 pixels wide" />
		<g-image-dropzone
			readonly
			label="Read only" />
		<g-image-dropzone
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
