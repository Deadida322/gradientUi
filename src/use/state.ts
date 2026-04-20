import { computed, type PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';
import type { GGradienStates } from '@/components/ui/GGradient/types';

export const makeStateProps = propsFactory({
	state: String as PropType<GGradienStates>
});

export function useState(
	props: { state?: GGradienStates | undefined },
	base: string
) {
	return computed(() => (props.state ? `${base}_${props.state}` : ''));
}
