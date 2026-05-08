<script setup lang="ts">
	defineOptions({ name: 'DirectivesGradientSelectorExample' });
</script>

<template>
	<section
		v-gradient-text="{
			selector: '.accent',
			from: 'pink',
			to: 'cyan',
			direction: '90deg'
		}"
		class="docs-directives-example__panel">
		<h3>
			Paint only the
			<span class="accent">accent words</span>
		</h3>
		<span>
			Use <code>selector</code> when the directive is mounted on a
			container but only part of the text should receive the gradient.
		</span>
	</section>
</template>
