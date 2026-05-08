<script lang="ts" setup>
	import { ref } from 'vue';
	import GText from '@/components/ui/GText/GText.vue';
	import GInput from '@/components/ui/GInput/GInput.vue';
	import { minLength, required } from 'gib-validate';

	const basicValue = ref('');
	const passwordValue = ref('');
	const sizedS = ref('small');
	const sizedM = ref('medium');
	const sizedL = ref('large');
	const sizedXL = ref('x-large');
	const stateWarning = ref('Warning state');
	const stateError = ref('Error state');
	const stateSuccess = ref('Success state');
	const validatedValue = ref('');
	const gradientInputA = ref('Red gradient');
	const gradientInputB = ref('Teal gradient');
	const gradientInputC = ref('Deep purple gradient');
</script>

<template>
	<g-text
		type="h-5"
		label="GInput examples">
	</g-text>

	<div class="col">
		<g-input
			v-model="basicValue"
			label="Basic input"
			placeholder="Type text"
			clearable
			prepend-icon="magnify"
			append-icon="account" />

		<g-input
			v-model="passwordValue"
			label="Password"
			placeholder="Type password"
			type="password"
			clearable />

		<div class="row">
			<g-input
				v-model="sizedS"
				size="s"
				label="Size S" />
			<g-input
				v-model="sizedM"
				size="m"
				label="Size M" />
			<g-input
				v-model="sizedL"
				size="l"
				label="Size L" />
			<g-input
				v-model="sizedXL"
				size="xl"
				label="Size XL" />
		</div>

		<div class="row">
			<g-input
				v-model="stateWarning"
				state="warning"
				label="Warning" />
			<g-input
				v-model="stateError"
				state="error"
				label="Error" />
			<g-input
				v-model="stateSuccess"
				state="success"
				label="Success" />
		</div>

		<div class="row">
			<g-input
				v-model="gradientInputA"
				color="red40"
				label="Red 40"
				prepend-icon="palette" />
			<g-input
				v-model="gradientInputB"
				color="teal40"
				label="Teal 40"
				prepend-icon="palette" />
			<g-input
				v-model="gradientInputC"
				color="deep-purple-40"
				label="Deep purple 40"
				prepend-icon="palette" />
		</div>

		<g-input
			v-model="validatedValue"
			label="Validation rules"
			placeholder="Min 4 chars"
			:rules="[
				required('Required field'),
				minLength(4, 'Min length is 4')
			]"
			clearable />

		<g-input
			v-model="basicValue"
			label="Slots demo"
			clearable>
			<template #prepend>
				<span class="tag">https://</span>
			</template>
			<template #append>
				<span class="tag">.dev</span>
			</template>
			<template #message>Custom helper message slot</template>
		</g-input>
	</div>
</template>

<style scoped>
	.col {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-block: 20px;
	}

	.row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}

	.tag {
		font-size: 12px;
		opacity: 0.7;
	}

	@media (width >= 900px) {
		.row {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
</style>
