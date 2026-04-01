import { computed, type PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';

export const makeDisabledProps = propsFactory({
	disabled: Boolean as PropType<boolean>
});

export function useDisabled(props: { disabled: boolean }, base: string) {
	return computed(() => (props.disabled ? `${base}_disabled` : ''));
}
