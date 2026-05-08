<script setup lang="ts">
	defineOptions({ name: 'TextareaUsageExample' });
	import { ref } from 'vue';
	import { GTextarea } from '@/components';

	const bio = ref('');
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-textarea
			v-model="bio"
			label="Bio"
			placeholder="Tell people what you are building"
			prepend-icon="text-box-outline"
			clearable
			message="Good for profile text, notes and longer descriptions." />
	</div>
</template>
