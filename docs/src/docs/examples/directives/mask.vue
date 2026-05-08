<script setup lang="ts">
	import { ref } from 'vue';

	defineOptions({ name: 'DirectiveMaskExample' });

	const phone = ref('');
</script>

<template>
	<div class="docs-directives-example">
		<label class="docs-directives-example__field-label">
			Phone
			<input
				v-model="phone"
				v-mask="'+# (###) ###-##-##'"
				class="docs-directives-example__field"
				placeholder="+7 (999) 123-45-67" />
		</label>
		<span>Model value: {{ phone || 'empty' }}</span>
	</div>
</template>
