<script setup lang="ts">
	defineOptions({ name: 'RadioSizesExample' });
	import { ref } from 'vue';
	import { GRadio } from '@/components';
	import type { Sizes } from '@/types/CommonTypes';

	const selected = ref('m');
	const sizes: Sizes[] = ['s', 'm', 'l', 'xl'];
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-radio
			v-for="size in sizes"
			:key="size"
			v-model="selected"
			:label="`Size ${size}`"
			:options="[size]"
			:size="size"
			indicator-view="cut-corner" />
	</div>
</template>
