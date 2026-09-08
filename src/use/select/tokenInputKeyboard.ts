import { toValue, type MaybeRefOrGetter } from 'vue';
import type { FieldKeyboardHandler } from '@/use/form/fieldKeyboard';

export interface UseTokenInputKeyboardOptions<T> {
	enabled?: MaybeRefOrGetter<boolean | undefined>;
	searchValue: MaybeRefOrGetter<string>;
	items: MaybeRefOrGetter<readonly T[]>;
	removeItem: (item: T) => void;
}

export function useTokenInputKeyboard<T>(
	options: UseTokenInputKeyboardOptions<T>
) {
	const canRemoveLastItem = () =>
		Boolean(toValue(options.enabled)) &&
		!toValue(options.searchValue) &&
		toValue(options.items).length > 0;

	const handlers: readonly FieldKeyboardHandler[] = [
		{
			key: 'Backspace',
			when: canRemoveLastItem,
			handler: () => {
				const items = toValue(options.items);
				const lastItem = items[items.length - 1];

				if (lastItem !== undefined) {
					options.removeItem(lastItem);
				}
			}
		}
	];

	return {
		handlers
	};
}
