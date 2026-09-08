<script setup lang="ts">
	defineOptions({ name: 'DividerVariantsExample' });
	import { GDivider } from '@/components';

	const variants = [
		'default',
		'tonal',
		'outlined',
		'glass',
		'gradient'
	] as const;
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-divider
			v-for="variant in variants"
			:key="variant"
			:label="variant"
			:variant="variant"
			color="deep-purple"
			thickness="2" />
	</div>
</template>
