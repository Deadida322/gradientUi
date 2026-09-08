import { computed, onBeforeUnmount, onMounted, toValue, watch } from 'vue';
import type { GNavigationValue, UseNavigationItemOptions } from './types';

export function useNavigationItem<T = GNavigationValue>(
	options: UseNavigationItemOptions<T>
) {
	const value = computed(() => toValue(options.value));
	const disabled = computed(() =>
		Boolean(toValue(options.disabled) || toValue(options.parentDisabled))
	);
	const selected = computed(() => Boolean(options.isSelected?.(value.value)));

	function register() {
		if (!options.rootRef.value) return;

		options.registerItem?.({
			value: value.value,
			el: options.rootRef.value,
			disabled: disabled.value
		});
	}

	function unregister() {
		if (!options.rootRef.value) return;

		options.unregisterItem?.(options.rootRef.value);
	}

	function select(nextValue: T | undefined, event?: Event) {
		options.select?.(nextValue, event);
	}

	function onClick(event: MouseEvent) {
		if (disabled.value) return;

		select(value.value, event);
		options.onClick?.(event);
	}

	function onKeydown(event: KeyboardEvent) {
		options.onItemKeydown?.(event, value.value);
	}

	onMounted(register);
	onBeforeUnmount(unregister);

	watch(
		() => [value.value, disabled.value],
		() => register()
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
