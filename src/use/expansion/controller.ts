import type { Ref } from 'vue';
import { useSelectionModel } from '@/use/selectionModel';
import type { ExpansionGroupContext, ExpansionGroupModel } from './types';

type ExpansionGroupControllerOptions<T> = {
	modelValue: Ref<ExpansionGroupModel<T>>;
	multiple: Ref<boolean>;
	mandatory: Ref<boolean>;
	disabled: Ref<boolean>;
	readonly: Ref<boolean>;
	onChange: (value: ExpansionGroupModel<T>) => void;
};

export function useExpansionGroupController<T>({
	modelValue,
	multiple,
	mandatory,
	disabled,
	readonly,
	onChange
}: ExpansionGroupControllerOptions<T>): ExpansionGroupContext<T> {
	const selection = useSelectionModel<ExpansionGroupModel<T>, T>(
		{
			modelValue,
			multiple,
			mandatory,
			emptyValue: null
		},
		onChange
	);

	const canMutate = () => !disabled.value && !readonly.value;

	const select = (item: T) => {
		if (!canMutate()) {
			return;
		}
		selection.select(item);
	};

	const unselect = (item: T) => {
		if (!canMutate()) {
			return;
		}
		selection.unselect(item);
	};

	const toggle = (item: T) => {
		if (!canMutate()) {
			return;
		}
		selection.toggle(item);
	};

	return {
		get disabled() {
			return disabled.value;
		},
		get readonly() {
			return readonly.value;
		},
		get multiple() {
			return multiple.value;
		},
		get mandatory() {
			return mandatory.value;
		},
		isSelected: selection.isSelected,
		select,
		unselect,
		toggle
	};
}
