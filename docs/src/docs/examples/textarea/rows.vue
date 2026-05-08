<script setup lang="ts">
	defineOptions({ name: 'TextareaRowsExample' });
	import { ref } from 'vue';
	import { GTextarea } from '@/components';

	const compact = ref('Short note');
	const long = ref('Longer editable text can start with more vertical room.');
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-textarea
			v-model="compact"
			label="Compact"
			:rows="2" />
		<g-textarea
			v-model="long"
			label="Roomy"
			:rows="6" />
	</div>
</template>
