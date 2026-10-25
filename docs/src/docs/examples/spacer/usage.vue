<script setup lang="ts">
	defineOptions({ name: 'SpacerUsageExample' });
	import { GButton, GSpacer } from '@/components';
</script>

<template>
	<div class="d-flex align-center gap-3 w-100">
		<g-button variant="text">Cancel</g-button>
		<g-spacer />
		<g-button>Save</g-button>
	</div>
</template>
