import type { PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';
import { computed } from 'vue';

export type GVariant = 'tonal' | 'text' | 'outlined' | 'filled' | 'default';

export const makeVariantProps = propsFactory({
	variant: {
		type: String as PropType<GVariant>,
		default: 'filled'
	}
});

export function useVariant(props: { variant: GVariant }, baseClass: string) {
	return computed(() => {
		return `${baseClass}_${props.variant}`;
	});
}
