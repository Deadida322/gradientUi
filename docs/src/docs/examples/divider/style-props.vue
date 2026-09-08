<script setup lang="ts">
	defineOptions({ name: 'DividerStylePropsExample' });
	import { GDivider } from '@/components';
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-divider
			label="color + thickness"
			color="success"
			thickness="3" />
		<g-divider
			label="state + effect"
			state="warning"
			effect="glow"
			thickness="4" />
		<g-divider
			label="one-side border"
			variant="gradient"
			placement="bottom"
			:border-width="2"
			border-radius="12"
			thickness="4" />
		<g-divider
			label="glass blur"
			variant="glass"
			color="cyan"
			:backdrop-blur="12"
			:border-width="1"
			thickness="3" />
	</div>
</template>
