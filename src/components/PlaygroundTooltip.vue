<script lang="ts" setup>
	import GText from './ui/GText/GText.vue';
	import GButton from './ui/GButton/GButton.vue';
	import GTooltip from './ui/GTooltip/GTooltip.vue';
</script>

<template>
	<g-text
		type="h-4"
		label="Тултипы">
	</g-text>
	<g-text
		type="h-5"
		label="Разные placements">
	</g-text>
	<div class="col">
		<g-tooltip content="base">
			<g-button
				variant="tonal"
				label="Base center">
			</g-button>
		</g-tooltip>
		<div class="row">
			<g-tooltip
				content="right"
				placement="right">
				<g-button
					variant="tonal"
					label="Base center">
				</g-button>
			</g-tooltip>
			<g-tooltip
				content="right-start"
				placement="right-start">
				<g-button
					variant="tonal"
					label="Right start">
				</g-button>
			</g-tooltip>
			<g-tooltip
				content="right-end"
				placement="right-end">
				<g-button
					variant="tonal"
					label="Right end">
				</g-button>
			</g-tooltip>
		</div>

		<div class="row">
			<g-tooltip
				content="left"
				placement="left">
				<g-button
					variant="tonal"
					label="Left">
				</g-button>
			</g-tooltip>
			<g-tooltip
				content="left-start"
				placement="left-start">
				<g-button
					variant="tonal"
					label="Left start">
				</g-button>
			</g-tooltip>
			<g-tooltip
				content="left-end"
				placement="left-end">
				<g-button
					variant="tonal"
					label="Left end">
				</g-button>
			</g-tooltip>
		</div>
		<div class="row">
			<g-tooltip
				content="top"
				placement="top">
				<g-button
					variant="tonal"
					label="Top">
				</g-button>
			</g-tooltip>
			<g-tooltip
				content="top-start"
				placement="top-start">
				<g-button
					variant="tonal"
					label="Top start">
				</g-button>
			</g-tooltip>
			<g-tooltip
				content="top-end"
				placement="top-end">
				<g-button
					variant="tonal"
					label="Top end">
				</g-button>
			</g-tooltip>
		</div>
		<div class="row">
			<g-tooltip
				content="bottom"
				placement="bottom">
				<g-button
					variant="tonal"
					label="Bottom">
				</g-button>
			</g-tooltip>
			<g-tooltip
				content="bottom-start"
				placement="bottom-start">
				<g-button
					variant="tonal"
					label="Bottom start">
				</g-button>
			</g-tooltip>
			<g-tooltip
				content="bottom-end"
				placement="bottom-end">
				<g-button
					variant="tonal"
					label="Bottom end">
				</g-button>
			</g-tooltip>
		</div>
	</div>
	<g-text
		type="h-5"
		label="Директивы">
	</g-text>
	<div class="tooltips">
		<g-button
			v-tooltip="'auto-placement'"
			variant="filled"
			label="Default">
		</g-button>

		<g-button
			v-tooltip="{ content: 'top', placement: 'top' }"
			variant="tonal"
			label="Top">
		</g-button>
		<g-button
			v-tooltip="{ content: 'top-start', placement: 'top-start' }"
			variant="tonal"
			label="Top">
		</g-button>
		<g-button
			v-tooltip="{ content: 'top-end', placement: 'top-end' }"
			variant="tonal"
			label="Top">
		</g-button>
		<g-button
			v-tooltip="{ content: 'right', placement: 'right' }"
			variant="tonal"
			label="Right">
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
	<div class="tooltips">
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
	<div class="tooltips">
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
	<div class="tooltips">
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
	<div class="tooltips">
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
	<div class="tooltips">
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
	<div class="tooltips">
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
	.tooltips {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-block: 20px;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.col {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-block: 20px;
	}
</style>
