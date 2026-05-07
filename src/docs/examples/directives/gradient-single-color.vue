<script setup lang="ts">
	defineOptions({ name: 'DirectivesGradientSingleColorExample' });
</script>

<template>
	<section class="docs-directives-example__panel">
		<h3
			v-gradient-text="'cyan'"
			class="docs-directives-example__single-gradient">
			Cyan headline
		</h3>
		<h3
			v-gradient-text="'pink'"
			class="docs-directives-example__single-gradient">
			Pink headline
		</h3>
		<span>
			Pass one color alias when you want the directive to use the matching
			Gradient UI palette gradient.
		</span>
	</section>
</template>
