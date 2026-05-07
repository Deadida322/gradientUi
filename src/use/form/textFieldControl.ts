import { computed, type MaybeRefOrGetter, type Ref, toValue } from 'vue';
import { useFormControl } from './control';
import type { ValidationRule } from 'gib-validate';
import type { GGradienStates } from '@/components/ui/GGradient/types';
import type { MdiIcon } from '@/types/CommonTypes';
import type { Sizes } from '@/types/CommonTypes';
import type { GColor } from '@/use/color';

export interface FieldVisualProps {
	label?: string;
	color?: GColor;
	state?: GGradienStates;
	disabled?: boolean;
	clearable?: boolean;
	size?: Sizes;
	message?: string;
	prependIcon?: MdiIcon;
	appendIcon?: MdiIcon;
}

export interface FieldEmitters {
	input: (value: string, event: Event) => void;
	change: (value: string, event: Event) => void;
	focus: (event: FocusEvent) => void;
	blur: (event: FocusEvent) => void;
	clear: () => void;
}

export interface UseTextFieldControlOptions {
	id: string;
	props: FieldVisualProps;
	modelValue: Ref<string>;
	rules: MaybeRefOrGetter<ValidationRule<string>[] | undefined>;
	message: MaybeRefOrGetter<string | undefined>;
	multiline: boolean;
	extraFieldProps?: MaybeRefOrGetter<Record<string, unknown>>;
	displayValue?: MaybeRefOrGetter<string | undefined>;
	toModelValue?: (value: string) => string;
	toDisplayValue?: (value: string) => string;
	emitters: FieldEmitters;
}

export function useTextFieldControl(options: UseTextFieldControlOptions) {
	const {
		focused,
		$v,
		computedMessage,
		hasValidationError,
		onFocus,
		onBlur
	} = useFormControl({
		modelValue: options.modelValue,
		rules: options.rules,
		message: options.message
	});

	const fieldProps = computed(() => ({
		...options.props,
		id: options.id,
		focused: focused.value,
		message: computedMessage.value,
		state: hasValidationError.value ? 'error' : options.props.state,
		hasValue: Boolean(options.modelValue.value),
		multiline: options.multiline,
		...(toValue(options.extraFieldProps) ?? {})
	}));
	const inputValue = computed(
		() => toValue(options.displayValue) ?? options.modelValue.value
	);

	function updateModelValue(value: string) {
		const nextValue = options.toModelValue?.(value) ?? value;
		options.modelValue.value = nextValue;

		return nextValue;
	}

	function syncDisplayValue(event: Event, value: string) {
		if (!options.toDisplayValue) return;

		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		target.value = options.toDisplayValue(value);
	}

	function handleInput(event: Event) {
		const value = (event.target as HTMLInputElement | HTMLTextAreaElement)
			.value;
		const nextValue = updateModelValue(value);
		syncDisplayValue(event, nextValue);
		options.emitters.input(nextValue, event);
	}

	function handleChange(event: Event) {
		const value = (event.target as HTMLInputElement | HTMLTextAreaElement)
			.value;
		const nextValue = updateModelValue(value);
		syncDisplayValue(event, nextValue);
		options.emitters.change(nextValue, event);
	}

	function handleFocus(event: FocusEvent) {
		onFocus();
		options.emitters.focus(event);
	}

	function handleBlur(event: FocusEvent) {
		onBlur();
		options.emitters.blur(event);
	}

	function handleClear() {
		options.modelValue.value = '';
		options.emitters.clear();
	}

	return {
		$v,
		fieldProps,
		inputValue,
		handleInput,
		handleChange,
		handleFocus,
		handleBlur,
		handleClear
	};
}
