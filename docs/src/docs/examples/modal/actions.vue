<script setup lang="ts">
	defineOptions({ name: 'ModalActionsExample' });
	import { ref } from 'vue';
	import { GButton, GModal } from '@/components';

	const open = ref(false);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-button
				label="Open with actions"
				variant="tonal"
				@click="open = true" />
		</div>

		<g-modal
			v-model="open"
			title="Save changes"
			text="Choose how to close the dialog.">
			<p class="docs-component-detail__note">
				Use the <code>actions</code> slot for predictable command
				layout.
			</p>

			<template #actions="{ dismiss, close }">
				<g-button
					label="Cancel"
					variant="text"
					color="blue-grey-500"
					@click="dismiss" />
				<g-button
					label="Save"
					variant="gradient"
					@click="close" />
			</template>
		</g-modal>
	</div>
</template>
