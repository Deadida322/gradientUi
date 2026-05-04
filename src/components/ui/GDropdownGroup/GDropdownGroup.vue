<script setup lang="ts">
	import { makeDropdownGroupProps } from './types';

	const props = defineProps(makeDropdownGroupProps());
</script>

<template>
	<section class="g-dropdown-group">
		<div
			v-if="props.label"
			class="g-dropdown-group__label">
			{{ props.label }}
		</div>

		<ul class="g-dropdown-group__items">
			<slot />
		</ul>
	</section>
</template>

<style scoped lang="scss">
	.g-dropdown-group {
		display: flex;
		flex-direction: column;
		gap: var(--g-token-space-1);

		& + & {
			margin-top: var(--g-token-space-4);
		}

		&__label {
			padding: 0 var(--g-token-space-3);

			font-size: var(--g-token-font-size-md);
			font-weight: var(--g-token-font-weight-bold);
			line-height: var(--g-token-line-height-md);
			color: var(--g-token-color-on-surface);
		}

		&__items {
			display: flex;
			flex-direction: column;
			gap: var(--g-token-space-1);

			margin: 0;
			padding: 0;

			list-style: none;
		}
	}
</style>
