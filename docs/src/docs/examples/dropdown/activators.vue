<script setup lang="ts">
	defineOptions({ name: 'DropdownActivatorsExample' });
	import { ref } from 'vue';
	import { GAvatar, GButton, GChip, GDropdown, GMenu } from '@/components';

	const selected = ref('No action selected');
	const profileItems = [
		{ id: 'profile', label: 'View profile' },
		{ id: 'settings', label: 'Account settings' },
		{ id: 'sign-out', label: 'Sign out' }
	];
	const statusItems = [
		{ id: 'available', label: 'Available' },
		{ id: 'busy', label: 'Busy' },
		{ id: 'away', label: 'Away' }
	];
	const actionItems = [
		{ id: 'share', label: 'Share project' },
		{ id: 'duplicate', label: 'Duplicate project' },
		{ id: 'archive', label: 'Archive project' }
	];
</script>

<template>
	<div class="docs-component-detail__stack">
		<div class="docs-page__preview">
			<g-dropdown close-on-content-click>
				<template #activator="{ activatorAttrs, activatorRef }">
					<button
						:ref="activatorRef"
						v-bind="activatorAttrs"
						type="button"
						class="dropdown-activators__button"
						aria-label="Open account actions">
						<g-avatar
							name="Ada Lovelace"
							shape="squircle"
							color="pink"
							hover />
					</button>
				</template>
				<g-menu
					:items="profileItems"
					@select="selected = $event.label ?? ''" />
			</g-dropdown>

			<g-dropdown close-on-content-click>
				<template #activator="{ activatorAttrs, activatorRef }">
					<button
						:ref="activatorRef"
						v-bind="activatorAttrs"
						type="button"
						class="dropdown-activators__button"
						aria-label="Change availability">
						<g-chip
							label="Available"
							color="teal"
							variant="tonal"
							append-icon="chevron-down" />
					</button>
				</template>
				<g-menu
					:items="statusItems"
					@select="selected = $event.label ?? ''" />
			</g-dropdown>

			<g-dropdown
				close-on-content-click
				placement="bottom-end">
				<template #activator="{ activatorAttrs, activatorRef }">
					<g-button
						:ref="activatorRef"
						v-bind="activatorAttrs"
						icon-button="dots-vertical"
						variant="outlined"
						aria-label="More project actions" />
				</template>
				<g-menu
					:items="actionItems"
					@select="selected = $event.label ?? ''" />
			</g-dropdown>

			<g-dropdown close-on-content-click>
				<template #activator="{ activatorAttrs, activatorRef }">
					<g-button
						:ref="activatorRef"
						v-bind="activatorAttrs"
						label="Project actions"
						append="chevron-down"
						variant="text" />
				</template>
				<g-menu
					:items="actionItems"
					@select="selected = $event.label ?? ''" />
			</g-dropdown>
		</div>
		<p
			class="docs-component-detail__value-line"
			aria-live="polite">
			Selected: <span>{{ selected }}</span>
		</p>
		<p class="docs-component-detail__note">
			Wrap non-interactive content such as avatars and chips in a native
			button. Bind activatorAttrs and activatorRef to that button for
			keyboard activation and positioning.
		</p>
	</div>
</template>

<style scoped lang="scss">
	.dropdown-activators__button {
		display: inline-flex;
		padding: 0;
		border: 0;
		border-radius: var(--g-token-radius-pill);
		color: inherit;
		cursor: pointer;
		background: transparent;

		&:focus-visible {
			outline: var(--g-token-state-focus-ring-width) solid
				var(--g-token-focus-ring);
			outline-offset: var(--g-token-space-1);
		}
	}
</style>
