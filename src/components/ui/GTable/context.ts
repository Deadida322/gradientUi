import { inject, provide, type ComputedRef, type InjectionKey } from 'vue';
import type {
	GTableAlign,
	GTableBodySlotClasses,
	GTableCellAttrs,
	GTableCellContext,
	GTableHeader,
	GTableKey,
	GTableRowEvent,
	GTableRowAttrs,
	GTableRowContext
} from './types';

export interface GTableContext<T extends Record<string, unknown>> {
	headers: ComputedRef<GTableHeader<T>[]>;
	items: ComputedRef<T[]>;
	columnCount: ComputedRef<number>;
	rowInteractive: ComputedRef<boolean>;
	bodySlotClasses: GTableBodySlotClasses;
	getItemKey: (item: T, index: number) => GTableKey;
	getRowContext: (item: T, index: number) => GTableRowContext<T>;
	getRowAttrs: (item: T, index: number) => GTableRowAttrs;
	getCellContext: (
		item: T,
		header: GTableHeader<T>,
		rowIndex: number,
		columnIndex: number
	) => GTableCellContext<T>;
	getCellAttrs: (context: GTableCellContext<T>) => GTableCellAttrs;
	getColumnFixedAttrs: (
		header: GTableHeader<T>,
		index: number
	) => GTableCellAttrs;
	getAlign: (header: GTableHeader<T>) => GTableAlign;
	getItemSlotName: (header: GTableHeader<T>) => string;
	isRowExpanded: (item: T, index: number) => boolean;
	shouldRenderExpandedRow: (item: T, index: number) => boolean;
	onExpandedAfterLeave: (item: T, index: number) => void;
	toggleExpanded: (item: T, index: number) => void;
	onRowClick: (item: T, index: number, event: GTableRowEvent) => void;
	onCellClick: (context: GTableCellContext<T>, event: MouseEvent) => void;
}

const GTableSymbol: InjectionKey<GTableContext<Record<string, unknown>>> =
	Symbol('GTable');

export const provideTableContext = <T extends Record<string, unknown>>(
	context: GTableContext<T>
) => {
	provide(GTableSymbol, context as GTableContext<Record<string, unknown>>);
};

export const useTableContext = <T extends Record<string, unknown>>() => {
	const context = inject(GTableSymbol);

	if (!context) {
		throw new Error('GTable context is missing');
	}

	return context as GTableContext<T>;
};
