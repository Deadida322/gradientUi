import { computed, type PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';

export const makeHighlightedProps = propsFactory({
	highlighted: Boolean as PropType<boolean>
});

export function useHighlighted(props: { highlighted: boolean }, base: string) {
	return computed(() => (props.highlighted ? `${base}_highlighted` : ''));
}
