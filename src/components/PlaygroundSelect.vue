<script lang="ts" setup>
	import { ref } from 'vue';
	import GText from './ui/GText/GText.vue';
	import GSelect from './ui/GSelect/GSelect.vue';
	import type { MdiIcon } from '@/types/CommonTypes';

	type MenuItem = {
		label: string;
		value: string;
		append?: MdiIcon;
		children?: MenuItem[];
	};
	type User = { id: number; fullName: string; email: string };
	type TreeNode = {
		id: number;
		title: string;
		meta: { code: string };
		nested?: TreeNode[];
	};

	const menuItems: MenuItem[] = [
		{ label: 'Item 1', value: '1', append: 'account' },
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

	const users: User[] = [
		{ id: 1, fullName: 'Alice Johnson', email: 'alice@test.dev' },
		{ id: 2, fullName: 'Bob Wilson', email: 'bob@test.dev' },
		{ id: 3, fullName: 'Charlie Brown', email: 'charlie@test.dev' }
	];
	const treeItems: TreeNode[] = [
		{
			id: 10,
			title: 'Group A',
			meta: { code: 'A' },
			nested: [
				{ id: 11, title: 'A-1', meta: { code: 'A1' } },
				{ id: 12, title: 'A-2', meta: { code: 'A2' } }
			]
		},
		{
			id: 20,
			title: 'Group B',
			meta: { code: 'B' },
			nested: [{ id: 21, title: 'B-1', meta: { code: 'B1' } }]
		}
	];

	const singleValue = ref<string | null>(null);
	const multipleValue = ref<string[]>([]);
	const usersValue = ref<User[]>([]);
	const returnObjectSingle = ref<User | null>(null);
	const functionKeysValue = ref<string | null>(null);
	const warningValue = ref<string | null>(null);
	const errorValue = ref<string | null>(null);
	const successValue = ref<string | null>(null);
	const validatedValue = ref<string | null>(null);
	const sizeSValue = ref<string | null>(null);
	const sizeMValue = ref<string | null>(null);
	const sizeLValue = ref<string | null>(null);
	const sizeXLValue = ref<string | null>(null);

	const requiredSelect = (value: string | null) =>
		value ? true : 'Select value is required';
</script>

<template>
	<g-text
		type="h-5"
		label="GSelect examples">
	</g-text>

	<div class="col">
		<g-select
			v-model="singleValue"
			label="Single select"
			placeholder="Choose item"
			clearable
			append-icon="account"
			:items="menuItems" />
		<div class="value-line">single (primitive): {{ singleValue }}</div>

		<g-select
			v-model="multipleValue"
			label="Multiple select"
			placeholder="Choose items"
			multiple
			clearable
			:close-on-select="false"
			:items="menuItems" />
		<div class="value-line">
			multiple (primitive[]): {{ multipleValue }}
		</div>

		<g-select
			v-model="usersValue"
			label="Users (returnObject)"
			placeholder="Choose users"
			label-key="fullName"
			value-key="id"
			multiple
			return-object
			clearable
			:close-on-select="false"
			:items="users">
		</g-select>
		<div class="value-line">returnObject (user[]): {{ usersValue }}</div>

		<div class="row">
			<g-select
				v-model="sizeSValue"
				size="s"
				label="Size S"
				placeholder="Select"
				:items="menuItems" />
			<g-select
				v-model="sizeMValue"
				size="m"
				label="Size M"
				placeholder="Select"
				:items="menuItems" />
			<g-select
				v-model="sizeLValue"
				size="l"
				label="Size L"
				placeholder="Select"
				:items="menuItems" />
			<g-select
				v-model="sizeXLValue"
				size="xl"
				label="Size XL"
				placeholder="Select"
				:items="menuItems" />
		</div>

		<div class="row">
			<g-select
				v-model="warningValue"
				state="warning"
				label="State warning"
				placeholder="Select"
				:items="menuItems" />
			<g-select
				v-model="errorValue"
				state="error"
				label="State error"
				placeholder="Select"
				:items="menuItems" />
			<g-select
				v-model="successValue"
				state="success"
				label="State success"
				placeholder="Select"
				:items="menuItems" />
		</div>

		<g-select
			v-model="validatedValue"
			label="Validation rules"
			placeholder="Must select value"
			clearable
			:rules="[requiredSelect]"
			:items="menuItems" />

		<div class="row">
			<g-select
				v-model="singleValue"
				label="Disabled select"
				placeholder="Disabled"
				disabled
				:items="menuItems" />

			<g-select
				v-model="returnObjectSingle"
				label="Single returnObject"
				placeholder="Select user"
				label-key="fullName"
				value-key="id"
				return-object
				clearable
				:items="users">
				<template #item="{ item, selected }">
					<div class="item-row">
						<span>{{ item.label }}</span>
						<span class="item-meta">{{
							selected ? 'selected' : ''
						}}</span>
					</div>
				</template>
			</g-select>
		</div>
		<div class="value-line">
			returnObject (user | null): {{ returnObjectSingle }}
		</div>

		<g-select
			v-model="functionKeysValue"
			label="Function keys + nested resolver"
			placeholder="Select node"
			:items="treeItems"
			:label-key="(item: TreeNode) => `${item.title} (${item.meta.code})`"
			:value-key="(item: TreeNode) => item.meta.code"
			:item-children="(item: TreeNode) => item.nested"
			clearable />
		<div class="value-line">
			function keys value: {{ functionKeysValue }}
		</div>
	</div>
</template>

<style scoped>
	.col {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-block: 20px;
	}

	.row {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 12px;
	}

	.value-line {
		font-size: 14px;
		color: rgba(var(--g-theme-on-surface), 0.75);
	}

	.item-row {
		display: flex;
		gap: 10px;
		justify-content: space-between;
		width: 100%;
	}

	.item-meta {
		font-size: 12px;
		opacity: 0.6;
	}

	@media (width >= 900px) {
		.row {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
