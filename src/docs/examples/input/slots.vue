<script setup lang="ts">
	defineOptions({ name: 'InputSlotsExample' });
	import { ref } from 'vue';
	import { GInput } from '@/components';

	const value = ref('gradient-ui');
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-input
			v-model="value"
			label="Package"
			clearable>
			<template #prepend>@</template>
			<template #append>.dev</template>
			<template #message>
				<span class="docs-component-detail__field-hint">
					Custom message slot for hints, counters or metadata.
				</span>
			</template>
		</g-input>
	</div>
</template>
