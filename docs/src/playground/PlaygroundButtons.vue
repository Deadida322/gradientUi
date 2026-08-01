<script lang="ts" setup>
	import GText from '@/components/ui/GText/GText.vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import GTooltip from '@/components/ui/GTooltip/GTooltip.vue';
	import { computed } from 'vue';
	import { createGradientFromColor } from '@/theme/gradient';
	import type { GColor } from '@/use/color';

	const materialButtonColors = [
		'red-500',
		'pink-500',
		'purple-500',
		'deep-purple-500',
		'indigo-500',
		'blue-500',
		'light-blue-500',
		'cyan-500',
		'teal-500',
		'green-500',
		'light-green-500',
		'lime-500',
		'yellow-500',
		'amber-500',
		'orange-500',
		'deep-orange-500',
		'brown-500',
		'grey-500',
		'blue-grey-500'
	] as const satisfies readonly GColor[];
	const materialButtonTones = [
		'red-800',
		'red-700',
		'red-500',
		'red-400',
		'red-300',
		'red-200',
		'red-100',
		'red-50',
		'red-50'
	] as const satisfies readonly GColor[];
	const materialButtonToneRows = [
		'red-800',
		'red-500',
		'red-300',
		'red-100',
		'orange-800',
		'orange-500',
		'orange-300',
		'orange-100',
		'green-800',
		'green-500',
		'green-300',
		'green-100',
		'teal-800',
		'teal-500',
		'teal-300',
		'teal-100',
		'blue-800',
		'blue-500',
		'blue-300',
		'blue-100',
		'deep-purple-800',
		'deep-purple-500',
		'deep-purple-300',
		'deep-purple-100'
	] as const satisfies readonly GColor[];
	const gradientButtonColors = [
		'red-500',
		'red-200',
		'pink-500',
		'orange-500',
		'orange-200',
		'amber-500',
		'green-500',
		'green-200',
		'teal-500',
		'teal-200',
		'blue-500',
		'blue-200',
		'deep-purple-500',
		'deep-purple-200',
		'blue-grey-500',
		'blue-grey-200'
	] as const satisfies readonly GColor[];

	const gradient = computed(() => {
		return createGradientFromColor('#704bfd');
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
				variant="gradient"
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
		label="Colors">
	</g-text>
	<div class="buttons buttons_custom-color">
		<g-button
			color="primary"
			variant="gradient"
			label="Primary">
		</g-button>
		<g-button
			color="success"
			variant="gradient"
			label="Success">
		</g-button>
		<g-button
			color="warning"
			variant="tonal"
			label="Warning tonal">
		</g-button>
		<g-button
			color="error"
			variant="outlined"
			label="Error outlined">
		</g-button>
		<g-button
			color="var(--playground-brand-color)"
			variant="text"
			label="CSS var text">
		</g-button>
		<g-button
			color="#0f766e"
			variant="tonal"
			label="Hex tonal">
		</g-button>
		<g-button
			color="red-500"
			variant="gradient"
			label="Red 40">
		</g-button>
		<g-button
			color="deep-purple-500"
			variant="tonal"
			label="Deep purple 40">
		</g-button>
		<g-button
			color="teal-200"
			variant="gradient"
			label="Teal 70">
		</g-button>
		<g-button
			color="source-500"
			variant="outlined"
			label="Source 40">
		</g-button>
	</div>
	<div class="buttons buttons_palette">
		<g-button
			v-for="color in materialButtonColors"
			:key="color"
			:color="color"
			variant="gradient"
			size="s"
			:label="color">
		</g-button>
	</div>
	<div class="buttons buttons_palette">
		<g-button
			v-for="color in materialButtonColors"
			:key="`tonal-${color}`"
			:color="color"
			variant="tonal"
			size="s"
			:label="color">
		</g-button>
	</div>
	<div class="buttons buttons_palette">
		<g-button
			v-for="color in materialButtonColors"
			:key="`outlined-${color}`"
			:color="color"
			variant="outlined"
			size="s"
			:label="color">
		</g-button>
	</div>
	<div class="buttons buttons_palette">
		<g-button
			v-for="color in materialButtonColors"
			:key="`text-${color}`"
			:color="color"
			variant="text"
			size="s"
			:label="color">
		</g-button>
	</div>
	<div class="buttons buttons_palette">
		<g-button
			v-for="color in materialButtonTones"
			:key="color"
			:color="color"
			variant="gradient"
			size="s"
			:label="color">
		</g-button>
	</div>
	<div class="buttons buttons_palette">
		<g-button
			v-for="color in materialButtonToneRows"
			:key="`tone-row-${color}`"
			:color="color"
			variant="outlined"
			size="s"
			:label="color">
		</g-button>
	</div>
	<div class="buttons buttons_palette">
		<g-button
			v-for="color in gradientButtonColors"
			:key="`gradient-${color}`"
			:color="color"
			variant="tonal"
			border-width="2"
			glow
			size="s"
			:label="`gradient ${color}`">
		</g-button>
	</div>
	<g-text
		type="h-5"
		label="Скругления">
	</g-text>
	<div class="buttons">
		<g-button
			variant="gradient"
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
			variant="gradient"
			border-radius="1"
			label="border-radius-1">
		</g-button>
		<g-button
			variant="gradient"
			border-radius="8"
			label="border-radius-8">
		</g-button>
		<g-button
			variant="gradient"
			border-radius="12"
			label="border-radius-12">
		</g-button>
		<g-button
			variant="gradient"
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
			variant="gradient"
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
			variant="gradient"
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
			variant="gradient"
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
			variant="gradient"
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

	.buttons_custom-color {
		--playground-brand-color: rgb(124 58 237);
	}

	.buttons_palette {
		gap: 8px;
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
