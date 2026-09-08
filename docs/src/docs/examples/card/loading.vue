<script setup lang="ts">
	defineOptions({ name: 'CardLoadingExample' });
	import { GButton, GCard, GChip } from '@/components';
</script>

<template>
	<div class="docs-component-detail__card-grid">
		<g-card
			loading
			loading-text="Preparing preview"
			loading-progress-view="segmented"
			title="Campaign preview"
			subtitle="Generating audience card"
			text="The surface stays in place while async content is resolving."
			prepend-icon="auto-fix"
			variant="tonal"
			color="cyan"
			hover>
			<template #actions>
				<g-button
					label="Open"
					size="s"
					variant="outlined" />
				<g-chip
					label="Draft"
					size="s"
					variant="tonal"
					color="cyan" />
			</template>
		</g-card>

		<g-card
			loading
			loading-text="Syncing media"
			title="Gallery sync"
			subtitle="Unsplash collection"
			layout="media"
			variant="glass"
			color="deep-purple"
			image="https://images.unsplash.com/photo-1657046309976-f1e80ce2fd5f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=900"
			image-alt="Close-up of a plant leaf">
			<template #footer>
				<span>
					Photo by
					<a
						href="https://unsplash.com/@molnj?utm_source=gradient_ui_docs&utm_medium=referral"
						target="_blank"
						rel="noreferrer">
						Molj
					</a>
					on
					<a
						href="https://unsplash.com/photos/a-close-up-of-a-plant-jA6VMitLtoM?utm_source=gradient_ui_docs&utm_medium=referral"
						target="_blank"
						rel="noreferrer">
						Unsplash
					</a>
				</span>
			</template>
		</g-card>
	</div>
</template>
