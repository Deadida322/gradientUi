<script setup lang="ts">
	defineOptions({ name: 'FABSizesExample' });
	import { GFAB } from '@/components';
	import type { Sizes } from '@/types/CommonTypes';

	const sizes: Sizes[] = ['s', 'm', 'l', 'xl'];
</script>

<template>
	<div class="docs-component-detail__fab-grid">
		<g-f-a-b
			v-for="size in sizes"
			:key="size"
			icon="plus"
			:label="`Size ${size}`"
			:size="size" />
	</div>
</template>
