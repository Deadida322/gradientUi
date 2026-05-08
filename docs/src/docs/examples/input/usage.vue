<script setup lang="ts">
	defineOptions({ name: 'InputUsageExample' });
	import { ref } from 'vue';
	import { GInput } from '@/components';

	const email = ref('');
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-input
			v-model="email"
			label="Email"
			placeholder="you@example.com"
			prepend-icon="email-outline"
			clearable
			message="We will use it for account notifications." />
	</div>
</template>
