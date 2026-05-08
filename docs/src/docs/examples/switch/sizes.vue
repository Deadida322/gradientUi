<script setup lang="ts">
	defineOptions({ name: 'SwitchSizesExample' });
	import { ref } from 'vue';
	import { GSwitch } from '@/components';
	import type { Sizes } from '@/types/CommonTypes';

	const enabled = ref(true);
	const sizes: Sizes[] = ['s', 'm', 'l', 'xl'];
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-switch
			v-for="size in sizes"
			:key="size"
			v-model="enabled"
			:label="`Size ${size}`"
			:size="size" />
	</div>
</template>
