<script setup lang="ts">
	defineOptions({ name: 'FABVariantsExample' });
	import { GFAB } from '@/components';

	const variants = ['default', 'tonal', 'outlined', 'gradient'] as const;
</script>

<template>
	<div class="docs-component-detail__fab-grid">
		<g-f-a-b
			v-for="variant in variants"
			:key="variant"
			icon="plus"
			:label="variant"
			:variant="variant" />
	</div>
</template>
