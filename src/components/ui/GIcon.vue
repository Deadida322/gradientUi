<script setup>
	defineProps({
		icon: {
			type: String,
			default: ''
		}
	});
</script>

<template>
	<span
		class="mdi"
		:class="`mdi-${icon}`"
		aria-hidden="true">
	</span>
</template>

<style scoped lang="scss">
	.mdi {
		display: flex;
		align-items: center;
	}
</style>
