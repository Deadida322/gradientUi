<script setup lang="ts">
	defineOptions({ name: 'DirectivesLoadingExample' });
	import { ref } from 'vue';
	import { GButton } from '@/components';

	const active = ref(true);
</script>

<template>
	<div class="docs-directives-example">
		<section
			v-loading="{
				active,
				text: 'Refreshing preview',
				color: 'deep-purple',
				progressView: 'glow',
				blur: '6px'
			}"
			class="docs-directives-example__panel">
			<strong>Preview panel</strong>
			<span>
				Use <code>v-loading</code> when an element owns its own async
				state and should keep the overlay inside its bounds.
			</span>
		</section>

		<g-button
			:label="active ? 'Hide loading' : 'Show loading'"
			variant="tonal"
			@click="active = !active" />
	</div>
</template>
