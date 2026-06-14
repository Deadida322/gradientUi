import { computed, type Ref } from 'vue';
import { useFormControl } from '@/use/form/control';
import { createComponentId } from '@/utils/createComponentId';
import { useCheckFocusWithin } from './groupFocus';
import type { CheckboxProps, SwitchProps } from './types';

type BooleanControlProps = CheckboxProps | SwitchProps;

export function useCheckBooleanControl(
	props: BooleanControlProps,
	modelValue: Ref<boolean>,
	emit: {
		change: (value: boolean, event: Event) => void;
		focus: (event: FocusEvent) => void;
		blur: (event: FocusEvent) => void;
	},
	options: {
		idPrefix: string;
		indicatorKind: 'checkbox' | 'switch';
	}
) {
	const inputId = computed(
		() => props.id ?? createComponentId(options.idPrefix)
	);

	const {
		focused,
		$v,
		disabled,
		computedMessage,
		onFocus,
		onBlur,
		onInputValidation
	} = useFormControl<boolean>({
		modelValue,
		rules: computed(() => props.rules),
		message: computed(() => props.message),
		disabled: computed(() => props.disabled)
	});
	const validationState = computed(() =>
		$v.value.$errors.modelValue?.length ? 'error' : props.state
	);

	const controlProps = computed(() => ({
		...props,
		id: inputId.value,
		inputType: 'checkbox' as const,
		message: computedMessage.value,
		checked: modelValue.value,
		disabled: disabled.value,
		focused: focused.value,
		state: validationState.value
	}));

	const indicatorProps = computed(() => ({
		kind: options.indicatorKind,
		checked: modelValue.value,
		disabled: disabled.value,
		size: props.size,
		color: props.color,
		state: validationState.value,
		view: props.indicatorView
	}));

	const {
		handleGroupFocusIn,
		handleGroupFocusOut,
		handlePointerDown,
		handlePointerEnd
	} = useCheckFocusWithin({
		onFocusWithin: onFocus,
		onBlurWithin: onBlur,
		emitters: {
			focus: emit.focus,
			blur: emit.blur
		}
	});

	function handleChange(event: Event) {
		const nextValue = (event.target as HTMLInputElement).checked;
		modelValue.value = nextValue;
		onInputValidation();
		emit.change(nextValue, event);
	}

	return {
		controlProps,
		indicatorProps,
		handleChange,
		handleGroupFocusIn,
		handleGroupFocusOut,
		handlePointerDown,
		handlePointerEnd,
		$v
	};
}
