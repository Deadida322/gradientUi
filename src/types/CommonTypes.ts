import * as mdi from '@mdi/js';
import type { ExcludeString } from './UtilityTypes';
import type { CamelToKebab } from './UtilityTypes';

export type MdiIcon = ExcludeString<CamelToKebab<keyof typeof mdi>, 'mdi-'>;

export interface PLAProps {
	label?: string;
	appendIcon?: MdiIcon;
	prependIcon?: MdiIcon;
}

export interface PLASlots {
	default?: () => unknown;
	prepend?: () => unknown;
	append?: () => unknown;
}

export type PXtype = number | string;

export type Sizes = 's' | 'm' | 'l' | 'xl';
export type Placement = 'top' | 'bottom' | 'left' | 'right' | 'center';

type OptionalFields = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
};

export interface option extends OptionalFields {
	label: string;
	value: string | number | object;
}

export type StringeredNumber = number | `${number}`;
