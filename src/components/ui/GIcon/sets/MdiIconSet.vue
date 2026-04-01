<script setup lang="ts">
	import type { IconSetComponentProps } from '@/use/icon';

	defineProps<IconSetComponentProps>();
</script>

<template>
	<component
		:is="tag"
		class="mdi"
		:class="`mdi-${icon}`"
		aria-hidden="true" />
</template>
