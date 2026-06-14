<script setup lang="ts">
	import { ref } from 'vue';
	import { required } from 'gib-validate';
	import { GButton, GCheckbox, GForm, GInput, GSwitch } from '@/components';

	defineOptions({ name: 'FormDisabledExample' });

	const locked = ref(true);
	const name = ref('Gradient UI');
	const notifications = ref(true);
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-switch
			v-model="locked"
			label="Lock form"
			message="The form context disables every nested Gradient UI control." />
		<g-form
			:disabled="locked"
			validate-on="input">
			<g-input
				v-model="name"
				label="Workspace"
				:rules="[required('Workspace is required')]" />
			<g-checkbox
				v-model="notifications"
				label="Enable notifications" />
			<g-button
				type="submit"
				label="Submit"
				variant="filled" />
		</g-form>
	</div>
</template>
