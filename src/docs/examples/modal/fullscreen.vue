<script setup lang="ts">
	defineOptions({ name: 'ModalFullscreenExample' });
	import { ref } from 'vue';
	import { GButton, GModal } from '@/components';

	const open = ref(false);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-button
				label="Open fullscreen"
				variant="outlined"
				color="cyan"
				@click="open = true" />
		</div>

		<g-modal
			v-model="open"
			fullscreen
			scrollable
			title="Fullscreen flow"
			text="Use fullscreen for editors, command centers and multi-step flows.">
			<div class="docs-component-detail__card-grid">
				<div
					v-for="index in 8"
					:key="index"
					class="docs-component-detail__surface-card">
					Section {{ index }}
				</div>
			</div>

			<template #actions="{ dismiss }">
				<g-button
					label="Done"
					color="cyan"
					@click="dismiss" />
			</template>
		</g-modal>
	</div>
</template>
