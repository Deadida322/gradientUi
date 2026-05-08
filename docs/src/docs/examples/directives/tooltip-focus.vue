<script setup lang="ts">
	defineOptions({ name: 'DirectivesTooltipFocusExample' });
</script>

<template>
	<div class="docs-directives-example">
		<label class="docs-directives-example__field-label">
			Email
			<input
				v-tooltip="'We only use it for account recovery'"
				class="docs-directives-example__field"
				type="email"
				placeholder="mail@example.com" />
		</label>
	</div>
</template>
