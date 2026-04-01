import { computed, onBeforeUnmount, type Ref } from 'vue';

interface HoverOptions {
	openDelay?: number;
	closeDelay?: number;
}

interface TriggerFactoryOptions {
	click?: boolean;
	hover?: boolean | HoverOptions;
	focus?: boolean;
	contextmenu?: boolean;
	disabled?: boolean;
}

export function useTriggerFactory(
	open: Ref<boolean>,
	options: TriggerFactoryOptions
) {
	const { click, hover, focus, contextmenu, disabled = false } = options;

	let openTimeout: number | null = null;
	let closeTimeout: number | null = null;

	function clearTimers() {
		if (openTimeout) clearTimeout(openTimeout);
		if (closeTimeout) clearTimeout(closeTimeout);
		openTimeout = null;
		closeTimeout = null;
	}

	function setOpen(value: boolean, delay = 0) {
		clearTimers();
		if (delay === 0) {
			open.value = value;
			return;
		}

		const timer = window.setTimeout(() => {
			open.value = value;
		}, delay);

		if (value) openTimeout = timer;
		else closeTimeout = timer;
	}

	const hoverConfig: HoverOptions = typeof hover === 'object' ? hover : {};

	const openDelay = hoverConfig.openDelay ?? 0;
	const closeDelay = hoverConfig.closeDelay ?? 0;

	function onClick() {
		if (disabled || !click) return;
		open.value = !open.value;
	}

	function onContextmenu(e: MouseEvent) {
		if (disabled || !contextmenu) return;
		e.preventDefault();
		open.value = true;
	}

	function onMouseenter() {
		if (disabled || !hover) return;
		setOpen(true, openDelay);
	}

	function onMouseleave() {
		if (!hover) return;
		setOpen(false, closeDelay);
	}

	function onFocus() {
		if (disabled || !focus) return;
		open.value = true;
	}

	function onBlur() {
		if (!focus) return;
		open.value = false;
	}

	onBeforeUnmount(clearTimers);

	const triggerAttrs = computed(() => ({
		...(click ? { onClick } : {}),
		...(contextmenu ? { onContextmenu } : {}),
		...(hover ? { onMouseenter, onMouseleave } : {}),
		...(focus ? { onFocus, onBlur } : {})
	}));

	const floatingAttrs = computed(() => ({
		...(hover ? { onMouseenter, onMouseleave } : {})
	}));

	return {
		triggerAttrs,
		floatingAttrs
	};
}
