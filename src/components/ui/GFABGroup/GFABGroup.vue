<script setup lang="ts">
	import { ref, computed } from 'vue';
	import GFAB from '../GFAB/GFAB.vue';
	import type { GFABGroupProps } from './types';
	import type { IconValue } from '../GIcon/types';
	import GIcon from '../GIcon.vue';
	import TransitionRotate from '@/components/transitions/TransitionRotate.vue';
	import TransitionStaggerTranslate from '@/components/transitions/TransitionStaggerTranslate.vue';
	const props = withDefaults(defineProps<GFABGroupProps>(), {
		options: () => []
	});
	const isOpened = ref(false);

	const computedOptions = computed(() => {
		return isOpened.value ? props.options : [];
	});
	const iconValue = computed(() => props.icon as IconValue);
	const activeIconValue = computed(() => props.activeIcon as IconValue);
</script>

<template>
	<teleport to="body">
		<div class="g-fab-group__container">
			<div class="g-fab-group">
				<div class="g-fab-group__overlay">
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
									:icon="iconValue"></g-icon>
								<g-icon
									v-else
									:icon="activeIconValue"></g-icon>
							</transition-rotate>
						</template>
					</g-f-a-b>
				</div>
				<div
					class="g-fab-group__underlay"
					:class="{
						'g-fab-group__underlay_visible': isOpened
					}"
					@click="isOpened = false"></div>
			</div>
		</div>
	</teleport>
</template>

<style scoped lang="scss">
	.g-fab-group {
		position: relative;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;

		&__container {
			position: absolute;
			right: 0;
			bottom: 0;
		}

		&__list {
			display: flex;
			flex-direction: column;
			gap: 14px;
			align-items: flex-end;
		}

		&__overlay {
			z-index: 1;

			display: flex;
			flex-direction: column;
			gap: 14px;
			align-items: flex-end;

			padding: 20px;
		}

		&__underlay {
			position: absolute;
			right: 0;
			bottom: 0;

			display: flex;
			align-items: flex-end;

			width: 170%;
			height: fit-content;

			opacity: 0;
			background: linear-gradient(
				90deg,
				rgb(0 0 0 / 0%) 10%,
				rgb(255 255 255 / 20%) 100%
			);

			transition:
				opacity 0.3s ease-in,
				height 0.3s ease-in;

			&.g-fab-group__underlay_visible {
				height: 100vh;
				opacity: 1;
			}
		}
	}
</style>
