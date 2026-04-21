import { propsFactory } from '@/utils/propsFactory';
import {
	computed,
	toValue,
	type CSSProperties,
	type MaybeRefOrGetter,
	type PropType
} from 'vue';
import {
	resolveColorValue,
	resolveOnColorValue,
	type GColor
} from './colorResolver';

export type { GColor };

export interface ColorProps {
	color?: MaybeRefOrGetter<GColor | undefined>;
}

export const makeColorProps = propsFactory({
	color: {
		type: String as PropType<GColor>,
		default: 'primary'
	}
});

export function useColor(props: ColorProps) {
	const colorStyles = computed<CSSProperties>(() => {
		const color = toValue(props.color);

		return {
			'--g-color': resolveColorValue(color),
			'--g-on-color': resolveOnColorValue(color),
			'--g-surface-color': 'var(--g-token-color-surface)',
			'--g-on-surface-color': 'var(--g-token-color-on-surface)'
		} as CSSProperties;
	});

	return {
		colorStyles
	};
}
