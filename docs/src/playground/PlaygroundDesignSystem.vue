<script lang="ts" setup>
	import { ref } from 'vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import GChip from '@/components/ui/GChip/GChip.vue';
	import GDropdown from '@/components/ui/GDropdown/GDropdown.vue';
	import GMenu from '@/components/ui/GMenu/GMenu.vue';
	import GText from '@/components/ui/GText/GText.vue';
	import GToggleButton from '@/components/ui/GToggleButton/GToggleButton.vue';
	import GTooltip from '@/components/ui/GTooltip/GTooltip.vue';
	import { createDefaultTheme, type ThemeMode } from '@/theme/default';

	const mode = ref<ThemeMode>('light');
	const toggleValue = ref(true);

	const menuItems = [
		{ label: 'Profile', value: 'profile' },
		{ label: 'Billing', value: 'billing' },
		{ label: 'Danger zone', value: 'danger' }
	];

	function applyMode(nextMode: ThemeMode) {
		mode.value = nextMode;
		createDefaultTheme('#704aff', nextMode);
	}
</script>

<template>
	<div class="design-system">
		<g-text
			type="h-4"
			label="Design system" />

		<div class="design-system__section">
			<g-text
				type="h-5"
				label="Theme modes" />

			<div class="design-system__row">
				<g-button
					:active="mode === 'light'"
					active-variant="filled"
					variant="tonal"
					label="Light"
					@click="applyMode('light')" />
				<g-button
					:active="mode === 'dark'"
					active-variant="filled"
					variant="tonal"
					label="Dark"
					@click="applyMode('dark')" />
			</div>
		</div>

		<div class="design-system__section">
			<g-text
				type="h-5"
				label="Action scale" />

			<div class="design-system__row">
				<g-button
					size="s"
					label="Button S" />
				<g-chip
					size="s"
					label="Chip S" />
				<g-toggle-button
					v-model="toggleValue"
					size="s"
					label="Toggle S" />
			</div>

			<div class="design-system__row">
				<g-button
					size="m"
					prepend="account"
					label="Button M" />
				<g-chip
					size="m"
					append-icon="close"
					label="Chip M" />
				<g-toggle-button
					v-model="toggleValue"
					size="m"
					prepend="check"
					label="Toggle M" />
			</div>

			<div class="design-system__row">
				<g-button
					size="l"
					variant="outlined"
					label="Button L" />
				<g-chip
					size="l"
					variant="tonal"
					label="Chip L" />
				<g-toggle-button
					v-model="toggleValue"
					size="l"
					variant="outlined"
					label="Toggle L" />
			</div>
		</div>

		<div class="design-system__section">
			<g-text
				type="h-5"
				label="States and overlays" />

			<div class="design-system__row">
				<g-button
					state="success"
					label="Success" />
				<g-chip
					state="warning"
					label="Warning" />
				<g-toggle-button
					v-model="toggleValue"
					state="error"
					label="Error toggle" />
			</div>

			<div class="design-system__row">
				<g-tooltip content="Tooltip token surface">
					<g-button
						variant="tonal"
						label="Tooltip" />
				</g-tooltip>

				<g-dropdown>
					<template #activator="{ activatorAttrs, activatorRef }">
						<g-button
							:ref="activatorRef"
							v-bind="activatorAttrs"
							variant="tonal"
							label="Dropdown" />
					</template>
					<g-menu
						:items="menuItems"
						state="error" />
				</g-dropdown>
			</div>
		</div>

		<div class="design-system__section">
			<g-text
				type="h-5"
				label="Core tokens" />

			<div class="design-system__token-grid">
				<div class="design-system__token-card">
					<div
						class="design-system__swatch design-system__swatch_primary" />
					<div>Primary</div>
				</div>
				<div class="design-system__token-card">
					<div
						class="design-system__swatch design-system__swatch_tint" />
					<div>Surface tint</div>
				</div>
				<div class="design-system__token-card">
					<div
						class="design-system__swatch design-system__swatch_surface" />
					<div>Surface</div>
				</div>
				<div class="design-system__token-card">
					<div
						class="design-system__swatch design-system__swatch_error" />
					<div>Error</div>
				</div>
			</div>
		</div>

		<div class="design-system__section">
			<g-text
				type="h-5"
				label="Helper classes" />

			<div class="d-flex flex-wrap gap-3 align-center">
				<div
					class="design-system__helper-card d-flex flex-column gap-2 p-3 rounded-md">
					<div class="text-center">
						`d-flex flex-column gap-2 p-3`
					</div>
					<div class="d-flex justify-between align-center gap-2">
						<g-chip label="left" />
						<g-chip label="right" />
					</div>
				</div>

				<div
					class="design-system__helper-card mt-3 px-3 py-2 rounded-lg">
					<div class="mb-2 text-right">
						`mt-3 px-3 py-2 text-right`
					</div>
					<g-button
						variant="tonal"
						label="Spacing helper" />
				</div>

				<div class="design-system__helper-card w-100 p-3 rounded-sm">
					<div class="d-flex justify-center align-center gap-2">
						<g-button
							size="s"
							label="justify-center" />
						<g-toggle-button
							v-model="toggleValue"
							size="s"
							label="align-center" />
					</div>
				</div>
			</div>

			<div class="d-grid gap-3 mt-3">
				<div
					class="design-system__helper-card d-flex flex-column gap-2 p-3 rounded-md">
					<div class="text-muted">Responsive helpers</div>
					<div
						class="d-flex flex-column flex-md-row gap-2 justify-md-between">
						<g-chip label="flex-column" />
						<g-chip label="flex-md-row" />
						<g-chip label="justify-md-between" />
					</div>
				</div>

				<div
					class="design-system__helper-card d-flex flex-wrap gap-2 p-3 rounded-md">
					<div class="text-primary">text-primary</div>
					<div class="text-error">text-error</div>
					<div class="text-warning">text-warning</div>
					<div class="text-success">text-success</div>
					<div class="text-soft">text-soft</div>
				</div>

				<div
					class="design-system__helper-card d-flex align-center gap-2 p-3 rounded-md elevation-2 bg-surface">
					<div class="opacity-50">opacity-50</div>
					<div class="opacity-75">opacity-75</div>
					<div class="px-2 py-1 rounded-pill bg-surface">
						bg-surface
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.design-system {
		display: flex;
		flex-direction: column;
		gap: var(--g-token-space-4);

		&__section {
			display: flex;
			flex-direction: column;
			gap: var(--g-token-space-3);
		}

		&__row {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-space-3);
			align-items: center;
		}

		&__token-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
			gap: var(--g-token-space-3);
		}

		&__token-card {
			display: flex;
			flex-direction: column;
			gap: var(--g-token-space-2);

			padding: var(--g-token-space-3);
			border: var(--g-token-overlay-border);
			border-radius: var(--g-token-overlay-radius);

			background: var(--g-token-overlay-surface);
			box-shadow: var(--g-token-elevation-1);
		}

		&__swatch {
			height: 48px;
			border-radius: var(--g-token-radius-sm);

			&_primary {
				background: var(--g-token-color-primary);
			}

			&_tint {
				position: relative;
				overflow: hidden;
				background: var(--g-token-color-surface);

				&::before {
					pointer-events: none;
					content: '';

					position: absolute;
					inset: 0;

					opacity: var(--g-token-state-tonal-opacity);
					background: var(--g-token-color-primary);
				}
			}

			&_surface {
				border: var(--g-token-overlay-border);
				background: var(--g-token-color-surface);
			}

			&_error {
				background: var(--g-token-color-error);
			}
		}

		&__helper-card {
			min-width: 220px;
			border: var(--g-token-overlay-border);
			background: var(--g-token-overlay-surface);
			box-shadow: var(--g-token-elevation-1);
		}
	}
</style>
