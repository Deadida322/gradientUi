import { computed, type PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';

export const makeFocusedProps = propsFactory({
	focused: Boolean as PropType<boolean>
});

export function useFocused(props: { focused: boolean }, base: string) {
	return computed(() => (props.focused ? `${base}_focused` : ''));
}
