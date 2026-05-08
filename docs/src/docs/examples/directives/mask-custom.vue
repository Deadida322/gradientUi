<script setup lang="ts">
	import { ref } from 'vue';
	import type { GMaskTokens } from '@/components';

	defineOptions({ name: 'DirectiveMaskCustomExample' });

	const code = ref('');
	const tokens: GMaskTokens = {
		H: {
			pattern: /[0-9a-f]/i,
			transform: (value) => value.toUpperCase()
		}
	};
</script>

<template>
	<div class="docs-directives-example">
		<label class="docs-directives-example__field-label">
			Hex code
			<input
				v-model="code"
				v-mask="{ mask: 'HH-HH-HH', tokens }"
				class="docs-directives-example__field"
				placeholder="AF-10-4C" />
		</label>
		<span>Custom tokens can transform accepted characters.</span>
	</div>
</template>
