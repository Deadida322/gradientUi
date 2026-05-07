<script setup lang="ts">
	defineOptions({ name: 'ChipSizesExample' });
	import { GChip } from '@/components';
</script>

<template>
	<div class="docs-page__preview">
		<g-chip
			label="Size S"
			size="s" />
		<g-chip
			label="Size M"
			size="m" />
		<g-chip
			label="Size L"
			size="l" />
		<g-chip
			label="Size XL"
			size="xl" />
	</div>
</template>
