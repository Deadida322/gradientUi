<script setup lang="ts">
withDefaults(
	defineProps<{
		disabled?: boolean;
		loading?: boolean;
		variant?: 'primary' | 'secondary';
	}>(),
	{
		disabled: false,
		loading: false,
		variant: 'primary'
	}
);
</script>

<template>
	<button
		type="button"
		:disabled="disabled || loading"
		:class="{ secondary: variant === 'secondary' }">
		<span
			v-if="loading"
			class="spinner"
			aria-hidden="true" />
		<span class="content">
			<slot />
		</span>
	</button>
</template>

<style scoped>
button {
	cursor: pointer;

	display: inline-grid;
	grid-auto-flow: column;
	gap: 7px;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 34px;
	padding: 0 10px;
	border: 1px solid transparent;
	border-radius: 6px;

	font: inherit;
	font-size: 11px;
	font-weight: 700;
	color: var(--figma-color-text-onbrand);

	background: var(--figma-color-bg-brand);
}

button.secondary {
	border-color: var(--figma-color-border);
	color: var(--figma-color-text);
	background: var(--figma-color-bg);
}

button:disabled {
	cursor: default;
	opacity: 0.45;
}

button:focus-visible {
	outline: 1px solid var(--figma-color-border-brand);
	outline-offset: 2px;
}

.content {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.spinner {
	width: 12px;
	height: 12px;
	border: 2px solid currentcolor;
	border-right-color: transparent;
	border-radius: 999px;

	animation: spin 0.72s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
