<script setup lang="ts">
	defineOptions({ name: 'DirectivesRippleExample' });
</script>

<template>
	<div class="docs-directives-example docs-directives-example_row">
		<button
			v-ripple
			class="docs-directives-example__action"
			type="button">
			Default ripple
		</button>

		<button
			v-ripple="{ color: 'cyan', opacity: 0.24 }"
			class="docs-directives-example__action docs-directives-example__action_cyan"
			type="button">
			Custom ripple
		</button>
	</div>
</template>
