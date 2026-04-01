import { computed, ref, type Ref } from 'vue';
import type { InputTypeHTMLAttribute } from 'vue';

export interface UseInputControlOptions {
	type: Ref<InputTypeHTMLAttribute | undefined>;
}

export function useInputControl(options: UseInputControlOptions) {
	const passwordVisible = ref(false);

	const computedType = computed<InputTypeHTMLAttribute | undefined>(() => {
		if (options.type.value === 'password' && passwordVisible.value) {
			return 'text';
		}

		return options.type.value;
	});

	const togglePasswordVisibility = () => {
		passwordVisible.value = !passwordVisible.value;
	};

	return {
		passwordVisible,
		computedType,
		togglePasswordVisibility
	};
}
