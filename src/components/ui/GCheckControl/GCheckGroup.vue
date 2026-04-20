<script setup lang="ts">
	import {
		makeCheckGroupBaseProps,
		type CheckGroupRootEmits,
		type CheckGroupSlots
	} from '@/use/check';
	import { useDisabled } from '@/use/disabled';
	import { useFocused } from '@/use/focused';
	import { useSize } from '@/use/size';
	import { useState } from '@/use/state';

	const props = defineProps(makeCheckGroupBaseProps());

	const slots = defineSlots<CheckGroupSlots>();
	const emit = defineEmits<CheckGroupRootEmits>();
	const sizeClass = useSize(props, 'g-check-group');
	const disabledClass = useDisabled(props, 'g-check-group');
	const focusedClass = useFocused(props, 'g-check-group');
	const stateClass = useState(props, 'g-check-group');
</script>

<template>
	<fieldset
		class="g-check-group"
		:class="[
			sizeClass,
			disabledClass,
			focusedClass,
			stateClass,
			{
				'g-check-group_vertical': props.vertical
			}
		]"
		@focusin="emit('focusin', $event)"
		@focusout="emit('focusout', $event)"
		@pointerdown="emit('pointerdown', $event)"
		@pointerup="emit('pointerup', $event)"
		@pointercancel="emit('pointercancel', $event)">
		<legend
			v-if="props.label || slots.label"
			class="g-check-group__label">
			<slot name="label">
				{{ props.label }}
			</slot>
		</legend>

		<div class="g-check-group__content">
			<div class="g-check-group__items">
				<slot />
			</div>

			<div
				v-if="props.message || slots.message"
				class="g-check-group__message">
				<slot name="message">
					{{ props.message }}
				</slot>
			</div>
		</div>
	</fieldset>
</template>

<style scoped lang="scss">
	.g-check-group {
		display: flex;
		flex-direction: column;

		min-width: 0;
		margin: 0;
		padding: 0;
		border: none;

		&__label {
			padding: 0;
			font-size: 12px;
			color: rgba(var(--g-theme-on-surface), 0.76);
			text-align: left;
		}

		&__content {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		&__items {
			display: flex;
			flex-wrap: wrap;
			gap: 12px 16px;
		}

		&__message {
			font-size: 12px;
			color: rgba(var(--g-theme-on-surface), 0.65);
			text-align: left;
		}

		&__label + &__content {
			margin-top: 8px;
		}

		&_vertical {
			.g-check-group__items {
				flex-direction: column;
				align-items: flex-start;
			}
		}

		&_disabled {
			opacity: 0.7;
		}

		&_focused {
			.g-check-group__label {
				color: rgb(var(--g-theme-primary));
			}
		}

		&_error {
			.g-check-group__label,
			.g-check-group__message {
				color: rgb(var(--g-theme-error));
			}
		}

		&_warning {
			.g-check-group__label,
			.g-check-group__message {
				color: rgb(var(--g-theme-warning));
			}
		}

		&_success {
			.g-check-group__label,
			.g-check-group__message {
				color: rgb(var(--g-theme-success));
			}
		}
	}
</style>
