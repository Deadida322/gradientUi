import type { GColor } from '@/use/color';
import type { GGradienStates } from '@/components/ui/GGradient/types';
import type { GVariant } from '@/use/variant';
import { propsFactory } from '@/utils/propsFactory';
import type { HTMLAttributes, PropType, StyleValue } from 'vue';

export type GTableAlign = 'start' | 'center' | 'end';
export type GTableDensity = 'compact' | 'comfortable' | 'spacious';
export type GTableKey = string | number;
export type GTableRowEvent = MouseEvent | KeyboardEvent;
export type GTableItemKey<T> =
	| keyof T
	| string
	| ((item: T, index: number) => GTableKey);

export interface GTableHeader<T = Record<string, unknown>> {
	key: keyof T | string;
	title: string;
	align?: GTableAlign;
	headerAlign?: GTableAlign;
	width?: string | number;
	minWidth?: string | number;
	maxWidth?: string | number;
	fixed?: 'start' | 'end';
	nowrap?: boolean;
	shrink?: boolean;
	class?: HTMLAttributes['class'];
	headerClass?: HTMLAttributes['class'];
	cellClass?: HTMLAttributes['class'];
	value?: (item: T, index: number) => unknown;
	format?: (value: unknown, item: T, index: number) => string;
}

export interface GTableCellContext<T = Record<string, unknown>> {
	item: T;
	header: GTableHeader<T>;
	value: unknown;
	rowIndex: number;
	columnIndex: number;
	headers: GTableHeader<T>[];
}

export interface GTableRowContext<T = Record<string, unknown>> {
	item: T;
	index: number;
	key: GTableKey;
	expanded: boolean;
	toggleExpanded: () => void;
}

export interface GTableCellAttrs {
	colspan?: number;
	rowspan?: number;
	hidden?: boolean;
	state?: GGradienStates;
	class?: HTMLAttributes['class'];
	style?: StyleValue;
}

export interface GTableRowAttrs {
	state?: GGradienStates;
	class?: HTMLAttributes['class'];
	style?: StyleValue;
}

export type GTableSpanRow<T = Record<string, unknown>> =
	| GTableKey
	| ((context: GTableRowContext<T>) => boolean);

export interface GTableCellSpan<
	T = Record<string, unknown>
> extends GTableCellAttrs {
	row: GTableSpanRow<T>;
	column: keyof T | string;
}

export interface GTableBodySlotClasses {
	nativeRow: string;
	nativeCell: string;
	nativeCellCenter: string;
	nativeCellEnd: string;
	groupCell: string;
}

export interface GTableBodySlotContext<T = Record<string, unknown>> {
	items: T[];
	headers: GTableHeader<T>[];
	columnCount: number;
	classes: GTableBodySlotClasses;
	getRowContext: (item: T, index: number) => GTableRowContext<T>;
	getCellContext: (
		item: T,
		header: GTableHeader<T>,
		rowIndex: number,
		columnIndex: number
	) => GTableCellContext<T>;
}

export interface GTableProps<T = Record<string, unknown>> {
	headers?: GTableHeader<T>[];
	items?: T[];
	itemKey?: GTableItemKey<T>;
	variant?: GVariant;
	color?: GColor;
	rounded?: boolean;
	density?: GTableDensity;
	stickyHeader?: boolean;
	fixedLayout?: boolean;
	hover?: boolean;
	clickableRows?: boolean;
	striped?: boolean;
	bordered?: boolean;
	hideHeader?: boolean;
	caption?: string;
	hideCaption?: boolean;
	ariaLabel?: string;
	ariaLabelledby?: string;
	loading?: boolean;
	loadingRows?: number;
	emptyText?: string;
	elevation?: boolean;
	showExpand?: boolean;
	expanded?: GTableKey[];
	singleExpand?: boolean;
	expandOnRowClick?: boolean;
	spans?: GTableCellSpan<T>[];
	cellProps?: (context: GTableCellContext<T>) => GTableCellAttrs | void;
	rowProps?: (context: GTableRowContext<T>) => GTableRowAttrs | void;
	headerProps?: (
		header: GTableHeader<T>,
		index: number
	) => GTableCellAttrs | void;
}

export interface GTableSlots<T = Record<string, unknown>> {
	top?: () => unknown;
	bottom?: () => unknown;
	empty?: () => unknown;
	loading?: () => unknown;
	caption?: () => unknown;
	body?: (context: GTableBodySlotContext<T>) => unknown;
	row?: (
		context: GTableRowContext<T> & { headers: GTableHeader<T>[] }
	) => unknown;
	expandedRow?: (
		context: GTableRowContext<T> & { headers: GTableHeader<T>[] }
	) => unknown;
	'expanded-row'?: (
		context: GTableRowContext<T> & { headers: GTableHeader<T>[] }
	) => unknown;
	expand?: (context: GTableRowContext<T>) => unknown;
	item?: (context: GTableCellContext<T>) => unknown;
	header?: (context: { header: GTableHeader<T>; index: number }) => unknown;
}

export type GTableEmits = {
	'update:expanded': [value: GTableKey[]];
	expand: [item: unknown, expanded: boolean];
	'row-click': [item: unknown, event: GTableRowEvent];
	'cell-click': [context: GTableCellContext, event: MouseEvent];
};

export const makeTableProps = propsFactory({
	headers: {
		type: Array as PropType<GTableHeader[]>,
		default: () => []
	},
	items: {
		type: Array as PropType<Record<string, unknown>[]>,
		default: () => []
	},
	itemKey: {
		type: [String, Function] as PropType<
			GTableItemKey<Record<string, unknown>>
		>,
		default: 'id'
	},
	variant: {
		type: String as PropType<GVariant>,
		default: 'tonal'
	},
	color: {
		type: String as PropType<GColor>,
		default: 'primary'
	},
	rounded: Boolean,
	density: {
		type: String as PropType<GTableDensity>,
		default: 'comfortable'
	},
	stickyHeader: Boolean,
	fixedLayout: Boolean,
	hover: Boolean,
	clickableRows: Boolean,
	striped: Boolean,
	bordered: Boolean,
	hideHeader: Boolean,
	caption: String,
	hideCaption: Boolean,
	ariaLabel: String,
	ariaLabelledby: String,
	loading: Boolean,
	loadingRows: {
		type: Number,
		default: 3
	},
	emptyText: {
		type: String,
		default: 'No data'
	},
	elevation: Boolean,
	showExpand: Boolean,
	expanded: {
		type: Array as PropType<GTableKey[]>,
		default: () => []
	},
	singleExpand: Boolean,
	expandOnRowClick: Boolean,
	spans: {
		type: Array as PropType<GTableCellSpan[]>,
		default: () => []
	},
	cellProps: Function as PropType<GTableProps['cellProps']>,
	rowProps: Function as PropType<GTableProps['rowProps']>,
	headerProps: Function as PropType<GTableProps['headerProps']>
});
