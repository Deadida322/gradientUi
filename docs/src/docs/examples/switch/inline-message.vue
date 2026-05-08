<script setup lang="ts">
	defineOptions({ name: 'SwitchInlineMessageExample' });
	import { ref } from 'vue';
	import { GSwitch } from '@/components';

	const compact = ref(true);
</script>

<template>
	<div class="docs-component-detail__inline-demo">
		<div class="docs-component-detail__surface-card">
			<g-switch
				v-model="compact"
				label="Default block"
				color="cyan"
				message="Takes the available row width." />
		</div>
		<div
			class="docs-component-detail__surface-card docs-component-detail__surface-card_compact">
			<g-switch
				v-model="compact"
				inline
				label="Inline"
				color="cyan"
				message="Fits content width." />
		</div>
	</div>
</template>
