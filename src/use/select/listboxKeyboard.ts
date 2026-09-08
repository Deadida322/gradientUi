import type { Ref } from 'vue';
import type { FieldKeyboardHandler } from '@/use/form/fieldKeyboard';

export interface UseSelectListboxKeyboardOptions {
	open: Ref<boolean>;
	selectFirstVisibleItem: () => void;
}

export function useSelectListboxKeyboard(
	options: UseSelectListboxKeyboardOptions
) {
	const handlers: readonly FieldKeyboardHandler[] = [
		{
			key: 'Enter',
			preventDefault: true,
			handler: options.selectFirstVisibleItem
		},
		{
			key: 'Escape',
			handler: () => {
				options.open.value = false;
			}
		}
	];

	return {
		handlers
	};
}
