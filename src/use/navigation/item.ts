import { computed, onBeforeUnmount, onMounted, toValue, watch } from 'vue';
import type {
	GNavigationRegistration,
	GNavigationValue,
	UseNavigationItemOptions
} from './types';

export function useNavigationItem<T = GNavigationValue>(
	options: UseNavigationItemOptions<T>
) {
	const value = computed(() => toValue(options.value));
	const disabled = computed(() =>
		Boolean(toValue(options.disabled) || toValue(options.parentDisabled))
	);
	const selected = computed(() => Boolean(options.isSelected?.(value.value)));
	let mounted = false;
	let registration: GNavigationRegistration<T> | undefined;

	const unregister = () => {
		if (!registration) return;
		options.unregisterItem?.(registration.el);
		registration = undefined;
	};
	const syncRegistration = () => {
		if (!mounted) return;
		const el = options.rootRef.value;
		if (
			registration &&
			registration.el === el &&
			Object.is(registration.value, value.value) &&
			registration.disabled === disabled.value
		)
			return;
		if (registration && registration.el !== el) unregister();
		if (!el) return;
		registration = { el, value: value.value, disabled: disabled.value };
		options.registerItem?.(registration);
	};

	const select = (nextValue: T | undefined, event?: Event) => {
		options.select?.(nextValue, event);
	};

	const onClick = (event: MouseEvent) => {
		if (disabled.value) {
			event.preventDefault();
			return;
		}

		select(value.value, event);
		options.onClick?.(event);
	};

	const onKeydown = (event: KeyboardEvent) => {
		options.onItemKeydown?.(event, value.value);
	};

	onMounted(() => {
		mounted = true;
		syncRegistration();
	});
	onBeforeUnmount(() => {
		mounted = false;
		unregister();
	});

	watch(
		() => [options.rootRef.value, value.value, disabled.value] as const,
		syncRegistration,
		{ flush: 'post' }
	);

	return {
		value,
		disabled,
		selected,
		select,
		onClick,
		onKeydown
	};
}
