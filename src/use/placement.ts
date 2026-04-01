import { computed, type PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';
import { type Placement } from '@/types/CommonTypes';

export const makePlacementProps = propsFactory({
	placement: {
		type: String as PropType<Placement>,
		default: 'bottom'
	}
});

export function usePlacement(props: { placement: Placement }, base: string) {
	return computed(() => `${base}_${props.placement}`);
}
