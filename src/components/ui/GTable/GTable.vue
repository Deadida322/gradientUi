<script setup generic="T extends Record<string, unknown>" lang="ts">
	import { computed, useSlots } from 'vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { useSurfaceLayers } from '@/use/surface';
	import {
		makeTableProps,
		type GTableCellContext,
		type GTableKey,
		type GTableProps,
		type GTableRowEvent,
		type GTableRowContext,
		type GTableRowAttrs
	} from './types';
	import GTableHead from './GTableHead.vue';
	import GTableBody from './GTableBody.vue';
	import { provideTableContext } from './context';
	import { useTable } from './useTable';
	import { useTableExpansion } from './useTableExpansion';
	import { useTableSpans } from './useTableSpans';

	const props = defineProps(makeTableProps());
	const tableProps = props as unknown as GTableProps<T>;
	const emit = defineEmits<{
		'update:expanded': [value: GTableKey[]];
		expand: [item: T, expanded: boolean];
		'row-click': [item: T, event: GTableRowEvent];
		'cell-click': [context: GTableCellContext<T>, event: MouseEvent];
	}>();
	const slots = useSlots();

	const { colorStyles } = useSurfaceColor(props);
	const {
		surfaceOverlayClasses,
		surfaceUnderlayClasses,
		surfaceContentClasses
	} = useSurfaceLayers('g-table');

	const hasExpandedRowSlot = computed(
		() => Boolean(slots.expandedRow) || Boolean(slots['expanded-row'])
	);
	const table = useTable<T>(tableProps);
	const {
		resolvedHeaders,
		resolvedItems,
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
	} = table;
	const headerSlotHeaders = computed(() =>
		resolvedHeaders.value.filter(
			(header) => slots[getHeaderSlotName(header)]
		)
	);
	const itemSlotHeaders = computed(() =>
		resolvedHeaders.value.filter((header) => slots[getItemSlotName(header)])
	);
	const rowInteractive = computed(
		() => props.clickableRows || props.expandOnRowClick
	);
	const hasFixedStart = computed(() =>
		resolvedHeaders.value.some((header) => header.fixed === 'start')
	);
	const hasFixedEnd = computed(() =>
		resolvedHeaders.value.some((header) => header.fixed === 'end')
	);

	const expansion = useTableExpansion<T>({
		props: tableProps,
		hasExpandedRowSlot,
		getItemKey,
		emitUpdateExpanded: (value) => emit('update:expanded', value),
		emitExpand: (item, expanded) => emit('expand', item, expanded)
	});
	const {
		toggleExpanded,
		isRowExpanded,
		shouldRenderExpandedRow,
		onExpandedAfterLeave
	} = expansion;

	const getRowContext = (item: T, index: number) => {
		const key = getItemKey(item, index);
		return {
			item,
			index,
			key,
			expanded: isRowExpanded(item, index),
			toggleExpanded: () => toggleExpanded(item, index)
		};
	};

	const getRowAttrs = (item: T, index: number) =>
		(
			tableProps.rowProps as
				| ((context: GTableRowContext<T>) => GTableRowAttrs | void)
				| undefined
		)?.(getRowContext(item, index)) ?? {};
	const { getCellAttrs } = useTableSpans<T>({
		props: tableProps,
		resolvedHeaders,
		resolvedItems,
		getRowContext
	});

	const onRowClick = (item: T, index: number, event: GTableRowEvent) => {
		if (props.expandOnRowClick) {
			toggleExpanded(item, index);
		}

		emit('row-click', item, event);
	};

	const onCellClick = (context: GTableCellContext<T>, event: MouseEvent) => {
		emit('cell-click', context, event);
	};

	provideTableContext<T>({
		headers: resolvedHeaders,
		items: resolvedItems,
		columnCount,
		bodySlotClasses,
		rowInteractive,
		getItemKey,
		getRowContext,
		getRowAttrs,
		getCellContext,
		getCellAttrs,
		getColumnFixedAttrs,
		getAlign,
		getItemSlotName,
		isRowExpanded,
		shouldRenderExpandedRow,
		onExpandedAfterLeave,
		toggleExpanded,
		onRowClick,
		onCellClick
	});
</script>

<template>
	<div
		class="g-table"
		:class="[
			`g-table_${props.variant}`,
			`g-table_density-${props.density}`,
			{
				'g-table_rounded': props.rounded,
				'g-table_sticky-header': props.stickyHeader,
				'g-table_fixed-layout': props.fixedLayout,
				'g-table_hover': props.hover,
				'g-table_clickable-rows': rowInteractive,
				'g-table_striped': props.striped,
				'g-table_bordered': props.bordered,
				'g-table_loading': props.loading,
				'g-table_elevation': props.elevation,
				'g-table_has-fixed-start': hasFixedStart,
				'g-table_has-fixed-end': hasFixedEnd,
				'g-table_expand-on-row-click': props.expandOnRowClick
			}
		]"
		:style="colorStyles">
		<span :class="surfaceUnderlayClasses"></span>
		<span :class="surfaceOverlayClasses"></span>

		<div
			class="g-table__content"
			:class="surfaceContentClasses">
			<div
				v-if="slots.top"
				class="g-table__top">
				<slot name="top"></slot>
			</div>

			<div class="g-table__scroller">
				<table
					class="g-table__table"
					:aria-label="props.ariaLabel"
					:aria-labelledby="props.ariaLabelledby">
					<caption
						v-if="props.caption || slots.caption"
						class="g-table__caption"
						:class="{
							'g-table__caption_hidden': props.hideCaption
						}">
						<slot name="caption">
							{{ props.caption }}
						</slot>
					</caption>

					<colgroup>
						<col
							v-if="props.showExpand"
							class="g-table__col g-table__col_expand" />
						<col
							v-for="header in resolvedHeaders"
							:key="String(header.key)"
							class="g-table__col"
							:class="{ 'g-table__col_shrink': header.shrink }"
							:style="getHeaderStyle(header)" />
					</colgroup>

					<g-table-head
						v-if="!props.hideHeader"
						:get-column-fixed-attrs="getColumnFixedAttrs"
						:get-header-align="getHeaderAlign"
						:get-header-attrs="getHeaderAttrs"
						:get-header-slot-name="getHeaderSlotName"
						:get-header-style="getHeaderStyle"
						:headers="resolvedHeaders"
						:show-expand="props.showExpand">
						<template #header="slotProps">
							<slot
								name="header"
								v-bind="slotProps">
								{{ slotProps.header.title }}
							</slot>
						</template>
						<template
							v-for="header in headerSlotHeaders"
							:key="String(header.key)"
							#[getHeaderSlotName(header)]="slotProps">
							<slot
								:name="getHeaderSlotName(header)"
								v-bind="slotProps">
								<slot
									name="header"
									v-bind="slotProps">
									{{ slotProps.header.title }}
								</slot>
							</slot>
						</template>
					</g-table-head>

					<g-table-body
						:empty-text="props.emptyText"
						:has-expanded-row-slot="hasExpandedRowSlot"
						:has-rows="hasRows"
						:loading="props.loading"
						:loading-rows="props.loadingRows"
						:show-expand="props.showExpand">
						<template
							v-if="slots.body"
							#body="slotProps">
							<slot
								name="body"
								v-bind="slotProps"></slot>
						</template>
						<template #loading>
							<slot name="loading">Loading...</slot>
						</template>
						<template #empty>
							<slot name="empty">
								{{ props.emptyText }}
							</slot>
						</template>
						<template
							v-if="slots.row"
							#row="slotProps">
							<slot
								name="row"
								v-bind="slotProps"></slot>
						</template>
						<template
							v-if="slots.expand"
							#expand="slotProps">
							<slot
								name="expand"
								v-bind="slotProps"></slot>
						</template>
						<template #item="slotProps">
							<slot
								name="item"
								v-bind="slotProps">
								{{ slotProps.value }}
							</slot>
						</template>
						<template
							v-for="header in itemSlotHeaders"
							:key="String(header.key)"
							#[getItemSlotName(header)]="slotProps">
							<slot
								:name="getItemSlotName(header)"
								v-bind="slotProps"></slot>
						</template>
						<template
							v-if="hasExpandedRowSlot"
							#expanded-row="slotProps">
							<slot
								name="expanded-row"
								v-bind="slotProps"></slot>
						</template>
					</g-table-body>
				</table>
			</div>

			<div
				v-if="slots.bottom"
				class="g-table__bottom">
				<slot name="bottom"></slot>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	@use '@/styles/mixins/action-surface' as actionSurface;
	@use '@/styles/mixins/focus-ring' as focusRing;
	@use '@/styles/mixins/scrollbar' as scrollbar;

	.g-table {
		--g-table-padding-y: var(--g-token-space-3);
		--g-table-padding-x: var(--g-token-space-4);
		--g-table-row-height: 52px;
		--g-table-header-height: 44px;
		--g-table-radius: var(--g-token-radius-md);
		--g-table-border-color: color-mix(
			in srgb,
			var(--g-color) 16%,
			var(--g-token-border-subtle)
		);
		--g-table-header-color: color-mix(
			in srgb,
			var(--g-token-color-on-surface) 74%,
			transparent
		);
		--g-table-muted-color: color-mix(
			in srgb,
			var(--g-token-color-on-surface) 56%,
			transparent
		);
		--g-table-fixed-background: color-mix(
			in srgb,
			var(--g-token-color-surface) 96%,
			var(--g-color) 4%
		);
		--g-surface-underlay-color: var(--g-surface-color);
		--g-surface-underlay-opacity: 1;
		--g-surface-overlay-color: var(--g-color);
		--g-surface-overlay-opacity: var(--g-token-state-tonal-opacity);
		--g-surface-content-color: var(--g-token-color-on-surface);

		position: relative;

		overflow: hidden;

		width: 100%;
		min-width: 0;
		border-radius: var(--g-table-radius);

		color: var(--g-surface-content-color);

		transition: box-shadow var(--g-token-duration-base)
			var(--g-token-easing-emphasized);

		&_filled {
			--g-surface-underlay-color: var(--g-color);
			--g-surface-underlay-opacity: 1;
			--g-surface-overlay-color: var(--g-on-color);
			--g-surface-overlay-opacity: 0;
			--g-surface-content-color: var(--g-on-color);
			--g-table-border-color: color-mix(
				in srgb,
				var(--g-on-color) 18%,
				transparent
			);
			--g-table-header-color: color-mix(
				in srgb,
				var(--g-on-color) 72%,
				transparent
			);
			--g-table-muted-color: color-mix(
				in srgb,
				var(--g-on-color) 58%,
				transparent
			);
			--g-table-fixed-background: var(--g-color);
		}

		&_outlined {
			--g-surface-underlay-opacity: 0;
			--g-surface-overlay-opacity: 0;

			border: 1px solid var(--g-table-border-color);
		}

		&_text {
			--g-surface-underlay-opacity: 0;
			--g-surface-overlay-opacity: 0;
		}

		&_default {
			--g-surface-overlay-opacity: 0;

			box-shadow: var(--g-token-shadow-sm);
		}

		&_rounded {
			--g-table-radius: var(--g-token-radius-xl);
		}

		&_elevation {
			box-shadow: var(--g-token-elevation-2);
		}

		&_density-compact {
			--g-table-padding-y: var(--g-token-space-2);
			--g-table-padding-x: var(--g-token-space-3);
			--g-table-row-height: 44px;
			--g-table-header-height: 40px;
		}

		&_density-spacious {
			--g-table-padding-y: var(--g-token-space-4);
			--g-table-padding-x: var(--g-token-space-5);
			--g-table-row-height: 60px;
			--g-table-header-height: 52px;
		}

		&__content {
			position: relative;
			z-index: 2;
			display: grid;
			min-width: 0;
		}

		&__top,
		&__bottom {
			padding: var(--g-token-space-3) var(--g-token-space-4);
		}

		&__top {
			border-bottom: 1px solid var(--g-table-border-color);
		}

		&__bottom {
			border-top: 1px solid var(--g-table-border-color);
		}

		&__scroller {
			overflow: auto;
			min-width: 0;

			@include scrollbar.tonal-scrollbar;
		}

		&__table {
			border-spacing: 0;
			border-collapse: separate;
			width: 100%;
			min-width: 100%;
		}

		&__caption {
			padding: var(--g-token-space-3) var(--g-table-padding-x);

			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-bold);
			line-height: var(--g-token-line-height-md);
			color: var(--g-table-header-color);
			text-align: start;
		}

		&__caption_hidden {
			position: absolute;

			overflow: hidden;

			width: 1px;
			height: 1px;
			margin: -1px;
			padding: 0;
			border: 0;

			white-space: nowrap;

			clip: rect(0 0 0 0);
		}

		&__col_expand {
			width: 56px;
			min-width: 56px;
			max-width: 56px;
		}

		&__col_shrink {
			width: 1%;
		}

		&_fixed-layout .g-table__table {
			table-layout: fixed;
		}

		&__header,
		&__cell {
			box-sizing: border-box;
			padding: var(--g-table-padding-y) var(--g-table-padding-x);
			border-bottom: 1px solid var(--g-table-border-color);

			text-align: start;
			vertical-align: middle;
		}

		&__header {
			height: var(--g-table-header-height);

			font-size: var(--g-token-font-size-xs);
			font-weight: var(--g-token-font-weight-bold);
			line-height: var(--g-token-line-height-sm);
			color: var(--g-table-header-color);
			text-transform: uppercase;
			letter-spacing: 0.04em;
			white-space: nowrap;
		}

		&__header_nowrap,
		&__cell_nowrap {
			white-space: nowrap;
		}

		&__header_shrink,
		&__cell_shrink {
			width: 1%;
		}

		&__cell_group {
			font-weight: var(--g-token-font-weight-bold);
			color: var(--g-color);
			background: color-mix(in srgb, var(--g-color) 8%, transparent);
		}

		&__row_state-success,
		&__cell_state-success,
		&__header_state-success {
			color: var(--g-token-color-success);
			background: color-mix(
				in srgb,
				var(--g-token-color-success) 12%,
				transparent
			);
		}

		&__row_state-warning,
		&__cell_state-warning,
		&__header_state-warning {
			color: var(--g-token-color-warning);
			background: color-mix(
				in srgb,
				var(--g-token-color-warning) 12%,
				transparent
			);
		}

		&__row_state-error,
		&__cell_state-error,
		&__header_state-error {
			color: var(--g-token-color-error);
			background: color-mix(
				in srgb,
				var(--g-token-color-error) 12%,
				transparent
			);
		}

		&__header-content,
		&__cell-content {
			display: flex;
			align-items: center;
			min-width: 0;
		}

		&__cell {
			height: var(--g-table-row-height);
			font-size: var(--g-token-font-size-sm);
			line-height: var(--g-token-line-height-md);
		}

		&__cell-content {
			overflow-wrap: anywhere;
		}

		&__header_align-center &__header-content,
		&__cell_align-center &__cell-content {
			justify-content: center;
			text-align: center;
		}

		&__header_align-end &__header-content,
		&__cell_align-end &__cell-content {
			justify-content: flex-end;
			text-align: end;
		}

		&__header_expand,
		&__cell_expand {
			width: 1%;
			padding: var(--g-table-padding-y) var(--g-token-space-2);
			white-space: nowrap;
		}

		&__expand-button {
			--g-size-padding-y-s: 0;
			--g-size-padding-x-s: 0;
			--g-token-icon-size-m: 18px;
		}

		&__cell_state,
		&__cell_expanded {
			color: var(--g-table-muted-color);
			text-align: center;
		}

		&__row_interactive {
			cursor: pointer;

			&:focus-visible {
				position: relative;
				z-index: 5;
				outline: 0;

				@include focusRing.focus-ring;
			}
		}

		&__empty {
			display: grid;
			place-items: center;
			min-height: calc(var(--g-table-row-height) * 2);
		}

		&__empty-text {
			color: var(--g-table-muted-color);
		}

		&__skeleton {
			display: grid;
			gap: var(--g-token-space-2);
			width: min(560px, 100%);
			margin-inline: auto;
		}

		&__skeleton-row {
			display: block;

			height: 12px;
			border-radius: var(--g-token-radius-pill);

			background: linear-gradient(
				90deg,
				color-mix(in srgb, var(--g-color) 8%, transparent),
				color-mix(in srgb, var(--g-color) 16%, transparent),
				color-mix(in srgb, var(--g-color) 8%, transparent)
			);
			background-size: 200% 100%;

			animation: g-table-skeleton 1.4s ease-in-out infinite;

			&:nth-child(even) {
				width: 78%;
			}
		}

		&__cell_expanded {
			height: auto;
			padding: 0;
			border-bottom: 0;
			text-align: start;
		}

		&__expanded-body {
			overflow: hidden;
		}

		&__expanded-content {
			padding: var(--g-table-padding-y) var(--g-table-padding-x);
			border-bottom: 1px solid var(--g-table-border-color);
			background: color-mix(in srgb, var(--g-color) 5%, transparent);
		}

		&_bordered {
			.g-table__header,
			.g-table__cell {
				border-right: 1px solid var(--g-table-border-color);
			}

			.g-table__header:last-child,
			.g-table__cell:last-child {
				border-right: 0;
			}
		}

		&__column_fixed {
			position: sticky;
			z-index: 2;
			background: var(--g-table-fixed-background);
			background-clip: padding-box;
		}

		&__head &__column_fixed {
			z-index: 4;
		}

		&__column_fixed-start {
			box-shadow: 1px 0 0 var(--g-table-border-color);
		}

		&__column_fixed-end {
			box-shadow: -1px 0 0 var(--g-table-border-color);
		}

		&_has-fixed-start &__header_expand,
		&_has-fixed-start &__cell_expand {
			position: sticky;
			z-index: 3;
			left: 0;

			background: var(--g-table-fixed-background);
			background-clip: padding-box;
			box-shadow: 1px 0 0 var(--g-table-border-color);
		}

		&_has-fixed-start &__head &__header_expand {
			z-index: 5;
		}

		&_clickable-rows
			.g-table__body
			.g-table__row:not(
				.g-table__row_state,
				.g-table__row_expanded-content
			) {
			cursor: pointer;
		}

		&_striped
			.g-table__body
			.g-table__row:nth-child(odd):not(
				.g-table__row_state,
				.g-table__row_expanded-content
			) {
			background: color-mix(in srgb, var(--g-color) 4%, transparent);
		}

		&_striped
			.g-table__body
			.g-table__row:nth-child(odd):not(
				.g-table__row_state,
				.g-table__row_expanded-content
			)
			.g-table__column_fixed {
			background: color-mix(
				in srgb,
				var(--g-table-fixed-background) 96%,
				var(--g-color) 4%
			);
		}

		&_hover
			.g-table__body
			.g-table__row:not(
				.g-table__row_state,
				.g-table__row_expanded-content
			):hover {
			background: color-mix(in srgb, var(--g-color) 8%, transparent);
		}

		&_hover
			.g-table__body
			.g-table__row:not(
				.g-table__row_state,
				.g-table__row_expanded-content
			):hover
			.g-table__column_fixed {
			background: color-mix(
				in srgb,
				var(--g-table-fixed-background) 92%,
				var(--g-color) 8%
			);
		}

		&_sticky-header .g-table__head .g-table__header {
			position: sticky;
			z-index: 3;
			top: 0;

			background: color-mix(
				in srgb,
				var(--g-token-color-surface) 94%,
				transparent
			);
			backdrop-filter: blur(12px);
		}

		.g-table__body .g-table__row:last-child .g-table__cell {
			border-bottom: 0;
		}
	}

	@include actionSurface.action-surface-layers('g-table', true);

	@keyframes g-table-skeleton {
		from {
			background-position: 200% 0;
		}

		to {
			background-position: -200% 0;
		}
	}
</style>

<style lang="scss">
	.g-table {
		&__native-cell {
			box-sizing: border-box;
			height: var(--g-table-row-height);
			padding: var(--g-table-padding-y) var(--g-table-padding-x);
			border-bottom: 1px solid var(--g-table-border-color);

			font-size: var(--g-token-font-size-sm);
			line-height: var(--g-token-line-height-md);
			text-align: start;
			vertical-align: middle;
		}

		&__native-cell_align-center {
			text-align: center;
		}

		&__native-cell_align-end {
			text-align: end;
		}

		&__native-cell_group {
			font-weight: var(--g-token-font-weight-bold);
			color: var(--g-color);
			background: color-mix(in srgb, var(--g-color) 8%, transparent);
		}

		&_bordered .g-table__native-cell {
			border-right: 1px solid var(--g-table-border-color);
		}

		&_bordered .g-table__native-cell:last-child {
			border-right: 0;
		}

		&__body .g-table__native-row:last-child .g-table__native-cell {
			border-bottom: 0;
		}
	}
</style>
