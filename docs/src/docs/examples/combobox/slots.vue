<script setup lang="ts">
	defineOptions({ name: 'ComboboxSlotsExample' });
	import { ref } from 'vue';
	import { GCombobox, GIcon } from '@/components';
	import type { MdiIcon } from '@/types/CommonTypes';

	interface PersonOption {
		name: string;
		role: string;
		value: string;
		icon: MdiIcon;
	}

	const assignees = ref(['maya']);
	const people: PersonOption[] = [
		{
			name: 'Maya Chen',
			role: 'Design systems',
			value: 'maya',
			icon: 'palette-outline'
		},
		{
			name: 'Anton Lee',
			role: 'Frontend platform',
			value: 'anton',
			icon: 'code-tags'
		},
		{
			name: 'Nora Patel',
			role: 'Accessibility',
			value: 'nora',
			icon: 'account-check-outline'
		}
	];
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-combobox
			v-model="assignees"
			multiple
			label="Assignees"
			:items="people"
			label-key="name"
			value-key="value"
			placeholder="Find teammate"
			color="cyan"
			clearable>
			<template #item="{ item, custom }">
				<div class="docs-combobox-person">
					<g-icon
						:icon="
							custom ? 'plus-circle-outline' : item.raw.icon
						" />
					<span>
						<strong>
							{{ custom ? item.label : item.raw.name }}
						</strong>
						<small>
							{{ custom ? 'New teammate' : item.raw.role }}
						</small>
					</span>
				</div>
			</template>
			<template #chip="{ item, remove }">
				<button
					type="button"
					class="docs-combobox-chip"
					@click="remove(item)">
					{{ item.label }}
					<g-icon icon="close" />
				</button>
			</template>
		</g-combobox>
	</div>
</template>

<style scoped lang="scss">
	.docs-combobox-person {
		display: inline-flex;
		gap: var(--g-token-space-2);
		align-items: center;

		span {
			display: grid;
			gap: 1px;
		}

		small {
			font-size: var(--g-token-font-size-xs);
			opacity: 0.68;
		}
	}

	.docs-combobox-chip {
		cursor: pointer;

		display: inline-flex;
		gap: var(--g-token-space-1);
		align-items: center;

		padding: 3px var(--g-token-space-2);
		border: 0;
		border-radius: var(--g-token-radius-pill);

		font: inherit;
		color: var(--g-color);

		background: color-mix(in srgb, var(--g-color) 12%, transparent);
	}
</style>
