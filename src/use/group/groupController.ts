import { toValue, type Ref } from 'vue';
import type { GroupContext, GroupMode, GroupModel } from './types';

type GroupControllerOptions<T> = {
	modelValue: Ref<GroupModel<T>>;
	mode: Ref<GroupMode>;
	onChange: (val: GroupModel<T>) => void;
	activeClass: Ref<string | undefined>;
};

export function useGroupController<T>({
	modelValue,
	mode,
	onChange,
	activeClass
}: GroupControllerOptions<T>): GroupContext<T> {
	const isSelected = (item: T) => {
		const value = modelValue.value;
		return mode.value === 'multiple'
			? Array.isArray(value) && value.some((v) => Object.is(v, item))
			: Object.is(value, item);
	};

	const select = (item: T) => {
		const value = modelValue.value;

		if (mode.value === 'multiple') {
			const arr = Array.isArray(value) ? [...value] : [];
			if (!arr.some((v) => Object.is(v, item))) {
				arr.push(item);
				onChange(arr);
			}
		} else {
			if (!Object.is(value, item)) {
				onChange(item);
			}
		}
	};

	const unselect = (item: T) => {
		const value = modelValue.value;

		if (mode.value === 'multiple') {
			const arr = Array.isArray(value)
				? value.filter((v) => !Object.is(v, item))
				: [];
			onChange(arr);
		} else {
			if (Object.is(value, item)) {
				onChange(null);
			}
		}
	};

	const toggle = (item: T) => {
		return isSelected(item) ? unselect(item) : select(item);
	};

	return {
		isSelected,
		select,
		unselect,
		toggle,
		activeClass: toValue(activeClass)
	};
}
