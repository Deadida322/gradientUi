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
	import { useSurfaceColor } from '@/use/surfaceColor';

	const props = defineProps(makeCheckGroupBaseProps());

	const slots = defineSlots<CheckGroupSlots>();
	const emit = defineEmits<CheckGroupRootEmits>();
	const sizeClass = useSize(props, 'g-check-group');
	const disabledClass = useDisabled(props, 'g-check-group');
	const focusedClass = useFocused(props, 'g-check-group');
	const stateClass = useState(props, 'g-check-group');
	const { colorStyles } = useSurfaceColor(props);
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
		:style="colorStyles"
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
		--g-check-group-accent: var(--g-color);

		display: flex;
		flex-direction: column;

		min-width: 0;
		margin: 0;
		padding: 0;
		border: none;

		&__label {
			padding: 0;
			font-size: var(--g-token-check-group-label-font-size);
			color: var(--g-token-check-group-label-color);
			text-align: left;
		}

		&__content {
			display: flex;
			flex-direction: column;
			gap: var(--g-token-check-group-gap);
		}

		&__items {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-check-group-items-gap-y)
				var(--g-token-check-group-items-gap-x);
		}

		&__message {
			font-size: var(--g-token-check-group-message-font-size);
			color: var(--g-token-check-group-message-color);
			text-align: left;
		}

		&__label + &__content {
			margin-top: var(--g-token-check-group-legend-gap);
		}

		&_vertical {
			.g-check-group__items {
				flex-direction: column;
				align-items: flex-start;
			}
		}

		&_disabled {
			opacity: var(--g-token-check-group-disabled-opacity);
		}

		&_focused {
			.g-check-group__label {
				color: var(--g-check-group-accent);
			}
		}

		&_error {
			.g-check-group__label,
			.g-check-group__message {
				color: var(--g-check-group-accent);
			}
		}

		&_warning {
			.g-check-group__label,
			.g-check-group__message {
				color: var(--g-check-group-accent);
			}
		}

		&_success {
			.g-check-group__label,
			.g-check-group__message {
				color: var(--g-check-group-accent);
			}
		}
	}
</style>
