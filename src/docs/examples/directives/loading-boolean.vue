<script setup lang="ts">
	defineOptions({ name: 'DirectivesLoadingBooleanExample' });
	import { ref } from 'vue';
	import { GButton } from '@/components';

	const active = ref(false);
</script>

<template>
	<div class="docs-directives-example">
		<section
			v-loading="active"
			class="docs-directives-example__panel">
			<strong>Boolean binding</strong>
			<span>
				Pass a boolean when the default text, color and progress view
				are enough for the interaction.
			</span>
		</section>

		<g-button
			:label="active ? 'Stop loading' : 'Start loading'"
			color="deep-purple"
			@click="active = !active" />
	</div>
</template>
