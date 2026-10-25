<script setup lang="ts">
	import { computed, ref, useModel } from 'vue';
	import GFileControl from '@/components/shared/file/GFileControl.vue';
	import {
		makeFileProps,
		type GFileEmits,
		type GFileSlots
	} from '@/use/file';
	defineOptions({ inheritAttrs: false });
	const props = defineProps(makeFileProps({ accept: 'image/*' }));
	const emit = defineEmits<GFileEmits>();
	const modelValue = useModel(props, 'modelValue');
	defineSlots<GFileSlots>();
	const control = ref<InstanceType<typeof GFileControl>>();
	defineExpose({
		$v: computed(() => control.value?.$v),
		pending: computed(() => control.value?.pending ?? false),
		open: () => control.value?.open(),
		clear: () => control.value?.clear(),
		focus: () => control.value?.focus()
	});
</script>
<template>
	<g-file-control
		ref="control"
		v-bind="{ ...props, ...$attrs }"
		:model-value="modelValue"
		:image-only="true"
		:dropzone="true"
		@update:model-value="modelValue = $event"
		@change="emit('change', $event)"
		@reject="emit('reject', $event)"
		@remove="emit('remove', $event)"
		@clear="emit('clear')"
		@focus="emit('focus', $event)"
		@blur="emit('blur', $event)">
		<template
			v-for="(_, name) in $slots"
			:key="name"
			#[name]="slotProps">
			<slot
				:name="name"
				v-bind="slotProps ?? {}" />
		</template>
	</g-file-control>
</template>
