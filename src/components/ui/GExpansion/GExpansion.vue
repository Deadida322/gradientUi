<script setup generic="T" lang="ts">
	import { computed } from 'vue';
	import { type GExpansionProps } from './types';
	import GIcon from '../GIcon.vue';
	import GGradient from '../GGradient/GGradient.vue';
	import TransitionExpansion from '@/components/transitions/TransitionExpansion.vue';
	import TransitionRotate from '@/components/transitions/TransitionRotate.vue';
	import { useGroupInject } from '@/use/group/di';

	const props = withDefaults(defineProps<GExpansionProps>(), {
		openedIcon: 'chevron-up',
		closedIcon: 'chevron-down'
	});

	const group = useGroupInject<T>();
	const isInGroup = computed(() => !!group && props.value !== undefined);

	const emit = defineEmits<{
		(e: 'update:model-value', value: boolean): void;
	}>();

	const innerValue = computed({
		get() {
			if (isInGroup.value) {
				return group!.isSelected(props.value as T);
			}

			return props.modelValue;
		},
		set(val) {
			if (isInGroup.value) {
				group!.toggle(props.value as T);
			} else {
				emit('update:model-value', val);
			}
		}
	});

	const toggle = () => {
		innerValue.value = !innerValue.value;
	};
</script>

<template>
	<g-gradient
		border-width="0"
		border-radius="12"
		:glow="innerValue ? 1 : 0"
		:shadow="!innerValue"
		class="g-expansion__gradient">
		<div class="g-expansion">
			<div
				class="g-expansion__header"
				@click="toggle">
				<div class="g-expansion-header__title">
					<slot
						v-bind="group || {}"
						name="title">
						{{ title }}
					</slot>
				</div>
				<div class="g-expansion__icon">
					<transition-rotate>
						<div v-if="innerValue">
							<g-icon
								size="24"
								:icon="openedIcon"></g-icon>
						</div>
						<div v-else>
							<g-icon
								size="24"
								:icon="closedIcon"></g-icon>
						</div>
					</transition-rotate>
				</div>
			</div>
			<div class="g-expansion__body">
				<transition-expansion :duration="0.3">
					<div
						v-if="innerValue"
						class="g-expansion__content">
						<slot v-bind="group || {}"></slot>
					</div>
				</transition-expansion>
			</div>
		</div>
	</g-gradient>
</template>

<style lang="scss" scoped>
	.g-expansion {
		overflow: hidden;
		display: flex;
		flex-direction: column;

		width: 100%;
		min-height: 48px;
		border-radius: 12px;

		&__gradient {
			width: 100%;
		}

		&__icon {
			position: relative;

			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;

			width: 24px;
			height: 24px;

			div {
				transform-origin: center;
			}
		}

		&__header {
			cursor: pointer;

			display: flex;
			align-items: center;
			justify-content: space-between;

			padding: 14px 20px;

			line-height: 20px;
			color: var(--g-text-primary);
			text-align: left;

			background-color: var(--g-secondary-color);
		}

		&__content {
			font-size: 12px;
			line-height: 20px;
			text-align: left;
		}
	}
</style>
