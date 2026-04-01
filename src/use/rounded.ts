import { computed, type PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';

export const makeRoundedProps = propsFactory({
	rounded: Boolean as PropType<boolean>
});

export function useRounded(props: { rounded?: boolean }, base: string) {
	return computed(() => (props.rounded ? `${base}_rounded` : ''));
}
