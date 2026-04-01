import { computed, type PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';
import { type Sizes } from '@/types/CommonTypes';

export const makeSizeProps = propsFactory({
	size: {
		type: String as PropType<Sizes>,
		default: 'm'
	}
});

export function useSize(props: { size: Sizes }, base: string) {
	return computed(() => `${base}_${props.size}`);
}
