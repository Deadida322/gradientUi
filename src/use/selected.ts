import { computed, type PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';

export type MaybeBoolean = boolean | (() => boolean);

export function resolveMaybeBoolean(value: MaybeBoolean): boolean {
	return typeof value === 'function' ? value() : value;
}

export const makeSelectedProps = propsFactory({
	selected: {
		type: [Boolean, Function] as PropType<MaybeBoolean>,
		default: false
	}
});

export function useSelected(props: { selected: MaybeBoolean }, base: string) {
	return computed(() =>
		resolveMaybeBoolean(props.selected) ? `${base}_selected` : ''
	);
}
