import {
	useValidation,
	type Validatable,
	type ValidationRule
} from 'gib-validate';
import {
	computed,
	type ComputedRef,
	type MaybeRefOrGetter,
	ref,
	toValue
} from 'vue';
import { useFormContext } from './context';

export interface UseFormControlOptions<T> {
	modelValue: MaybeRefOrGetter<T>;
	rules: MaybeRefOrGetter<ValidationRule<T>[] | undefined>;
	message: MaybeRefOrGetter<string | undefined>;
	disabled?: MaybeRefOrGetter<boolean | undefined>;
}

export function useFormControl<T>(options: UseFormControlOptions<T>) {
	const focused = ref(false);
	const form = useFormContext();
	const disabled = computed(
		() =>
			Boolean(toValue(options.disabled)) || Boolean(form?.disabled.value)
	);
	const validateOn = computed(() => form?.validateOn.value ?? 'blur');

	const validationState = computed(() => ({
		modelValue: toValue(options.modelValue) as Validatable
	}));

	const validationRules = computed(() => ({
		modelValue: [
			async (value: Validatable) => {
				const rules = toValue(options.rules) ?? [];

				for (const rule of rules) {
					const typedValue = value as T;
					const result = await rule(typedValue, {
						modelValue: typedValue
					});
					if (typeof result === 'string') return result;
				}

				return true;
			}
		]
	}));

	const $v = useValidation<{ modelValue: Validatable }>(
		validationState,
		validationRules
	);

	const computedMessage = computed(() => {
		return $v.value.$message.modelValue ?? toValue(options.message) ?? '';
	}) as ComputedRef<string>;
	const hasValidationError = computed(() =>
		Boolean($v.value.$errors.modelValue?.length)
	);

	function onFocus() {
		if (disabled.value) return;

		focused.value = true;
	}

	function onBlur() {
		if (validateOn.value === 'blur') {
			$v.value.$touchField('modelValue');
		}

		focused.value = false;
	}

	function onInputValidation() {
		if (validateOn.value === 'input') {
			$v.value.$touchField('modelValue');
		}
	}

	return {
		focused,
		$v,
		disabled,
		validateOn,
		computedMessage,
		hasValidationError,
		onFocus,
		onBlur,
		onInputValidation
	};
}
