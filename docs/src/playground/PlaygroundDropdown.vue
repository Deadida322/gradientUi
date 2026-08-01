<script lang="ts" setup>
	import { computed, ref } from 'vue';
	import GText from '@/components/ui/GText/GText.vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import GDropdown from '@/components/ui/GDropdown/GDropdown.vue';
	import GDropdownGroup from '@/components/ui/GDropdownGroup/GDropdownGroup.vue';
	import GDropdownSelect from '@/components/ui/GDropdownSelect/GDropdownSelect.vue';
	import GMenu from '@/components/ui/GMenu/GMenu.vue';
	import GMenuItem from '@/components/ui/GMenuItem/GMenuItem.vue';

	type MenuItem = {
		label: string;
		value: string;
		children?: MenuItem[];
	};
	type User = { id: number; fullName: string; email: string };

	const menuItems: MenuItem[] = [
		{ label: 'Item 1', value: '1' },
		{
			label: 'Item 2',
			value: '2',
			children: [
				{ label: 'Item 2.1', value: '2.1' },
				{
					label: 'Item 2.2',
					value: '2.2',
					children: [
						{ label: 'Item 2.2.1', value: '2.2.1' },
						{ label: 'Item 2.2.2', value: '2.2.2' }
					]
				}
			]
		},
		{ label: 'Item 3', value: '3' }
	];

	const singleValue = ref<string | null>(null);
	const multipleValue = ref<string[]>([]);
	const usersValue = ref<User[]>([]);
	const nestedDropdown = ref({});
	const groupedDropdownValue = ref('color');
	const users: User[] = [
		{ id: 1, fullName: 'Alice Johnson', email: 'alice@test.dev' },
		{ id: 2, fullName: 'Bob Wilson', email: 'bob@test.dev' },
		{ id: 3, fullName: 'Charlie Brown', email: 'charlie@test.dev' }
	];

	const singleLabel = computed(() => singleValue.value ?? 'Dropdown select');
	const multipleLabel = computed(() => {
		if (!multipleValue.value.length) {
			return 'Multiple select';
		}

		return `Selected: ${multipleValue.value.join(', ')}`;
	});
	const groupedDropdownLabel = computed(
		() => `Grouped: ${groupedDropdownValue.value}`
	);

	function selectGroupedDropdown(value: string) {
		groupedDropdownValue.value = value;
	}
</script>

<template>
	<g-text
		type="h-4"
		label="Дропдауны">
	</g-text>
	<g-text
		type="h-5"
		label="Разные placements">
	</g-text>
	<div class="col">
		<g-dropdown
			strategy="fixed"
			same-width>
			<template #activator="{ activatorAttrs, activatorRef }">
				<g-button
					:ref="activatorRef"
					v-bind="activatorAttrs"
					variant="tonal"
					label="Simple dropdown">
				</g-button>
			</template>
			<g-menu
				:items="menuItems"
				@select="nestedDropdown = $event"></g-menu>
		</g-dropdown>
		{{ nestedDropdown }}
	</div>

	<g-text
		type="h-5"
		label="Dropdown groups">
	</g-text>

	<div class="col">
		<g-dropdown close-on-content-click>
			<template #activator="{ activatorAttrs, activatorRef }">
				<g-button
					:ref="activatorRef"
					v-bind="activatorAttrs"
					variant="tonal"
					color="teal-500"
					:label="groupedDropdownLabel">
				</g-button>
			</template>

			<div class="grouped-dropdown-demo">
				<g-dropdown-group label="Theme">
					<g-menu-item
						color="teal-500"
						:selected="groupedDropdownValue === 'color'"
						@click="selectGroupedDropdown('color')">
						Color
					</g-menu-item>
				</g-dropdown-group>

				<g-dropdown-group label="Layout">
					<g-menu-item
						color="teal-500"
						:selected="groupedDropdownValue === 'grid'"
						@click="selectGroupedDropdown('grid')">
						Grid
					</g-menu-item>
					<g-menu-item
						color="teal-500"
						:selected="groupedDropdownValue === 'spacing'"
						@click="selectGroupedDropdown('spacing')">
						Spacing
					</g-menu-item>
				</g-dropdown-group>

				<g-dropdown-group label="Components">
					<g-menu-item
						color="teal-500"
						:selected="groupedDropdownValue === 'button'"
						@click="selectGroupedDropdown('button')">
						Button
					</g-menu-item>
					<g-menu-item
						color="teal-500"
						:selected="groupedDropdownValue === 'alert'"
						@click="selectGroupedDropdown('alert')">
						Alert
					</g-menu-item>
					<g-menu-item
						color="teal-500"
						:selected="groupedDropdownValue === 'loading'"
						@click="selectGroupedDropdown('loading')">
						Loading
					</g-menu-item>
				</g-dropdown-group>
			</div>
		</g-dropdown>

		<div class="value-line">grouped: {{ groupedDropdownValue }}</div>
	</div>

	<g-text
		type="h-5"
		label="GDropdownSelect examples">
	</g-text>

	<div class="col">
		<g-dropdown-select
			v-model="singleValue"
			:close-on-select="true"
			:items="menuItems">
			<template #trigger>
				<g-button
					variant="tonal"
					:label="singleLabel">
				</g-button>
			</template>
		</g-dropdown-select>
		<div class="value-line">single (primitive): {{ singleValue }}</div>

		<g-dropdown-select
			v-model="multipleValue"
			:items="menuItems"
			:close-on-select="true"
			multiple>
			<template #trigger>
				<g-button
					variant="tonal"
					:label="multipleLabel">
				</g-button>
			</template>
		</g-dropdown-select>
		<div class="value-line">
			multiple (primitive[]): {{ multipleValue }}
		</div>

		<g-dropdown-select
			v-model="usersValue"
			:items="users"
			label-key="fullName"
			value-key="id"
			multiple
			:close-on-select="true"
			return-object>
			<template #trigger>
				<g-button
					variant="tonal"
					label="Тыкни">
				</g-button>
			</template>
		</g-dropdown-select>
		<div class="value-line">
			returnObject (user):
			{{ usersValue }}
		</div>
	</div>
</template>

<style>
	.tooltips {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-block: 20px;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.col {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-block: 20px;
	}

	.value-line {
		font-size: 14px;
		color: rgba(var(--g-theme-on-surface), 0.75);
	}

	.grouped-dropdown-demo {
		min-width: 220px;
		padding-block: var(--g-token-space-2);
	}
</style>
