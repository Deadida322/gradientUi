<script setup lang="ts">
	import GImg from '@/components/ui/GImg/GImg.vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import { useSurfaceColor } from '@/use/surfaceColor';
	import { makeFileItemProps, type GFileItemEmits } from './types';
	const props = defineProps(makeFileItemProps());
	const emit = defineEmits<GFileItemEmits>();
	const { colorStyles } = useSurfaceColor(props);
	defineSlots<{
		preview?: (props: { file: File; src?: string }) => unknown;
		default?: (props: { file: File }) => unknown;
	}>();
	const remove = () => {
		if (props.removable && !props.disabled) emit('remove', props.file);
	};
</script>

<template>
	<div
		class="g-file-item"
		:style="colorStyles"
		:class="{
			'g-file-item_disabled': props.disabled,
			'g-file-item_state': props.state
		}">
		<slot
			name="preview"
			:file="props.file"
			:src="props.src">
			<g-img
				v-if="props.src"
				:src="props.src"
				:alt="props.file.name"
				fit="cover"
				position="center center"
				class="g-file-item__preview" />
			<g-icon
				v-else
				icon="file-outline"
				class="g-file-item__icon" />
		</slot>
		<div class="g-file-item__details">
			<div class="g-file-item__copy">
				<span
					class="g-file-item__name"
					:title="props.file.name"
					><slot :file="props.file">{{ props.file.name }}</slot></span
				><span
					v-if="props.message"
					class="g-file-item__message"
					>{{ props.message }}</span
				>
			</div>
			<g-button
				v-if="props.removable"
				variant="text"
				icon-button="close"
				size="s"
				:disabled="props.disabled"
				:aria-label="`${props.removeLabel}: ${props.file.name}`"
				@click.stop="remove" />
		</div>
	</div>
</template>

<style lang="scss">
	@use '@/styles/mixins/truncate' as truncate;

	.g-file-item {
		display: flex;
		gap: var(--g-token-space-3);
		align-items: center;

		box-sizing: border-box;
		min-width: 0;
		padding: var(--g-token-space-2);
		border: 1px solid var(--g-token-border-subtle);
		border-radius: var(--g-token-radius-md);

		color: var(--g-token-color-on-surface);

		background: color-mix(
			in srgb,
			var(--g-token-color-on-surface) 5%,
			var(--g-token-color-surface)
		);

		&__preview {
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: minmax(0, 1fr);
			flex: 0 0
				var(
					--g-file-item-thumbnail-size,
					var(--g-file-dropzone-thumbnail-size, 48px)
				);

			width: var(
				--g-file-item-thumbnail-size,
				var(--g-file-dropzone-thumbnail-size, 48px)
			);
			height: var(
				--g-file-item-thumbnail-size,
				var(--g-file-dropzone-thumbnail-size, 48px)
			);
			border-radius: var(--g-token-radius-sm);

			&::after {
				pointer-events: none;
				content: '';

				position: absolute;
				inset: 0;

				background: var(--g-file-image-shade, transparent);
			}

			.g-img__picture {
				min-width: 0;
				min-height: 0;
			}
		}

		&__details {
			display: flex;
			flex: 1;
			gap: var(--g-token-space-2);
			align-items: center;

			min-width: 0;
		}

		&__name {
			flex: 1;
			min-width: 0;

			@include truncate.truncate;
		}

		&__copy {
			display: flex;
			flex: 1;
			flex-direction: column;
			gap: var(--g-token-space-1);

			min-width: 0;
		}

		&__message {
			font-size: var(--g-token-font-size-sm);
			overflow-wrap: anywhere;
		}

		&_state {
			border-color: color-mix(in srgb, var(--g-color) 28%, transparent);
			color: var(--g-color);
			background: color-mix(
				in srgb,
				var(--g-color) 6%,
				var(--g-token-color-surface)
			);
		}

		&_disabled {
			opacity: var(--g-token-opacity-disabled);
		}
	}
</style>
