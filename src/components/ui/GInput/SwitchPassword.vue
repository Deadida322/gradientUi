<script lang="ts" setup>
	import GIcon from '../GIcon/GIcon.vue';

	const modelValue = defineModel<boolean>({
		default: false
	});
</script>

<template>
	<g-icon
		size="16"
		class="switcher"
		:icon="modelValue ? 'eye-off-outline' : 'eye-outline'"
		@click="modelValue = !modelValue" />
</template>

<style lang="scss" scoped>
	.switcher {
		cursor: pointer;
	}
</style>
