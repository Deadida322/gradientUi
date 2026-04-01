import { useValidation, type ValidationRule } from '@/use/validation';
import {
	computed,
	type ComputedRef,
	type MaybeRefOrGetter,
	reactive,
	ref,
	toValue
} from 'vue';

export interface UseFormControlOptions {
	modelValue: MaybeRefOrGetter<string>;
	rules: MaybeRefOrGetter<ValidationRule<string>[] | undefined>;
	message: MaybeRefOrGetter<string | undefined>;
}

export function useFormControl(options: UseFormControlOptions) {
	const focused = ref(false);

	const validatable = reactive({
		modelValue: computed(() => toValue(options.modelValue))
	});

	const $v = useValidation(validatable, {
		modelValue: [
			async (value) => {
				const rules = toValue(options.rules) ?? [];

				for (const rule of rules) {
					const result = await rule(value);
					if (typeof result === 'string') return result;
				}

				return true;
			}
		]
	});

	const computedMessage = computed(() => {
		return (
			$v.value.$errors.modelValue?.[0] ?? toValue(options.message) ?? ''
		);
	}) as ComputedRef<string>;

	function onFocus() {
		$v.value.$reset();
		focused.value = true;
	}

	function onBlur() {
		$v.value.$touchField('modelValue');
		focused.value = false;
	}

	return {
		focused,
		$v,
		computedMessage,
		onFocus,
		onBlur
	};
}
