<script setup lang="ts">
	defineOptions({ name: 'AvatarVariantsExample' });
	import { GAvatar } from '@/components';

	const variants = [
		'default',
		'tonal',
		'outlined',
		'glass',
		'gradient'
	] as const;
</script>

<template>
	<div class="docs-component-detail__avatar-row">
		<g-avatar
			v-for="variant in variants"
			:key="variant"
			:text="variant.slice(0, 2)"
			:variant="variant"
			color="cyan"
			hover />
	</div>
</template>
