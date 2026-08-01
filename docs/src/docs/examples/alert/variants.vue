<script setup lang="ts">
	defineOptions({ name: 'AlertVariantsExample' });
	import { GAlert } from '@/components';

	const variants = ['tonal', 'outlined', 'gradient', 'glass'] as const;
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<g-alert
			v-for="variant in variants"
			:key="variant"
			:variant="variant"
			:backdrop-blur="variant === 'glass' ? 8 : undefined"
			title="Gradient surface"
			text="Alerts use the same color language as the rest of the library."
			icon="information-outline" />
	</div>
</template>
