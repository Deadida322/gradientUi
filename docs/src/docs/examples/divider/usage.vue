<script setup lang="ts">
	defineOptions({ name: 'DividerUsageExample' });
	import { GDivider } from '@/components';
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-divider />
		<g-divider
			label="Today"
			icon="calendar"
			color="cyan"
			variant="glass"
			effect="glow" />
		<g-divider
			color="pink"
			variant="gradient"
			effect="fade"
			thickness="3" />
	</div>
</template>
