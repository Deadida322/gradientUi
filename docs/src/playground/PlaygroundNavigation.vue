<script setup lang="ts">
	import { ref } from 'vue';
	import GButton from '@/components/ui/GButton/GButton.vue';
	import GDropdownGroup from '@/components/ui/GDropdownGroup/GDropdownGroup.vue';
	import GIcon from '@/components/ui/GIcon/GIcon.vue';
	import GAside from '@/components/ui/GAside/GAside.vue';
	import GAsideGroup from '@/components/ui/GAside/GAsideGroup.vue';
	import GAsideItem from '@/components/ui/GAside/GAsideItem.vue';
	import GNavbar from '@/components/ui/GNavbar/GNavbar.vue';
	import GNavbarItem from '@/components/ui/GNavbar/GNavbarItem.vue';
	import GNavbarMenu from '@/components/ui/GNavbar/GNavbarMenu.vue';
	import GNavbarSubItem from '@/components/ui/GNavbar/GNavbarSubItem.vue';
	import GText from '@/components/ui/GText/GText.vue';

	type NavKey =
		| 'overview'
		| 'products'
		| 'theme-color'
		| 'layout-grid'
		| 'component-button'
		| 'component-alert'
		| 'component-loading'
		| 'component-input'
		| 'component-checkbox'
		| 'component-switch'
		| 'analytics'
		| 'settings';

	const active = ref<NavKey>('overview');
	const defaultColorActive = ref('default-home');
	const compactActive = ref('docs');
	const warmActive = ref('billing');
	const hideOnScroll = ref(false);
	const asideActive = ref('default');
	const asideLeft = ref('group');
	const fixedAside = ref('api');
</script>

<template>
	<section class="navigation-playground">
		<g-text
			type="h-5"
			label="Navigation" />

		<div class="navigation-playground__controls">
			<g-button
				size="s"
				variant="tonal"
				color="teal-500"
				:label="
					hideOnScroll
						? 'Disable hide on scroll'
						: 'Enable hide on scroll'
				"
				@click="hideOnScroll = !hideOnScroll" />
			<div class="navigation-playground__value">active: {{ active }}</div>
		</div>

		<g-navbar
			v-model="active"
			:hide-on-scroll="hideOnScroll"
			color="blue-500"
			active-color="teal-500"
			elevated
			aria-label="Product navigation">
			<template #prepend>
				<div class="navigation-brand">
					<g-icon
						v-gradient-icon="'teal-500'"
						icon="star-four-points"
						size="22" />
					<span>Gradient UI</span>
				</div>
			</template>

			<g-navbar-item
				value="overview"
				label="Overview"
				prepend-icon="view-dashboard-outline" />

			<g-navbar-menu
				value="products"
				label="Products">
				<template #dropdown>
					<div class="navigation-menu">
						<g-dropdown-group label="Theme">
							<g-navbar-sub-item
								value="theme-color"
								label="Color" />
						</g-dropdown-group>

						<g-dropdown-group label="Layout">
							<g-navbar-sub-item
								value="layout-grid"
								label="Grid" />
						</g-dropdown-group>

						<g-dropdown-group label="Components">
							<g-navbar-sub-item
								value="component-button"
								label="Button" />
							<g-navbar-sub-item
								value="component-alert"
								label="Alert" />
							<g-navbar-sub-item
								value="component-loading"
								label="Loading" />
							<g-navbar-sub-item
								value="component-input"
								label="Input" />
							<g-navbar-sub-item
								value="component-checkbox"
								label="Checkbox" />
							<g-navbar-sub-item
								value="component-switch"
								label="Switch" />
						</g-dropdown-group>
					</div>
				</template>
			</g-navbar-menu>

			<g-navbar-item
				value="analytics"
				label="Analytics"
				prepend-icon="chart-line" />

			<g-navbar-item
				value="settings"
				label="Settings">
				<template #append="{ selected }">
					<g-icon
						:icon="selected ? 'cog' : 'cog-outline'"
						size="16" />
				</template>
			</g-navbar-item>

			<template #append>
				<g-button
					size="s"
					variant="gradient"
					color="teal-500"
					label="Create"
					prepend="plus" />
			</template>
		</g-navbar>

		<div class="navigation-playground__surface">
			<g-text
				type="subtitle-1"
				label="Page surface" />
			<p>
				The selected item controls the gradient underline. Dropdown
				items use the same activator contract and still participate in
				the navbar selection model.
			</p>
		</div>

		<div class="navigation-playground__examples">
			<g-text
				type="subtitle-1"
				label="Aside / table of contents" />

			<div class="navigation-playground__aside-stage">
				<div class="navigation-playground__aside-demo">
					<div class="navigation-playground__aside-copy">
						<g-text
							type="subtitle-1"
							label="Inside container" />
						<p>
							Compact aside can sit inside a content block as a
							lightweight section index.
						</p>
						<div class="navigation-playground__aside-card">
							Inline mode keeps layout flow untouched.
						</div>
					</div>

					<g-aside
						v-model="asideActive"
						color="blue-grey-500"
						active-color="primary"
						aria-label="Section navigation">
						<g-aside-item
							value="default"
							label="Default" />
						<g-aside-group
							label="Group"
							collapsible>
							<g-aside-item
								value="group"
								label="Overview" />
							<g-aside-item
								value="reduce"
								label="Reduce" />
						</g-aside-group>
						<g-aside-item
							value="hover-expand"
							label="Hover expand" />
						<g-aside-item
							value="color"
							label="Color" />
						<g-aside-item
							value="open"
							label="Open" />
						<g-aside-item
							value="position-right"
							label="Position Right" />
						<g-aside-item
							value="api"
							label="API" />
					</g-aside>
				</div>

				<div
					class="navigation-playground__aside-demo navigation-playground__aside-demo_relative">
					<div class="navigation-playground__aside-copy">
						<g-text
							type="subtitle-1"
							label="Absolute left" />
						<p>
							Attach it to a local container with
							`position="absolute"`.
						</p>
					</div>

					<g-aside
						v-model="asideLeft"
						placement="left"
						position="absolute"
						top="24px"
						offset="24px"
						color="blue-grey-500"
						active-color="teal-500"
						aria-label="Absolute aside navigation">
						<g-aside-item
							value="default"
							label="Default" />
						<g-aside-group label="Group">
							<g-aside-item
								value="group"
								label="Group" />
							<g-aside-item
								value="reduce"
								label="Reduce" />
						</g-aside-group>
						<g-aside-item
							value="hover-expand"
							label="Hover expand" />
					</g-aside>
				</div>

				<div class="navigation-playground__value">
					inline aside: {{ asideActive }} / absolute aside:
					{{ asideLeft }} / fixed aside: {{ fixedAside }}
				</div>
			</div>

			<g-text
				type="subtitle-1"
				label="Default color navbar" />

			<g-navbar
				v-model="defaultColorActive"
				aria-label="Default color navigation">
				<g-navbar-item
					value="default-home"
					label="Home" />
				<g-navbar-item
					value="default-docs"
					label="Docs" />
				<g-navbar-item
					value="default-support"
					label="Support" />
			</g-navbar>

			<div class="navigation-playground__value">
				default color: {{ defaultColorActive }}
			</div>

			<g-text
				type="subtitle-1"
				label="Compact secondary navbar" />

			<g-navbar
				v-model="compactActive"
				density="compact"
				color="deep-purple-500"
				active-color="pink-500"
				aria-label="Compact navigation">
				<g-navbar-item
					value="docs"
					label="Docs" />
				<g-navbar-item
					value="api"
					label="API" />
				<g-navbar-item
					value="changelog"
					label="Changelog" />
			</g-navbar>

			<div class="navigation-playground__value">
				compact: {{ compactActive }}
			</div>

			<g-text
				type="subtitle-1"
				label="Prominent warm navbar" />

			<g-navbar
				v-model="warmActive"
				density="prominent"
				color="orange-500"
				active-color="amber-500"
				elevated
				aria-label="Account navigation">
				<template #prepend>
					<div class="navigation-brand navigation-brand_warm">
						<g-icon
							icon="hexagon-slice-6"
							size="22" />
						<span>Console</span>
					</div>
				</template>

				<g-navbar-item
					value="billing"
					label="Billing"
					prepend-icon="credit-card-outline" />
				<g-navbar-item
					value="teams"
					label="Teams"
					prepend-icon="account-group-outline" />
				<g-navbar-item
					value="security"
					label="Security"
					prepend-icon="shield-check-outline" />
			</g-navbar>

			<div class="navigation-playground__value">
				warm: {{ warmActive }}
			</div>

			<g-text
				type="subtitle-1"
				label="Uncontrolled navbar" />

			<g-navbar
				default-value="home"
				color="green-500"
				active-color="teal-500"
				aria-label="Uncontrolled navigation">
				<g-navbar-item
					value="home"
					label="Home" />
				<g-navbar-item
					value="pricing"
					label="Pricing" />
				<g-navbar-item
					value="contact"
					label="Contact" />
			</g-navbar>

			<g-aside
				v-model="fixedAside"
				position="fixed"
				placement="right"
				top="136px"
				offset="24px"
				width="210"
				color="blue-grey-500"
				active-color="primary"
				aria-label="Fixed page aside">
				<g-aside-item
					value="default"
					label="Default" />
				<g-aside-group
					label="Group"
					collapsible>
					<g-aside-item
						value="group"
						label="Group" />
					<g-aside-item
						value="reduce"
						label="Reduce" />
				</g-aside-group>
				<g-aside-item
					value="hover-expand"
					label="Hover expand" />
				<g-aside-item
					value="color"
					label="Color" />
				<g-aside-item
					value="open"
					label="Open" />
				<g-aside-item
					value="position-right"
					label="Position Right" />
				<g-aside-item
					value="api"
					label="API" />
			</g-aside>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.navigation-playground {
		display: flex;
		flex-direction: column;
		gap: var(--g-token-space-4);
		margin-block: 24px;
	}

	.navigation-playground__controls {
		display: flex;
		flex-wrap: wrap;
		gap: var(--g-token-space-3);
		align-items: center;
	}

	.navigation-playground__value {
		font-size: var(--g-token-font-size-sm);
		line-height: var(--g-token-line-height-sm);
		color: var(--g-token-color-on-surface);
	}

	.navigation-playground__surface {
		padding: var(--g-token-space-5);
		border: 1px solid rgb(var(--g-theme-outline));
		border-radius: var(--g-token-radius-lg);
		background: rgb(var(--g-theme-surface));
	}

	.navigation-playground__surface p {
		max-width: 680px;
		margin: var(--g-token-space-2) 0 0;

		font-size: var(--g-token-font-size-sm);
		line-height: var(--g-token-line-height-md);
		color: var(--g-token-color-on-surface);
	}

	.navigation-brand {
		display: inline-flex;
		gap: var(--g-token-space-2);
		align-items: center;

		font-size: var(--g-token-font-size-md);
		font-weight: var(--g-token-font-weight-bold);
		white-space: nowrap;
	}

	.navigation-brand_warm {
		color: rgb(var(--g-color-orange-500));
	}

	.navigation-menu {
		min-width: 220px;
		padding: var(--g-token-space-2) 0;
	}

	.navigation-playground__examples {
		display: flex;
		flex-direction: column;
		gap: var(--g-token-space-3);
	}

	.navigation-playground__aside-stage {
		display: grid;
		gap: var(--g-token-space-3);
	}

	.navigation-playground__aside-demo {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) auto;
		gap: var(--g-token-space-5);
		align-items: start;

		min-height: 280px;
		padding: var(--g-token-space-6);
		border-radius: var(--g-token-radius-xl);

		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--g-token-color-surface) 92%, white 8%),
			color-mix(in srgb, var(--g-token-color-surface) 98%, transparent)
		);
	}

	.navigation-playground__aside-demo_relative {
		position: relative;
		overflow: hidden;
		min-height: 320px;
		padding-left: 280px;
	}

	.navigation-playground__aside-copy {
		max-width: 520px;
	}

	.navigation-playground__aside-copy p {
		margin: var(--g-token-space-2) 0 0;
		font-size: var(--g-token-font-size-sm);
		line-height: var(--g-token-line-height-md);
		color: rgba(var(--g-theme-on-surface), 0.74);
	}

	.navigation-playground__aside-card {
		margin-top: var(--g-token-space-5);
		padding: var(--g-token-space-6);
		border-radius: var(--g-token-radius-xl);

		color: rgb(var(--g-color-orange-300));

		background: color-mix(
			in srgb,
			rgb(var(--g-color-amber-800)) 62%,
			white 38%
		);
	}
</style>
