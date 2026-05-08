<script setup lang="ts">
	defineOptions({ name: 'ModalPersistentExample' });
	import { ref } from 'vue';
	import { GButton, GModal } from '@/components';

	const open = ref(false);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-button
				label="Open persistent modal"
				variant="outlined"
				color="orange"
				@click="open = true" />
		</div>

		<g-modal
			v-model="open"
			persistent
			hide-close
			title="Persistent confirmation"
			text="Outside click and escape do not dismiss this modal.">
			<template #default="{ close }">
				<div class="docs-component-detail__stack">
					<p class="docs-component-detail__note">
						Persistent overlays are useful for blocking decisions
						and critical flows.
					</p>
					<g-button
						label="Close explicitly"
						color="orange"
						@click="close" />
				</div>
			</template>
		</g-modal>
	</div>
</template>
