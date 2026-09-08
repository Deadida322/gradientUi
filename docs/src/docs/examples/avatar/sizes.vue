<script setup lang="ts">
	defineOptions({ name: 'AvatarSizesExample' });
	import { GAvatar } from '@/components';

	const sizes = ['s', 'm', 'l', 'xl'] as const;
</script>

<template>
	<div class="docs-component-detail__avatar-row">
		<g-avatar
			v-for="size in sizes"
			:key="size"
			:size="size"
			:text="size"
			shape="squircle"
			color="teal"
			variant="tonal" />
	</div>
</template>
