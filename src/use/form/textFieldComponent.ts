import { v4 as uuidv4 } from 'uuid';
import { useAttrs } from 'vue';
import { useVisibleProps } from '@/use/visibleProps';

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
	const id = uuidv4();
	const visibleSlotNames = useVisibleProps(slots, textFieldSlotNames);

	return {
		attrs,
		id,
		visibleSlotNames
	};
}
