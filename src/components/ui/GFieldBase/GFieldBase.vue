<script lang="ts" setup>
	import { computed } from 'vue';
	import GGradient from '../GGradient/GGradient.vue';
	import GIcon from '../GIcon/GIcon.vue';
	import { makeFieldShellProps } from './props';
	import { useDisabled } from '@/use/disabled';
	import { useSize } from '@/use/size';
	import { useSurfaceColor } from '@/use/surfaceColor';

	const props = defineProps(
		makeFieldShellProps({
			hasValue: false,
			multiline: false,
			disabled: false,
			clearable: false,
			focused: false
		})
	);
	const slots = defineSlots<{
		default?: () => unknown;
		prepend?: () => unknown;
		append?: () => unknown;
		message?: () => unknown;
		control?: () => unknown;
		actions?: () => unknown;
	}>();
	const emit = defineEmits({
		clear: () => true
	});
	const hasPrepend = computed(
		() => Boolean(slots.prepend) || Boolean(props.prependIcon)
	);
	const hasAppend = computed(
		() => Boolean(slots.append) || Boolean(props.appendIcon)
	);
	const sizeClass = useSize(props, 'g-field-base');
	const disabledClass = useDisabled(props, 'g-field-base');
	const { resolvedColor, resolvedState, colorStyles } =
		useSurfaceColor(props);

	function onClear(event: MouseEvent) {
		event.stopPropagation();
		event.preventDefault();
		emit('clear');
	}
</script>

<template>
	<div
		class="g-field-base"
		:class="{
			[sizeClass]: true,
			[disabledClass]: true,
			'g-field-base_focused': focused,
			'g-field-base_multiline': multiline,
			[`g-field-base_state-${state}`]: state
		}"
		:style="colorStyles">
		<label
			:for="id"
			class="g-field-base__label">
			<slot>
				{{ label }}
			</slot>
		</label>

		<g-gradient
			:color="resolvedColor"
			:state="resolvedState"
			:disabled="disabled"
			position="bottom"
			:border-width="focused ? 1 : 0"
			inherit-width
			border-radius="6">
			<div
				class="g-field-base__wrapper"
				:class="{
					[`g-field-base__wrapper_${state}`]: state
				}">
				<div
					v-if="hasPrepend"
					class="g-field-base__prepend">
					<slot name="prepend" />
					<g-icon
						v-if="prependIcon"
						:icon="prependIcon" />
				</div>

				<div
					v-if="slots.control"
					class="g-field-base__control">
					<slot name="control" />
				</div>

				<slot name="actions" />

				<div
					v-if="clearable && hasValue && !disabled"
					class="g-field-base__cross">
					<g-icon
						icon="close"
						size="18"
						@click="onClear" />
				</div>

				<div
					v-if="hasAppend"
					class="g-field-base__append">
					<slot name="append" />
					<g-icon
						v-if="appendIcon"
						:icon="appendIcon" />
				</div>
			</div>
		</g-gradient>

		<div
			class="g-field-base__helper"
			:class="{
				'g-field-base__helper_visible': message || slots.message
			}">
			<slot name="message">
				{{ message }}
			</slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.g-field-base {
		--g-field-accent-color: var(--g-color);
		--g-field-content-color: color-mix(
			in srgb,
			var(--g-token-color-on-surface) 92%,
			transparent
		);
		--g-field-label-color: var(--g-token-color-on-surface);
		--g-field-helper-color: var(--g-token-color-on-surface);
		--g-field-surface-color: var(--g-token-field-surface);
		--g-field-placeholder-opacity: 0.62;

		position: relative;

		display: flex;
		flex-direction: column;
		gap: var(--g-token-field-gap);

		width: 100%;

		&__prepend,
		&__append {
			display: flex;
			align-items: center;
			justify-content: center;

			min-width: var(--g-token-field-affix-width);

			color: var(--g-field-content-color);
		}

		&__label {
			cursor: pointer;

			margin-left: var(--g-token-field-label-margin-inline);

			font-size: var(--g-token-field-label-font-size-m);
			color: var(--g-field-label-color);
			text-align: left;

			opacity: var(--g-token-field-label-opacity);

			transition: margin var(--g-token-duration-base)
				var(--g-token-easing-standard);
		}

		&__wrapper {
			display: flex;
			gap: var(--g-token-field-inner-gap);
			align-items: center;

			box-sizing: border-box;
			width: 100%;
			min-width: 0;
			min-height: var(--g-token-field-height-m);
			padding: var(--g-token-field-padding-y-m)
				var(--g-token-field-padding-x-m);
			border-radius: var(--g-token-field-radius);

			color: var(--g-field-content-color);

			background-color: var(--g-field-surface-color);

			&_error {
				--g-field-surface-color: color-mix(
					in srgb,
					var(--g-color) 14%,
					var(--g-surface-color)
				);
				--g-field-content-color: var(--g-color);
				--g-field-placeholder-opacity: var(
					--g-token-field-state-placeholder-opacity
				);
			}

			&_warning {
				--g-field-surface-color: color-mix(
					in srgb,
					var(--g-color) 14%,
					var(--g-surface-color)
				);
				--g-field-content-color: var(--g-color);
				--g-field-placeholder-opacity: var(
					--g-token-field-state-placeholder-opacity
				);
			}

			&_success {
				--g-field-surface-color: color-mix(
					in srgb,
					var(--g-color) 14%,
					var(--g-surface-color)
				);
				--g-field-content-color: var(--g-color);
				--g-field-placeholder-opacity: var(
					--g-token-field-state-placeholder-opacity
				);
			}
		}

		&_s {
			.g-field-base__wrapper {
				min-height: var(--g-token-field-height-s);
				padding: var(--g-token-field-padding-y-s)
					var(--g-token-field-padding-x-s);
			}

			.g-field-base__label {
				font-size: var(--g-token-field-label-font-size-s);
			}

			:deep(.g-field-base__native) {
				font-size: var(--g-token-field-input-font-size-s);
			}
		}

		&_m {
			.g-field-base__wrapper {
				min-height: var(--g-token-field-height-m);
				padding: var(--g-token-field-padding-y-m)
					var(--g-token-field-padding-x-m);
			}

			.g-field-base__label {
				font-size: var(--g-token-field-label-font-size-m);
			}

			:deep(.g-field-base__native) {
				font-size: var(--g-token-field-input-font-size-m);
			}
		}

		&_l {
			.g-field-base__wrapper {
				min-height: var(--g-token-field-height-l);
				padding: var(--g-token-field-padding-y-l)
					var(--g-token-field-padding-x-l);
			}

			.g-field-base__label {
				font-size: var(--g-token-field-label-font-size-l);
			}

			:deep(.g-field-base__native) {
				font-size: var(--g-token-field-input-font-size-l);
			}
		}

		&_xl {
			.g-field-base__wrapper {
				min-height: var(--g-token-field-height-xl);
				padding: var(--g-token-field-padding-y-xl)
					var(--g-token-field-padding-x-xl);
			}

			.g-field-base__label {
				font-size: var(--g-token-field-label-font-size-xl);
			}

			:deep(.g-field-base__native) {
				font-size: var(--g-token-field-input-font-size-xl);
			}
		}

		&__control {
			display: flex;
			flex: 1;
			align-items: center;
			min-width: 0;
		}

		&__cross {
			cursor: pointer;
			color: var(--g-field-content-color);
			opacity: var(--g-token-field-clear-opacity);
			transition: all var(--g-token-duration-fast)
				var(--g-token-easing-standard);

			&:hover {
				transform: rotate(4deg);
				opacity: var(--g-token-field-clear-opacity-hover);
			}
		}

		&__helper {
			z-index: 0;
			transform: translateY(
				calc(-100% - var(--g-token-field-helper-offset))
			);

			margin-left: var(--g-token-field-helper-margin-left);

			font-size: var(--g-token-field-helper-font-size);
			color: var(--g-field-helper-color);
			text-align: left;

			opacity: 0;

			transition: all var(--g-token-duration-base)
				var(--g-token-easing-emphasized);

			&_visible {
				z-index: 1;
				transform: translateY(
					var(--g-token-field-helper-visible-translate-y)
				);
				opacity: 1;
			}
		}

		:deep(.g-field-base__native) {
			flex: 1;

			box-sizing: content-box;
			width: 100%;
			border: none;

			color: inherit;

			background-color: transparent;
			outline: none;

			&::placeholder {
				color: currentcolor;
				opacity: var(--g-field-placeholder-opacity);
			}
		}

		&_focused {
			--g-field-label-color: var(--g-field-accent-color);
			--g-field-helper-color: var(--g-field-accent-color);
			--g-field-placeholder-opacity: 0.48;

			.g-field-base__label {
				margin-left: var(--g-token-field-label-focus-margin-inline);
			}

			.g-field-base__helper {
				transform: translateY(0);
				border-bottom: none;
				opacity: var(--g-token-field-helper-opacity);
			}
		}

		&_state-error,
		&_state-warning,
		&_state-success {
			--g-field-label-color: var(--g-field-accent-color);
			--g-field-helper-color: var(--g-field-accent-color);
		}

		&_disabled {
			.g-field-base__label {
				cursor: not-allowed;
				opacity: var(--g-token-field-label-opacity-disabled);
			}

			.g-field-base__wrapper {
				cursor: not-allowed;
				opacity: 0.75;
				background-color: var(--g-token-field-surface-disabled);
			}

			:deep(.g-field-base__native) {
				cursor: not-allowed;
				color: var(--g-token-field-text-disabled);

				&::placeholder {
					color: var(--g-token-field-placeholder-disabled);
				}
			}
		}

		&_multiline {
			.g-field-base__wrapper {
				align-items: flex-start;
				min-height: var(--g-token-field-multiline-height);
			}

			.g-field-base__prepend,
			.g-field-base__append {
				align-items: flex-start;
				min-height: auto;
				padding-top: var(--g-token-field-multiline-affix-padding-top);
			}

			:deep(.g-field-base__native) {
				resize: vertical;
				min-height: var(--g-token-field-textarea-min-height);
			}

			.g-field-base__cross {
				padding-top: var(--g-token-field-clear-padding-top);
			}
		}
	}
</style>
