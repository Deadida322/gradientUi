<script setup lang="ts" generic="T extends AsideValue = AsideValue">
	import { computed, onBeforeUnmount, onMounted, watch } from 'vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { useAsideInject } from './context';
	import { useAsideGroupInject } from './groupContext';
	import {
		makeAsideItemProps,
		type AsideValue,
		type GAsideItemSlotProps,
		type GAsideItemSlots
	} from './types';

	const props = defineProps(makeAsideItemProps());
	const slots = defineSlots<GAsideItemSlots<T>>();
	const emit = defineEmits<{
		click: [event: MouseEvent];
	}>();

	const aside = useAsideInject<T>();
	const group = useAsideGroupInject<T>();
	const selected = computed(() =>
		aside ? aside.isSelected(props.value as T | undefined) : false
	);
	const placement = computed(() => aside?.placement.value ?? 'right');
	const align = computed(() => aside?.align.value ?? 'end');
	const indicator = computed(() => aside?.indicator.value ?? 'dot');
	const resolvedColor = computed(
		() =>
			(selected.value ? aside?.activeColor.value : aside?.color.value) ??
			'primary'
	);
	const { colorStyles } = useSurfaceColor({
		color: () => resolvedColor.value
	});
	const itemStyles = computed(() => colorStyles.value);
	const slotProps = computed<GAsideItemSlotProps<T>>(() => ({
		selected: selected.value,
		disabled: props.disabled,
		value: props.value as T | undefined,
		modelValue: aside?.modelValue.value,
		isSelected,
		select
	}));
	const isLink = computed(() => Boolean(props.href) && !props.disabled);
	const actionTag = computed(() => (isLink.value ? 'a' : 'button'));
	const actionAttrs = computed(() =>
		isLink.value
			? {
					href: props.href,
					target: props.target,
					rel:
						props.rel ??
						(props.target === '_blank'
							? 'noopener noreferrer'
							: undefined)
				}
			: {
					type: 'button',
					disabled: props.disabled
				}
	);

	function isSelected(value: T | undefined) {
		return aside ? aside.isSelected(value) : false;
	}

	function select(value: T | undefined, event?: Event) {
		aside?.select(value, event);
	}

	function onClick(event: MouseEvent) {
		if (props.disabled) {
			event.preventDefault();
			return;
		}

		select(props.value as T | undefined, event);
		emit('click', event);
	}

	onMounted(() => {
		group?.registerValue(props.value as T | undefined);
	});

	onBeforeUnmount(() => {
		group?.unregisterValue(props.value as T | undefined);
	});

	watch(
		() => props.value,
		(value, oldValue) => {
			group?.unregisterValue(oldValue as T | undefined);
			group?.registerValue(value as T | undefined);
		}
	);
</script>

<template>
	<li
		class="g-aside-item"
		:class="{
			'g-aside-item_selected': selected,
			'g-aside-item_disabled': props.disabled,
			[`g-aside-item_${placement}`]: true,
			[`g-aside-item_align-${align}`]: true,
			[`g-aside-item_indicator-${indicator}`]: true
		}"
		:style="itemStyles"
		role="none">
		<component
			:is="actionTag"
			v-ripple
			class="g-aside-item__action"
			role="menuitem"
			:aria-current="selected ? 'page' : undefined"
			v-bind="actionAttrs"
			@click="onClick">
			<span
				v-if="slots.prepend || props.prependIcon"
				class="g-aside-item__prepend">
				<slot
					name="prepend"
					v-bind="slotProps">
					<g-icon :icon="props.prependIcon" />
				</slot>
			</span>

			<span class="g-aside-item__label">
				<slot v-bind="slotProps">{{ props.label }}</slot>
			</span>

			<span
				aria-hidden="true"
				class="g-aside-item__indicator"></span>

			<span
				v-if="slots.append || props.appendIcon"
				class="g-aside-item__append">
				<slot
					name="append"
					v-bind="slotProps">
					<g-icon :icon="props.appendIcon" />
				</slot>
			</span>
		</component>
	</li>
</template>

<style scoped lang="scss">
	.g-aside-item {
		position: relative;
		display: block;
		width: 100%;
		list-style: none;

		&__action {
			cursor: pointer;

			position: relative;

			display: flex;
			gap: var(--g-token-space-4);
			align-items: center;

			width: 100%;
			min-height: 36px;
			padding: 0 10px;
			border: 0;
			border-radius: var(--g-token-radius-pill);

			font: inherit;
			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-medium);
			line-height: var(--g-token-line-height-sm);
			color: inherit;
			text-align: left;
			text-decoration: none;

			background: transparent;

			transition:
				color var(--g-token-duration-hover)
					var(--g-token-easing-standard),
				background-color var(--g-token-duration-hover)
					var(--g-token-easing-standard),
				padding var(--g-token-duration-hover)
					var(--g-token-easing-standard),
				transform var(--g-token-duration-hover)
					var(--g-token-easing-standard);

			&:hover {
				color: color-mix(
					in srgb,
					var(--g-token-color-on-surface) 68%,
					white 8%
				);
				background: color-mix(
					in srgb,
					var(--g-token-color-on-surface) 3%,
					transparent
				);
			}

			&:focus-visible {
				outline: var(--g-token-state-focus-ring-width) solid
					color-mix(in srgb, var(--g-color) 48%, transparent);
				outline-offset: 2px;
			}
		}

		&__label {
			overflow: hidden;
			display: block;
			flex: 1 1 auto;

			min-width: 0;

			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__indicator {
			pointer-events: none;

			position: absolute;
			inset-block-start: 50%;
			transform: translateY(-50%);

			opacity: 0;

			transition:
				opacity var(--g-token-duration-fast)
					var(--g-token-easing-standard),
				transform var(--g-token-duration-fast)
					var(--g-token-easing-standard);
		}

		&__prepend,
		&__append {
			display: inline-flex;
			flex: 0 0 auto;
			align-items: center;
			justify-content: center;

			min-width: 18px;
		}

		&__append {
			color: var(--g-color);
		}

		&_selected &__action {
			font-weight: var(--g-token-font-weight-bold);
			color: color-mix(
				in srgb,
				var(--g-token-color-on-surface) 92%,
				var(--g-color) 8%
			);
		}

		&_selected &__indicator {
			opacity: 1;
		}

		&_indicator-dot &__indicator {
			width: 7px;
			height: 7px;
			border-radius: 999px;

			background: var(--g-aside-active-gradient);
			box-shadow: 0 0 0 5px
				color-mix(in srgb, var(--g-color) 9%, transparent);
		}

		&_indicator-line &__indicator {
			width: 2px;
			height: 30px;
			border-radius: 999px;

			background: var(--g-aside-active-gradient);
			box-shadow: 0 0 16px
				color-mix(in srgb, var(--g-color) 16%, transparent);
		}

		&_left &__action {
			padding: 0 10px 0 18px;
		}

		&_left &__indicator {
			inset-inline-start: 8px;
		}

		&_left.g-aside-item_indicator-line &__indicator {
			inset-inline-start: 8px;
		}

		&_right &__action {
			padding: 0 24px 0 10px;
		}

		&_right.g-aside-item_indicator-line &__indicator {
			inset-inline-end: 8px;
		}

		&_align-start &__action {
			justify-content: flex-start;
			text-align: left;
		}

		&_align-center &__action {
			justify-content: center;
			text-align: center;
		}

		&_align-center &__prepend,
		&_align-center &__append {
			flex: 0 0 18px;
		}

		&_align-center &__label {
			flex: 0 1 auto;
			text-align: center;
		}

		&_align-end &__action {
			justify-content: flex-end;
			text-align: right;
		}

		&_align-start &__label {
			text-align: left;
		}

		&_align-end &__label {
			text-align: right;
		}

		&_disabled {
			pointer-events: none;
			opacity: var(--g-token-opacity-disabled);
		}
	}
</style>
