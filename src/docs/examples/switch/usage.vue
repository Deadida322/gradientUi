<script setup lang="ts">
	defineOptions({ name: 'SwitchUsageExample' });
	import { ref } from 'vue';
	import { GSwitch } from '@/components';

	const enabled = ref(true);
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-switch
			v-model="enabled"
			label="Enable gradients"
			message="Use for immediate settings and feature flags." />
	</div>
</template>
