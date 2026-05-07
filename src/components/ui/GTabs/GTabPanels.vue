<script setup lang="ts">
	import { makeTabPanelsProps } from './types';

	const props = defineProps(makeTabPanelsProps());
</script>

<template>
	<div class="g-tab-panels">
		<transition-group
			v-if="props.transition"
			name="g-fade-transition">
			<slot />
		</transition-group>
		<slot v-else />
	</div>
</template>

<style scoped lang="scss">
	.g-tab-panels {
		min-width: 0;
	}
</style>
