<script setup lang="ts">
	defineOptions({ name: 'ModalUsageExample' });
	import { ref } from 'vue';
	import { GButton, GModal } from '@/components';

	const open = ref(false);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-button
				label="Open modal"
				variant="gradient"
				prepend="open-in-new"
				@click="open = true" />
		</div>

		<g-modal
			v-model="open"
			title="Workspace visibility"
			text="Review the access settings before publishing.">
			<p class="docs-component-detail__note">
				Modal content is rendered inside the overlay surface and
				receives close helpers through slots.
			</p>
		</g-modal>
	</div>
</template>
