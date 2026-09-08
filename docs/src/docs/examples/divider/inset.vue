<script setup lang="ts">
	defineOptions({ name: 'DividerInsetExample' });
	import { GDivider } from '@/components';
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-divider
			label="default"
			color="cyan" />
		<g-divider
			label="inset"
			color="cyan"
			inset />
		<g-divider
			label="custom inset"
			color="cyan"
			inset="72"
			effect="dashed" />
	</div>
</template>
