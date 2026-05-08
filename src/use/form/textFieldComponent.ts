import { useAttrs } from 'vue';
import { useVisibleProps } from '@/use/visibleProps';
import { createId } from '@/utils/createId';

const textFieldSlotNames = ['default', 'prepend', 'append', 'message'] as const;

type TextFieldSlotsShape = {
	default?: () => unknown;
	prepend?: () => unknown;
	append?: () => unknown;
	message?: () => unknown;
};

export function useTextFieldComponent<TSlots extends TextFieldSlotsShape>(
	slots: TSlots
) {
	const attrs = useAttrs();
	const id = createId('g-field');
	const visibleSlotNames = useVisibleProps(slots, textFieldSlotNames);

	return {
		attrs,
		id,
		visibleSlotNames
	};
}
