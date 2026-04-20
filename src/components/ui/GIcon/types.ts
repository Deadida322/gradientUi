import type { MdiIcon, StringeredNumber } from '@/types/CommonTypes';
import type { PropType } from 'vue';

export type IconAlias = `$${string}`;
export type IconSetValue = `${string}:${string}`;
export type IconValue = MdiIcon | IconAlias | IconSetValue;

export interface GIconProps {
	icon: IconValue;
	size?: number | StringeredNumber;
	tag?: string;
}

export const makeIconProps = () => ({
	icon: {
		type: String as PropType<IconValue>,
		required: true
	},
	size: {
		type: [Number, String] as PropType<number | StringeredNumber>,
		default: undefined
	},
	tag: {
		type: String,
		default: 'span'
	}
});
