<script setup lang="ts">
	defineOptions({ name: 'SwitchValidationExample' });
	import { computed, ref } from 'vue';
	import { GButton, GSwitch } from '@/components';

	const accepted = ref(false);
	const touched = ref(false);
	const rules = [
		(value: boolean) => value || 'Enable this setting to continue'
	];
	const hasError = computed(() => touched.value && !accepted.value);

	const submit = () => {
		touched.value = true;
	};
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-switch
			v-model="accepted"
			label="Enable required setting"
			:state="hasError ? 'error' : undefined"
			:rules="rules"
			:message="
				hasError
					? 'Enable this setting to continue'
					: 'Press submit to validate the switch.'
			"
			@change="touched = true" />
		<g-button
			label="Submit"
			variant="tonal"
			size="s"
			@click="submit" />
	</div>
</template>
