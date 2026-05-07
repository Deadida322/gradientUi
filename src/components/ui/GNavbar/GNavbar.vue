<script setup lang="ts" generic="T extends NavbarValue = NavbarValue">
	import {
		computed,
		nextTick,
		onBeforeUnmount,
		onMounted,
		ref,
		toRef,
		watch,
		type CSSProperties
	} from 'vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { provideNavbar } from './context';
	import {
		makeNavbarProps,
		type GNavbarEmits,
		type GNavbarSlotProps,
		type GNavbarSlots,
		type NavbarValue
	} from './types';

	const props = defineProps(makeNavbarProps({ color: 'primary' }));
	const slots = defineSlots<GNavbarSlots<T>>();
	const emit = defineEmits<GNavbarEmits<T>>();

	const rootRef = ref<HTMLElement | null>(null);
	const itemsRef = ref<HTMLElement | null>(null);
	const localValue = ref<T | undefined>(props.defaultValue as T | undefined);
	const hidden = ref(false);
	const lastScrollY = ref(0);
	const scrollThreshold = 8;
	const topRevealOffset = 16;
	let scrollRaf = 0;
	const registry = new Map<T | undefined, Set<HTMLElement>>();
	const indicator = ref({
		left: 0,
		width: 0,
		visible: false
	});

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
	const navbarStyles = computed<CSSProperties>(
		() =>
			({
				...colorStyles.value,
				'--g-navbar-indicator-gradient': resolvedGradient.value,
				'--g-navbar-indicator-left': `${indicator.value.left}px`,
				'--g-navbar-indicator-width': `${indicator.value.width}px`
			}) as CSSProperties
	);
	const navbarClasses = computed(() => ({
		[`g-navbar_${props.density}`]: true,
		'g-navbar_hidden': hidden.value,
		'g-navbar_elevated': props.elevated,
		'g-navbar_indicator-visible': indicator.value.visible
	}));
	const slotProps = computed<GNavbarSlotProps<T>>(() => ({
		modelValue: model.value,
		select
	}));

	function isSelected(value: T | undefined) {
		return value !== undefined && Object.is(model.value, value);
	}

	function isElementSelected(el: HTMLElement | null | undefined) {
		const value = model.value;

		if (value === undefined || !el) return false;

		return registry.get(value)?.has(el) ?? false;
	}

	function register(value: T | undefined, el: HTMLElement) {
		if (value === undefined) return;

		const bucket = registry.get(value) ?? new Set<HTMLElement>();
		bucket.add(el);
		registry.set(value, bucket);
		queueIndicatorRefresh();
	}

	function unregister(value: T | undefined, el: HTMLElement) {
		const bucket = registry.get(value);

		if (!bucket) return;

		bucket.delete(el);

		if (!bucket.size) {
			registry.delete(value);
		}

		queueIndicatorRefresh();
	}

	function unregisterElement(el: HTMLElement) {
		for (const [value, bucket] of registry) {
			bucket.delete(el);

			if (!bucket.size) {
				registry.delete(value);
			}
		}

		queueIndicatorRefresh();
	}

	function select(value: T | undefined, event?: Event) {
		if (value === undefined) return;

		model.value = value;
		emit('select', value, event);
		queueIndicatorRefresh();
	}

	function queueIndicatorRefresh() {
		void nextTick(refreshIndicator);
	}

	function refreshIndicator() {
		const value = model.value;
		const container = itemsRef.value;
		const item =
			value === undefined
				? undefined
				: registry.get(value)?.values().next().value;

		if (!container || !item) {
			indicator.value = {
				left: 0,
				width: 0,
				visible: false
			};
			return;
		}

		const containerRect = container.getBoundingClientRect();
		const itemRect = item.getBoundingClientRect();

		indicator.value = {
			left: itemRect.left - containerRect.left + container.scrollLeft,
			width: itemRect.width,
			visible: true
		};
	}

	function updateScrollState() {
		scrollRaf = 0;

		if (!props.hideOnScroll) {
			hidden.value = false;
			lastScrollY.value = Math.max(0, window.scrollY);
			return;
		}

		const currentY = Math.max(0, window.scrollY);
		const delta = currentY - lastScrollY.value;

		if (currentY <= topRevealOffset) {
			hidden.value = false;
			lastScrollY.value = currentY;
			return;
		}

		if (Math.abs(delta) >= scrollThreshold) {
			hidden.value = delta > 0;
			lastScrollY.value = currentY;
		}
	}

	function onScroll() {
		if (scrollRaf) return;

		scrollRaf = window.requestAnimationFrame(updateScrollState);
	}

	provideNavbar({
		modelValue: model,
		color: toRef(props, 'color'),
		activeColor: computed(() => props.activeColor),
		isSelected,
		isElementSelected,
		register,
		unregister,
		unregisterElement,
		select,
		refreshIndicator: queueIndicatorRefresh
	});

	watch(
		() => model.value,
		() => queueIndicatorRefresh()
	);

	onMounted(() => {
		lastScrollY.value = window.scrollY;
		queueIndicatorRefresh();
		window.addEventListener('resize', queueIndicatorRefresh);
		window.addEventListener('scroll', onScroll, { passive: true });
	});

	onBeforeUnmount(() => {
		if (scrollRaf) {
			window.cancelAnimationFrame(scrollRaf);
		}

		window.removeEventListener('resize', queueIndicatorRefresh);
		window.removeEventListener('scroll', onScroll);
	});
</script>

<template>
	<header
		ref="rootRef"
		class="g-navbar"
		:class="navbarClasses"
		:style="navbarStyles">
		<nav
			class="g-navbar__nav"
			:aria-label="props.ariaLabel || 'Primary navigation'">
			<div
				v-if="slots.prepend"
				class="g-navbar__prepend">
				<slot
					name="prepend"
					v-bind="slotProps" />
			</div>

			<ul
				ref="itemsRef"
				class="g-navbar__items">
				<li
					aria-hidden="true"
					class="g-navbar__indicator"></li>
				<slot v-bind="slotProps" />
			</ul>

			<div
				v-if="slots.append"
				class="g-navbar__append">
				<slot
					name="append"
					v-bind="slotProps" />
			</div>
		</nav>
	</header>
</template>

<style scoped lang="scss">
	.g-navbar {
		position: sticky;
		z-index: var(--g-navbar-z-index, 100);
		top: 0;
		transform: translateY(0);

		width: 100%;
		border-bottom: 1px solid
			color-mix(in srgb, var(--g-token-color-on-surface) 12%, transparent);
		border-radius: 0 0 var(--g-token-radius-lg) var(--g-token-radius-lg);

		color: var(--g-token-color-on-surface);

		background: color-mix(
			in srgb,
			var(--g-token-color-surface) 92%,
			transparent
		);
		backdrop-filter: blur(14px);

		transition:
			transform var(--g-token-duration-base)
				var(--g-token-easing-emphasized),
			box-shadow var(--g-token-duration-base)
				var(--g-token-easing-standard);

		&_hidden {
			transform: translateY(-100%);
		}

		&_elevated {
			box-shadow: var(--g-token-elevation-2);
		}

		&__nav {
			display: flex;
			gap: var(--g-token-space-3);
			align-items: center;

			max-width: 100%;
			min-height: var(--g-navbar-height, 56px);
			padding: 0 var(--g-token-space-4);
		}

		&__prepend,
		&__append {
			display: inline-flex;
			flex: 0 0 auto;
			gap: var(--g-token-space-2);
			align-items: center;
		}

		&__items {
			scrollbar-width: none;

			position: relative;

			overflow: visible;
			display: flex;
			flex: 1 1 auto;
			gap: var(--g-token-space-1);
			align-items: stretch;
			justify-content: center;

			min-width: 0;
			margin: 0;
			padding: 0;

			list-style: none;

			&::-webkit-scrollbar {
				display: none;
			}
		}

		&__indicator {
			pointer-events: none;

			position: absolute;
			z-index: 2;
			bottom: 0;
			left: 0;
			transform: translateX(var(--g-navbar-indicator-left));

			display: block;

			width: var(--g-navbar-indicator-width);
			height: 3px;
			border-radius: var(--g-token-radius-pill);

			opacity: 0;
			background: var(--g-navbar-indicator-gradient);

			transition:
				transform var(--g-token-duration-base)
					var(--g-token-easing-emphasized),
				width var(--g-token-duration-base)
					var(--g-token-easing-emphasized),
				opacity var(--g-token-duration-fast)
					var(--g-token-easing-standard);
		}

		&_indicator-visible &__indicator {
			opacity: 1;
		}

		&_compact {
			--g-navbar-height: 48px;
		}

		&_comfortable {
			--g-navbar-height: 56px;
		}

		&_prominent {
			--g-navbar-height: 68px;
		}
	}
</style>
