<script setup lang="ts">
	defineOptions({ name: 'ModalSizesExample' });
	import { ref } from 'vue';
	import { GButton, GModal } from '@/components';

	const compactOpen = ref(false);
	const wideOpen = ref(false);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-button
				label="Compact"
				variant="tonal"
				@click="compactOpen = true" />
			<g-button
				label="Wide"
				variant="tonal"
				@click="wideOpen = true" />
		</div>

		<g-modal
			v-model="compactOpen"
			title="Compact modal"
			text="A narrow decision surface."
			:width="360">
			<p class="docs-component-detail__note">
				Set <code>width</code> for compact confirmations.
			</p>
		</g-modal>

		<g-modal
			v-model="wideOpen"
			title="Wide modal"
			text="A wider surface for richer content."
			:width="760"
			max-width="min(94vw, 860px)">
			<p class="docs-component-detail__note">
				Use <code>maxWidth</code> to keep large modals responsive.
			</p>
		</g-modal>
	</div>
</template>
