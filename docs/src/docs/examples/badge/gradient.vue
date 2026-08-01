<script setup lang="ts">
	defineOptions({ name: 'BadgeGradientExample' });
	import { GBadge, GButton } from '@/components';
</script>

<template>
	<div class="docs-component-detail__badge-stage">
		<g-badge
			variant="gradient"
			content="12">
			<g-button
				label="Gradient"
				variant="tonal" />
		</g-badge>
	</div>
</template>
