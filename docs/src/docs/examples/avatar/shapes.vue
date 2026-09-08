<script setup lang="ts">
	defineOptions({ name: 'AvatarShapesExample' });
	import { GAvatar } from '@/components';

	const shapes = ['circle', 'rounded', 'square', 'squircle'] as const;
</script>

<template>
	<div class="docs-component-detail__avatar-row">
		<g-avatar
			v-for="shape in shapes"
			:key="shape"
			:shape="shape"
			:text="shape[0]"
			size="l"
			color="purple"
			variant="tonal"
			shadow
			hover />
	</div>
</template>
