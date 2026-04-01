<script setup lang="ts">
	import GGradient from '../GGradient/GGradient.vue';
	import GIcon from '@/components/ui/GIcon.vue';
	import type { PLASlots } from '@/types/CommonTypes';
	import type { GGradienProps } from '../GGradient/types';
	import type { GButtonProps } from './types';

	const slots = defineSlots<PLASlots>();

	const props = withDefaults(
		defineProps<
			GButtonProps &
				GGradienProps & {
					removable?: boolean; // флаг для крестика удаления
					onRemove?: () => void; // коллбек при удалении
				}
		>(),
		{
			borderWidth: 1,
			removable: false
		}
	);
</script>

<template>
	<g-gradient
		class="g-gradient"
		:class="{ 'g-chip__disabled': disabled }"
		v-bind="props"
		:border-radius="20"
		:border-width="borderWidth">
		<div class="g-chip">
			<div class="g-chip__content">
				<!-- Иконка слева -->
				<div
					v-if="slots.prepend || prependIcon"
					class="g-chip__prepend">
					<slot name="prepend">
						<g-icon
							v-if="prependIcon"
							:icon="prependIcon"></g-icon>
					</slot>
				</div>

				<!-- Текст чипа -->
				<div class="g-chip__label">
					<slot>{{ label }}</slot>
				</div>

				<!-- Иконка справа -->
				<div
					v-if="slots.append || appendIcon"
					class="g-chip__append">
					<slot name="append">
						<g-icon
							v-if="appendIcon"
							:icon="appendIcon"></g-icon>
					</slot>
				</div>

				<div
					v-if="removable"
					class="g-chip__remove"
					@click="onRemove?.()">
					<g-icon icon="close"></g-icon>
				</div>
			</div>
		</div>
	</g-gradient>
</template>

<style lang="scss" scoped>
	.g-chip {
		cursor: pointer;
		user-select: none;

		display: inline-flex;
		gap: 6px;
		align-items: center;

		padding: 4px 12px;
		border-radius: 16px;

		font-size: 13px;
		line-height: 18px;
		color: white;

		background-color: var(--g-primary-color);

		transition: all 0.2s ease-in-out;

		&__disabled {
			pointer-events: none;
			opacity: 0.5;
		}

		&__content {
			display: inline-flex;
			gap: 4px;
			align-items: center;
		}

		&__prepend,
		&__append {
			display: inline-flex;
			align-items: center;
		}

		&__label {
			display: inline-flex;
			align-items: center;
			white-space: nowrap;
		}

		&__remove {
			cursor: pointer;

			display: inline-flex;
			align-items: center;

			margin-left: 4px;

			transition: opacity 0.2s;

			&:hover {
				opacity: 0.7;
			}
		}

		&:hover {
			background-color: var(--g-primary-color-hover);
		}

		&.g-chip_outlined {
			border: 1px solid var(--g-primary-color);
			color: var(--g-primary-color);
			background-color: transparent;

			&:hover {
				background-color: rgb(0 0 0 / 5%);
			}
		}

		&.g-chip_tonal {
			color: var(--g-on-tonal);
			background-color: var(--g-tonal);

			&:hover {
				background-color: var(--g-tonal-hover);
			}
		}

		&.g-chip_text {
			color: var(--g-primary-color);
			background-color: transparent;

			&:hover {
				background-color: rgb(0 0 0 / 5%);
			}
		}
	}
</style>
