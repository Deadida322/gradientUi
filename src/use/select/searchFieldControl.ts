import type { MaybeRefOrGetter, Ref } from 'vue';
import { toValue } from 'vue';

export interface UseSearchFieldControlOptions {
	open: Ref<boolean>;
	inputRef: Ref<HTMLInputElement | undefined>;
	disabled: MaybeRefOrGetter<boolean | undefined>;
	setSearch: (value: string) => void;
	onFocus: () => void;
	onBlur: () => void;
	onInputValidation: () => void;
	emitFocus: (event: FocusEvent) => void;
	emitBlur: (event: FocusEvent) => void;
	emitClear: () => void;
	clearValue: () => void;
	afterBlur?: () => void;
	activatorIgnoreSelector?: string;
}

const defaultActivatorIgnoreSelector = 'input, button';

export function useSearchFieldControl(options: UseSearchFieldControlOptions) {
	function handleInput(event: Event) {
		options.setSearch((event.target as HTMLInputElement).value);
		options.open.value = true;
		options.onInputValidation();
	}

	function handleFocus(event: FocusEvent) {
		options.onFocus();
		options.open.value = true;
		options.emitFocus(event);
	}

	function handleBlur(event: FocusEvent) {
		options.onBlur();
		options.emitBlur(event);
		options.afterBlur?.();
	}

	function handleClear() {
		options.clearValue();
		options.setSearch('');
		options.onInputValidation();
		options.emitClear();
	}

	function focusControl() {
		if (toValue(options.disabled)) return;

		options.inputRef.value?.focus();
		options.open.value = true;
	}

	function handleActivatorMousedown(event: MouseEvent) {
		if (toValue(options.disabled)) return;

		const target = event.target as HTMLElement | null;
		const ignoreSelector =
			options.activatorIgnoreSelector ?? defaultActivatorIgnoreSelector;
		if (target?.closest(ignoreSelector)) return;

		event.preventDefault();
		focusControl();
	}

	return {
		handleInput,
		handleFocus,
		handleBlur,
		handleClear,
		focusControl,
		handleActivatorMousedown
	};
}
