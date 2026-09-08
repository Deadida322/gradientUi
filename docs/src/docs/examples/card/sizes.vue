<script setup lang="ts">
	defineOptions({ name: 'CardSizesExample' });
	import { GCard, GChip } from '@/components';
</script>

<template>
	<div class="docs-component-detail__card-grid">
		<g-card
			title="Compact small"
			subtitle="size=s density=compact"
			text="Tighter body spacing for dense lists and side panels."
			size="s"
			density="compact"
			variant="tonal">
			<template #append>
				<g-chip
					label="S"
					size="s"
					variant="tonal" />
			</template>
		</g-card>

		<g-card
			title="Comfortable medium"
			subtitle="size=m density=comfortable"
			text="The default rhythm for most product content cards."
			size="m"
			density="comfortable"
			variant="outlined">
			<template #append>
				<g-chip
					label="M"
					size="s"
					variant="tonal" />
			</template>
		</g-card>

		<g-card
			title="Spacious large"
			subtitle="size=l density=spacious"
			text="More breathing room for overview panels and richer previews."
			size="l"
			density="spacious"
			variant="tonal">
			<template #append>
				<g-chip
					label="L"
					size="s"
					variant="tonal" />
			</template>
		</g-card>
	</div>
</template>
