<script setup lang="ts">
	defineOptions({ name: 'DirectivesLoadingDarkExample' });
	import { ref } from 'vue';
	import { GButton } from '@/components';

	const active = ref(true);
</script>

<template>
	<div class="docs-directives-example">
		<section
			v-loading.dark="{
				active,
				text: 'Publishing changes',
				color: 'cyan',
				opacity: 0.72,
				blur: '8px'
			}"
			class="docs-directives-example__panel docs-directives-example__panel_image">
			<strong>Campaign preview</strong>
			<span>
				The <code>.dark</code> modifier switches the overlay into a dark
				scrim without changing the underlying component markup.
			</span>
		</section>

		<g-button
			:label="active ? 'Hide dark overlay' : 'Show dark overlay'"
			variant="tonal"
			@click="active = !active" />
	</div>
</template>
