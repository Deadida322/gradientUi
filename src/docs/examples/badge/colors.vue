<script setup lang="ts">
	defineOptions({ name: 'BadgeColorsExample' });
	import { GBadge, GButton } from '@/components';

	const colors = ['primary', 'pink', 'cyan', 'deep-purple'] as const;
</script>

<template>
	<div class="docs-component-detail__badge-stage">
		<g-badge
			v-for="color in colors"
			:key="color"
			:color="color"
			variant="filled"
			content="8">
			<g-button
				:label="color"
				variant="tonal" />
		</g-badge>
	</div>
</template>
