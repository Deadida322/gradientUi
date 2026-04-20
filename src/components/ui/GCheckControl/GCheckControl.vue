<script setup lang="ts">
	import { computed } from 'vue';
	import {
		makeCheckControlBaseProps,
		type CheckControlSlots,
		type CheckControlRootEmits
	} from '@/use/check';
	import { useDisabled } from '@/use/disabled';
	import { useFocused } from '@/use/focused';
	import { useSelected } from '@/use/selected';
	import { useSize } from '@/use/size';
	import { useState } from '@/use/state';

	const props = defineProps(makeCheckControlBaseProps());

	const slots = defineSlots<
		CheckControlSlots & {
			indicator: () => unknown;
		}
	>();
	const emit = defineEmits<
		{
			change: [event: Event];
			focus: [event: FocusEvent];
			blur: [event: FocusEvent];
		} & CheckControlRootEmits
	>();

	const hasTextContent = computed(
		() => Boolean(props.label) || Boolean(slots.default)
	);
	const hasMessage = computed(
		() => Boolean(props.message) || Boolean(slots.message)
	);
	const sizeClass = useSize(props, 'g-check-control');
	const disabledClass = useDisabled(props, 'g-check-control');
	const focusedClass = useFocused(props, 'g-check-control');
	const stateClass = useState(props, 'g-check-control');
	const checkedClass = useSelected(
		{ selected: () => props.checked },
		'g-check-control'
	);
</script>

<template>
	<div
		class="g-check-control"
		:class="[
			sizeClass,
			disabledClass,
			focusedClass,
			stateClass,
			checkedClass,
			{
				'g-check-control_inline': props.inline
			}
		]"
		@focusin="emit('focusin', $event)"
		@focusout="emit('focusout', $event)"
		@pointerdown="emit('pointerdown', $event)"
		@pointerup="emit('pointerup', $event)"
		@pointercancel="emit('pointercancel', $event)">
		<input
			:id="props.id"
			:name="props.name"
			:type="props.inputType"
			:checked="props.checked"
			:disabled="props.disabled"
			class="g-check-control__native"
			@change="emit('change', $event)"
			@focus="emit('focus', $event)"
			@blur="emit('blur', $event)" />

		<label
			:for="props.id"
			class="g-check-control__body">
			<span class="g-check-control__indicator">
				<slot name="indicator" />
			</span>

			<span
				v-if="hasTextContent || hasMessage"
				class="g-check-control__content">
				<span
					v-if="hasTextContent"
					class="g-check-control__label">
					<slot>
						{{ props.label }}
					</slot>
				</span>

				<span
					v-if="hasMessage"
					class="g-check-control__message">
					<slot name="message">
						{{ props.message }}
					</slot>
				</span>
			</span>
		</label>
	</div>
</template>

<style scoped lang="scss">
	.g-check-control {
		display: inline-flex;
		flex-direction: column;
		gap: var(--g-token-space-2);
		min-width: 0;

		&__native {
			pointer-events: none;
			position: absolute;
			opacity: 0;
		}

		&__body {
			cursor: pointer;

			display: inline-flex;
			gap: var(--g-token-check-gap);
			align-items: center;

			min-width: 0;
		}

		&__indicator {
			display: inline-flex;
			flex: 0 0 auto;
			align-items: center;
			justify-content: center;

			min-height: var(--g-token-check-indicator-size);
		}

		&__content {
			display: inline-flex;
			flex-direction: column;
			gap: var(--g-token-check-content-gap);

			min-width: 0;

			text-align: left;
		}

		&__label {
			color: var(--g-token-check-label-color);
		}

		&__message {
			font-size: var(--g-token-font-size-xs);
			color: var(--g-token-text-muted);
		}

		&_inline {
			display: flex;
		}

		&_disabled {
			.g-check-control__body {
				cursor: not-allowed;
				opacity: var(--g-token-opacity-soft);
			}
		}

		&_focused {
			.g-check-control__label {
				color: rgb(var(--g-theme-primary));
			}
		}

		&_error {
			.g-check-control__label,
			.g-check-control__message {
				color: rgb(var(--g-theme-error));
			}
		}

		&_warning {
			.g-check-control__label,
			.g-check-control__message {
				color: rgb(var(--g-theme-warning));
			}
		}

		&_success {
			.g-check-control__label,
			.g-check-control__message {
				color: rgb(var(--g-theme-success));
			}
		}

		&_s {
			.g-check-control__label {
				font-size: var(--g-token-check-label-font-size-s);
			}
		}

		&_m {
			.g-check-control__label {
				font-size: var(--g-token-check-label-font-size-m);
			}
		}

		&_l {
			.g-check-control__label {
				font-size: var(--g-token-check-label-font-size-l);
			}
		}

		&_xl {
			.g-check-control__label {
				font-size: var(--g-token-check-label-font-size-xl);
			}
		}
	}
</style>
