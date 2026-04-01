<script lang="ts" setup>
	import PlaygroundButtons from './PlaygroundButtons.vue';
	import PlaygroundTooltip from './PlaygroundTooltip.vue';
	import PlaygroundDropdown from './PlaygroundDropdown.vue';
	import PlaygroundInput from './PlaygroundInput.vue';
	import PlaygroundTextarea from './PlaygroundTextarea.vue';
	import PlaygroundSelect from './PlaygroundSelect.vue';
</script>

<template>
	<div class="div">
		<playground-buttons></playground-buttons>
		<playground-tooltip></playground-tooltip>
		<playground-dropdown></playground-dropdown>
		<playground-input></playground-input>
		<playground-textarea></playground-textarea>
		<playground-select></playground-select>
	</div>
</template>

<style lang="scss">
	body {
		padding: 40px;
	}

	.expansion-body {
		padding: 10px 20px;
	}

	.block {
		z-index: 8;

		display: flex;
		flex-wrap: wrap;
		gap: 10px;

		margin-top: 20px;
	}

	.loading {
		width: 100%;
		height: 800px;
	}

	.expansion {
		max-width: 600px;
	}

	html {
		padding-bottom: 400px;
	}
</style>
