<script setup lang="ts">
	defineOptions({ name: 'RadioSlotsExample' });
	import { ref } from 'vue';
	import { GRadio } from '@/components';

	const selected = ref('pro');
	const options = ['starter', 'pro', 'scale'];
</script>

<template>
	<div class="docs-component-detail__form-preview">
		<g-radio
			v-model="selected"
			vertical
			label="Plan"
			:options="options"
			indicator-view="diamond"
			color="deep-purple">
			<template #item="{ item, checked }">
				<span class="docs-component-detail__title-row">
					<span>{{ item }}</span>
					<span
						v-if="checked"
						class="docs-component-detail__badge">
						Selected
					</span>
				</span>
			</template>
		</g-radio>
	</div>
</template>
