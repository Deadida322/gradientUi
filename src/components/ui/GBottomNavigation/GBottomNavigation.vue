<script
	setup
	lang="ts"
	generic="T extends BottomNavigationValue = BottomNavigationValue">
	import { computed, ref, useAttrs } from 'vue';
	import GGradient from '@/components/ui/GGradient/GGradient.vue';
	import GNavigationIndicator from '@/components/shared/GNavigationIndicator.vue';
	import {
		useNavigationController,
		useNavigationSurface
	} from '@/use/navigation';
	import { useNavigationIndicator } from '@/use/navigation/indicator';
	import { useSsrId } from '@/ssr/use';
	import { provideBottomNavigation } from './context';
	import {
		makeBottomNavigationProps,
		type BottomNavigationValue,
		type GBottomNavigationEmits,
		type GBottomNavigationSlots
	} from './types';
	defineOptions({ inheritAttrs: false });
	const props = defineProps(makeBottomNavigationProps());
	const emit = defineEmits<GBottomNavigationEmits<T>>();
	defineSlots<GBottomNavigationSlots<T>>();
	const attrs = useAttrs();
	const items = ref<HTMLElement | null>(null);
	const navigation = useNavigationController<BottomNavigationValue>({
		modelValue: () => props.modelValue,
		defaultValue: () => props.defaultValue,
		disabled: () => props.disabled,
		orientation: 'horizontal',
		idPrefix: useSsrId('g-bottom-navigation'),
		onUpdateModelValue: (value) =>
			emit('update:modelValue', value as T | undefined),
		onSelect: (value, event) =>
			emit('select', value as T | undefined, event)
	});
	const { indicator } = useNavigationIndicator(
		items,
		navigation.model,
		navigation.registeredItems
	);
	const {
		color,
		activeColor,
		indicatorMaterialStyles,
		indicatorGradient,
		materialFrameProps,
		surfaceStyles,
		surfaceUnderlayClasses,
		surfaceOverlayClasses,
		surfaceTextureClasses,
		surfaceContentClasses,
		surfaceMaterialMorphClasses,
		surfaceMaterialMorphBlobClasses,
		morphEnabled,
		morphBlobs,
		getMorphBlobStyle
	} = useNavigationSurface(props, 'g-bottom-navigation');
	provideBottomNavigation({
		navigation,
		activeColor,
		color,
		disabled: computed(() => props.disabled),
		showLabels: computed(() => props.showLabels)
	});
	const modelValue = computed(() => navigation.model.value as T | undefined);
	const select = (value: T | undefined, event?: Event) =>
		navigation.select(value, event);
</script>
<template>
	<g-gradient
		v-bind="materialFrameProps"
		class="g-bottom-navigation__frame"
		:class="`g-bottom-navigation__frame_${props.position}`">
		<nav
			class="g-bottom-navigation"
			:class="[
				`g-bottom-navigation_${props.variant}`,
				`g-bottom-navigation_texture-${props.texture}`,
				{ 'g-bottom-navigation_disabled': props.disabled }
			]"
			:style="surfaceStyles"
			:aria-label="props.ariaLabel"
			:aria-disabled="props.disabled || undefined"
			v-bind="attrs">
			<span
				:class="surfaceUnderlayClasses"
				aria-hidden="true"></span>
			<span
				v-if="morphEnabled"
				:class="surfaceMaterialMorphClasses"
				aria-hidden="true"
				><span
					v-for="(blob, index) in morphBlobs"
					:key="index"
					:class="surfaceMaterialMorphBlobClasses"
					:style="getMorphBlobStyle(blob)"></span
			></span>
			<span
				:class="surfaceOverlayClasses"
				aria-hidden="true"></span>
			<span
				:class="surfaceTextureClasses"
				aria-hidden="true"></span>
			<ul
				ref="items"
				class="g-bottom-navigation__items"
				:class="surfaceContentClasses">
				<g-navigation-indicator
					tag="li"
					v-bind="indicator"
					:style="indicatorMaterialStyles"
					:gradient="indicatorGradient" />
				<slot
					:model-value="modelValue"
					:select="select" />
			</ul>
		</nav>
	</g-gradient>
</template>
<style lang="scss">
	@use '@/styles/mixins/action-surface' as actionSurface;
	@use '@/styles/mixins/variants' as variants;

	.g-bottom-navigation__frame {
		width: 100%;

		&_sticky,
		&_fixed {
			z-index: var(--g-token-z-index-dropdown, 4);
			bottom: 0;
		}

		&_sticky {
			position: sticky;
		}

		&_fixed {
			position: fixed;
			inset-inline: 0;
		}
	}

	.g-bottom-navigation {
		--g-bottom-navigation-padding-block: 0px;
		--g-bottom-navigation-padding-left: env(safe-area-inset-left, 0px);
		--g-bottom-navigation-padding-right: env(safe-area-inset-right, 0px);
		--g-bottom-navigation-item-radius-left: var(
			--g-bottom-navigation-item-radius-x,
			max(
				0px,
				calc(
					var(
							--g-gradient-surface-radius,
							var(--g-token-radius-md)
						) - var(--g-bottom-navigation-padding-left)
				)
			)
		);
		--g-bottom-navigation-item-radius-right: var(
			--g-bottom-navigation-item-radius-x,
			max(
				0px,
				calc(
					var(
							--g-gradient-surface-radius,
							var(--g-token-radius-md)
						) - var(--g-bottom-navigation-padding-right)
				)
			)
		);
		--g-bottom-navigation-item-radius-y: max(
			0px,
			calc(
				var(
						--g-gradient-surface-radius,
						var(--g-token-radius-md)
					) - var(--g-bottom-navigation-padding-block)
			)
		);
		--g-surface-underlay-color: var(--g-surface-color);
		--g-surface-underlay-opacity: 1;
		--g-surface-content-color: var(--g-token-color-on-surface);

		isolation: isolate;
		padding-block-end: env(safe-area-inset-bottom, 0);
		border-radius: inherit;
		color: var(--g-surface-content-color);

		&_gradient,
		&_default {
			--g-bottom-navigation-item-color: var(--g-surface-content-color);
			--g-bottom-navigation-item-active-color: var(
				--g-surface-content-color
			);
		}

		&__items {
			position: relative;

			display: flex;
			gap: var(--g-token-space-1);
			align-items: stretch;

			min-width: 0;
			margin: 0;
			padding: var(--g-bottom-navigation-padding-block)
				var(--g-bottom-navigation-padding-right)
				var(--g-bottom-navigation-padding-block)
				var(--g-bottom-navigation-padding-left);

			list-style: none;
		}

		&_disabled {
			opacity: var(--g-token-opacity-disabled);
		}
	}

	@include actionSurface.action-surface-layers('g-bottom-navigation', true);
	@include actionSurface.action-state-overrides('g-bottom-navigation');
	@include variants.variant-gradient('g-bottom-navigation');
	@include variants.variant-tonal('g-bottom-navigation');
	@include variants.variant-glass('g-bottom-navigation');
	@include variants.variant-outlined('g-bottom-navigation', null);

	.g-bottom-navigation:hover {
		&.g-bottom-navigation_default,
		&.g-bottom-navigation_gradient,
		&.g-bottom-navigation_outlined,
		&.g-bottom-navigation_glass {
			--g-surface-overlay-opacity: 0;
		}

		&.g-bottom-navigation_tonal {
			--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
		}
	}
</style>
