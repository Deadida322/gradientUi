<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';
	import GGradient from './GGradient.vue';
	import GIcon from './GIcon.vue';
	const attrs = useAttrs();
	const props = defineProps({
		borderRadius: {
			type: [String, Number],
			default: 20
		},
		borderWidth: {
			type: [String, Number],
			default: 0
		},
		label: {
			type: String,
			default: ''
		},
		appendIcon: {
			type: String,
			default: ''
		},
		prependIcon: {
			type: String,
			default: ''
		},
		variant: {
			type: String,
			default: 'primary'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		iconButton: {
			type: String,
			default: ''
		},
		squircle: {
			type: Boolean,
			default: false
		}
	});

	const slots = useSlots();
</script>

<template>
	<g-gradient
		v-gradient-icon
		class="g-gradient"
		:class="{
			'g-gradient__disabled': disabled
		}"
		v-bind="{
			...attrs,
			...props
		}">
		<div
			v-ripple
			class="g-button"
			:class="{
				'g-button__tonal': variant === 'tonal',
				'g-button__icon': iconButton,
				'g-button__text': variant === 'text'
			}">
			<div
				v-if="(slots.prepend || prependIcon) && !iconButton"
				class="g-button__prepend">
				<slot name="prepend">
					<g-icon :icon="prependIcon"></g-icon>
				</slot>
			</div>
			<div class="g-button__label">
				<slot>
					<template v-if="!iconButton">
						{{ label }}
					</template>
					<g-icon
						v-else
						:icon="iconButton">
					</g-icon>
				</slot>
			</div>
			<div
				v-if="(slots.append || appendIcon) && !iconButton"
				class="g-button__append">
				<slot name="append">
					<g-icon :icon="appendIcon"></g-icon>
				</slot>
			</div>
		</div>
	</g-gradient>
</template>

<style lang="scss" scoped>
	.g-button {
		cursor: pointer;
		user-select: none;

		display: flex;
		gap: 6px;
		align-items: center;

		width: fit-content;
		padding: 10px 14px;

		color: white;

		background-color: var(--g-primary-color);

		transition: all 0.2s ease-in-out;

		&:hover {
			background-color: var(--g-primary-color-hover);
		}

		&__tonal {
			color: var(--g-on-tonal);
			background-color: var(--g-tonal);

			&:hover {
				background-color: var(--g-tonal-hover);
			}
		}

		&__icon {
			justify-content: center;
			width: 40px;
			height: 40px;
			padding: 0;
		}

		&__text {
			color: var(--g-on-tonal);
			background-color: white;

			&:hover {
				background-color: rgb(237 237 237);
			}
		}
	}

	.g-gradient {
		transition: all 0.2s ease-in;

		&__disabled {
			pointer-events: none;
			opacity: 0.5;
		}
	}
</style>
