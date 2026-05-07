<script setup lang="ts">
	import { computed } from 'vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import GText from '@/components/ui/GText/GText.vue';
	import { BaseOverlay } from '@/components/ui/BaseOverlay';
	import { makeDrawerProps } from './types';

	const props = defineProps(makeDrawerProps());
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

	const toUnit = (
		value: string | number | null | undefined,
		fallback?: string
	) => {
		if (value === null || value === undefined || value === '') {
			return fallback;
		}

		return typeof value === 'number' ? `${value}px` : value;
	};

	const isHorizontal = computed(
		() => props.placement === 'left' || props.placement === 'right'
	);
	const drawerStyle = computed(() => ({
		width: isHorizontal.value ? toUnit(props.width) : '100%',
		maxWidth: isHorizontal.value ? toUnit(props.maxWidth) : '100%',
		height: isHorizontal.value ? '100%' : toUnit(props.height),
		maxHeight: isHorizontal.value ? '100%' : toUnit(props.maxHeight)
	}));
	const drawerClasses = computed(() => ({
		[`g-drawer_${props.placement}`]: true,
		'g-drawer_scrollable': props.scrollable
	}));
</script>

<template>
	<base-overlay
		v-bind="props"
		@update:model-value="emit('update:modelValue', $event)">
		<template #default="{ close, dismiss }">
			<aside
				class="g-drawer"
				:class="drawerClasses"
				:style="drawerStyle"
				role="dialog"
				aria-modal="true"
				:aria-label="props.title || 'Drawer'">
				<header
					v-if="
						slots.header ||
						slots.title ||
						slots.text ||
						props.title ||
						props.text ||
						!props.hideClose
					"
					class="g-drawer__header">
					<div class="g-drawer__heading">
						<slot
							name="header"
							:close="close"
							:dismiss="dismiss">
							<g-text
								v-if="slots.title || props.title"
								type="h-6"
								class="g-drawer__title">
								<slot name="title">{{ props.title }}</slot>
							</g-text>
							<g-text
								v-if="slots.text || props.text"
								type="subtitle-2"
								class="g-drawer__text">
								<slot name="text">{{ props.text }}</slot>
							</g-text>
						</slot>
					</div>

					<g-button
						v-if="!props.hideClose"
						size="s"
						variant="text"
						icon-button="close"
						aria-label="Close drawer"
						rounded
						@click="dismiss" />
				</header>

				<div class="g-drawer__body">
					<slot
						:close="close"
						:dismiss="dismiss" />
				</div>

				<footer
					v-if="slots.footer || slots.actions"
					class="g-drawer__footer">
					<slot
						name="footer"
						:close="close"
						:dismiss="dismiss">
						<div class="g-drawer__actions">
							<slot
								name="actions"
								:close="close"
								:dismiss="dismiss" />
						</div>
					</slot>
				</footer>
			</aside>
		</template>
	</base-overlay>
</template>

<style scoped lang="scss">
	@use '@/styles/mixins/overlay-surface' as overlaySurface;
	@use '@/styles/mixins/scrollbar' as scrollbar;

	.g-drawer {
		--g-token-overlay-padding: var(--g-token-space-5);

		overflow: hidden;
		display: flex;
		flex-direction: column;

		box-sizing: border-box;

		color: var(--g-token-color-on-surface);

		@include overlaySurface.overlay-surface;

		&_left {
			border-radius: 0 calc(var(--g-token-overlay-radius) + 12px)
				calc(var(--g-token-overlay-radius) + 12px) 0;
		}

		&_right {
			border-radius: calc(var(--g-token-overlay-radius) + 12px) 0 0
				calc(var(--g-token-overlay-radius) + 12px);
		}

		&_top {
			border-radius: 0 0 calc(var(--g-token-overlay-radius) + 12px)
				calc(var(--g-token-overlay-radius) + 12px);
		}

		&_bottom {
			border-radius: calc(var(--g-token-overlay-radius) + 12px)
				calc(var(--g-token-overlay-radius) + 12px) 0 0;
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
			overscroll-behavior: contain;
			padding-right: 2px;

			@include scrollbar.tonal-scrollbar;
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

<style lang="scss">
	.g-overlay-transition-enter-from,
	.g-overlay-transition-leave-to {
		.base-overlay_left .base-overlay__content {
			transform: translateX(
				calc(var(--g-transition-distance, 24px) * -1)
			);
		}

		.base-overlay_right .base-overlay__content {
			transform: translateX(var(--g-transition-distance, 24px));
		}

		.base-overlay_top .base-overlay__content {
			transform: translateY(
				calc(var(--g-transition-distance, 24px) * -1)
			);
		}

		.base-overlay_bottom .base-overlay__content {
			transform: translateY(var(--g-transition-distance, 24px));
		}
	}
</style>
