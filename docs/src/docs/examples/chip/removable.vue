<script setup lang="ts">
	defineOptions({ name: 'ChipRemovableExample' });
	import { ref } from 'vue';
	import { GChip } from '@/components';
	import type { GChipVariants } from '@/components/ui/GChip/types';
	import type { MdiIcon } from '@/types/CommonTypes';

	interface RemovableChip {
		id: number;
		label: string;
		variant: GChipVariants;
		prependIcon: MdiIcon;
	}

	const chips = ref<RemovableChip[]>([
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
			variant: 'filled',
			prependIcon: 'palette-outline'
		}
	]);

	const removeChip = (id: number) => {
		chips.value = chips.value.filter((chip) => chip.id !== id);
	};
</script>

<template>
	<div class="docs-component-detail__removable-demo">
		<div class="docs-component-detail__removable-list">
			<g-chip
				v-for="chip in chips"
				:key="chip.id"
				:label="chip.label"
				:variant="chip.variant"
				:prepend-icon="chip.prependIcon"
				removable
				:on-remove="() => removeChip(chip.id)" />
		</div>
		<p>
			Remaining:
			<code>{{
				chips.map((chip) => chip.label).join(', ') || 'none'
			}}</code>
		</p>
	</div>
</template>
