<script setup lang="ts">
	defineOptions({ name: 'DirectivesSpecularExample' });
</script>

<template>
	<div class="docs-directives-example docs-directives-example_row">
		<button
			v-specular
			class="docs-directives-example__action"
			type="button">
			Default specular
		</button>

		<button
			v-specular="'cyan'"
			class="docs-directives-example__action docs-directives-example__action_cyan"
			type="button">
			Cyan specular
		</button>
	</div>
</template>
