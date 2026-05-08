<script setup lang="ts">
	defineOptions({ name: 'DrawerActionsExample' });
	import { ref } from 'vue';
	import { GButton, GDrawer } from '@/components';

	const open = ref(false);
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-button
				label="Open settings"
				variant="tonal"
				@click="open = true" />
		</div>

		<g-drawer
			v-model="open"
			title="Project settings"
			text="Adjust secondary options without leaving the page.">
			<div class="docs-component-detail__stack">
				<p class="docs-component-detail__note">
					Footer actions receive <code>close</code> and
					<code>dismiss</code>.
				</p>
			</div>

			<template #actions="{ dismiss, close }">
				<g-button
					label="Cancel"
					variant="text"
					color="blue-grey-40"
					@click="dismiss" />
				<g-button
					label="Apply"
					@click="close" />
			</template>
		</g-drawer>
	</div>
</template>
