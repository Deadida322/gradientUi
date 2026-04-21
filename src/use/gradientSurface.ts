import type { GBorderRadius } from '@/use/gradient';
import usePx from '@/use/px';
import { propsFactory } from '@/utils/propsFactory';
import { toRef, type ExtractPropTypes, type PropType } from 'vue';

export const makeGradientSurfaceProps = propsFactory({
	borderRadius: {
		type: [Number, String] as PropType<GBorderRadius>,
		default: 4
	},
	inheritWidth: Boolean
});

type GGradientSurfaceProps = ExtractPropTypes<
	ReturnType<typeof makeGradientSurfaceProps>
>;

export function useGradientSurface(props: GGradientSurfaceProps) {
	const surfaceBorderRadius = usePx(toRef(props, 'borderRadius'));

	return {
		surfaceBorderRadius
	};
}
