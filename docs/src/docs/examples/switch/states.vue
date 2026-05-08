<script setup lang="ts">
	defineOptions({ name: 'SwitchStatesExample' });
	import { ref } from 'vue';
	import { GSwitch } from '@/components';

	const active = ref(true);
</script>

<template>
	<div class="docs-component-detail__field-grid">
		<g-switch
			v-model="active"
			label="Primary" />
		<g-switch
			v-model="active"
			label="Success"
			state="success" />
		<g-switch
			v-model="active"
			label="Warning"
			state="warning" />
		<g-switch
			model-value
			label="Disabled"
			disabled />
	</div>
</template>
