<script setup lang="ts">
	import { ref, computed } from 'vue';
	import gsap from 'gsap';
	import GFAB from '../GFAB/GFAB.vue';
	import type { GFABGroupProps } from './types';
	import GIcon from '../GIcon.vue';
	import TransitionRotate from '@/components/transitions/TransitionRotate.vue';
	import TransitionStaggerTranslate from '@/components/transitions/TransitionStaggerTranslate.vue';
	const { options = [], icon, activeIcon } = defineProps<GFABGroupProps>();
	const isOpened = ref(false);

	const computedOptions = computed(() => {
		return isOpened.value ? options : [];
	});
</script>

<template>
	<div class="g-fab-group">
		<transition-stagger-translate
			tag="div"
			class="g-fab-group__list">
			<g-f-a-b
				v-for="(option, index) in computedOptions"
				:key="option.label"
				class="g-fab-group__item"
				:icon="option.icon"
				size="s"
				:data-index="index"
				>{{ option.label }}
			</g-f-a-b>
		</transition-stagger-translate>

		<g-f-a-b
			icon="menu"
			@click="isOpened = !isOpened">
			<template #icon>
				<transition-rotate>
					<g-icon
						v-if="!isOpened"
						:icon="icon"></g-icon>
					<g-icon
						v-else
						:icon="activeIcon"></g-icon>
				</transition-rotate>
			</template>
		</g-f-a-b>
	</div>
</template>

<style lang="scss">
	.g-fab-group {
		position: absolute;
		right: 20px;
		bottom: 20px;

		display: flex;
		flex-direction: column;
		gap: 14px;
		align-items: flex-end;

		&__list {
			display: flex;
			flex-direction: column;
			gap: 14px;
			align-items: flex-end;
		}
	}
</style>
