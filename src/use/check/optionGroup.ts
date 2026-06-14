import { computed, toRef } from 'vue';
import { useFormControl } from '@/use/form/control';
import { useSelectionController } from '@/use/select/selectionController';
import type { SelectionValue } from '@/use/select/types';
import type { InternalItem } from '@/use/select/types';
import { useCheckGroupFocus } from './groupFocus';
import type { CheckSelectionProps, CheckValueComparator } from './types';

export function useCheckOptionGroup<
	T,
	V,
	Multiple extends boolean,
	ReturnObject extends boolean
>(
	props: CheckSelectionProps<T, V, Multiple, ReturnObject>,
	emit: {
		updateModelValue: (
			value: SelectionValue<T, V, Multiple, ReturnObject>
		) => void;
		focus: (event: FocusEvent) => void;
		blur: (event: FocusEvent) => void;
	},
	options: {
		multiple: Multiple;
		namePrefix: string;
	}
) {
	type ModelValue = SelectionValue<T, V, Multiple, ReturnObject>;

	const groupName = computed(
		() =>
			props.name ??
			`${options.namePrefix}-${Math.random().toString(36).slice(2, 10)}`
	);

	const {
		focused,
		$v,
		disabled,
		computedMessage,
		hasValidationError,
		onFocus,
		onBlur,
		onInputValidation
	} = useFormControl<ModelValue>({
		modelValue: computed(() => props.modelValue),
		rules: computed(() => props.rules),
		message: computed(() => props.message),
		disabled: computed(() => props.disabled)
	});

	const valueComparator = computed<
		CheckValueComparator<ModelValue> | undefined
	>(() => props.valueComparator);

	const { items, isItemSelected, getNextItemValue, selectItem } =
		useSelectionController<T, V, Multiple, ReturnObject>(
			{
				items: toRef(props, 'options'),
				modelValue: computed(() => props.modelValue),
				labelKey: toRef(props, 'labelKey'),
				valueKey: toRef(props, 'valueKey'),
				returnObject: toRef(props, 'returnObject'),
				multiple: computed(() => options.multiple),
				valueComparator
			},
			(_event, value) => {
				emit.updateModelValue(value);
			}
		);

	const {
		handleGroupFocusIn,
		handleGroupFocusOut,
		handlePointerDown,
		handlePointerEnd
	} = useCheckGroupFocus({
		onFocusWithin: onFocus,
		onBlurWithin: onBlur,
		emitters: {
			focus: emit.focus,
			blur: emit.blur
		}
	});

	const groupProps = computed(() => ({
		label: props.label,
		message: computedMessage.value,
		color: props.color,
		disabled: disabled.value,
		size: props.size,
		state: hasValidationError.value ? 'error' : props.state,
		indicatorView: props.indicatorView,
		vertical: props.vertical,
		focused: focused.value
	}));

	function selectOption(item: InternalItem<T, V>) {
		selectItem(item);
		onInputValidation();
	}

	return {
		groupName,
		groupProps,
		disabled,
		items,
		isItemSelected,
		getNextItemValue,
		selectItem: selectOption,
		handleGroupFocusIn,
		handleGroupFocusOut,
		handlePointerDown,
		handlePointerEnd,
		$v
	};
}
