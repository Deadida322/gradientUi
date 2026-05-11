import { unref, type MaybeRef } from 'vue';
import { useBooleanProp } from './booleanProp';

export type SelectionComparator<T> = (a: T, b: T) => boolean;

type UseSelectionModelProps<TModel, TValue> = {
	modelValue: MaybeRef<TModel>;
	multiple?: MaybeRef<unknown>;
	mandatory?: MaybeRef<unknown>;
	comparator?: SelectionComparator<TValue>;
	emptyValue: TModel;
};

export function useSelectionModel<TModel, TValue = TModel>(
	props: UseSelectionModelProps<TModel, TValue>,
	onChange: (value: TModel) => void
) {
	const isMultiple = useBooleanProp(props.multiple ?? false);
	const isMandatory = useBooleanProp(props.mandatory ?? false);
	const compare: SelectionComparator<TValue> =
		props.comparator ?? ((a, b) => Object.is(a, b));

	function getModelAsArray(modelValue: TModel): TValue[] {
		return Array.isArray(modelValue) ? [...modelValue] : [];
	}

	function getModelAsSingle(modelValue: TModel): TValue | null {
		return Array.isArray(modelValue) ? null : (modelValue as TValue | null);
	}

	function isSelected(value: TValue): boolean {
		const modelValue = unref(props.modelValue);

		if (isMultiple.value) {
			return getModelAsArray(modelValue).some((item) =>
				compare(item, value)
			);
		}

		const model = getModelAsSingle(modelValue);
		return model === null ? false : compare(model, value);
	}

	function getNextValue(value: TValue): TModel {
		const modelValue = unref(props.modelValue);

		if (isMultiple.value) {
			const next = getModelAsArray(modelValue);
			const index = next.findIndex((item) => compare(item, value));

			if (index > -1) {
				if (isMandatory.value && next.length === 1) {
					return modelValue;
				}

				next.splice(index, 1);
				return next as TModel;
			}

			next.push(value);
			return next as TModel;
		}

		const model = getModelAsSingle(modelValue);

		if (model !== null && compare(model, value)) {
			return isMandatory.value ? modelValue : props.emptyValue;
		}

		return value as unknown as TModel;
	}

	function select(value: TValue) {
		const modelValue = unref(props.modelValue);

		if (isMultiple.value) {
			const next = getModelAsArray(modelValue);

			if (!next.some((item) => compare(item, value))) {
				next.push(value);
				onChange(next as TModel);
			}

			return;
		}

		const model = getModelAsSingle(modelValue);

		if (model === null || !compare(model, value)) {
			onChange(value as unknown as TModel);
		}
	}

	function unselect(value: TValue) {
		const modelValue = unref(props.modelValue);

		if (isMultiple.value) {
			const current = getModelAsArray(modelValue);
			const index = current.findIndex((item) => compare(item, value));

			if (index === -1) {
				return;
			}

			if (isMandatory.value && current.length === 1) {
				return;
			}

			current.splice(index, 1);
			onChange(current as TModel);
			return;
		}

		const model = getModelAsSingle(modelValue);

		if (model !== null && compare(model, value) && !isMandatory.value) {
			onChange(props.emptyValue);
		}
	}

	function toggle(value: TValue) {
		if (isSelected(value)) {
			unselect(value);
			return;
		}

		select(value);
	}

	return {
		isMultiple,
		isMandatory,
		isSelected,
		getNextValue,
		select,
		unselect,
		toggle
	};
}
