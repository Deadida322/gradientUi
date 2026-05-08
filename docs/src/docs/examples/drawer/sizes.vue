<script setup lang="ts">
	defineOptions({ name: 'DrawerSizesExample' });
	import { ref } from 'vue';
	import { GButton, GDrawer } from '@/components';

	const compactOpen = ref(false);
	const wideOpen = ref(false);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-button
				label="Compact drawer"
				variant="tonal"
				@click="compactOpen = true" />
			<g-button
				label="Wide drawer"
				variant="tonal"
				@click="wideOpen = true" />
		</div>

		<g-drawer
			v-model="compactOpen"
			title="Compact"
			text="Narrow utility drawer."
			:width="300" />

		<g-drawer
			v-model="wideOpen"
			title="Wide"
			text="Roomier workflow drawer."
			:width="520"
			max-width="calc(100vw - 32px)" />
	</div>
</template>
