export interface PLAProps {
	label?: string;
	append?: string;
	prepend?: string;
}

export interface PLASlots {
	default?: () => unknown;
	prepend?: () => unknown;
	append?: () => unknown;
}

export type PXtype = number | string;

export type sizes = 'm' | 'l' | 's';

type OptionalFields = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
};

export interface option extends OptionalFields {
	label: string;
	value: string | number | object;
}
