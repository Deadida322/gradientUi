import type { PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';
import { computed } from 'vue';

export type GVariant =
	| 'tonal'
	| 'text'
	| 'outlined'
	| 'gradient'
	| 'glass'
	| 'default';

export const makeVariantProps = propsFactory({
	variant: {
		type: String as PropType<GVariant>,
		default: 'default'
	}
});

export function useVariant(props: { variant: GVariant }, baseClass: string) {
	return computed(() => {
		return `${baseClass}_${props.variant}`;
	});
}
