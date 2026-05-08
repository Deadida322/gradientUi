<script setup lang="ts">
	defineOptions({ name: 'DirectivesGradientExample' });
</script>

<template>
	<div class="docs-directives-example">
		<section class="docs-directives-example__panel">
			<h3
				v-gradient-text="{
					colors: ['pink', 'deep-purple', 'cyan'],
					direction: '110deg'
				}"
				class="docs-directives-example__gradient-title">
				Gradient text
			</h3>
			<span>
				<code>v-gradient-text</code> paints text with the same gradient
				language as Gradient UI surfaces.
			</span>
		</section>
	</div>
</template>
