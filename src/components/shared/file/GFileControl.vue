<script setup lang="ts">
	import { reactive } from 'vue';
	import GFileItem from '@/components/shared/GFileItem/GFileItem.vue';
	import GFileField from './GFileField.vue';
	import GFileDropArea from './GFileDropArea.vue';
	import { makeFileProps } from '@/use/file/props';
	import { useFileControl } from '@/use/file/control';
	import type { GFileEmits, GFileSlots } from '@/use/file/types';
	defineOptions({ inheritAttrs: false });
	const props = defineProps({
		...makeFileProps(),
		imageOnly: Boolean,
		dropzone: Boolean
	});
	const emit = defineEmits<GFileEmits>();
	defineSlots<GFileSlots>();
	const state = useFileControl(props, emit);
	const { input, root, $v, pending, open, clear, focus } = state;
	const control = reactive(state);
	defineExpose({ $v, pending, open, clear, focus });
</script>
<template>
	<div
		ref="root"
		v-bind="$attrs"
		class="g-file-control"
		:class="{ 'g-file-control_disabled': control.fieldProps.disabled }"
		:style="control.colorStyles"
		:aria-busy="control.pending || undefined"
		@focusin="control.onFocus"
		@focusout="control.onBlur">
		<input
			ref="input"
			type="file"
			hidden
			:accept="props.accept ?? (props.imageOnly ? 'image/*' : undefined)"
			:multiple="props.multiple"
			:disabled="!control.interactive"
			:capture="props.capture"
			:form="props.form"
			@change="control.onChange" />
		<component
			:is="props.dropzone ? GFileDropArea : GFileField"
			:control="control">
			<template
				v-for="(_, name) in $slots"
				:key="name"
				#[name]="slotProps"
				><slot
					:name="name"
					v-bind="slotProps ?? {}"
			/></template>
		</component>

		<div
			v-if="control.rejectionMessages.length"
			class="g-file-control__rejection"
			role="status"
			aria-atomic="true">
			<ul class="g-file-control__rejection-list">
				<li
					v-for="rejection in control.rejectionMessages"
					:key="rejection.id"
					class="g-file-control__rejection-item">
					<slot
						name="rejection"
						:rejection="rejection.rejection"
						:message="rejection.message"
						:error="true"
						><g-file-item
							:file="rejection.file"
							:message="rejection.message"
							state="error"
							:removable="false"
					/></slot>
				</li>
			</ul>
		</div>
	</div>
</template>
<style lang="scss">
	@use '@/styles/mixins/focus-ring' as focus;

	.g-file-control {
		--g-file-image-shade: linear-gradient(
			to bottom,
			color-mix(in srgb, var(--g-token-color-surface) 12%, transparent),
			transparent 42%,
			color-mix(in srgb, var(--g-token-color-surface) 38%, transparent)
		);

		min-width: 0;
		color: var(--g-token-color-on-surface);

		&__browse {
			cursor: pointer;

			overflow: hidden;

			text-align: start;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__browse:focus-visible {
			@include focus.focus-ring;
		}

		&__label {
			display: block;
			margin-bottom: var(--g-token-space-2);
		}

		&__message {
			min-height: var(--g-token-space-4);
			color: var(--g-token-text-muted);
		}

		&__files {
			display: flex;
			flex-direction: column;
			gap: var(--g-token-space-2);

			min-width: 0;
			margin: 0;
			padding: 0;

			list-style: none;
		}

		&__files_selected {
			margin-top: var(--g-token-space-2);
		}

		&__file {
			min-width: 0;
		}

		&__rejection {
			margin-block: var(--g-token-space-2) 0;
			color: var(--g-token-color-error);
			overflow-wrap: anywhere;
		}

		&__rejection-list {
			display: flex;
			flex-direction: column;
			gap: var(--g-token-space-2);

			margin: 0;
			padding: 0;

			list-style: none;
		}

		&_disabled {
			opacity: var(--g-token-opacity-disabled);
		}
	}
</style>
