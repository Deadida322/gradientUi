<script lang="ts" setup>
	import { ref } from 'vue';
	import GButton from '@/components/ui/GButton.vue';
	import GSelect from '@/components/ui/GSelect.vue';
	import GText from '@/components/ui/GText/GText.vue';
	import GSquircle from './ui/GSquircle';
	import GIcon from './ui/GIcon.vue';
	import GFAB from './ui/GFAB/GFAB.vue';
	import GFABGroup from './ui/GFABGroup/GFABGroup.vue';
	const selectValue = ref([{ value: 'value1', label: 'label1' }]);
</script>

<template>
	<div class="div">
		<div class="block">
			<g-f-a-b icon="plus"></g-f-a-b>
			<g-f-a-b-group
				active-icon="account-heart"
				icon="menu"
				:options="[
					{
						label: 'Опция 1',
						value: 'aaa',
						icon: 'plus'
					},
					{
						label: 'Опция 2',
						value: 'bbb',
						icon: 'minus'
					}
				]"></g-f-a-b-group>
			<g-squircle variant="tonal"></g-squircle>
			<g-button
				border-width="1"
				prepend-icon="account-heart"
				variant="tonal"
				:glow="true"
				label="Кнопка">
			</g-button>
			<g-select
				v-model="selectValue"
				clearable
				variant="text"
				placeholder="Укажите значение"
				append-icon="account-heart"
				label="input"
				multiple
				return-object
				:options="[
					{
						label: 'label1',
						value: 'value1'
					},
					{
						label: 'label2',
						value: 'value2'
					},
					{
						label: 'label3',
						value: 'value3'
					},
					{
						label: 'label1',
						value: 'value1'
					},
					{
						label: 'label2',
						value: 'value2'
					},
					{
						label: 'label3',
						value: 'value3'
					},
					{
						label: 'label1',
						value: 'value1'
					},
					{
						label: 'label2',
						value: 'value2'
					},
					{
						label: 'label3',
						value: 'value3'
					}
				]">
			</g-select>

			<g-button
				border-width="1"
				border-radius="6px"
				append-icon="account-heart"
				variant="tonal"
				label="Кнопка">
			</g-button>
			<g-button
				border-width="1"
				border-radius="6px"
				append-icon="account-heart"
				position="top"
				label="Кнопка">
			</g-button>
			<g-button
				border-width="1"
				border-radius="6px"
				variant="tonal"
				append-icon="account-heart"
				position="bottom"
				label="Кнопка">
			</g-button>
			<g-button
				append-icon="account-heart"
				label="Кнопка">
			</g-button>
			<g-button
				border-width="0"
				shadow
				label="Кнопка">
			</g-button>
			<g-button
				disabled
				border-width="0"
				label="Кнопка">
			</g-button>
			<g-button
				disabled
				variant="tonal"
				border-width="1"
				label="Кнопка">
			</g-button>
			<g-button
				glow
				variant="tonal"
				border-width=".3"
				icon-button="account"
				shadow
				label="Кнопка">
			</g-button>
			<g-button
				disabled
				variant="text"
				icon-button="account"
				label="Кнопка">
			</g-button>
		</div>
		<div class="block">
			<g-text
				label="Стандартный текст"
				type="h-1">
				<template #prepend>
					<g-icon icon="account"></g-icon>
				</template>
			</g-text>
		</div>
	</div>
</template>

<style lang="scss">
	.block {
		z-index: 8;

		display: flex;
		flex-wrap: wrap;
		gap: 10px;

		margin-top: 20px;
	}
</style>
