<script lang="ts" setup>
	import GText from './ui/GText/GText.vue';
	import GButton from './ui/GButton/GButton.vue';
	import GTooltip from './ui/GTooltip/GTooltip.vue';
	import { computed } from 'vue';
	import { generateGradientCSS } from '@/theme/generateGradient';
	const gradient = computed(() => {
		return generateGradientCSS('#704bfd', 135);
	});
</script>

<template>
	<div class="gradient-sandbox"></div>
	<div class="gradient-main"></div>
	<g-text
		type="h-4"
		label="Кнопки">
	</g-text>
	<g-text
		type="h-5"
		label="Разных размеров">
	</g-text>
	<div class="buttons">
		<g-button
			size="l"
			label="Large - l">
		</g-button>
		<g-button
			size="m"
			label="Medium - m">
		</g-button>
		<g-button
			size="s"
			label="Small - s">
		</g-button>
	</div>
	<g-text
		type="h-5"
		label="Разных вариантов">
	</g-text>
	<div class="buttons">
		<g-tooltip
			placement="top"
			:offset="20"
			content="Tooltip content">
			<g-button
				variant="default"
				label="Default">
			</g-button>
		</g-tooltip>

		<g-button
			v-tooltip="'Tooltip content directive'"
			variant="tonal"
			label="Tonal">
		</g-button>
		<g-button
			v-tooltip="{
				content: 'Tooltip content directive',
				placement: 'right-start'
			}"
			variant="tonal"
			label="Tonal">
		</g-button>
		<g-button
			variant="outlined"
			label="Outlined">
		</g-button>
		<g-button
			variant="text"
			label="Text">
		</g-button>
	</div>
	<g-text
		type="h-5"
		label="Скругления">
	</g-text>
	<div class="buttons">
		<g-button
			variant="default"
			rounded
			label="Rounded">
		</g-button>
		<g-button
			variant="tonal"
			rounded
			label="Rounded">
		</g-button>
		<g-button
			variant="outlined"
			rounded
			label="Rounded">
		</g-button>
		<g-button
			variant="text"
			rounded
			label="Rounded">
		</g-button>
	</div>
	<div class="buttons">
		<g-button
			variant="default"
			border-radius="1"
			label="border-radius-1">
		</g-button>
		<g-button
			variant="default"
			border-radius="8"
			label="border-radius-8">
		</g-button>
		<g-button
			variant="default"
			border-radius="12"
			label="border-radius-12">
		</g-button>
		<g-button
			variant="default"
			border-radius="16"
			label="border-radius-16">
		</g-button>
	</div>
	<g-text
		type="h-5"
		label="Свечение">
	</g-text>
	<div class="buttons">
		<g-button
			glow
			variant="default"
			rounded
			label="Glow">
		</g-button>
		<g-button
			glow
			rounded
			variant="tonal"
			label="Glow">
		</g-button>
		<g-button
			glow
			rounded
			variant="outlined"
			label="Glow">
		</g-button>
	</div>
	<g-text
		type="h-5"
		label="border-width">
	</g-text>
	<div class="buttons">
		<g-button
			glow
			size="s"
			variant="default"
			rounded
			border-width="1"
			label="border-width-1">
		</g-button>
		<g-button
			glow
			rounded
			variant="tonal"
			size="m"
			border-width="2"
			label="border-width-2">
		</g-button>
		<g-button
			glow
			rounded
			variant="outlined"
			size="l"
			border-width="3"
			label="border-width-3">
		</g-button>
		<g-button
			glow
			rounded
			variant="text"
			border-width="1"
			label="border-width-1">
		</g-button>
	</div>
	<g-text
		type="h-5"
		label="placement">
	</g-text>
	<div class="buttons">
		<g-button
			glow
			variant="default"
			border-width="1"
			placement="bottom"
			label="Bottom">
		</g-button>
		<g-button
			variant="tonal"
			border-width="1"
			placement="top"
			label="Top">
		</g-button>
		<g-button
			variant="tonal"
			border-width="1"
			placement="left"
			label="Left">
		</g-button>
		<g-button
			rounded
			variant="tonal"
			border-width="2"
			placement="right"
			label="Right">
		</g-button>
		<g-button
			variant="tonal"
			border-width="1"
			placement="center"
			label="Center">
		</g-button>
	</div>
	<g-text
		type="h-5"
		label="Иконки">
	</g-text>
	<div class="buttons">
		<g-button
			glow
			variant="default"
			border-width="1"
			placement="bottom"
			append="heart"
			label="Append">
		</g-button>
		<g-button
			variant="tonal"
			border-width="1"
			prepend="account"
			label="Prepend">
		</g-button>
		<g-button
			variant="tonal"
			border-width="1"
			icon-button="account">
		</g-button>
	</div>
</template>

<style>
	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-block: 20px;
	}

	.gradient-sandbox {
		width: 100%;
		height: 200px;
		background: v-bind('gradient');
	}

	.gradient-main {
		width: 100%;
		height: 200px;
		background: var(--g-gradient-main);
	}
</style>
