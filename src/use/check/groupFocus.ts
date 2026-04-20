import { ref } from 'vue';

export interface CheckGroupFocusEmitters {
	focus?: (event: FocusEvent) => void;
	blur?: (event: FocusEvent) => void;
}

export interface UseCheckGroupFocusOptions {
	onFocusWithin: () => void;
	onBlurWithin: () => void;
	emitters?: CheckGroupFocusEmitters;
}

export function useCheckGroupFocus(options: UseCheckGroupFocusOptions) {
	const isFocusedWithin = ref(false);
	const isPointerDownWithin = ref(false);

	function handleGroupFocusIn(event: FocusEvent) {
		isPointerDownWithin.value = false;

		if (!isFocusedWithin.value) {
			isFocusedWithin.value = true;
			options.onFocusWithin();
		}

		options.emitters?.focus?.(event);
	}

	function handleGroupFocusOut(event: FocusEvent) {
		const currentTarget = event.currentTarget;
		const relatedTarget = event.relatedTarget;

		if (isPointerDownWithin.value) {
			return;
		}

		if (
			currentTarget instanceof HTMLElement &&
			relatedTarget instanceof Node &&
			currentTarget.contains(relatedTarget)
		) {
			return;
		}

		if (isFocusedWithin.value) {
			isFocusedWithin.value = false;
			options.onBlurWithin();
		}

		options.emitters?.blur?.(event);
	}

	function handlePointerDown() {
		isPointerDownWithin.value = true;
	}

	function handlePointerEnd() {
		isPointerDownWithin.value = false;
	}

	return {
		isFocusedWithin,
		handleGroupFocusIn,
		handleGroupFocusOut,
		handlePointerDown,
		handlePointerEnd
	};
}

export const useCheckFocusWithin = useCheckGroupFocus;
