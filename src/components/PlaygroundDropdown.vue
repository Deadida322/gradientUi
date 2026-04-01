<script lang="ts" setup>
	import { computed, ref } from 'vue';
	import GText from './ui/GText/GText.vue';
	import GButton from './ui/GButton/GButton.vue';
	import GDropdown from './ui/GDropdown/GDropdown.vue';
	import GDropdownSelect from './ui/GDropdownSelect/GDropdownSelect.vue';
	import GMenu from './ui/GMenu/GMenu.vue';

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
	const usersLabel = computed(() => {
		if (!usersValue.value.length) {
			return 'Select users (returnObject)';
		}

		return `Selected: ${usersValue.value.map((user) => user.fullName).join(', ')}`;
	});
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
</style>
