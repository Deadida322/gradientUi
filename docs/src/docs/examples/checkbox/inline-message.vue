<script setup lang="ts">
	defineOptions({ name: 'CheckboxInlineMessageExample' });
	import { ref } from 'vue';
	import { GCheckbox } from '@/components';

	const subscribed = ref(false);
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-checkbox
			v-model="subscribed"
			inline
			label="Send product updates"
			message="Inline keeps the control compact inside dense forms."
			indicator-view="cut-corner"
			color="pink" />
	</div>
</template>
