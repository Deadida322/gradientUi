<script setup lang="ts">
	defineOptions({ name: 'DirectivesRippleOptionsExample' });
</script>

<template>
	<div class="docs-directives-example docs-directives-example_row">
		<button
			v-ripple="{ color: 'pink', opacity: 0.22 }"
			class="docs-directives-example__action docs-directives-example__action_pink"
			type="button">
			Pink ripple
		</button>

		<button
			v-ripple="{
				center: true,
				color: 'cyan',
				duration: '820ms',
				easing: 'cubic-bezier(0.2, 0, 0, 1)'
			}"
			class="docs-directives-example__action docs-directives-example__action_cyan"
			type="button">
			Centered slow ripple
		</button>
	</div>
</template>
