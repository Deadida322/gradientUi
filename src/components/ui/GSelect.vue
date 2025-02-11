<script setup>
	import { useAttrs, ref, toRefs, useSlots, computed, watch } from 'vue';
	import GInput from './GInput.vue';
	import GPopper from './GPopper.vue';
	import GSelectItem from './GSelectItem.vue';
	import { onClickOutside } from '@vueuse/core';
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
		options: {
			type: Array,
			default: () => []
		},
		labelKey: {
			type: String,
			default: 'label'
		},
		valueKey: {
			type: String,
			default: 'value'
		},
		multiple: {
			type: Boolean,
			default: false
		},
		returnObject: {
			type: Boolean,
			default: false
		}
	});

	const { width, valueKey, options } = toRefs(props);
	const slots = useSlots();
	const checked = ref([]);

	const modelValue = defineModel({
		type: Object
	});

	watch(
		checked,
		(val) => {
			modelValue.value = val;
		},
		{ immediate: true, deep: true }
	);

	const hidePopup = () => {
		focused.value = false;
	};
	const optionsRef = ref(null);
	const activatorRef = ref(null);
	const topPosition = ref(0);
	const leftPosition = ref(0);
	onClickOutside(optionsRef, () => hidePopup());

	const outOfViewport = ref(false);

	const elementInViewport = (el) => {
		let top = el.offsetTop;
		let left = el.offsetLeft;
		let width = el.offsetWidth;
		let height = el.offsetHeight;

		while (el.offsetParent) {
			el = el.offsetParent;
			top += el.offsetTop;
			left += el.offsetLeft;
		}

		return (
			top >= window.pageYOffset &&
			left >= window.pageXOffset &&
			top + height <= window.pageYOffset + window.innerHeight &&
			left + width <= window.pageXOffset + window.innerWidth
		);
	};

	const checkPosition = () => {
		let bounds = activatorRef.value.$el.getBoundingClientRect();

		const scrollY =
			window.pageYOffset ||
			(
				document.documentElement ||
				document.body.parentNode ||
				document.body
			).scrollTop;
		leftPosition.value = bounds.left + 'px';
		topPosition.value = bounds.top + scrollY + 47 + 'px';
		setTimeout(() => {
			outOfViewport.value = !elementInViewport(optionsRef.value);
		}, 20);
	};

	const computedOptions = computed(() =>
		options.value.map((item) => {
			const checkedIndex = checked.value.findIndex(
				(checkedItem) =>
					checkedItem[valueKey.value] === item[valueKey.value]
			);
			return {
				...item,
				checked: checkedIndex !== -1,
				checkedIndex
			};
		})
	);

	const setChecked = (idx) => {
		const item = computedOptions.value[idx];
		if (item.checked) {
			return checked.value.splice(item.checkedIndex, 1);
		}
		checked.value.push(options.value[idx]);
	};

	document.addEventListener('scroll', checkPosition, true);

	watch(
		focused,
		(val) => {
			if (val) checkPosition();
			else document.removeEventListener('scroll', checkPosition, true);
		},
		{ immediate: true }
	);
</script>

<template>
	<div
		class="g-select"
		@click="() => (focused = true)">
		<g-popper :width="width">
			<g-input
				v-bind="attrs"
				ref="activatorRef"
				readonly="readonly"
				:force-focused="focused"
				@update:model-value="void 0"
				@clear="modelValue = []">
				<template
					v-for="(_, slot) of slots"
					#[slot]="scope">
					<slot
						:name="slot"
						v-bind="scope" />
				</template>
			</g-input>
			<template #content>
				<div
					ref="optionsRef"
					class="g-select__options">
					<div class="g-select-options__body">
						<g-select-item
							v-for="(item, idx) in computedOptions"
							:key="item.value"
							:item="item"
							:checked="item.checked"
							@click="setChecked(idx)">
						</g-select-item>
					</div>
				</div>
			</template>
		</g-popper>
	</div>
</template>

<style lang="scss">
	* {
		box-sizing: border-box;
	}

	.g-select-options {
		&__body {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}
	}
</style>
