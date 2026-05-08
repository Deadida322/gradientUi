<script setup lang="ts">
	defineOptions({ name: 'SelectSlotsExample' });
	import { ref } from 'vue';
	import { GSelect } from '@/components';

	const value = ref('pro');
	const plans = [
		{ label: 'Starter', value: 'starter', meta: 'Free' },
		{ label: 'Pro', value: 'pro', meta: 'Popular' },
		{ label: 'Scale', value: 'scale', meta: 'Teams' }
	];
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-select
			v-model="value"
			label="Plan"
			:items="plans"
			label-key="label"
			value-key="value">
			<template #item="{ item, selected }">
				<span class="docs-component-detail__menu-item">
					<span>{{ item.label }}</span>
					<span
						class="docs-component-detail__badge"
						:data-active="selected">
						{{ item.raw.meta }}
					</span>
				</span>
			</template>
		</g-select>
	</div>
</template>
