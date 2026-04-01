<script lang="ts" setup>
	import { computed } from 'vue';
	import GGradient from '../GGradient/GGradient.vue';
	import GIcon from '../GIcon/GIcon.vue';
	import { makeFieldShellProps } from './props';
	import { useDisabled } from '@/use/disabled';
	import { useSize } from '@/use/size';

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
			'g-field-base_multiline': multiline
		}">
		<label
			:for="id"
			class="g-field-base__label">
			<slot>
				{{ label }}
			</slot>
		</label>

		<g-gradient
			:state="state"
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
	$field-error: rgb(var(--g-theme-error));
	$field-on-error: rgb(var(--g-theme-on-error));
	$field-warning: rgb(var(--g-theme-warning));
	$field-on-warning: rgb(var(--g-theme-on-warning));
	$field-success: rgb(var(--g-theme-success));
	$field-on-success: rgb(var(--g-theme-on-success));

	.g-field-base {
		position: relative;

		display: flex;
		flex-direction: column;
		gap: 3px;

		width: 100%;

		&__prepend,
		&__append {
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 24px;
		}

		&__label {
			cursor: pointer;

			margin-left: 2px;

			font-size: 12px;
			color: var(--primary-text);
			text-align: left;

			opacity: 0.8;

			transition: margin 0.2s ease-in;
		}

		&__wrapper {
			display: flex;
			gap: 4px;
			align-items: center;

			box-sizing: border-box;
			width: 100%;
			min-width: 0;
			min-height: 40px;
			padding: 8px 12px;
			border-radius: 6px;

			background-color: rgb(244 247 248);

			&_error {
				color: $field-error;
				background-color: rgba(var(--g-theme-error-container), 0.35);

				:deep(.g-field-base__native) {
					color: $field-error;

					&::placeholder {
						color: $field-error;
						opacity: 0.3;
					}
				}
			}

			&_warning {
				color: $field-warning;
				background-color: rgba(var(--g-theme-warning-container), 0.35);

				:deep(.g-field-base__native) {
					color: $field-warning;

					&::placeholder {
						color: $field-warning;
						opacity: 0.3;
					}
				}
			}

			&_success {
				color: $field-success;
				background-color: rgba(var(--g-theme-success-container), 0.3);

				:deep(.g-field-base__native) {
					color: $field-success;

					&::placeholder {
						color: $field-success;
						opacity: 0.3;
					}
				}
			}
		}

		&_s {
			.g-field-base__wrapper {
				min-height: 32px;
				padding: 4px 8px;
			}

			.g-field-base__label {
				font-size: 11px;
			}

			:deep(.g-field-base__native) {
				font-size: 12px;
			}
		}

		&_m {
			.g-field-base__wrapper {
				min-height: 40px;
				padding: 8px 12px;
			}

			.g-field-base__label {
				font-size: 12px;
			}

			:deep(.g-field-base__native) {
				font-size: 14px;
			}
		}

		&_l {
			.g-field-base__wrapper {
				min-height: 48px;
				padding: 12px 16px;
			}

			.g-field-base__label {
				font-size: 13px;
			}

			:deep(.g-field-base__native) {
				font-size: 16px;
			}
		}

		&_xl {
			.g-field-base__wrapper {
				min-height: 56px;
				padding: 14px 18px;
			}

			.g-field-base__label {
				font-size: 14px;
			}

			:deep(.g-field-base__native) {
				font-size: 18px;
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
			opacity: 0.5;
			transition: all 0.1s ease-in;

			&:hover {
				transform: rotate(4deg);
				opacity: 0.8;
			}
		}

		&__helper {
			z-index: -1;
			transform: translateY(calc(-100% - 4px));

			margin-left: 10px;

			font-size: 10px;
			text-align: left;

			opacity: 0;

			transition: all 0.2s ease-in-out;

			&_visible {
				transform: translateY(-2px);
				opacity: 1;
			}
		}

		:deep(.g-field-base__native) {
			flex: 1;

			box-sizing: content-box;
			width: 100%;
			border: none;

			background-color: transparent;
			outline: none;
		}

		&_focused {
			.g-field-base__label {
				margin-left: 12px;
			}

			.g-field-base__helper {
				transform: translateY(0);
				border-bottom: none;
				opacity: 0.8;
			}
		}

		&_disabled {
			.g-field-base__label {
				cursor: not-allowed;
				opacity: 0.5;
			}

			.g-field-base__wrapper {
				cursor: not-allowed;
				opacity: 0.75;
				background-color: rgba(var(--g-theme-surface), 0.55);
			}

			:deep(.g-field-base__native) {
				cursor: not-allowed;
				color: rgba(var(--g-theme-on-surface), 0.55);

				&::placeholder {
					color: rgba(var(--g-theme-on-surface), 0.4);
				}
			}
		}

		&_multiline {
			.g-field-base__wrapper {
				align-items: flex-start;
				min-height: 80px;
			}

			.g-field-base__prepend,
			.g-field-base__append {
				align-items: flex-start;
				min-height: auto;
				padding-top: 10px;
			}

			:deep(.g-field-base__native) {
				resize: vertical;
				min-height: 64px;
			}

			.g-field-base__cross {
				padding-top: 6px;
			}
		}
	}
</style>
