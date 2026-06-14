import type { ComputedRef } from 'vue';
import type {
	GTableCellAttrs,
	GTableCellContext,
	GTableCellSpan,
	GTableHeader,
	GTableProps,
	GTableRowContext
} from './types';

interface UseTableSpansOptions<T extends Record<string, unknown>> {
	props: GTableProps<T>;
	resolvedHeaders: ComputedRef<GTableHeader<T>[]>;
	resolvedItems: ComputedRef<T[]>;
	getRowContext: (item: T, index: number) => GTableRowContext<T>;
}

const mergeCellAttrs = (
	baseAttrs: GTableCellAttrs,
	nextAttrs: GTableCellAttrs
): GTableCellAttrs => ({
	colspan: nextAttrs.colspan ?? baseAttrs.colspan,
	rowspan: nextAttrs.rowspan ?? baseAttrs.rowspan,
	hidden: Boolean(baseAttrs.hidden || nextAttrs.hidden),
	class: [baseAttrs.class, nextAttrs.class],
	style: [baseAttrs.style, nextAttrs.style]
});

export const useTableSpans = <T extends Record<string, unknown>>({
	props,
	resolvedHeaders,
	resolvedItems,
	getRowContext
}: UseTableSpansOptions<T>) => {
	const isSpanOriginRow = (
		span: GTableCellSpan<T>,
		item: T,
		rowIndex: number
	) => {
		const rowContext = getRowContext(item, rowIndex);

		return typeof span.row === 'function'
			? span.row(rowContext)
			: span.row === rowContext.key || span.row === rowIndex;
	};

	const getSpanOriginRowIndex = (span: GTableCellSpan<T>) =>
		resolvedItems.value.findIndex((item, rowIndex) =>
			isSpanOriginRow(span, item, rowIndex)
		);

	const getSpanOriginColumnIndex = (span: GTableCellSpan<T>) =>
		resolvedHeaders.value.findIndex(
			(header) => String(header.key) === String(span.column)
		);

	const getSpanAttrs = (context: GTableCellContext<T>) => {
		const spans = props.spans ?? [];

		for (const span of spans) {
			const rowIndex = getSpanOriginRowIndex(span);
			const columnIndex = getSpanOriginColumnIndex(span);
			const colspan = span.colspan ?? 1;
			const rowspan = span.rowspan ?? 1;

			if (rowIndex < 0 || columnIndex < 0) continue;

			const isOrigin =
				context.rowIndex === rowIndex &&
				context.columnIndex === columnIndex;
			const isCovered =
				context.rowIndex >= rowIndex &&
				context.rowIndex < rowIndex + rowspan &&
				context.columnIndex >= columnIndex &&
				context.columnIndex < columnIndex + colspan;

			if (isOrigin) return span;
			if (isCovered) return { hidden: true };
		}

		return {};
	};

	const getCellAttrs = (context: GTableCellContext<T>) => {
		const spanAttrs = getSpanAttrs(context);
		const customAttrs =
			(
				props.cellProps as
					| ((
							context: GTableCellContext<T>
					  ) => GTableCellAttrs | void)
					| undefined
			)?.(context) ?? {};

		return mergeCellAttrs(spanAttrs, customAttrs);
	};

	return { getCellAttrs };
};
