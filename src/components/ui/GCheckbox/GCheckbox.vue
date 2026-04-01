<script setup lang="ts">
	import GSquircle from '../GSquircle/GSquircle.vue';
	import GIcon from '../GIcon.vue';
	import TransitionScale from '@/components/transitions/TransitionScale.vue';
	const modelValue = defineModel<boolean>();
</script>

<template>
	<div
		class="g-checkbox"
		:class="{
			'g-checkbox_checked': modelValue
		}">
		<label
			class="g-checkbox__body"
			for="checkbox">
			<g-squircle
				class="g-checkbox__squircle"
				:color="
					modelValue ? `var(--g-primary-color)` : `var(--g-tonal)`
				"
				border-color="var(--g-primary-color)"
				:border="1"
				size="24">
				<div class="g-checkbox__icon">
					<transition-scale>
						<g-icon
							v-if="modelValue"
							icon="check"></g-icon>
					</transition-scale>
				</div>
			</g-squircle>
			<div class="g-checkbox__label">label</div>
		</label>
		<input
			id="checkbox"
			v-model="modelValue"
			type="checkbox"
			name="checkbox"
			class="g-checkbox__input" />
	</div>
</template>

<style scoped lang="scss">
	.g-checkbox {
		&__input {
			display: none;
		}

		&__body {
			display: flex;
			gap: 8px;
			align-items: center;
		}

		&__label {
			cursor: pointer;
			color: var(--g-text-primary);
		}

		&__icon {
			font-size: 18px;
		}

		&_checked {
			.g-checkbox__icon {
				color: white;
			}
		}

		&:hover {
			.g-checkbox__squircle {
				transform: translateY(-3px);
				filter: drop-shadow(0 3px 20px rgb(0 0 0 / 5%))
					drop-shadow(0 4px 3px rgb(0 0 0 / 34%));
			}
		}
	}
</style>
