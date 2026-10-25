import type { ExtractPublicPropTypes, PropType } from 'vue';
import { propsFactory } from '@/utils/propsFactory';
import { makeMaterialSurfaceProps } from '@/use/materialSurface';
import { makeDisabledProps } from '@/use/disabled';
import { makeRouterLinkProps } from '@/use/routerLink';
import { makeTagNameProps } from '@/use/tagName';
import { makeSurfaceTextureProps } from '@/use/surface';
import {
	makeNavigationProps,
	makeNavigationItemProps
} from '@/use/navigation/props';
import type { GNavigationValue } from '@/use/navigation';
import type { MdiIcon } from '@/types/CommonTypes';

export type BottomNavigationValue = GNavigationValue;
export type BottomNavigationVariant =
	| 'default'
	| 'tonal'
	| 'glass'
	| 'gradient'
	| 'outlined';
export type GBottomNavigationEmits<T = BottomNavigationValue> = {
	'update:modelValue': [value: T | undefined];
	select: [value: T | undefined, event?: Event];
};
export interface GBottomNavigationSlots<T = BottomNavigationValue> {
	default?: (props: {
		modelValue: T | undefined;
		select: (value: T | undefined, event?: Event) => void;
	}) => unknown;
}
export interface GBottomNavigationItemSlots {
	default?: (props: { selected: boolean; disabled: boolean }) => unknown;
	icon?: (props: { selected: boolean; disabled: boolean }) => unknown;
}
export const makeBottomNavigationProps = propsFactory({
	...makeNavigationProps(),
	...makeMaterialSurfaceProps({ color: 'primary', borderRadius: 16 }),
	...makeSurfaceTextureProps(),
	...makeDisabledProps(),
	variant: {
		type: String as PropType<BottomNavigationVariant>,
		default: 'tonal'
	},
	position: {
		type: String as PropType<'static' | 'sticky' | 'fixed'>,
		default: 'static'
	},
	ariaLabel: { type: String, default: 'Bottom navigation' },
	showLabels: { type: Boolean, default: true }
});
export const makeBottomNavigationItemProps = propsFactory({
	...makeNavigationItemProps(),
	...makeTagNameProps(),
	...makeRouterLinkProps(),
	icon: String as PropType<MdiIcon>
});
export type GBottomNavigationProps = ExtractPublicPropTypes<
	ReturnType<typeof makeBottomNavigationProps>
>;
export type GBottomNavigationItemProps = ExtractPublicPropTypes<
	ReturnType<typeof makeBottomNavigationItemProps>
>;
