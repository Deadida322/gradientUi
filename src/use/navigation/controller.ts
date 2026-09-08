import { computed, ref, shallowRef, toValue } from 'vue';
import { useNavigationKeyboard } from './keyboard';
import type {
	GNavigationRegistration,
	GNavigationValue,
	UseNavigationControllerOptions
} from './types';

const valueKey = (value: unknown) =>
	String(value ?? 'default').replace(/[^a-zA-Z0-9_-]/g, '-');

export function useNavigationController<T = GNavigationValue>(
	options: UseNavigationControllerOptions<T>
) {
	const localValue = ref<T | undefined>(
		toValue(options.defaultValue) as T | undefined
	);
	const registeredItems = shallowRef<GNavigationRegistration<T>[]>([]);
	const isControlled = computed(
		() => toValue(options.modelValue) !== undefined
	);
	const model = computed<T | undefined>({
		get() {
			return isControlled.value
				? (toValue(options.modelValue) as T | undefined)
				: localValue.value;
		},
		set(value) {
			if (!isControlled.value) {
				localValue.value = value;
			}

			options.onUpdateModelValue(value);
		}
	});

	const isDisabled = () => Boolean(toValue(options.disabled));
	function isSelected(value: T | undefined) {
		return value !== undefined && Object.is(model.value, value);
	}

	function select(value: T | undefined, event?: Event) {
		if (isDisabled() || value === undefined) return;
		if (options.canSelect && !options.canSelect(value, event)) return;

		model.value = value;
		options.onSelect?.(value, event);
	}

	function registerItem(registration: GNavigationRegistration<T>) {
		const next = registeredItems.value.filter(
			(item) => item.el !== registration.el
		);

		next.push(registration);
		registeredItems.value = next;

		if (
			toValue(options.mandatory) &&
			model.value === undefined &&
			registration.value !== undefined &&
			!registration.disabled
		) {
			select(registration.value);
		}
	}

	function unregisterItem(el: HTMLElement) {
		registeredItems.value = registeredItems.value.filter(
			(item) => item.el !== el
		);
	}

	function getEnabledItems() {
		return registeredItems.value.filter(
			(item) => !item.disabled && item.value !== undefined
		);
	}

	function focusItem(index: number, event: KeyboardEvent) {
		const enabledItems = getEnabledItems();
		const item = enabledItems[index];

		if (!item) return;

		event.preventDefault();
		item.el.focus();

		if (toValue(options.selectOnFocus)) {
			select(item.value, event);
		}
	}

	const { onItemKeydown } = useNavigationKeyboard<T>({
		orientation: options.orientation,
		selectOnAction: options.selectOnAction,
		getEnabledItems,
		focusItem,
		select
	});

	const getItemId = (value: T | undefined) =>
		`${options.idPrefix}-${options.itemIdSegment ?? 'item'}-${valueKey(value)}`;
	const getPanelId = (value: T | undefined) =>
		`${options.idPrefix}-${options.panelIdSegment ?? 'panel'}-${valueKey(value)}`;

	return {
		model,
		registeredItems,
		isSelected,
		select,
		registerItem,
		unregisterItem,
		getEnabledItems,
		focusItem,
		onItemKeydown,
		getItemId,
		getPanelId
	};
}
