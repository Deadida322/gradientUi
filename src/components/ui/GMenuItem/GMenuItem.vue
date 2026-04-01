<script setup lang="ts">
	import { computed } from 'vue';
	import type { PLASlots } from '@/types/CommonTypes';
	import { makeMenuItemProps } from './types';
	import { useDisabled } from '@/use/disabled';
	import { useSelected } from '@/use/selected';

	const slots = defineSlots<PLASlots>();
	const props = defineProps(makeMenuItemProps());
	const disabledClass = useDisabled(props, 'g-menu-item');
	const selectedClass = useSelected(props, 'g-menu-item');
	const stateClass = computed(() =>
		props.state ? `g-menu-item_${props.state}` : undefined
	);
</script>

<template>
	<li
		class="g-menu-item"
		:class="[disabledClass, selectedClass, stateClass]"
		v-on="$attrs">
		<div
			v-if="slots.prepend?.()"
			class="g-menu-item__prepend">
			<slot name="prepend" />
		</div>
		<div class="g-menu-item__label">
			<slot />
		</div>
		<div
			v-if="slots.append?.()"
			class="g-menu-item__append">
			<slot name="append" />
		</div>
	</li>
</template>

<style lang="scss" scoped>
	@mixin state($selector, $color) {
		#{$selector} {
			background-color: rgba(var($color), 0.05);

			& > .g-menu-item__label {
				color: rgb(var($color));
			}

			& > .g-menu-item__append {
				color: rgb(var($color));
			}

			& > .g-menu-item__prepend {
				color: rgb(var($color));
			}
		}
	}

	.g-menu-item {
		position: relative;

		display: flex;
		gap: 8px;
		justify-content: space-between;

		box-sizing: border-box;
		width: 100%;
		padding: 8px 12px;
		border-radius: 4px;

		color: rgb(var(--g-theme-on-surface));
		list-style: none;

		background: rgb(var(--g-theme-background), 0.2);

		transition:
			background-color 0.2s ease-in,
			color 0.2s ease-in;

		&:hover {
			cursor: pointer;
			background-color: rgba(var(--g-theme-on-surface), 0.06);
		}

		&.g-menu-item_state_error {
			--g-menu-item-accent-color: rgb(var(--g-theme-error));
			--g-menu-item-accent-bg: rgba(var(--g-theme-error-container), 0.35);
		}

		&.g-menu-item_state_warning {
			--g-menu-item-accent-color: rgb(var(--g-theme-warning));
			--g-menu-item-accent-bg: rgba(
				var(--g-theme-warning-container),
				0.35
			);
		}

		&.g-menu-item_state_success {
			--g-menu-item-accent-color: rgb(var(--g-theme-success));
			--g-menu-item-accent-bg: rgba(
				var(--g-theme-success-container),
				0.3
			);
		}

		&__label {
			flex: 1;
			align-self: flex-start;
			text-align: left;
		}

		&_disabled {
			pointer-events: none;
			opacity: 0.5;
		}

		&__prepend,
		&__append {
			display: flex;
			align-items: center;
		}

		@include state('&_selected', --g-theme-primary);
		@include state('&_success.g-menu-item_selected', --g-theme-success);
		@include state('&_warning.g-menu-item_selected', --g-theme-warning);
	}
</style>
