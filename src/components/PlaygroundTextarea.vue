<script lang="ts" setup>
	import { ref } from 'vue';
	import GText from './ui/GText/GText.vue';
	import GTextarea from './ui/GTextarea/GTextarea.vue';
	import { minLength, required } from '@/use/validation/rules';

	const basicValue = ref('Base textarea value');
	const sizedS = ref('Small');
	const sizedM = ref('Medium');
	const sizedL = ref('Large');
	const sizedXL = ref('X-Large');
	const warningValue = ref('Warning text');
	const errorValue = ref('Error text');
	const successValue = ref('Success text');
	const validatedValue = ref('');
</script>

<template>
	<g-text
		type="h-5"
		label="GTextarea examples">
	</g-text>

	<div class="col">
		<g-textarea
			v-model="basicValue"
			label="Basic textarea"
			placeholder="Type multiline text"
			clearable
			:rows="4" />

		<div class="row">
			<g-textarea
				v-model="sizedS"
				size="s"
				label="Size S"
				:rows="2" />
			<g-textarea
				v-model="sizedM"
				size="m"
				label="Size M"
				:rows="2" />
			<g-textarea
				v-model="sizedL"
				size="l"
				label="Size L"
				:rows="2" />
			<g-textarea
				v-model="sizedXL"
				size="xl"
				label="Size XL"
				:rows="2" />
		</div>

		<div class="row">
			<g-textarea
				v-model="warningValue"
				state="warning"
				label="Warning"
				:rows="2" />
			<g-textarea
				v-model="errorValue"
				state="error"
				label="Error"
				:rows="2" />
			<g-textarea
				v-model="successValue"
				state="success"
				label="Success"
				:rows="2" />
		</div>

		<g-textarea
			v-model="validatedValue"
			label="Validation rules"
			placeholder="Min 8 chars"
			:rules="[
				required('Required field'),
				minLength(8, 'Min length is 8')
			]"
			clearable
			:rows="3" />

		<g-textarea
			v-model="basicValue"
			label="Slots demo"
			clearable
			:rows="3">
			<template #prepend>
				<span class="tag">MD</span>
			</template>
			<template #append>
				<span class="tag">chars</span>
			</template>
			<template #message>Custom textarea helper slot</template>
		</g-textarea>
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
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 12px;
	}

	.tag {
		font-size: 12px;
		opacity: 0.7;
	}

	@media (width >= 900px) {
		.row {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
