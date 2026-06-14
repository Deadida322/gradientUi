import { computed, type ComputedRef } from 'vue';
import type {
	GTableBodySlotClasses,
	GTableCellAttrs,
	GTableCellContext,
	GTableHeader,
	GTableKey,
	GTableProps
} from './types';

export const useTable = <T extends Record<string, unknown>>(
	props: GTableProps<T>
) => {
	const resolvedHeaders = computed(() => props.headers ?? []);
	const resolvedItems = computed(() => props.items ?? []);
	const columnCount = computed(
		() => resolvedHeaders.value.length + (props.showExpand ? 1 : 0)
	);
	const hasRows = computed(() => resolvedItems.value.length > 0);
	const bodySlotClasses: GTableBodySlotClasses = {
		nativeRow: 'g-table__native-row',
		nativeCell: 'g-table__native-cell',
		nativeCellCenter:
			'g-table__native-cell g-table__native-cell_align-center',
		nativeCellEnd: 'g-table__native-cell g-table__native-cell_align-end',
		groupCell: 'g-table__native-cell g-table__native-cell_group'
	};

	const toCssSize = (value: string | number | undefined) =>
		typeof value === 'number' ? `${value}px` : value;

	const toCssOffset = (value: string | number | undefined) =>
		toCssSize(value) ?? '0px';

	const getColumnSize = (header: GTableHeader<T>) =>
		header.width ?? header.minWidth;

	const getFixedStartOffset = (index: number) => {
		const headersOffset = resolvedHeaders.value
			.slice(0, index)
			.filter((header) => header.fixed === 'start')
			.map((header) => toCssOffset(getColumnSize(header)));
		const offsets = props.showExpand
			? ['56px', ...headersOffset]
			: headersOffset;

		return offsets.length > 0 ? `calc(${offsets.join(' + ')})` : '0px';
	};

	const getFixedEndOffset = (index: number) => {
		const offsets = resolvedHeaders.value
			.slice(index + 1)
			.filter((header) => header.fixed === 'end')
			.map((header) => toCssOffset(getColumnSize(header)));

		return offsets.length > 0 ? `calc(${offsets.join(' + ')})` : '0px';
	};

	const getColumnFixedAttrs = (
		header: GTableHeader<T>,
		index: number
	): GTableCellAttrs => {
		if (!header.fixed) return {};

		return {
			class: [
				'g-table__column_fixed',
				`g-table__column_fixed-${header.fixed}`
			],
			style: {
				[header.fixed === 'start' ? 'left' : 'right']:
					header.fixed === 'start'
						? getFixedStartOffset(index)
						: getFixedEndOffset(index)
			}
		};
	};

	const getHeaderStyle = (header: GTableHeader<T>) => ({
		width: toCssSize(header.width),
		minWidth: toCssSize(header.minWidth),
		maxWidth: toCssSize(header.maxWidth)
	});

	const getValueByPath = (item: T, key: string | number | symbol) => {
		if (typeof key !== 'string') return item[key as keyof T];

		return key.split('.').reduce<unknown>((value, pathKey) => {
			if (value == null || typeof value !== 'object') return undefined;
			return (value as Record<string, unknown>)[pathKey];
		}, item);
	};

	const getItemKey = (item: T, index: number): GTableKey => {
		if (typeof props.itemKey === 'function') {
			return props.itemKey(item, index);
		}

		const value = getValueByPath(item, props.itemKey ?? 'id');
		return typeof value === 'string' || typeof value === 'number'
			? value
			: index;
	};

	const getCellValue = (
		item: T,
		header: GTableHeader<T>,
		rowIndex: number
	) => {
		const value = header.value
			? header.value(item, rowIndex)
			: getValueByPath(item, header.key);

		return header.format ? header.format(value, item, rowIndex) : value;
	};

	const getCellContext = (
		item: T,
		header: GTableHeader<T>,
		rowIndex: number,
		columnIndex: number
	): GTableCellContext<T> => ({
		item,
		header,
		value: getCellValue(item, header, rowIndex),
		rowIndex,
		columnIndex,
		headers: resolvedHeaders.value
	});

	const getHeaderAttrs = (header: GTableHeader<T>, index: number) =>
		(
			props.headerProps as
				| ((
						header: GTableHeader<T>,
						index: number
				  ) => GTableCellAttrs | void)
				| undefined
		)?.(header, index) ?? {};

	const getAlign = (header: GTableHeader<T>) => header.align ?? 'start';
	const getHeaderAlign = (header: GTableHeader<T>) =>
		header.headerAlign ?? getAlign(header);

	const getHeaderSlotName = (header: GTableHeader<T>) =>
		`header.${String(header.key)}`;
	const getItemSlotName = (header: GTableHeader<T>) =>
		`item.${String(header.key)}`;

	return {
		resolvedHeaders: resolvedHeaders as ComputedRef<GTableHeader<T>[]>,
		resolvedItems: resolvedItems as ComputedRef<T[]>,
		columnCount,
		hasRows,
		bodySlotClasses,
		getHeaderStyle,
		getItemKey,
		getCellContext,
		getHeaderAttrs,
		getColumnFixedAttrs,
		getAlign,
		getHeaderAlign,
		getHeaderSlotName,
		getItemSlotName
	};
};
