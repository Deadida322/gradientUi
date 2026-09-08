import { toValue } from 'vue';
import type {
	GNavigationOrientation,
	UseNavigationKeyboardOptions
} from './types';

export function useNavigationKeyboard<T>(
	options: UseNavigationKeyboardOptions<T>
) {
	const orientation = () =>
		toValue(options.orientation) ??
		('horizontal' satisfies GNavigationOrientation);

	function onItemKeydown(event: KeyboardEvent, value: T | undefined) {
		const enabledItems = options.getEnabledItems();
		const currentIndex = enabledItems.findIndex((item) =>
			Object.is(item.value, value)
		);
		const horizontal = orientation() === 'horizontal';
		const previousKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
		const nextKey = horizontal ? 'ArrowRight' : 'ArrowDown';

		if (event.key === previousKey) {
			options.focusItem(
				currentIndex <= 0 ? enabledItems.length - 1 : currentIndex - 1,
				event
			);
			return;
		}

		if (event.key === nextKey) {
			options.focusItem(
				currentIndex >= enabledItems.length - 1 ? 0 : currentIndex + 1,
				event
			);
			return;
		}

		if (event.key === 'Home') {
			options.focusItem(0, event);
			return;
		}

		if (event.key === 'End') {
			options.focusItem(enabledItems.length - 1, event);
			return;
		}

		if (
			toValue(options.selectOnAction) &&
			(event.key === 'Enter' || event.key === ' ')
		) {
			event.preventDefault();
			options.select(value, event);
		}
	}

	return {
		onItemKeydown
	};
}
