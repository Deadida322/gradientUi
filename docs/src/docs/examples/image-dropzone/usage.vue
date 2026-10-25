<script setup lang="ts">
	defineOptions({ name: 'GImageDropzoneUsageExample' });
	import { shallowRef } from 'vue';
	import { GImageDropzone } from '@/components';
	import type { FileInputValue } from '@/use/file';
	const value = shallowRef<FileInputValue>(null);
</script>
<template>
	<form
		class="file-example"
		@submit.prevent>
		<g-image-dropzone
			v-model="value"
			name="attachments"
			label="Images"
			multiple
			selection-mode="append"
			:max-files="4"
			:max-file-size="5 * 1024 * 1024"
			message="Up to 4 files, 5 MB each" />
	</form>
</template>
<style scoped lang="scss">
	.file-example {
		width: 100%;
		min-width: 0;
	}
</style>
