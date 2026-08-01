<script setup lang="ts" generic="T extends NavValue = NavValue">
	import { computed, ref } from 'vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { useGlass } from '@/use/glass';
	import { provideNavList } from './context';
	import {
		makeNavListProps,
		type GNavListEmits,
		type GNavListSlotProps,
		type GNavListSlots,
		type NavValue
	} from './types';

	const props = defineProps(makeNavListProps({ color: 'primary' }));
	const slots = defineSlots<GNavListSlots<T>>();
	const emit = defineEmits<GNavListEmits<T>>();

	const localValue = ref<T | undefined>(props.defaultValue as T | undefined);

	const isControlled = computed(() => props.modelValue !== undefined);
	const model = computed<T | undefined>({
		get() {
			return isControlled.value
				? (props.modelValue as T | undefined)
				: localValue.value;
		},
		set(value) {
			if (!isControlled.value) {
				localValue.value = value;
			}

			emit('update:modelValue', value);
		}
	});
	const resolvedActiveColor = computed(
		() => props.activeColor ?? props.color
	);
	const { colorStyles, resolvedGradient } = useSurfaceColor({
		color: () => resolvedActiveColor.value
	});
	const { glassStyles } = useGlass(props);
	const navStyles = computed(
		() =>
			({
				...colorStyles.value,
				...glassStyles.value,
				'--g-nav-list-active-gradient': resolvedGradient.value,
				'--g-nav-list-width': toUnit(props.width, '100%')
			}) as Record<string, string>
	);
	const navClasses = computed(() => ({
		[`g-nav-list_${props.placement}`]: true,
		[`g-nav-list_align-${props.align}`]: true,
		[`g-nav-list_${props.surface}`]: true
	}));
	const slotProps = computed<GNavListSlotProps<T>>(() => ({
		modelValue: model.value,
		select
	}));

	function toUnit(
		value: string | number | null | undefined,
		fallback: string
	) {
		if (value === null || value === undefined || value === '') {
			return fallback;
		}

		return typeof value === 'number' ? `${value}px` : value;
	}

	function isSelected(value: T | undefined) {
		return value !== undefined && Object.is(model.value, value);
	}

	function select(value: T | undefined, event?: Event) {
		if (value === undefined) return;

		model.value = value;
		emit('select', value, event);
	}

	provideNavList({
		modelValue: model,
		color: computed(() => props.color),
		activeColor: resolvedActiveColor,
		placement: computed(() => props.placement),
		align: computed(() => props.align),
		indicator: computed(() => props.indicator),
		isSelected,
		select
	});
</script>

<template>
	<nav
		class="g-nav-list"
		:class="navClasses"
		:style="navStyles"
		:aria-label="props.ariaLabel || 'Navigation list'">
		<div
			v-if="slots.header"
			class="g-nav-list__header">
			<slot
				name="header"
				v-bind="slotProps" />
		</div>

		<ul class="g-nav-list__items">
			<slot v-bind="slotProps" />
		</ul>

		<div
			v-if="slots.footer"
			class="g-nav-list__footer">
			<slot
				name="footer"
				v-bind="slotProps" />
		</div>
	</nav>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/glass' as glass;

	.g-nav-list {
		--g-nav-list-padding-block: 20px;
		--g-nav-list-padding-inline: 18px;

		width: min(100%, var(--g-nav-list-width));
		padding: var(--g-nav-list-padding-block)
			var(--g-nav-list-padding-inline);
		border-radius: var(--g-token-radius-lg);

		color: color-mix(
			in srgb,
			var(--g-token-color-on-surface) 58%,
			white 10%
		);

		background: transparent;

		&_transparent {
			background: transparent;
			backdrop-filter: none;
		}

		&_glass {
			border: 1px solid
				color-mix(
					in srgb,
					var(--g-token-color-on-surface) 8%,
					transparent
				);

			@include glass.glass-surface;
		}

		&__items {
			display: flex;
			flex-direction: column;
			gap: 4px;

			margin: 0;
			padding: 0;

			list-style: none;
		}

		&__header,
		&__footer {
			padding-inline: var(--g-token-space-2);
		}
	}
</style>
