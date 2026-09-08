import { computed, type PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';

export type GDensity = 'compact' | 'comfortable' | 'spacious';

export const makeDensityProps = propsFactory({
	density: {
		type: String as PropType<GDensity>,
		default: 'comfortable'
	}
});

export function useDensity(
	props: { density: GDensity },
	base: string,
	modifier = 'density'
) {
	return computed(() => `${base}_${modifier}-${props.density}`);
}
