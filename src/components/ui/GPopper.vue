<script setup>
	import { toRefs, useAttrs } from 'vue';
	import usePx from '@/use/px';
	const attrs = useAttrs();

	const props = defineProps({
		width: {
			type: String,
			default: 'auto'
		}
	});

	const { width } = toRefs(props);

	const computedWidth = usePx(width);
</script>

<template>
	<v-dropdown v-bind="attrs">
		<slot></slot>
		<template #popper>
			<div
				:style="{ width: computedWidth }"
				class="popper-content">
				<div class="popper-content__scroll">
					<slot name="content"></slot>
				</div>
			</div>
		</template>
	</v-dropdown>
</template>

<style>
	.v-popper--theme-dropdown .v-popper__inner {
		overflow: hidden !important;
		border: none !important;
		border-radius: 10px;
		box-shadow: rgb(0 0 0 / 10%) 0 4px 12px !important;
	}

	.v-popper__arrow-container {
		display: none !important;
	}
</style>

<style scoped lang="scss">
	.popper-content {
		padding: 8px;
		padding-right: 2px;

		&__scroll {
			overflow: hidden auto;
			max-height: 200px;
			padding-right: 8px;

			&::-webkit-scrollbar {
				width: 5px;
				height: 5px;
				background: transparent;
			}

			&::-webkit-scrollbar-thumb {
				border-radius: 5px;
				background-color: rgb(161 161 161);
			}
		}
	}
</style>
