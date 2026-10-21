<script setup lang="ts">
	defineOptions({ name: 'NavbarLargeLogoExample' });
	import {
		GAvatar,
		GNavbar,
		GNavbarItem,
		GNavbarMenu,
		GNavbarSubItem
	} from '@/components';
</script>

<template>
	<div class="docs-component-detail__stack">
		<g-navbar
			default-value="home"
			class="navbar-large-logo"
			aria-label="Large logo navigation">
			<template #prepend>
				<g-avatar
					class="navbar-large-logo__brand"
					text="G"
					shape="squircle"
					variant="gradient" />
			</template>
			<g-navbar-item
				value="home"
				label="Home" />
			<g-navbar-menu label="Products">
				<template #dropdown>
					<ul>
						<g-navbar-sub-item
							value="library"
							label="Component library" />
						<g-navbar-sub-item
							value="themes"
							label="Themes" />
					</ul>
				</template>
			</g-navbar-menu>
		</g-navbar>
		<p class="docs-component-detail__note">
			The large logo increases the header height. Navigation items keep
			their density height. Set --g-navbar-item-height to size them
			independently.
		</p>
	</div>
</template>

<style scoped lang="scss">
	.navbar-large-logo {
		--g-navbar-height: 112px;
		--g-navbar-item-height: 48px;

		&__brand {
			width: 96px;
			height: 96px;
		}
	}
</style>
