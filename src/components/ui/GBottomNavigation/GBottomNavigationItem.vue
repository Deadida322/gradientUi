<script setup lang="ts">
	import {
		computed,
		reactive,
		ref,
		toRefs,
		useAttrs,
		type ComponentPublicInstance
	} from 'vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { useNavigationItem } from '@/use/navigation';
	import { useLinkTagName } from '@/use/routerLink';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { isClientHTMLElement } from '@/ssr';
	import { useBottomNavigation } from './context';
	import {
		makeBottomNavigationItemProps,
		type GBottomNavigationItemSlots
	} from './types';
	defineOptions({ inheritAttrs: false });
	const props = defineProps(makeBottomNavigationItemProps());
	const slots = defineSlots<GBottomNavigationItemSlots>();
	const emit = defineEmits<{ click: [event: MouseEvent] }>();
	const attrs = useAttrs();
	const parent = useBottomNavigation();
	const root = ref<HTMLElement | null>(null);
	const { selected, disabled, onClick, onKeydown } = useNavigationItem({
		rootRef: root,
		value: () => props.value,
		disabled: () => props.disabled,
		parentDisabled: () => parent?.disabled.value,
		isSelected: parent?.navigation.isSelected,
		select: parent?.navigation.select,
		registerItem: parent?.navigation.registerItem,
		unregisterItem: parent?.navigation.unregisterItem,
		onItemKeydown: parent?.navigation.onItemKeydown,
		onClick: (event) => emit('click', event)
	});
	const { tagName, tagAttrs } = useLinkTagName(
		reactive({ ...toRefs(props), disabled }),
		'button'
	);
	const setRoot = (value: Element | ComponentPublicInstance | null) => {
		const element = value && '$el' in value ? value.$el : value;
		root.value = isClientHTMLElement(element) ? element : null;
	};
	const { colorStyles } = useSurfaceColor({
		color: () =>
			(selected.value
				? parent?.activeColor.value
				: parent?.color.value) ?? 'primary'
	});
	const showLabels = computed(() => parent?.showLabels.value ?? true);
</script>
<template>
	<li
		class="g-bottom-navigation-item"
		:class="{
			'g-bottom-navigation-item_selected': selected,
			'g-bottom-navigation-item_disabled': disabled
		}"
		:style="colorStyles">
		<component
			:is="tagName"
			:ref="setRoot"
			v-ripple
			class="g-bottom-navigation-item__action"
			v-bind="{ ...tagAttrs, ...attrs }"
			:aria-current="selected ? 'page' : undefined"
			:aria-label="props.label"
			:aria-disabled="disabled || undefined"
			@click="onClick"
			@keydown="onKeydown">
			<span
				v-if="props.icon || slots.icon"
				class="g-bottom-navigation-item__icon"
				><slot
					name="icon"
					:selected="selected"
					:disabled="disabled"
					><g-icon :icon="props.icon" /></slot
			></span>
			<span
				v-if="showLabels"
				class="g-bottom-navigation-item__label"
				><slot
					:selected="selected"
					:disabled="disabled"
					>{{ props.label }}</slot
				></span
			>
		</component>
	</li>
</template>
<style lang="scss">
	@use '@/styles/mixins/focus-ring' as focus;

	.g-bottom-navigation-item {
		--g-bottom-navigation-item-scale: 1;

		flex: 1 1 0;
		min-width: 0;
		color: var(--g-bottom-navigation-item-color, var(--g-token-text-soft));

		&_selected {
			--g-bottom-navigation-item-scale: var(
				--g-bottom-navigation-active-scale,
				1.16
			);

			color: var(--g-bottom-navigation-item-active-color, var(--g-color));
		}

		&_disabled {
			opacity: var(--g-token-opacity-disabled);
		}

		&__action {
			--g-bottom-navigation-action-radius-left: var(
				--g-bottom-navigation-item-radius-left,
				var(--g-token-radius-sm)
			);
			--g-bottom-navigation-action-radius-right: var(
				--g-bottom-navigation-item-radius-right,
				var(--g-token-radius-sm)
			);
			--g-bottom-navigation-action-radius-y: var(
				--g-bottom-navigation-item-radius-y,
				var(--g-token-radius-sm)
			);

			cursor: pointer;

			display: flex;
			flex-direction: column;
			gap: var(--g-token-space-1);
			align-items: center;
			justify-content: center;

			width: 100%;
			min-height: calc(var(--g-token-space-4) * 4);
			padding: var(--g-token-space-2);
			border-radius: var(--g-bottom-navigation-action-radius-left)
				var(--g-bottom-navigation-action-radius-right)
				var(--g-bottom-navigation-action-radius-right)
				var(--g-bottom-navigation-action-radius-left) /
				var(--g-bottom-navigation-action-radius-y);

			color: inherit;
			text-decoration: none;

			&:hover {
				background: color-mix(in srgb, var(--g-color) 8%, transparent);
			}

			&:focus-visible {
				@include focus.focus-ring;
			}

			&:disabled {
				cursor: default;
			}
		}

		&__icon,
		&__label {
			transform: scale(var(--g-bottom-navigation-item-scale));
			transition: transform var(--g-token-duration-base)
				var(--g-token-easing-emphasized);
		}

		&__icon {
			display: inline-flex;
		}

		&__label {
			overflow: hidden;

			max-width: calc(
				100% / var(--g-bottom-navigation-active-scale, 1.16)
			);

			font-size: var(--g-token-font-size-xs);
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.g-bottom-navigation-item__icon,
		.g-bottom-navigation-item__label {
			transition: none;
		}
	}
</style>
