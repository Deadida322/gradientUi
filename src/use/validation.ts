import {
	ref,
	computed,
	type ComputedRef,
	toValue,
	unref,
	watch,
	type InjectionKey,
	type Ref,
	inject,
	watchEffect,
	type MaybeRefOrGetter,
	shallowRef,
	provide
} from 'vue';

export type ValidationState<T extends object = object> = {
	$touch: () => void;
	$reset: () => void;
	$touchField: (field: keyof T | (keyof T)[]) => void;
	$dirty: boolean;
	$errors: Errors<T>;
	$silentErrors: Errors<T>;
	$children: Ref<Record<string, ValidationState<object>>>;
};

export type Validatable =
	| string
	| number
	| boolean
	| Array<Validatable>
	| object
	| null
	| undefined;

const ValidationSymbol: InjectionKey<Ref<ValidationState>> =
	Symbol('vuelidate');

export type ValidationRule<T> = (
	value: T
) => string | boolean | Promise<string | boolean>;

type ValidationRules<T> = {
	[K in keyof T]?: ValidationRule<T[K]>[];
};
type Errors<T extends object> = Partial<Record<keyof T, string[]>>;

export function useValidation<T extends Record<string, unknown>>(
	state: MaybeRefOrGetter<T>,
	rules: ValidationRules<T>
): ComputedRef<ValidationState<T>> {
	const $dirty = ref(false);
	const $silentErrors = ref<Errors<T>>({});
	const $touched = shallowRef<Set<keyof T>>(new Set());
	const $children = ref<Record<string, ValidationState<object>>>({});

	const $touch = () => {
		$dirty.value = true;
		$touchField(Object.keys(rules) as (keyof T)[]);
		Object.entries($children.value).forEach(([_key, child]) => {
			child.$touch();
		});
	};

	const $reset = () => {
		$dirty.value = false;
		$touched.value = new Set([]);
		Object.entries($children.value).forEach(([_key, child]) => {
			child.$reset();
		});
	};

	const $touchField = (field: keyof T | (keyof T)[]) => {
		$dirty.value = true;
		const fieldsToAdd = Array.isArray(field) ? field : [field];
		$touched.value = new Set([...unref($touched), ...fieldsToAdd]); // Новый Set
	};

	const $errors = computed<Errors<T>>(() => {
		const errors: Errors<T> = {};

		const keys = Object.keys($silentErrors.value) as Array<keyof T>;
		for (const key of keys) {
			if ($silentErrors.value[key]?.length && $touched.value.has(key)) {
				errors[key] = $silentErrors.value[key];
			}
		}
		return errors;
	});

	watch(
		() => ({ ...(toValue(state) as T) }),
		async (currentState: T) => {
			const newErrors: Errors<T> = {};

			for (const key in rules) {
				const ruleSet = rules[key];
				if (ruleSet) {
					const ruleResults = await Promise.all(
						ruleSet.map(async (rule) => {
							if (!rule) return true;
							const result = await rule(unref(currentState[key]));
							return typeof result === 'string' ? result : null;
						})
					);

					const filteredResults = ruleResults.filter(
						(result): result is string => typeof result === 'string'
					);

					if (filteredResults.length > 0) {
						newErrors[key] = filteredResults;
					}
				}
			}
			$silentErrors.value = newErrors;
		},
		{ immediate: true }
	);

	const validationState = computed<ValidationState<T>>(() => ({
		$touch,
		$touched,
		$reset,
		$touchField,
		$dirty: $dirty.value,
		$errors: $errors.value,
		$silentErrors: $silentErrors.value,
		$children
	}));

	const parent = inject(ValidationSymbol, null);
	if (parent) {
		watchEffect(() => {
			const key = Object.keys(parent.value.$children).length.toString();
			parent.value.$children.value[key] = validationState.value;
		});
	}
	provide(ValidationSymbol, validationState);
	return validationState;
}

export type Vuelidate = Ref<ValidationState>;
