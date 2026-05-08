<script lang="ts" setup>
	import GText from '@/components/ui/GText/GText.vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import GTooltip from '@/components/ui/GTooltip/GTooltip.vue';
	import { computed } from 'vue';
	import { generateGradientCSS } from '@/theme/generateGradient';

	const materialButtonColors = [
		'red40',
		'pink40',
		'purple40',
		'deep-purple-40',
		'indigo40',
		'blue40',
		'light-blue-40',
		'cyan40',
		'teal40',
		'green40',
		'light-green-40',
		'lime40',
		'yellow40',
		'amber40',
		'orange40',
		'deep-orange-40',
		'brown40',
		'grey40',
		'blue-grey-40'
	];
	const materialButtonTones = [
		'red20',
		'red30',
		'red40',
		'red50',
		'red60',
		'red70',
		'red80',
		'red90',
		'red100'
	];
	const materialButtonToneRows = [
		'red20',
		'red40',
		'red60',
		'red80',
		'orange20',
		'orange40',
		'orange60',
		'orange80',
		'green20',
		'green40',
		'green60',
		'green80',
		'teal20',
		'teal40',
		'teal60',
		'teal80',
		'blue20',
		'blue40',
		'blue60',
		'blue80',
		'deep-purple-20',
		'deep-purple-40',
		'deep-purple-60',
		'deep-purple-80'
	];
	const gradientButtonColors = [
		'red40',
		'red70',
		'pink40',
		'orange40',
		'orange70',
		'amber40',
		'green40',
		'green70',
		'teal40',
		'teal70',
		'blue40',
		'blue70',
		'deep-purple-40',
		'deep-purple-70',
		'blue-grey-40',
		'blue-grey-70'
	];

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
				variant="filled"
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
			variant="filled"
			label="Primary">
		</g-button>
		<g-button
			color="success"
			variant="filled"
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
			color="red40"
			variant="filled"
			label="Red 40">
		</g-button>
		<g-button
			color="deep-purple-40"
			variant="tonal"
			label="Deep purple 40">
		</g-button>
		<g-button
			color="teal70"
			variant="filled"
			label="Teal 70">
		</g-button>
		<g-button
			color="source40"
			variant="outlined"
			label="Source 40">
		</g-button>
	</div>
	<div class="buttons buttons_palette">
		<g-button
			v-for="color in materialButtonColors"
			:key="color"
			:color="color"
			variant="filled"
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
			variant="filled"
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
			variant="filled"
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
			variant="filled"
			border-radius="1"
			label="border-radius-1">
		</g-button>
		<g-button
			variant="filled"
			border-radius="8"
			label="border-radius-8">
		</g-button>
		<g-button
			variant="filled"
			border-radius="12"
			label="border-radius-12">
		</g-button>
		<g-button
			variant="filled"
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
			variant="filled"
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
			variant="filled"
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
			variant="filled"
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
			variant="filled"
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
