<script setup lang="ts">
	import { ref } from 'vue';
	import { GSwitch } from '@/components';

	defineOptions({ name: 'DirectivesSpecularDisabledExample' });

	const disabled = ref(false);
</script>

<template>
	<div class="docs-directives-example">
		<g-switch
			v-model="disabled"
			label="Disable specular" />
		<button
			v-specular="{ disabled }"
			class="docs-directives-example__action docs-directives-example__action_cyan"
			type="button">
			Conditional specular
		</button>
	</div>
</template>
