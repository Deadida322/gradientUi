<script setup lang="ts">
	defineOptions({ name: 'BadgeVariantsExample' });
	import { GBadge, GButton } from '@/components';

	const variants = ['tonal', 'primary', 'glass'] as const;
</script>

<template>
	<div class="docs-component-detail__badge-stage">
		<g-badge
			v-for="variant in variants"
			:key="variant"
			:variant="variant"
			content="12">
			<g-button
				:label="variant"
				variant="tonal" />
		</g-badge>
	</div>
</template>
