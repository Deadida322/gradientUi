<script setup lang="ts">
	defineOptions({ name: 'BadgeLocationsExample' });
	import { GBadge, GButton } from '@/components';

	const locations = [
		'top-left',
		'top-right',
		'bottom-left',
		'bottom-right'
	] as const;
</script>

<template>
	<div class="docs-component-detail__badge-stage">
		<g-badge
			v-for="location in locations"
			:key="location"
			:location="location"
			content="3">
			<g-button
				:label="location"
				variant="tonal" />
		</g-badge>
	</div>
</template>
