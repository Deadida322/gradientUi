<script setup lang="ts">
	import type { FileControlView } from '@/use/file/control';
	import type { GFileSlots } from '@/use/file/types';
	import GFieldBase from '@/components/ui/GFieldBase/GFieldBase.vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import GFileList from './GFileList.vue';
	const { control } = defineProps<{ control: FileControlView }>();
	const slots = defineSlots<GFileSlots>();
</script>

<template>
	<g-field-base
		v-bind="control.fieldProps"
		:clearable="false">
		<template #control>
			<button
				:id="control.id"
				type="button"
				class="g-field-base__native g-file-control__browse"
				:disabled="control.fieldProps.disabled"
				:aria-disabled="control.props.readonly || undefined"
				:aria-invalid="
					control.fieldProps.state === 'error' || undefined
				"
				:aria-description="
					control.files.length ? control.summary : undefined
				"
				:aria-describedby="
					control.props.hideMessage
						? undefined
						: `${control.id}-message`
				"
				@click="control.open">
				<slot
					name="selection"
					:error="control.error"
					:state="control.fieldProps.state"
					:files="control.files"
					:open="control.open"
					>{{ control.summary }}</slot
				>
			</button>
		</template>
		<template #actions>
			<g-button
				v-if="
					control.props.clearable &&
					control.hasValue &&
					control.interactive
				"
				variant="text"
				icon-button="close"
				size="s"
				:aria-label="control.props.clearLabel"
				@click="control.clear" />
		</template>
		<template
			v-if="slots.default"
			#default
			><slot
		/></template>
		<template
			v-if="slots.prepend"
			#prepend
			><slot name="prepend"
		/></template>
		<template
			v-if="slots.append"
			#append
			><slot name="append"
		/></template>
		<template #message
			><span :id="`${control.id}-message`"
				><slot name="message">{{
					control.fieldProps.message
				}}</slot></span
			></template
		>
	</g-field-base>
	<g-file-list
		v-if="control.props.imageOnly && control.entries.length"
		class="g-file-control__files_selected"
		:control="control"
		:entries="control.entries"
		><template
			v-if="slots.file"
			#file="slotProps"
			><slot
				name="file"
				v-bind="slotProps" /></template
	></g-file-list>
</template>
