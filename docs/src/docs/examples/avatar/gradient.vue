<script setup lang="ts">
	defineOptions({ name: 'AvatarGradientExample' });
	import { GAvatar } from '@/components';
</script>

<template>
	<div class="docs-component-detail__avatar-row">
		<g-avatar
			text="MX"
			size="l"
			shape="squircle"
			variant="gradient"
			color="pink"
			gradient-recipe="auroraRadial"
			animate-glow />
		<g-avatar
			icon="account-star"
			size="xl"
			shape="circle"
			variant="gradient"
			color="cyan"
			gradient-recipe="neonDuo"
			glow
			shadow />
		<g-avatar
			text="AI"
			size="xl"
			shape="rounded"
			variant="glass"
			color="deep-purple"
			:border-width="1"
			drop-shadow />
	</div>
</template>
