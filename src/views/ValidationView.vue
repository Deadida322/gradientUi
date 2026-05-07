<script lang="ts" setup>
	import { reactive } from 'vue';
	import { GInput, GButton } from '@/components';
	import { required, useValidation } from 'gib-validate';
	const value = defineModel<string>({ default: '2' });
	const form = reactive({
		value
	});
	const $v = useValidation<typeof form>(form, {
		value: [required()]
	});
</script>

<template>
	<div class="validation">
		<g-input
			v-model="value"
			readonly
			:rules="[required()]"></g-input>
		{{ $v.$errors }}
		<g-button @click="$v.$touch">validate</g-button>
		<g-button @click="$v.$reset">reset</g-button>
	</div>
</template>
