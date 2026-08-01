<script setup lang="ts">
	defineOptions({ name: 'DirectivesSpecularOptionsExample' });
</script>

<template>
	<div class="docs-directives-example docs-directives-example_row">
		<button
			v-specular="{
				color: 'pink',
				opacity: 0.48,
				size: 190
			}"
			class="docs-directives-example__action docs-directives-example__action_pink"
			type="button">
			Large pink shine
		</button>

		<button
			v-specular="{
				color: 'primary',
				opacity: 0.28,
				duration: '320ms',
				easing: 'cubic-bezier(0.2, 0, 0, 1)'
			}"
			class="docs-directives-example__action"
			type="button">
			Soft transition
		</button>
	</div>
</template>
