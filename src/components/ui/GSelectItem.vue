<script setup>
	defineProps({
		item: {
			type: Object,
			default: () => {}
		},
		checked: {
			type: Boolean,
			default: false
		}
	});
</script>

<template>
	<div
		class="g-select-item"
		:class="{
			'g-select-item_checked': checked
		}">
		<slot>
			{{ item.label }}
		</slot>
	</div>
</template>

<style lang="scss" scoped>
	.g-select-item {
		cursor: pointer;

		width: 100%;
		padding: 8px;
		border-radius: 4px;

		font-size: 12px;

		transition:
			transform 0.2s ease-in-out,
			background-color 0.2s ease-in-out;

		&:hover {
			transform: translateX(4px);
			color: var(--g-primary-color);
		}

		&_checked {
			transform: translateX(4px);
			color: var(--g-primary-color);
			background-color: rgb(
				var(--g-theme-primary) / var(--g-token-state-tonal-opacity)
			);
		}
	}
</style>
