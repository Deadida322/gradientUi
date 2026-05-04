<script setup lang="ts" generic="T extends AsideValue = AsideValue">
	import { computed, ref } from 'vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { provideAside } from './context';
	import {
		makeAsideProps,
		type AsideValue,
		type GAsideEmits,
		type GAsideSlotProps,
		type GAsideSlots
	} from './types';

	const props = defineProps(makeAsideProps({ color: 'primary' }));
	const slots = defineSlots<GAsideSlots<T>>();
	const emit = defineEmits<GAsideEmits<T>>();

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
	const asideStyles = computed(
		() =>
			({
				...colorStyles.value,
				'--g-aside-active-gradient': resolvedGradient.value,
				'--g-aside-top': toUnit(props.top, '88px'),
				'--g-aside-offset': toUnit(props.offset, '24px'),
				'--g-aside-width': toUnit(props.width, '228px'),
				'--g-aside-radius': toUnit(props.radius, '28px')
			}) as Record<string, string>
	);
	const asideClasses = computed(() => ({
		[`g-aside_${props.placement}`]: true,
		[`g-aside_align-${props.align}`]: true,
		[`g-aside_${props.position}`]: true,
		[`g-aside_${props.surface}`]: true
	}));
	const slotProps = computed<GAsideSlotProps<T>>(() => ({
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

	provideAside({
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
	<aside
		class="g-aside"
		:class="asideClasses"
		:style="asideStyles">
		<nav
			class="g-aside__nav"
			:aria-label="props.ariaLabel || 'Aside navigation'">
			<div
				v-if="slots.header"
				class="g-aside__header">
				<slot
					name="header"
					v-bind="slotProps" />
			</div>

			<ul class="g-aside__items">
				<slot v-bind="slotProps" />
			</ul>

			<div
				v-if="slots.footer"
				class="g-aside__footer">
				<slot
					name="footer"
					v-bind="slotProps" />
			</div>
		</nav>
	</aside>
</template>

<style scoped lang="scss">
	.g-aside {
		--g-aside-padding-block: 20px;
		--g-aside-padding-inline: 18px;

		position: relative;

		width: min(100%, var(--g-aside-width));
		padding: var(--g-aside-padding-block) var(--g-aside-padding-inline);
		border-radius: 0 0 0 var(--g-aside-radius);

		color: color-mix(
			in srgb,
			var(--g-token-color-on-surface) 58%,
			white 10%
		);

		background: transparent;

		transition:
			opacity var(--g-token-duration-base) var(--g-token-easing-standard),
			transform var(--g-token-duration-base)
				var(--g-token-easing-standard);

		&_absolute,
		&_fixed {
			z-index: var(--g-aside-z-index, 12);
			top: var(--g-aside-top);
		}

		&_absolute {
			position: absolute;
		}

		&_fixed {
			position: fixed;
		}

		&_left {
			border-radius: 0 0 var(--g-aside-radius) 0;
		}

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
			background:
				radial-gradient(
					120% 110% at 100% 0%,
					color-mix(in srgb, white 72%, transparent),
					transparent 58%
				),
				linear-gradient(
					180deg,
					color-mix(
						in srgb,
						var(--g-token-color-surface) 58%,
						transparent
					),
					color-mix(
						in srgb,
						var(--g-token-color-surface) 36%,
						transparent
					)
				);
			backdrop-filter: blur(12px);
		}

		&_left.g-aside_absolute,
		&_left.g-aside_fixed {
			left: var(--g-aside-offset);
		}

		&_right.g-aside_absolute,
		&_right.g-aside_fixed {
			right: var(--g-aside-offset);
		}

		&__nav,
		&__items {
			display: flex;
			flex-direction: column;
		}

		&__nav {
			gap: var(--g-token-space-3);
		}

		&__header,
		&__footer {
			padding-inline: var(--g-token-space-2);
		}

		&__items {
			gap: 4px;
			align-items: stretch;

			margin: 0;
			padding: 0;

			list-style: none;
		}
	}
</style>
