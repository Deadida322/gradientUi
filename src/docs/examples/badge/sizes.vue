<script setup lang="ts">
	defineOptions({ name: 'BadgeSizesExample' });
	import { GBadge, GButton } from '@/components';

	const sizes = ['s', 'm', 'l', 'xl'] as const;
</script>

<template>
	<div class="docs-component-detail__badge-stage">
		<g-badge
			v-for="size in sizes"
			:key="size"
			:size="size"
			:content="size.toUpperCase()">
			<g-button
				:label="`Size ${size}`"
				variant="tonal" />
		</g-badge>
	</div>
</template>
