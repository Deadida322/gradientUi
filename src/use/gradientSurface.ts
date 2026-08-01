import type { GBorderRadius } from '@/use/gradient';
import usePx from '@/use/px';
import { propsFactory } from '@/utils/propsFactory';
import { computed, toRef, type ExtractPropTypes, type PropType } from 'vue';

export type GGradientSurfaceFill = 'theme' | 'transparent';

export const makeGradientSurfaceProps = propsFactory({
	rootTag: {
		type: String,
		default: 'div'
	},
	interactive: {
		type: Boolean,
		default: true
	},
	borderRadius: {
		type: [Number, String] as PropType<GBorderRadius>,
		default: 4
	},
	inheritWidth: Boolean,
	surfaceFill: {
		type: String as PropType<GGradientSurfaceFill>,
		default: 'transparent'
	}
});

type GGradientSurfaceProps = ExtractPropTypes<
	ReturnType<typeof makeGradientSurfaceProps>
>;

export function useGradientSurface(props: GGradientSurfaceProps) {
	const surfaceBorderRadius = usePx(toRef(props, 'borderRadius'));
	const surfaceFillClass = computed(
		() => `g-gradient_surface-${props.surfaceFill}`
	);
	const interactionClass = computed(() =>
		props.interactive ? 'g-gradient_interactive' : ''
	);

	return {
		interactionClass,
		surfaceBorderRadius,
		surfaceFillClass
	};
}
