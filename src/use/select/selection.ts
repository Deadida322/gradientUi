import { unref, type MaybeRef } from 'vue';
import { useBooleanProp } from '@/use/booleanProp';
import type { InternalItem, SelectionValue } from './types';

export function useSelection<
	T,
	V,
	Multiple extends boolean,
	ReturnObject extends boolean,
	Model extends SelectionValue<T, V, Multiple, ReturnObject>
>(
	props: {
		modelValue: MaybeRef<Model>;
		multiple?: MaybeRef<unknown>;
		returnObject?: MaybeRef<unknown>;
		comparator?: (
			a: Model extends (infer U)[] ? U : Model,
			b: Model extends (infer U)[] ? U : Model
		) => boolean;
	},
	emit: (e: 'update:modelValue', value: Model) => void
) {
	const isMultiple = useBooleanProp(props.multiple ?? false);
	const isReturnObject = useBooleanProp(props.returnObject ?? false);

	type SingleValue = Model extends (infer U)[] ? U : Model;
	type Comparator = (a: SingleValue, b: SingleValue) => boolean;

	const compare: Comparator =
		props.comparator ??
		((a: SingleValue, b: SingleValue) => Object.is(a, b));

	function getModelAsArray(modelValue: Model): SingleValue[] {
		return Array.isArray(modelValue) ? modelValue : [];
	}

	function getModelAsSingle(modelValue: Model): SingleValue | null {
		return Array.isArray(modelValue) ? null : (modelValue as SingleValue);
	}

	function extract(item: InternalItem<T, V>): SingleValue {
		return (isReturnObject.value ? item.raw : item.value) as SingleValue;
	}

	function isSelected(item: InternalItem<T, V>): boolean {
		const value = extract(item);
		const modelValue = unref(props.modelValue);

		if (isMultiple.value) {
			const model = getModelAsArray(modelValue);
			return model.some((v) => compare(v, value));
		}

		const model = getModelAsSingle(modelValue);
		if (model === null) return false;
		return compare(model, value);
	}

	function select(item: InternalItem<T, V>) {
		if (item.disabled) return;

		const value = extract(item);
		const modelValue = unref(props.modelValue);

		if (isMultiple.value) {
			const model = getModelAsArray(modelValue);
			const next = [...model];

			const index = next.findIndex((v) => compare(v, value));

			if (index > -1) {
				next.splice(index, 1);
			} else {
				next.push(value);
			}

			emit('update:modelValue', next as Model);
		} else {
			if (compare(modelValue as SingleValue, value))
				return emit('update:modelValue', null as unknown as Model);
			emit('update:modelValue', value as Model);
		}
	}

	return {
		isSelected,
		select
	};
}
