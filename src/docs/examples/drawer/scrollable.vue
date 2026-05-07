<script setup lang="ts">
	defineOptions({ name: 'DrawerScrollableExample' });
	import { ref } from 'vue';
	import { GButton, GDrawer } from '@/components';

	const open = ref(false);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-button
				label="Open long drawer"
				variant="outlined"
				@click="open = true" />
		</div>

		<g-drawer
			v-model="open"
			scrollable
			title="Activity"
			text="Scrollable drawer content.">
			<div class="docs-component-detail__stack">
				<div
					v-for="index in 20"
					:key="index"
					class="docs-component-detail__surface-card">
					Activity item {{ index }}
				</div>
			</div>
		</g-drawer>
	</div>
</template>
