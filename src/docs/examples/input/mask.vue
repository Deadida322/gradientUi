<script setup lang="ts">
	defineOptions({ name: 'InputMaskExample' });
	import { computed, ref } from 'vue';
	import { GInput } from '@/components';

	const phone = ref('');
	const card = ref('');
	const rawCard = computed(() => card.value.replace(/\D/g, ''));
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-input
			v-model="phone"
			label="Phone"
			mask="+# (###) ###-##-##"
			placeholder="+7 (999) 123-45-67"
			message="Default mode keeps the masked value in v-model."
			clearable />

		<g-input
			v-model="card"
			label="Card number"
			mask="#### #### #### ####"
			:return-masked-value="false"
			placeholder="4242 4242 4242 4242"
			:message="`Raw model: ${rawCard || 'empty'}`"
			clearable />
	</div>
</template>
