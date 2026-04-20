import { useValidation, type ValidationRule } from '@/use/validation';
import {
	computed,
	type ComputedRef,
	type MaybeRefOrGetter,
	reactive,
	ref,
	toValue
} from 'vue';

export interface UseFormControlOptions<T> {
	modelValue: MaybeRefOrGetter<T>;
	rules: MaybeRefOrGetter<ValidationRule<T>[] | undefined>;
	message: MaybeRefOrGetter<string | undefined>;
}

export function useFormControl<T>(options: UseFormControlOptions<T>) {
	const focused = ref(false);

	const validatable = reactive({
		modelValue: computed(() => toValue(options.modelValue))
	});

	const $v = useValidation<{ modelValue: T }>(validatable, {
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
