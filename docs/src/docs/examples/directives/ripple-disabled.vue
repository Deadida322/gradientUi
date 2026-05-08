<script setup lang="ts">
	defineOptions({ name: 'DirectivesRippleDisabledExample' });
	import { ref } from 'vue';
	import { GSwitch } from '@/components';

	const disabled = ref(false);
</script>

<template>
	<div class="docs-directives-example">
		<g-switch
			v-model="disabled"
			label="Disable ripple" />

		<button
			v-ripple="{ disabled }"
			class="docs-directives-example__action"
			type="button">
			Conditional ripple
		</button>
	</div>
</template>
