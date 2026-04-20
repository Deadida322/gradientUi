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
	@mixin state($selector, $color, $container: null) {
		#{$selector} {
			background-color: if(
				$container,
				rgba(var($container), 0.35),
				rgba(var($color), var(--g-token-menu-item-selected-opacity))
			);

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
		--g-token-icon-size-m: var(--g-token-menu-item-icon-size);

		position: relative;

		display: flex;
		gap: var(--g-token-menu-item-gap);
		justify-content: space-between;

		box-sizing: border-box;
		width: 100%;
		padding: var(--g-token-menu-item-padding-y)
			var(--g-token-menu-item-padding-x);
		border-radius: var(--g-token-menu-item-radius);

		font-size: var(--g-token-menu-item-font-size);
		color: var(--g-token-color-on-surface);
		list-style: none;

		background: var(--g-token-menu-item-bg);

		transition:
			background-color var(--g-token-duration-hover)
				var(--g-token-easing-standard),
			color var(--g-token-duration-hover) var(--g-token-easing-standard);

		&:hover {
			cursor: pointer;
			background-color: var(--g-token-menu-item-hover-bg);
		}

		&__label {
			flex: 1;
			align-self: flex-start;
			text-align: left;
		}

		&_disabled {
			pointer-events: none;
			opacity: var(--g-token-menu-item-disabled-opacity);
		}

		&__prepend,
		&__append {
			display: flex;
			align-items: center;
			font-size: var(--g-token-menu-item-icon-size);
		}

		@include state('&_selected', --g-theme-primary);
		@include state(
			'&_error.g-menu-item_selected',
			--g-theme-error,
			--g-theme-error-container
		);
		@include state(
			'&_warning.g-menu-item_selected',
			--g-theme-warning,
			--g-theme-warning-container
		);
		@include state(
			'&_success.g-menu-item_selected',
			--g-theme-success,
			--g-theme-success-container
		);
	}
</style>
