<script setup lang="ts">
	import { computed } from 'vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import GText from '@/components/ui/GText/GText.vue';
	import { BaseOverlay } from '../BaseOverlay';
	import { makeModalProps } from './types';

	const props = defineProps(makeModalProps());
	const slots = defineSlots<{
		default?: (props: {
			close: () => void;
			dismiss: () => void;
		}) => unknown;
		header?: (props: { close: () => void; dismiss: () => void }) => unknown;
		footer?: (props: { close: () => void; dismiss: () => void }) => unknown;
		actions?: (props: {
			close: () => void;
			dismiss: () => void;
		}) => unknown;
		title?: () => unknown;
		text?: () => unknown;
	}>();
	const emit = defineEmits<{
		'update:modelValue': [value: boolean];
	}>();

	function toUnit(
		value: string | number | null | undefined,
		fallback?: string
	) {
		if (value === null || value === undefined || value === '') {
			return fallback;
		}

		return typeof value === 'number' ? `${value}px` : value;
	}

	const modalStyle = computed(() => ({
		width: props.fullscreen
			? 'min(100% - 32px, 100%)'
			: toUnit(props.width),
		maxWidth: props.fullscreen
			? 'calc(100vw - 32px)'
			: toUnit(props.maxWidth),
		height: props.fullscreen ? 'calc(100% - 32px)' : undefined,
		maxHeight: props.fullscreen ? 'calc(100vh - 32px)' : 'min(88vh, 960px)'
	}));
</script>

<template>
	<base-overlay
		:model-value="props.modelValue"
		:default-open="props.defaultOpen"
		:append-to="props.appendTo"
		:z-index-base="props.zIndexBase"
		:position="props.position"
		:placement="props.fullscreen ? 'fullscreen' : props.placement"
		:persistent="props.persistent"
		:close-on-esc="props.closeOnEsc"
		:close-on-outside="props.closeOnOutside"
		:lock-scroll="props.lockScroll"
		:scrim="props.scrim"
		:disabled="props.disabled"
		@update:model-value="emit('update:modelValue', $event)">
		<template #default="{ close, dismiss }">
			<section
				class="g-modal"
				:class="{
					'g-modal_fullscreen': props.fullscreen,
					'g-modal_scrollable': props.scrollable
				}"
				:style="modalStyle"
				role="dialog"
				aria-modal="true">
				<header
					v-if="
						slots.header ||
						slots.title ||
						slots.text ||
						props.title ||
						props.text ||
						!props.hideClose
					"
					class="g-modal__header">
					<div class="g-modal__heading">
						<slot
							name="header"
							:close="close"
							:dismiss="dismiss">
							<g-text
								v-if="slots.title || props.title"
								type="h-6"
								class="g-modal__title">
								<slot name="title">{{ props.title }}</slot>
							</g-text>
							<g-text
								v-if="slots.text || props.text"
								type="subtitle-2"
								class="g-modal__text">
								<slot name="text">{{ props.text }}</slot>
							</g-text>
						</slot>
					</div>

					<g-button
						v-if="!props.hideClose"
						size="s"
						variant="text"
						color="blue-grey-40"
						prepend="close"
						class="g-modal__close"
						aria-label="Close modal"
						@click="dismiss" />
				</header>

				<div class="g-modal__body">
					<slot
						:close="close"
						:dismiss="dismiss" />
				</div>

				<footer
					v-if="slots.footer || slots.actions"
					class="g-modal__footer">
					<slot
						name="footer"
						:close="close"
						:dismiss="dismiss">
						<div class="g-modal__actions">
							<slot
								name="actions"
								:close="close"
								:dismiss="dismiss" />
						</div>
					</slot>
				</footer>
			</section>
		</template>
	</base-overlay>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/overlay-surface' as overlaySurface;

	.g-modal {
		overflow: hidden;
		display: flex;
		flex-direction: column;

		border-radius: calc(var(--g-token-overlay-radius) + 10px);

		color: var(--g-token-color-on-surface);

		@include overlaySurface.overlay-surface;

		&_fullscreen {
			border-radius: calc(var(--g-token-overlay-radius) + 12px);
		}

		&__header {
			display: flex;
			gap: var(--g-token-space-3);
			align-items: flex-start;
			justify-content: space-between;

			padding-bottom: var(--g-token-space-4);
		}

		&__heading {
			display: flex;
			flex: 1 1 auto;
			flex-direction: column;
			gap: var(--g-token-space-2);

			min-width: 0;
		}

		&__title {
			font-weight: var(--g-token-font-weight-bold);
			color: var(--g-token-color-on-surface);
		}

		&__text {
			color: color-mix(
				in srgb,
				var(--g-token-color-on-surface) 70%,
				transparent
			);
		}

		&__close {
			flex: 0 0 auto;
		}

		&__body {
			flex: 1 1 auto;
			min-height: 0;
		}

		&_scrollable &__body {
			overflow: auto;
			padding-right: 2px;
		}

		&__footer {
			padding-top: var(--g-token-space-4);
		}

		&__actions {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-space-3);
			justify-content: flex-end;
		}
	}
</style>
