<script lang="ts" setup>
	import { ref } from 'vue';
	import GChip from './ui/GChip/GChip.vue';
	import GText from './ui/GText/GText.vue';
	import type { MdiIcon } from '@/types/CommonTypes';

	type ChipItem = {
		id: number;
		label: string;
		variant?: 'default' | 'tonal' | 'outlined' | 'text';
		prependIcon?: MdiIcon;
	};

	const removableChips = ref<ChipItem[]>([
		{
			id: 1,
			label: 'Vue 3',
			variant: 'tonal',
			prependIcon: 'vuejs'
		},
		{
			id: 2,
			label: 'TypeScript',
			variant: 'outlined',
			prependIcon: 'language-typescript'
		},
		{
			id: 3,
			label: 'Design tokens',
			variant: 'default',
			prependIcon: 'palette-outline'
		}
	]);

	function removeChip(id: number) {
		removableChips.value = removableChips.value.filter(
			(chip) => chip.id !== id
		);
	}
</script>

<template>
	<g-text
		type="h-5"
		label="Chips examples" />

	<div class="col">
		<div class="row row_four">
			<g-chip label="Default" />
			<g-chip
				variant="tonal"
				label="Tonal" />
			<g-chip
				variant="outlined"
				label="Outlined" />
			<g-chip
				variant="text"
				label="Text" />
		</div>

		<div class="row row_four">
			<g-chip
				size="s"
				label="Size S" />
			<g-chip
				size="m"
				label="Size M" />
			<g-chip
				size="l"
				label="Size L" />
			<g-chip
				size="xl"
				label="Size XL" />
		</div>

		<div class="row row_four">
			<g-chip
				label="Rounded"
				rounded />
			<g-chip
				label="Warning"
				state="warning" />
			<g-chip
				label="Error"
				state="error" />
			<g-chip
				label="Success"
				state="success" />
		</div>

		<div class="row row_three">
			<g-chip
				label="With prepend"
				prepend-icon="account-outline" />
			<g-chip
				label="With append"
				append-icon="chevron-right" />
			<g-chip
				label="Active"
				active
				variant="tonal"
				prepend-icon="lightning-bolt" />
		</div>

		<div class="row row_two">
			<g-chip
				label="Disabled"
				disabled
				prepend-icon="lock-outline" />
			<g-chip
				variant="outlined"
				prepend-icon="tag-outline">
				<template #append>
					<span class="chip-meta">24</span>
				</template>
				Custom slot content
			</g-chip>
		</div>

		<div class="col col_compact">
			<g-text
				type="h-6"
				label="Removable chips" />

			<div class="row row_dynamic">
				<g-chip
					v-for="chip in removableChips"
					:key="chip.id"
					:label="chip.label"
					:variant="chip.variant"
					:prepend-icon="chip.prependIcon"
					removable
					:on-remove="() => removeChip(chip.id)" />
			</div>

			<div class="value-line">
				remaining chips:
				{{
					removableChips.map((chip) => chip.label).join(', ') ||
					'none'
				}}
			</div>
		</div>
	</div>
</template>

<style scoped>
	.col {
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin-block: 20px;
	}

	.col_compact {
		gap: 10px;
	}

	.row {
		display: grid;
		gap: 12px;
	}

	.row_two,
	.row_three,
	.row_four {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}

	.row_dynamic {
		display: flex;
		flex-wrap: wrap;
	}

	.chip-meta {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		min-width: 22px;
		padding: 2px 6px;
		border-radius: 999px;

		font-size: 12px;
		line-height: 1;
		color: rgb(var(--g-theme-primary));

		background: rgba(var(--g-theme-primary), 0.12);
	}

	.value-line {
		font-size: 14px;
		color: rgba(var(--g-theme-on-surface), 0.75);
		text-align: left;
	}

	@media (width >= 900px) {
		.row_two {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.row_three {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.row_four {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
</style>
