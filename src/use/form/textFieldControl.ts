import { computed, type MaybeRefOrGetter, type Ref, toValue } from 'vue';
import { useFormControl } from './control';
import type { ValidationRule } from '@/use/validation';
import type { GGradienStates } from '@/components/ui/GGradient/types';
import type { MdiIcon } from '@/types/CommonTypes';
import type { Sizes } from '@/types/CommonTypes';

export interface FieldVisualProps {
	label?: string;
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
	emitters: FieldEmitters;
}

export function useTextFieldControl(options: UseTextFieldControlOptions) {
	const { focused, $v, computedMessage, onFocus, onBlur } = useFormControl({
		modelValue: options.modelValue,
		rules: options.rules,
		message: options.message
	});

	const fieldProps = computed(() => ({
		...options.props,
		id: options.id,
		focused: focused.value,
		message: computedMessage.value,
		hasValue: Boolean(options.modelValue.value),
		multiline: options.multiline,
		...(toValue(options.extraFieldProps) ?? {})
	}));

	function handleInput(event: Event) {
		const value = (event.target as HTMLInputElement | HTMLTextAreaElement)
			.value;
		options.modelValue.value = value;
		options.emitters.input(value, event);
	}

	function handleChange(event: Event) {
		const value = (event.target as HTMLInputElement | HTMLTextAreaElement)
			.value;
		options.emitters.change(value, event);
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
		handleInput,
		handleChange,
		handleFocus,
		handleBlur,
		handleClear
	};
}
