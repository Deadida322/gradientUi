<script setup lang="ts">
	import { computed } from 'vue';
	import GAvatar from './GAvatar.vue';
	import { makeAvatarGroupProps, type GAvatarGroupItem } from './types';

	const props = defineProps(makeAvatarGroupProps());

	defineSlots<{
		default?: () => unknown;
		overflow?: (slotProps: { count: number }) => unknown;
	}>();

	const visibleItems = computed<GAvatarGroupItem[]>(() => {
		if (!props.max || props.max < 1) return props.items;

		return props.items.slice(0, props.max);
	});
	const overflowCount = computed(() => {
		const total = props.total ?? props.items.length;
		const hiddenItems = Math.max(0, total - visibleItems.value.length);

		return hiddenItems;
	});
	const groupStyles = computed(() => ({
		'--g-avatar-group-overlap':
			props.overlap !== undefined ? toCssSize(props.overlap) : undefined
	}));

	const toCssSize = (value: number | string) =>
		typeof value === 'number' ? `${value}px` : value;
</script>

<template>
	<div
		class="g-avatar-group"
		:class="{
			'g-avatar-group_stacked': props.stacked,
			'g-avatar-group_reverse': props.reverse
		}"
		:style="groupStyles"
		role="group"
		:aria-label="props.ariaLabel">
		<slot>
			<g-avatar
				v-for="(item, index) in visibleItems"
				:key="`${item.name ?? item.text ?? item.src ?? item.image ?? index}-${index}`"
				class="g-avatar-group__item"
				:style="{
					zIndex: props.reverse
						? index + 1
						: visibleItems.length - index
				}"
				:src="item.src"
				:image="item.image"
				:alt="item.alt"
				:name="item.name"
				:text="item.text"
				:icon="item.icon"
				:color="item.color ?? props.color"
				:state="item.state"
				:variant="item.variant ?? props.variant"
				:shape="item.shape ?? props.shape"
				:size="props.size"
				:hover="props.hover"
				:href="item.href"
				:target="item.target"
				:rel="item.rel" />

			<slot
				v-if="overflowCount > 0"
				name="overflow"
				:count="overflowCount">
				<g-avatar
					class="g-avatar-group__item g-avatar-group__overflow"
					:style="{
						zIndex: props.reverse ? visibleItems.length + 1 : 0
					}"
					:text="`+${overflowCount}`"
					:color="props.overflowColor ?? props.color"
					:variant="props.variant"
					:shape="props.shape"
					:size="props.size"
					:hover="props.hover" />
			</slot>
		</slot>
	</div>
</template>

<style scoped lang="scss">
	.g-avatar-group {
		--g-avatar-group-overlap: 12px;

		display: inline-flex;
		align-items: center;

		width: fit-content;
		max-width: 100%;

		vertical-align: middle;

		&_reverse {
			flex-direction: row-reverse;
		}

		&_stacked {
			.g-avatar-group__item,
			:deep(.g-avatar__frame) {
				position: relative;
			}

			.g-avatar-group__item + .g-avatar-group__item,
			:deep(.g-avatar__frame + .g-avatar__frame) {
				margin-left: calc(var(--g-avatar-group-overlap) * -1);
			}
		}

		&_stacked.g-avatar-group_reverse {
			.g-avatar-group__item + .g-avatar-group__item,
			:deep(.g-avatar__frame + .g-avatar__frame) {
				margin-right: calc(var(--g-avatar-group-overlap) * -1);
				margin-left: 0;
			}
		}
	}
</style>
