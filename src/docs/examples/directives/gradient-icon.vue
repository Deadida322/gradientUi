<script setup lang="ts">
	defineOptions({ name: 'DirectivesGradientIconExample' });
</script>

<template>
	<div class="docs-directives-example docs-directives-example_row">
		<span
			v-gradient-icon="{ from: 'deep-purple', to: 'cyan' }"
			class="docs-directives-example__icon-chip">
			<i class="mdi mdi-auto-fix"></i>
			Gradient icon
		</span>

		<span
			v-gradient-icon="{ colors: ['pink', 'deep-purple', 'blue'] }"
			class="docs-directives-example__icon-chip">
			<i class="mdi mdi-creation"></i>
			Multi color icon
		</span>
	</div>
</template>
