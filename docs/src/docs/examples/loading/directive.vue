<script setup lang="ts">
	defineOptions({ name: 'LoadingDirectiveExample' });
	import { ref } from 'vue';
	import { GButton } from '@/components';

	const active = ref(true);
</script>

<template>
	<div class="docs-component-detail__feedback-stack">
		<div
			v-loading="{
				active,
				text: 'Refreshing card',
				color: 'deep-purple',
				progressView: 'glow'
			}"
			class="docs-component-detail__loading-card">
			<strong>Analytics summary</strong>
			<span class="docs-component-detail__loading-card-text">
				Revenue, conversion and retention are being refreshed.
			</span>
		</div>

		<g-button
			:label="active ? 'Hide loading' : 'Show loading'"
			variant="tonal"
			@click="active = !active" />
	</div>
</template>
