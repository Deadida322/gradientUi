<script setup lang="ts">
	import type { FileControlView } from '@/use/file/control';
	import type { GFileSlots } from '@/use/file/types';
	import { computed } from 'vue';
	import GImg from '@/components/ui/GImg/GImg.vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import GFileList from './GFileList.vue';
	const { control } = defineProps<{ control: FileControlView }>();
	const slots = defineSlots<GFileSlots>();
	const buttonStyle = computed(() => {
		const size = control.props.buttonProps?.size;
		if (!size) return undefined;
		const sizes = { s: [10, 5], m: [14, 6], l: [16, 7], xl: [24, 10] };
		const [button, icon] = sizes[size];
		return {
			'--g-file-dropzone-button-size': `calc(var(--g-token-space-1) * ${button})`,
			'--g-token-button-icon-size': `calc(var(--g-token-space-1) * ${icon})`
		};
	});
</script>

<template>
	<label
		v-if="control.props.label || slots.default"
		:for="control.id"
		class="g-file-control__label"
		><slot>{{ control.props.label }}</slot></label
	>
	<div
		v-bind="control.dropAttrs"
		class="g-file-dropzone"
		:class="{
			'g-file-dropzone_dragging': control.isDragging,
			'g-file-dropzone_interactive': control.interactive,
			'g-file-dropzone_filled': control.backgroundFile,
			'g-file-dropzone_error': control.fieldProps.state === 'error'
		}"
		:data-g-validation-error="
			control.fieldProps.state === 'error' || undefined
		"
		@click.self="control.open">
		<div class="g-file-dropzone__background">
			<slot
				v-if="control.backgroundFile"
				name="background"
				:error="control.error"
				:state="control.fieldProps.state"
				:file="control.backgroundFile"
				:url="control.backgroundUrl"
				:remove="control.removeBackground">
				<g-img
					v-if="control.backgroundUrl"
					:src="control.backgroundUrl"
					:alt="control.backgroundFile.name"
					fit="cover"
					position="center center"
					loading="eager"
					class="g-file-dropzone__image" />
			</slot>
		</div>
		<div
			v-if="control.backgroundFile"
			class="g-file-dropzone__shade"
			aria-hidden="true"></div>
		<div
			class="g-file-dropzone__tint"
			aria-hidden="true"></div>
		<svg
			class="g-file-dropzone__border"
			width="100%"
			height="100%"
			aria-hidden="true"
			focusable="false">
			<rect
				x="0.5"
				y="0.5"
				vector-effect="non-scaling-stroke" />
		</svg>
		<div
			class="g-file-dropzone__trigger"
			:class="{ 'g-file-dropzone__empty': !control.files.length }">
			<slot
				name="trigger"
				:error="control.error"
				:state="control.fieldProps.state"
				:open="control.open"
				:disabled="!control.interactive">
				<g-button
					:id="control.id"
					is-icon-button
					rounded
					variant="default"
					class="g-file-dropzone__add"
					:style="buttonStyle"
					v-bind="control.props.buttonProps"
					:state="control.fieldProps.state"
					:aria-invalid="control.error || undefined"
					:aria-label="control.props.browseLabel"
					:disabled="!control.interactive"
					:aria-describedby="
						control.props.hideMessage
							? undefined
							: `${control.id}-message`
					"
					@click="control.open">
					<slot
						name="icon"
						:error="control.error"
						:state="control.fieldProps.state"
						><g-icon :icon="control.props.icon"
					/></slot>
				</g-button>
			</slot>
		</div>
		<template v-if="control.backgroundFile">
			<span
				class="g-file-dropzone__caption"
				:title="control.backgroundFile.name"
				>{{ control.backgroundFile.name }}</span
			>
			<div
				v-if="control.interactive"
				class="g-file-dropzone__remove">
				<g-button
					variant="text"
					icon-button="close"
					size="s"
					:aria-label="`${control.props.removeLabel}: ${control.backgroundFile.name}`"
					@click="control.remove(control.backgroundFile)" />
			</div>
		</template>
	</div>
	<g-file-list
		v-if="control.listedFiles.length"
		class="g-file-dropzone__files"
		:control="control"
		:entries="control.listedFiles"
		><template
			v-if="slots.file"
			#file="slotProps"
			><slot
				name="file"
				v-bind="slotProps" /></template
	></g-file-list>
	<div
		v-if="!control.props.hideMessage"
		:id="`${control.id}-message`"
		class="g-file-control__message">
		<slot name="message">{{ control.fieldProps.message }}</slot>
	</div>
</template>
<style lang="scss">
	@use '@/styles/mixins/focus-ring' as focus;

	.g-file-dropzone {
		--g-file-dropzone-border-color: var(--g-token-border-subtle);
		--g-file-dropzone-background-scale: 1;
		--g-file-dropzone-tint-opacity: 0;

		isolation: isolate;
		position: relative;

		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;

		min-height: var(--g-file-dropzone-min-height, 320px);
		padding: var(--g-token-space-6);
		border-radius: var(--g-token-radius-md);

		background: var(--g-token-color-surface);

		&:focus-within {
			@include focus.focus-ring;
		}

		&__background,
		&__shade,
		&__tint,
		&__border {
			pointer-events: none;

			position: absolute;
			inset: 0;

			width: 100%;
			height: 100%;
			border-radius: inherit;
		}

		&__background {
			transform: scale(var(--g-file-dropzone-background-scale));
			background: var(--g-token-color-surface);
			transition: transform var(--g-token-duration-slow)
				var(--g-token-easing-standard);
		}

		&__image {
			position: absolute;
			inset: 0;

			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: minmax(0, 1fr);

			width: 100%;
			height: 100%;

			.g-img__picture {
				min-width: 0;
				min-height: 0;
			}
		}

		&__shade {
			background: var(--g-file-image-shade);
		}

		&__tint {
			opacity: var(--g-file-dropzone-tint-opacity);
			background: color-mix(in srgb, var(--g-color) 10%, transparent);
			transition: opacity var(--g-token-duration-base)
				var(--g-token-easing-standard);
		}

		&__border {
			color: var(--g-file-dropzone-border-color);
			transition: color var(--g-token-duration-base)
				var(--g-token-easing-standard);

			rect {
				width: calc(100% - 1px);
				height: calc(100% - 1px);

				rx: var(--g-token-radius-md);
				fill: none;
				stroke: currentcolor;
				stroke-dasharray: var(--g-file-dropzone-dash, 16 10);
				stroke-width: 1px;
			}
		}

		&_interactive:hover,
		&_interactive:focus-within,
		&_dragging {
			--g-file-dropzone-border-color: var(--g-color);
			--g-file-dropzone-background-scale: var(
				--g-file-dropzone-hover-scale,
				1.035
			);
			--g-file-dropzone-tint-opacity: 1;
		}

		&_error {
			--g-file-dropzone-border-color: var(--g-token-color-error);
		}

		&__trigger {
			position: relative;
		}

		&__add {
			--g-token-button-icon-size: calc(var(--g-token-space-4) * 2);

			width: var(--g-file-dropzone-button-size, 64px);
			height: var(--g-file-dropzone-button-size, 64px);
			box-shadow: var(--g-token-elevation-1);
		}

		&__remove {
			position: absolute;
			inset-block-start: var(--g-token-space-3);
			inset-inline-end: var(--g-token-space-3);
		}

		&__caption {
			position: absolute;
			inset-block-end: var(--g-token-space-3);
			inset-inline: var(--g-token-space-3);

			overflow: hidden;

			box-sizing: border-box;
			width: fit-content;
			max-width: min(
				calc(100% - var(--g-token-space-6)),
				var(--g-file-dropzone-caption-max-width, 32ch)
			);
			padding: var(--g-token-tooltip-padding-y)
				var(--g-token-tooltip-padding-x);
			border-radius: var(--g-token-tooltip-radius);

			font-size: var(--g-token-tooltip-font-size);
			color: var(--g-token-tooltip-color);
			text-overflow: ellipsis;
			white-space: nowrap;

			background: var(--g-token-tooltip-surface);
			backdrop-filter: blur(var(--g-token-tooltip-backdrop-blur));
			box-shadow: var(--g-token-overlay-shadow);
		}

		&__files {
			margin-top: var(--g-token-space-3);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.g-file-dropzone__background,
		.g-file-dropzone__tint,
		.g-file-dropzone__border {
			transition: none;
		}

		.g-file-dropzone {
			--g-file-dropzone-hover-scale: 1;
		}
	}
</style>
