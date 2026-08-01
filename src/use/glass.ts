import type { StringeredNumber } from '@/types/CommonTypes';
import { propsFactory } from '@/utils/propsFactory';
import { computed, toValue, type MaybeRefOrGetter, type PropType } from 'vue';

export interface GlassProps {
	backdropBlur?: StringeredNumber;
}

export const makeGlassProps = propsFactory({
	backdropBlur: {
		type: [Number, String] as PropType<StringeredNumber>,
		default: 6
	}
});

const toPx = (value: StringeredNumber | undefined) => {
	if (value === undefined) return '6px';
	if (typeof value === 'number') return `${value}px`;

	return /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value;
};

export const useGlass = (props: {
	backdropBlur?: MaybeRefOrGetter<StringeredNumber | undefined>;
}) => {
	const backdropBlur = computed(() => toPx(toValue(props.backdropBlur)));
	const glassStyles = computed(() => ({
		'--g-glass-backdrop-blur': backdropBlur.value
	}));

	return {
		backdropBlur,
		glassStyles
	};
};
