<script setup lang="ts">
	defineOptions({ name: 'BadgeInlineExample' });
	import { GBadge, GChip } from '@/components';
</script>

<template>
	<div class="docs-component-detail__badge-stage">
		<g-badge
			position="inline"
			content="beta"
			color="deep-purple">
			<span>Gradient sync</span>
		</g-badge>
		<g-badge
			position="inline"
			variant="filled"
			state="success"
			content="ready">
			<g-chip
				label="Deploy"
				variant="tonal" />
		</g-badge>
	</div>
</template>
