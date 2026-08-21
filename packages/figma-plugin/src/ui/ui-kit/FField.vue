<script setup lang="ts">
	defineProps<{
		label: string;
	}>();
</script>

<template>
	<label class="field">
		<span>{{ label }}</span>
		<slot />
	</label>
</template>

<style scoped>
	.field {
		display: grid;
		gap: 5px;
		font-weight: 600;
	}

	.field span {
		color: var(--figma-color-text-secondary);
	}
</style>
