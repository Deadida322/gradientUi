<script setup lang="ts">
	import GFileItem from '@/components/shared/GFileItem/GFileItem.vue';
	import type { FileControlView } from '@/use/file/control';
	import type { FileEntry, GFileSlots } from '@/use/file/types';
	const { control, entries } = defineProps<{
		control: FileControlView;
		entries: readonly FileEntry[];
	}>();
	defineSlots<Pick<GFileSlots, 'file'>>();
</script>

<template>
	<ul
		class="g-file-control__files"
		:aria-label="control.props.label || control.props.browseLabel">
		<li
			v-for="entry in entries"
			:key="entry.id"
			class="g-file-control__file">
			<slot
				name="file"
				:error="control.error"
				:state="control.fieldProps.state"
				:file="entry.file"
				:url="entry.url"
				:remove="() => control.remove(entry.file)">
				<g-file-item
					:file="entry.file"
					:src="entry.url"
					:removable="control.interactive"
					:remove-label="control.props.removeLabel"
					@remove="control.remove" />
			</slot>
		</li>
	</ul>
</template>
