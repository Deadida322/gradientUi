import type { MdiIcon } from '@/types/CommonTypes';
import type { GDensity } from '@/use/density';
import {
	makeMaterialSurfaceProps,
	type MaterialSurfaceProps
} from '@/use/materialSurface';
import { makeDensityProps } from '@/use/density';
import { makeSurfaceTextureProps, type GSurfaceTexture } from '@/use/surface';
import { makeTagNameProps } from '@/use/tagName';
import { propsFactory } from '@/utils/propsFactory';
import type { ExtractPropTypes, PropType } from 'vue';

export type GDividerOrientation = 'horizontal' | 'vertical';
export type GDividerVariant =
	| 'default'
	| 'tonal'
	| 'outlined'
	| 'glass'
	| 'gradient';
export type GDividerEffect =
	| 'solid'
	| 'dashed'
	| 'dotted'
	| 'fade'
	| 'glow'
	| 'pulse';
export type GDividerAlign = 'start' | 'center' | 'end';

export interface GDividerProps extends MaterialSurfaceProps {
	label?: string;
	icon?: MdiIcon;
	orientation?: GDividerOrientation;
	variant?: GDividerVariant;
	effect?: GDividerEffect;
	align?: GDividerAlign;
	thickness?: number | string;
	length?: number | string;
	inset?: boolean | number | string;
	density?: GDensity;
	texture?: GSurfaceTexture;
	decorative?: boolean;
	tag?: string;
}

export const makeDividerProps = propsFactory({
	...makeMaterialSurfaceProps({
		borderRadius: 999,
		borderWidth: undefined,
		color: 'primary',
		interactive: false,
		placement: 'center'
	}),
	...makeDensityProps(),
	...makeSurfaceTextureProps(),
	...makeTagNameProps(),
	label: String,
	icon: String as PropType<MdiIcon>,
	orientation: {
		type: String as PropType<GDividerOrientation>,
		default: 'horizontal'
	},
	variant: {
		type: String as PropType<GDividerVariant>,
		default: 'tonal'
	},
	effect: {
		type: String as PropType<GDividerEffect>,
		default: 'solid'
	},
	align: {
		type: String as PropType<GDividerAlign>,
		default: 'center'
	},
	thickness: {
		type: [Number, String],
		default: 1
	},
	length: {
		type: [Number, String],
		default: '100%'
	},
	inset: {
		type: [Boolean, Number, String],
		default: false
	},
	decorative: Boolean
});

export type GDividerResolvedProps = ExtractPropTypes<
	ReturnType<typeof makeDividerProps>
>;
