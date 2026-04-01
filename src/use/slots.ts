import { type VNodeChild, useSlots } from 'vue';

export type SlotDefinition<Props> = (props: Props) => VNodeChild;

export type SlotsDefinition = Record<string, SlotDefinition<never>>;

export type SlotProps<T> = T extends SlotDefinition<infer P> ? P : never;

type WithDefaults<S extends SlotsDefinition, D extends Partial<S>> = {
	[K in keyof S]: {
		fn: K extends keyof D ? S[K] | D[K] : S[K];
	};
};

export function slotsFactory<S extends SlotsDefinition>(slots: S) {
	return function <D extends Partial<S> = object>(
		defaults?: D
	): WithDefaults<S, D> {
		const result = {} as WithDefaults<S, D>;

		for (const key in slots) {
			const fn = (
				defaults && key in defaults ? defaults[key] : slots[key]
			)!;

			result[key as keyof S] = { fn } as WithDefaults<S, D>[typeof key];
		}

		return result;
	};
}

export function useTypedSlots<T extends SlotsDefinition>(_def: T): T {
	return useSlots() as unknown as T;
}

export type InferSlots<T extends SlotsDefinition> = {
	[K in keyof T]: SlotProps<T[K]>;
};
