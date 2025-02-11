<script setup>
	import { useAttrs, ref, toRefs, useSlots } from 'vue';
	import GGradient from '@/components/ui/GGradient.vue';
	import { v4 as uuidv4 } from 'uuid';
	import GIcon from '@/components/ui/GIcon.vue';
	import { onClickOutside } from '@vueuse/core';
	import usePx from '@/use/px.ts';
	const attrs = useAttrs();
	const focused = ref(false);
	const props = defineProps({
		label: {
			type: String,
			default: ''
		},
		width: {
			type: [String, Number],
			default: 224
		},
		appendIcon: {
			type: String,
			default: ''
		},
		prependIcon: {
			type: String,
			default: ''
		},
		clearable: {
			type: Boolean,
			default: false
		},
		default: {
			type: String,
			default: ''
		},
		message: {
			type: String,
			default: ''
		},
		state: {
			type: String,
			default: ''
		},
		disabledInput: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		forceFocused: {
			type: Boolean,
			default: false
		}
	});

	const { width } = toRefs(props);
	const slots = useSlots();
	const emit = defineEmits(['clear']);

	const modelValue = defineModel({ type: Object });
	const gradientWrapperRef = ref(null);

	const computedWidth = usePx(width);
	const uuid = ref(uuidv4());
	const clear = () => {
		modelValue.value = '';
		console.log('clear');
		emit('clear');
		focus();
	};

	const focus = () => {
		gradientWrapperRef.value.querySelector('input').focus();
		focused.value = true;
	};

	const unFocus = () => {
		focused.value = false;
	};

	onClickOutside(gradientWrapperRef, () => unFocus());
</script>

<template>
	<div
		class="g-input"
		:class="{
			'g-input_focus': focused || forceFocused,
			[`g-input_${state}`]: state
		}">
		<label
			:for="uuid"
			class="g-input__label">
			<slot name="label">
				{{ label }}
			</slot>
		</label>
		<g-gradient
			v-bind="props"
			position="bottom"
			:glow="focused || forceFocused"
			:border-width="focused || forceFocused ? 0.5 : 0"
			border-radius="6px">
			<div
				ref="gradientWrapperRef"
				class="g-input__wrapper"
				:class="{
					[`g-input__wrapper_${state}`]: state
				}">
				<div
					v-if="slots.prepend || prependIcon"
					class="g-input__prepend">
					<g-icon :icon="prependIcon"> </g-icon>
				</div>
				<input
					v-bind="attrs"
					:id="uuid"
					v-model="modelValue"
					:name="uuid"
					:disabled="disabledInput || disabled"
					class="g-input__body"
					@focus="focused = true"
					@blur="focused = false" />
				<div class="g-input__cross">
					<g-icon
						v-if="clearable && !!modelValue"
						icon="close"
						@click="clear"></g-icon>
				</div>

				<div
					v-if="slots.append || appendIcon"
					class="g-input__append">
					<g-icon :icon="appendIcon"> </g-icon>
				</div>
			</div>
		</g-gradient>
		<div class="g-input__helper">
			<slot name="message">
				{{ message }}
			</slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.g-input {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 3px;

		&__activator {
			cursor: pointer;

			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;

			display: block;

			width: 100%;
			height: 100%;
		}

		&__label {
			cursor: pointer;
			margin-left: 6px;
			font-size: 12px;
			opacity: 0.8;
		}

		&__wrapper {
			display: flex;
			gap: 4px;
			align-items: center;

			width: v-bind('computedWidth');
			height: 40px;
			padding: 8px 12px;
			border-radius: 6px;

			background-color: rgb(244 247 248);

			&_error {
				color: rgb(255 86 86);
				background-color: rgb(255 234 234);

				input {
					color: rgb(255 86 86);

					&::placeholder {
						color: rgb(255 86 86);
						opacity: 0.3;
					}
				}
			}

			&_warning {
				color: rgb(202 177 35);
				background-color: rgb(255 253 234);

				input {
					color: rgb(202 177 35);

					&::placeholder {
						color: rgb(202 177 35);
						opacity: 0.3;
					}
				}
			}

			&_success {
				color: rgb(0 121 16);
				background-color: rgb(234 255 248);

				input {
					color: rgb(0 121 16);

					&::placeholder {
						color: rgb(0 121 16);
						opacity: 0.3;
					}
				}
			}
		}

		&__body {
			flex: 1;

			width: 100%;
			border: none;

			background-color: transparent;
			outline: none;
		}

		&__cross {
			cursor: pointer;
			opacity: 0.5;
			transition: all 0.1s ease-in;

			&:hover {
				transform: rotate(4deg);
				opacity: 0.8;
			}
		}

		&__helper {
			transform: translateY(-4px);

			margin-left: 6px;

			font-size: 10px;

			opacity: 0;

			transition: all 0.2s ease-in-out;
		}

		&_focus {
			.g-input__wrapper {
				border-bottom: none;
			}

			.g-input__helper {
				transform: translateY(0);
				border-bottom: none;
				opacity: 0.8;
			}
		}

		&_error {
			.g-input__label,
			.g-input__helper {
				transform: translateY(0);
				color: rgb(255 86 86) !important;
				opacity: 0.8;
			}
		}

		&_warning {
			.g-input__label,
			.g-input__helper {
				color: rgb(202 177 35);
			}
		}

		&_success {
			.g-input__label,
			.g-input__helper {
				color: rgb(0 121 16);
			}
		}
	}
</style>

<style>
	* {
		box-sizing: border-box;
	}
</style>
