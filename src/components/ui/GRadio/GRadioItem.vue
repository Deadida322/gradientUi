<script setup lang="ts">
	import TransitionScale from '@/components/transitions/TransitionScale.vue';
	import GButton from '../GButton/GButton.vue';
	import GIcon from '../GIcon.vue';
	import { ref } from 'vue';
	const { name, value, label, active } = defineProps<{
		name?: string;
		label: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value: any;
		active: boolean;
	}>();

	const hovered = ref(false);

	const emit = defineEmits<{
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		'update:model-value': [value: any];
	}>();
	const onChange = () => {
		emit('update:model-value', value);
	};
</script>

<template>
	<div
		class="g-radio"
		@mouseleave="hovered = false"
		@mouseover="hovered = true">
		<label
			class="g-radio__body"
			:for="name + value">
			<g-button
				:glow="1"
				size="s"
				:variant="active ? 'text' : 'outlined'"
				rounded
				:active="hovered"
				border-radius="50"
				is-icon-button
				:border-width="active ? 1 : 0">
				<transition-scale>
					<g-icon
						v-if="active"
						v-gradient-icon
						class="g-icon"
						icon="circle-medium"></g-icon>
				</transition-scale>
			</g-button>
			<div class="g-radio__label">
				{{ label }}
			</div>
		</label>
		<input
			:id="name + value"
			class="g-radio__input"
			type="radio"
			:value="value"
			:name="name"
			@change="onChange" />
	</div>
</template>

<style scoped lang="scss">
	.g-radio {
		&__body {
			cursor: pointer;
			display: flex;
			gap: 8px;
			align-items: center;
		}

		&__input {
			display: none;
		}
	}
</style>
