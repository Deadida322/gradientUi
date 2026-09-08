<script setup lang="ts">
	defineOptions({ name: 'DividerOrientationExample' });
	import { GDivider } from '@/components';
</script>

<template>
	<div class="docs-component-detail__divider-demo">
		<div class="docs-component-detail__surface-card">Overview</div>
		<g-divider
			orientation="vertical"
			length="120"
			color="cyan"
			variant="glass"
			effect="glow"
			thickness="2" />
		<div class="docs-component-detail__surface-card">Activity</div>
		<g-divider
			orientation="vertical"
			label="or"
			length="120"
			color="pink"
			variant="tonal"
			effect="fade" />
		<div class="docs-component-detail__surface-card">Archive</div>
	</div>
</template>
