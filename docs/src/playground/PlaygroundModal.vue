<script setup lang="ts">
	import { ref } from 'vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import GModal from '@/components/ui/GModal/GModal.vue';
	import GText from '@/components/ui/GText/GText.vue';

	const modalOpen = ref(false);
	const persistentOpen = ref(false);
	const fullscreenOpen = ref(false);
</script>

<template>
	<section class="modal-playground">
		<g-text
			type="h-5"
			label="Modal" />

		<div class="modal-playground__actions">
			<g-button
				label="Open modal"
				color="teal-500"
				@click="modalOpen = true" />
			<g-button
				label="Persistent modal"
				variant="tonal"
				color="orange-500"
				@click="persistentOpen = true" />
			<g-button
				label="Fullscreen modal"
				variant="outlined"
				color="blue-500"
				@click="fullscreenOpen = true" />
		</div>

		<g-modal
			v-model="modalOpen"
			title="Workspace visibility"
			text="Review the access settings before publishing the dashboard.">
			<template #default>
				<div class="modal-playground__body">
					<p>
						This is the first working `GModal` built on top of the
						new `BaseOverlay`.
					</p>
					<p>
						The surface uses overlay tokens, supports scrim, outside
						dismiss, escape handling and stack-aware z-index.
					</p>
				</div>
			</template>

			<template #actions="{ dismiss, close }">
				<g-button
					label="Cancel"
					variant="text"
					color="blue-grey-500"
					@click="dismiss" />
				<g-button
					label="Save"
					color="teal-500"
					@click="close" />
			</template>
		</g-modal>

		<g-modal
			v-model="persistentOpen"
			persistent
			hide-close
			title="Persistent state"
			text="Outside click and escape do not dismiss this one.">
			<template #default="{ close }">
				<div class="modal-playground__body">
					<p>
						Use `close()` for explicit programmatic dismissal even
						when the modal is persistent.
					</p>
					<g-button
						label="Close explicitly"
						color="orange-500"
						@click="close" />
				</div>
			</template>
		</g-modal>

		<g-modal
			v-model="fullscreenOpen"
			fullscreen
			scrollable
			title="Fullscreen modal"
			text="Good candidate for a future command center or multi-step flow.">
			<template #default>
				<div class="modal-playground__fullscreen-body">
					<div
						v-for="index in 10"
						:key="index"
						class="modal-playground__card">
						Section {{ index }}
					</div>
				</div>
			</template>

			<template #actions="{ dismiss }">
				<g-button
					label="Done"
					color="blue-500"
					@click="dismiss" />
			</template>
		</g-modal>
	</section>
</template>

<style scoped lang="scss">
	.modal-playground {
		display: flex;
		flex-direction: column;
		gap: var(--g-token-space-4);
		margin-block: 24px;
	}

	.modal-playground__actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--g-token-space-3);
	}

	.modal-playground__body {
		display: flex;
		flex-direction: column;
		gap: var(--g-token-space-3);
	}

	.modal-playground__body p {
		margin: 0;
		color: rgba(var(--g-theme-on-surface), 0.76);
	}

	.modal-playground__fullscreen-body {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: var(--g-token-space-4);
	}

	.modal-playground__card {
		padding: var(--g-token-space-5);
		border: 1px solid rgb(var(--g-theme-outline));
		border-radius: var(--g-token-radius-lg);
		background: color-mix(
			in srgb,
			var(--g-token-color-surface) 94%,
			white 6%
		);
	}
</style>
