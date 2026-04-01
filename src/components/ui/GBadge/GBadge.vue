<script setup lang="ts">
	import { type GBadgeProps } from './types';

	const _props = defineProps<GBadgeProps>();
</script>

<template>
	<div
		class="g-badge"
		:class="{
			[`g-badge_${position}`]: position
		}">
		<div class="g-badge__wrapper">
			<slot></slot>
		</div>
		<div
			class="g-badge__content"
			:class="{
				[`g-badge__content_${size}`]: true
			}">
			<div
				class="content__wrapper"
				:class="{
					[`content__wrapper_${variant}`]: true,
					content__wrapper_dot: dot
				}">
				<slot
					v-if="!dot"
					name="content"
					>{{ content }}</slot
				>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.g-badge {
		position: relative;
		width: fit-content;

		&__content {
			position: absolute;
			top: 0;
			right: 0;
			transform: translate(75%, -25%);

			overflow: hidden;

			border-radius: 20px;

			font-size: 0.75rem;
			line-height: 1rem;

			background: white;

			&_s {
				font-size: 0.5rem;
				line-height: 0.7rem;
			}
		}

		.content__wrapper {
			padding: 2px 4px;
			color: var(--g-on-tonal);
			background: var(--g-tonal);

			&_primary {
				color: white;
				background: var(--g-primary-color);
			}

			&_dot {
				width: 4px;
				height: 4px;
				padding: 0;
			}
		}

		&_inline {
			display: flex;
			gap: 4px;
			align-items: center;

			.g-badge__content {
				position: static;
				transform: none;
			}
		}

		&_floating {
			.g-badge__content {
				transform: translate(100%, -100%);
			}
		}
	}
</style>
