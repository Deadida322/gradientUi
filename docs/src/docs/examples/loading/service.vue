<script setup lang="ts">
	defineOptions({ name: 'LoadingServiceExample' });
	import { onBeforeUnmount, ref } from 'vue';
	import { GButton, GChip } from '@/components';
	import { useLoading } from '@/services/useLoading';

	const card = ref<HTMLElement>();
	const saved = ref(false);
	const loading = useLoading();
	let timer: number | undefined;

	const runSave = () => {
		if (!card.value) return;

		saved.value = false;
		window.clearTimeout(timer);

		loading.show({
			target: card.value,
			text: 'Saving profile',
			color: 'deep-purple',
			progressView: 'glow',
			blur: '6px'
		});

		timer = window.setTimeout(() => {
			loading.hide();
			saved.value = true;
		}, 1400);
	};

	onBeforeUnmount(() => {
		window.clearTimeout(timer);
		loading.hide();
	});
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<section
			ref="card"
			class="docs-component-detail__loading-card">
			<div class="docs-component-detail__title-row">
				<strong>Profile card</strong>
				<g-chip
					v-if="saved"
					label="Saved"
					color="green"
					variant="tonal"
					size="s" />
			</div>
			<span class="docs-component-detail__loading-card-text">
				Service loading is useful when async work starts outside the
				template: submit handlers, commands, stores or composables.
			</span>
		</section>

		<g-button
			label="Run service loading"
			color="deep-purple"
			@click="runSave" />
	</div>
</template>
