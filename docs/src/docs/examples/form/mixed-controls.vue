<script setup lang="ts">
	import { ref } from 'vue';
	import { required } from 'gib-validate';
	import {
		GButton,
		GCheckbox,
		GCheckboxGroup,
		GForm,
		GRadio,
		GSelect
	} from '@/components';

	defineOptions({ name: 'FormMixedControlsExample' });

	const role = ref('');
	const billing = ref('');
	const features = ref<string[]>([]);
	const accepted = ref(false);
	const result = ref('Waiting for submit');

	const roles = [
		{ label: 'Designer', value: 'designer' },
		{ label: 'Engineer', value: 'engineer' },
		{ label: 'Manager', value: 'manager' }
	];
	const billingOptions = ['monthly', 'yearly'];
	const featureOptions = ['Analytics', 'Exports', 'Automation'];
	const featureRules = [
		(value: string[]) => value.length > 0 || 'Choose at least one feature'
	];
	const acceptedRules = [
		(value: boolean) => value || 'Accept terms before continuing'
	];

	const save = () => {
		result.value = `Saved ${role.value}`;
	};
</script>

<template>
	<g-form
		class="docs-component-detail__form-preview"
		validate-on="input"
		focus-first-error
		@submit-valid="save"
		@submit-invalid="result = 'Fix the highlighted fields'">
		<g-select
			v-model="role"
			label="Role"
			:items="roles"
			label-key="label"
			value-key="value"
			placeholder="Choose role"
			:rules="[required('Role is required')]" />
		<g-radio
			v-model="billing"
			label="Billing"
			:options="billingOptions"
			:rules="[required('Billing is required')]" />
		<g-checkbox-group
			v-model="features"
			label="Features"
			:options="featureOptions"
			:rules="featureRules" />
		<g-checkbox
			v-model="accepted"
			label="Accept terms"
			:rules="acceptedRules" />
		<g-button
			type="submit"
			label="Create workspace"
			variant="gradient" />
		<p class="docs-component-detail__value-line">
			{{ result }}
		</p>
	</g-form>
</template>
