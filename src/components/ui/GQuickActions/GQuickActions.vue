<script setup lang="ts">
	import { computed, ref } from 'vue';
	import GFAB from '../GFAB/GFAB.vue';
	import GIcon from '../GIcon/GIcon.vue';
	import type { IconValue } from '../GIcon/types';
	import type { GFABLabelPlacement } from '../GFAB/types';
	import GTransition from '@/components/transitions/GTransition.vue';
	import TransitionRotate from '@/components/transitions/TransitionRotate.vue';
	import type { GQuickActionsDirection, GQuickActionsProps } from './types';

	const props = withDefaults(defineProps<GQuickActionsProps>(), {
		options: () => [],
		contained: false,
		position: 'fixed',
		location: 'bottom-right',
		direction: undefined,
		transition: undefined,
		offset: 24,
		labelPlacement: undefined
	});
	const slots = defineSlots<{
		trigger?: (slotProps: {
			isOpened: boolean;
			toggle: () => void;
		}) => unknown;
		action?: (slotProps: {
			option: NonNullable<GQuickActionsProps['options']>[number];
			index: number;
			labelPlacement: GFABLabelPlacement;
		}) => unknown;
	}>();
	const isOpened = ref(false);

	const iconValue = computed(() => props.icon as IconValue);
	const activeIconValue = computed(() => props.activeIcon as IconValue);
	const locationParts = computed(() => props.location.split('-'));
	const containerStyle = computed(() => {
		const [block, inline] = locationParts.value;
		const offset =
			typeof props.offset === 'number'
				? `${props.offset}px`
				: props.offset;
		const position = props.contained ? 'absolute' : props.position;

		return {
			position,
			[block]: offset,
			...(inline === 'center'
				? {
						left: '50%',
						transform: 'translateX(-50%)'
					}
				: { [inline]: offset })
		};
	});
	const optionLabelPlacement = computed<GFABLabelPlacement>(() => {
		if (props.labelPlacement) return props.labelPlacement;

		return locationParts.value[1] === 'right' ? 'left' : 'right';
	});
	const alignment = computed(() =>
		optionLabelPlacement.value === 'right' ? 'start' : 'end'
	);
	const actionDirection = computed<GQuickActionsDirection>(
		() =>
			props.direction ??
			(locationParts.value[0] === 'top' ? 'bottom' : 'top')
	);
	const toggle = () => {
		isOpened.value = !isOpened.value;
	};
</script>

<template>
	<teleport
		to="body"
		:disabled="props.contained">
		<div
			class="g-quick-actions__container"
			:class="{
				'g-quick-actions__container_contained': props.contained
			}"
			:style="containerStyle">
			<div class="g-quick-actions">
				<div
					class="g-quick-actions__anchor"
					:class="`g-quick-actions__anchor_${alignment}`">
					<g-transition
						name="g-quick-actions-content-transition"
						:transition="props.transition"
						:duration="320">
						<div
							v-if="isOpened"
							class="g-quick-actions__list"
							:class="[
								`g-quick-actions__list_${alignment}`,
								`g-quick-actions__list_${actionDirection}`
							]">
							<g-f-a-b
								v-for="(option, index) in props.options"
								:key="option.label"
								class="g-quick-actions__item"
								:style="{
									'--g-quick-actions-item-index': index
								}"
								:icon="option.icon"
								size="s"
								extended
								:label="option.label"
								:label-placement="optionLabelPlacement">
								<template
									v-if="slots.action"
									#default>
									<slot
										name="action"
										:option="option"
										:index="index"
										:label-placement="optionLabelPlacement">
										{{ option.label }}
									</slot>
								</template>
							</g-f-a-b>
						</div>
					</g-transition>

					<div
						class="g-quick-actions__trigger"
						:class="`g-quick-actions__trigger_${alignment}`">
						<slot
							name="trigger"
							:is-opened="isOpened"
							:toggle="toggle">
							<g-f-a-b
								icon="menu"
								@click="toggle">
								<template #icon>
									<transition-rotate>
										<g-icon
											v-if="!isOpened"
											:icon="iconValue" />
										<g-icon
											v-else
											:icon="activeIconValue" />
									</transition-rotate>
								</template>
							</g-f-a-b>
						</slot>
					</div>
				</div>
				<div
					class="g-quick-actions__underlay"
					:class="{
						'g-quick-actions__underlay_visible': isOpened
					}"
					@click="toggle"></div>
			</div>
		</div>
	</teleport>
</template>

<style scoped lang="scss">
	.g-quick-actions {
		--g-quick-actions-gap: 14px;

		position: relative;
		display: inline-flex;

		&__container {
			z-index: var(--g-quick-actions-z-index, 1200);

			&_contained {
				z-index: 2;
			}
		}

		&__list {
			position: absolute;
			z-index: 1;
			transform-origin: center;

			display: flex;
			gap: var(--g-quick-actions-gap);

			&_start {
				left: 0;
				align-items: flex-start;
			}

			&_end {
				right: 0;
				align-items: flex-end;
			}

			&_top,
			&_bottom {
				flex-direction: column;
			}

			&_top {
				bottom: calc(100% + var(--g-quick-actions-gap));
			}

			&_bottom {
				top: calc(100% + var(--g-quick-actions-gap));
			}

			&_left,
			&_right {
				top: 50%;
				transform: translateY(-50%);
				flex-direction: row;
				align-items: center;
			}

			&_left {
				right: calc(100% + var(--g-quick-actions-gap));
				left: auto;
			}

			&_right {
				right: auto;
				left: calc(100% + var(--g-quick-actions-gap));
			}
		}

		&__trigger {
			display: flex;

			&_start {
				justify-content: flex-start;
			}

			&_end {
				justify-content: flex-end;
			}
		}

		&__item {
			transform: translate3d(0, 0, 0) scale(1);
			opacity: 1;
			transition:
				opacity 220ms var(--g-token-easing-standard),
				transform 220ms var(--g-token-easing-emphasized);
			transition-delay: calc(var(--g-quick-actions-item-index, 0) * 45ms);
		}

		&__anchor {
			position: relative;
			z-index: 1;

			&_start {
				justify-self: start;
			}

			&_end {
				justify-self: end;
			}
		}

		&__underlay {
			pointer-events: none;

			position: absolute;
			inset: -20px;

			display: flex;
			align-items: flex-end;

			opacity: 0;
			background: transparent;

			transition: opacity var(--g-token-duration-fast)
				var(--g-token-easing-standard);

			&.g-quick-actions__underlay_visible {
				pointer-events: auto;
				opacity: 1;
			}
		}
	}

	.g-quick-actions-content-transition-enter-active,
	.g-quick-actions-content-transition-leave-active {
		transition: opacity 320ms var(--g-token-easing-standard);
	}

	.g-quick-actions-content-transition-enter-from,
	.g-quick-actions-content-transition-leave-to {
		opacity: 0;
	}

	.g-quick-actions-content-transition-enter-from .g-quick-actions__item,
	.g-quick-actions-content-transition-leave-to .g-quick-actions__item,
	.g-fade-transition-enter-from .g-quick-actions__item,
	.g-fade-transition-leave-to .g-quick-actions__item,
	.g-scale-transition-enter-from .g-quick-actions__item,
	.g-scale-transition-leave-to .g-quick-actions__item,
	.g-scale-only-transition-enter-from .g-quick-actions__item,
	.g-scale-only-transition-leave-to .g-quick-actions__item,
	.g-slide-x-transition-enter-from .g-quick-actions__item,
	.g-slide-x-transition-leave-to .g-quick-actions__item,
	.g-slide-x-reverse-transition-enter-from .g-quick-actions__item,
	.g-slide-x-reverse-transition-leave-to .g-quick-actions__item,
	.g-slide-y-transition-enter-from .g-quick-actions__item,
	.g-slide-y-transition-leave-to .g-quick-actions__item,
	.g-slide-y-reverse-transition-enter-from .g-quick-actions__item,
	.g-slide-y-reverse-transition-leave-to .g-quick-actions__item,
	.g-dialog-transition-enter-from .g-quick-actions__item,
	.g-dialog-transition-leave-to .g-quick-actions__item {
		opacity: 0;
	}

	.g-quick-actions-content-transition-enter-from.g-quick-actions__list_top
		.g-quick-actions__item,
	.g-quick-actions-content-transition-leave-to.g-quick-actions__list_top
		.g-quick-actions__item,
	.g-fade-transition-enter-from.g-quick-actions__list_top
		.g-quick-actions__item,
	.g-fade-transition-leave-to.g-quick-actions__list_top
		.g-quick-actions__item,
	.g-scale-transition-enter-from.g-quick-actions__list_top
		.g-quick-actions__item,
	.g-scale-transition-leave-to.g-quick-actions__list_top
		.g-quick-actions__item,
	.g-scale-only-transition-enter-from.g-quick-actions__list_top
		.g-quick-actions__item,
	.g-scale-only-transition-leave-to.g-quick-actions__list_top
		.g-quick-actions__item,
	.g-slide-y-reverse-transition-enter-from.g-quick-actions__list_top
		.g-quick-actions__item,
	.g-slide-y-reverse-transition-leave-to.g-quick-actions__list_top
		.g-quick-actions__item {
		transform: translateY(10px) scale(0.96);
	}

	.g-quick-actions-content-transition-enter-from.g-quick-actions__list_bottom
		.g-quick-actions__item,
	.g-quick-actions-content-transition-leave-to.g-quick-actions__list_bottom
		.g-quick-actions__item,
	.g-fade-transition-enter-from.g-quick-actions__list_bottom
		.g-quick-actions__item,
	.g-fade-transition-leave-to.g-quick-actions__list_bottom
		.g-quick-actions__item,
	.g-scale-transition-enter-from.g-quick-actions__list_bottom
		.g-quick-actions__item,
	.g-scale-transition-leave-to.g-quick-actions__list_bottom
		.g-quick-actions__item,
	.g-scale-only-transition-enter-from.g-quick-actions__list_bottom
		.g-quick-actions__item,
	.g-scale-only-transition-leave-to.g-quick-actions__list_bottom
		.g-quick-actions__item,
	.g-slide-y-transition-enter-from.g-quick-actions__list_bottom
		.g-quick-actions__item,
	.g-slide-y-transition-leave-to.g-quick-actions__list_bottom
		.g-quick-actions__item {
		transform: translateY(-10px) scale(0.96);
	}

	.g-quick-actions-content-transition-enter-from.g-quick-actions__list_left
		.g-quick-actions__item,
	.g-quick-actions-content-transition-leave-to.g-quick-actions__list_left
		.g-quick-actions__item,
	.g-slide-x-transition-enter-from.g-quick-actions__list_left
		.g-quick-actions__item,
	.g-slide-x-transition-leave-to.g-quick-actions__list_left
		.g-quick-actions__item {
		transform: translateX(10px) scale(0.96);
	}

	.g-quick-actions-content-transition-enter-from.g-quick-actions__list_right
		.g-quick-actions__item,
	.g-quick-actions-content-transition-leave-to.g-quick-actions__list_right
		.g-quick-actions__item,
	.g-slide-x-reverse-transition-enter-from.g-quick-actions__list_right
		.g-quick-actions__item,
	.g-slide-x-reverse-transition-leave-to.g-quick-actions__list_right
		.g-quick-actions__item {
		transform: translateX(-10px) scale(0.96);
	}
</style>
