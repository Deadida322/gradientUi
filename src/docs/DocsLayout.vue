<script setup lang="ts">
	import { computed, ref, watch } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import {
		GAside,
		GAsideItem,
		GButton,
		GDrawer,
		GNavbar,
		GNavbarGroup,
		GNavbarItem
	} from '@/components';
	import { componentApi } from '@/docs/data/componentApi';
	import { docsNavigation } from '@/docs/data/navigation';
	import { docsPageAside } from '@/docs/data/pageAside';

	const route = useRoute();
	const router = useRouter();
	const drawerOpen = ref(false);
	const navbarItems = computed(() =>
		docsNavigation
			.flatMap((group) => group.items)
			.filter((item) => item.to !== '/docs/components')
	);
	const componentsGroupValue = computed(() =>
		route.path.startsWith('/docs/components')
			? route.path
			: '/docs/components'
	);
	const pageAsideItems = computed(() => docsPageAside[route.path] ?? []);
	const resolvedPageAsideItems = computed(() => {
		if (pageAsideItems.value.length) return pageAsideItems.value;

		if (route.path.startsWith('/docs/components/')) {
			if (
				route.params.componentId === 'button' ||
				route.params.componentId === 'chip'
			) {
				return [
					{ label: 'Usage', href: '#usage' },
					{ label: 'Examples', href: '#examples' },
					{ label: 'API', href: '#api' }
				];
			}

			return [
				{ label: 'Usage', href: '#usage' },
				{ label: 'API', href: '#api' }
			];
		}

		return [];
	});

	const openDrawer = () => {
		drawerOpen.value = true;
	};

	const navigate = (to: string) => {
		void router.push(to);
	};

	watch(
		() => route.fullPath,
		() => {
			drawerOpen.value = false;
		}
	);
</script>

<template>
	<div class="docs-layout">
		<g-navbar
			class="docs-layout__navbar"
			:model-value="route.path"
			density="compact"
			hide-on-scroll
			aria-label="Documentation navigation">
			<template #prepend>
				<router-link
					class="docs-layout__brand docs-layout__brand_navbar"
					to="/docs/get-started">
					<span class="docs-layout__brand-mark"></span>
					<span>Gradient UI</span>
				</router-link>
			</template>

			<g-navbar-item
				v-for="item in navbarItems"
				:key="item.to"
				:label="item.label"
				:value="item.to"
				@click="navigate(item.to)" />

			<g-navbar-group
				label="Components"
				:value="componentsGroupValue"
				@click="navigate('/docs/components')">
				<template #dropdown>
					<div class="docs-layout__components-menu">
						<router-link
							class="docs-layout__components-link"
							to="/docs/components">
							<span>Overview</span>
							<small>Groups, anatomy and usage</small>
						</router-link>
						<router-link
							v-for="component in componentApi"
							:key="component.id"
							class="docs-layout__components-link"
							:to="`/docs/components/${component.id}`">
							<span>{{ component.title }}</span>
							<small>{{ component.description }}</small>
						</router-link>
					</div>
				</template>
			</g-navbar-group>

			<template #append>
				<g-button
					class="docs-layout__menu-button"
					size="s"
					variant="text"
					icon-button="menu"
					aria-label="Open documentation menu"
					@click="openDrawer" />
			</template>
		</g-navbar>

		<g-drawer
			v-model="drawerOpen"
			class="docs-layout__drawer"
			placement="left"
			title="Gradient UI"
			text="Documentation"
			:width="320"
			:hide-close="false">
			<nav
				class="docs-layout__nav docs-layout__nav_drawer"
				aria-label="Mobile documentation">
				<section
					v-for="group in docsNavigation"
					:key="group.title"
					class="docs-layout__nav-group">
					<h2>{{ group.title }}</h2>
					<router-link
						v-for="item in group.items"
						:key="item.to"
						class="docs-layout__nav-link"
						:to="item.to">
						{{ item.label }}
					</router-link>
				</section>
			</nav>
		</g-drawer>

		<main class="docs-layout__main">
			<router-view />
		</main>

		<aside
			v-if="resolvedPageAsideItems.length"
			class="docs-layout__page-aside"
			aria-label="Page contents">
			<g-aside
				class="docs-layout__page-toc"
				:model-value="route.hash || resolvedPageAsideItems[0]?.href"
				placement="left"
				align="start"
				indicator="line"
				surface="transparent"
				:width="200"
				aria-label="Page contents">
				<template #header>
					<h2>On this page</h2>
				</template>

				<g-aside-item
					v-for="item in resolvedPageAsideItems"
					:key="item.href"
					:label="item.label"
					:value="item.href"
					:href="item.href" />
			</g-aside>
		</aside>
	</div>
</template>

<style lang="scss">
	body {
		margin: 0;
	}

	.docs-layout {
		display: grid;
		grid-template:
			'navbar navbar' auto
			'main page-aside' 1fr
			/ minmax(0, 1fr) minmax(180px, 240px);

		min-height: 100vh;

		text-align: left;

		background:
			radial-gradient(
				circle at top left,
				rgba(var(--g-theme-primary), 0.14),
				transparent 32rem
			),
			rgb(var(--g-theme-background));

		&__navbar {
			grid-area: navbar;
		}

		&__brand {
			display: inline-flex;
			gap: var(--g-token-space-3);
			align-items: center;

			margin-bottom: var(--g-token-space-6);

			font-size: var(--g-token-font-size-lg);
			font-weight: var(--g-token-font-weight-bold);
			color: var(--g-token-color-on-surface);
			text-decoration: none;

			&_navbar {
				margin-bottom: 0;
			}
		}

		&__brand-mark {
			width: 28px;
			height: 28px;
			border-radius: var(--g-token-radius-md);

			background: var(--g-token-gradient-main);
			box-shadow: var(--g-token-elevation-2);
		}

		&__nav {
			display: grid;
			gap: var(--g-token-space-5);

			&_drawer {
				padding-top: var(--g-token-space-2);
			}
		}

		&__nav-group {
			display: grid;
			gap: var(--g-token-space-1);

			h2 {
				margin: 0 0 var(--g-token-space-2);

				font-size: var(--g-token-font-size-xs);
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-text-muted);
				text-transform: uppercase;
			}
		}

		&__nav-link {
			padding: var(--g-token-space-2) var(--g-token-space-3);
			border-radius: var(--g-token-radius-sm);

			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-medium);
			color: var(--g-token-text-soft);
			text-decoration: none;

			&:hover,
			&.router-link-active {
				color: var(--g-token-color-primary);
				background: rgba(var(--g-theme-primary), 0.08);
			}

			&:focus-visible {
				outline: var(--g-token-state-focus-ring-width) solid
					var(--g-token-focus-ring);
				outline-offset: 2px;
			}
		}

		&__main {
			grid-area: main;
			min-width: 0;
			padding: var(--g-token-space-6);
		}

		&__page-aside {
			position: sticky;
			top: calc(var(--g-navbar-height, 56px) + var(--g-token-space-4));

			overflow: hidden auto;
			grid-area: page-aside;
			align-self: start;

			max-width: 100%;
			max-height: calc(
				100vh - var(--g-navbar-height, 56px) - var(--g-token-space-6)
			);
			margin: var(--g-token-space-4) var(--g-token-space-5)
				var(--g-token-space-5) 0;
			border-left: 1px solid var(--g-token-border-subtle);
		}

		&__page-toc {
			box-sizing: border-box;
			width: 100%;

			h2 {
				margin: 0 0 var(--g-token-space-2);

				font-size: var(--g-token-font-size-xs);
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-text-muted);
				text-transform: uppercase;
			}
		}

		&__menu-button {
			display: inline-flex;
		}

		&__components-menu {
			display: grid;
			gap: var(--g-token-space-1);

			width: min(320px, calc(100vw - var(--g-token-space-6)));
			max-width: 100%;
			padding: var(--g-token-space-2);
		}

		&__components-link {
			display: grid;
			gap: 2px;

			min-width: 0;
			padding: var(--g-token-space-2) var(--g-token-space-3);
			border-radius: var(--g-token-radius-sm);

			text-decoration: none;

			span {
				overflow: hidden;

				font-size: var(--g-token-font-size-sm);
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-color-on-surface);
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			small {
				overflow: hidden;

				font-size: var(--g-token-font-size-xs);
				line-height: var(--g-token-line-height-xs);
				color: var(--g-token-text-muted);
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			&:hover,
			&.router-link-active {
				background: rgba(var(--g-theme-primary), 0.08);

				span {
					color: var(--g-token-color-primary);
				}
			}
		}
	}

	.docs-page {
		display: grid;
		gap: var(--g-token-space-6);
		width: min(100%, 1040px);
		margin: 0 auto;

		:where(p, li, span, dd, dt) > code {
			padding: 2px 6px;
			border: 1px solid rgba(var(--g-theme-on-surface), 0.08);
			border-radius: var(--g-token-radius-xs);

			font-family: SFMono-Regular, Consolas, 'Liberation Mono', monospace;
			font-size: 0.92em;
			color: var(--g-token-color-primary);

			background: rgba(var(--g-theme-primary), 0.07);
		}

		&__header {
			display: grid;
			gap: var(--g-token-space-3);
			padding: var(--g-token-space-6) 0 var(--g-token-space-4);

			h1 {
				margin: 0;

				font-size: 44px;
				font-weight: var(--g-token-font-weight-bold);
				line-height: 52px;
				color: var(--g-token-color-on-surface);
			}

			p {
				max-width: 760px;
				margin: 0;

				font-size: var(--g-token-font-size-lg);
				line-height: var(--g-token-line-height-xl);
				color: var(--g-token-text-soft);
			}
		}

		&__eyebrow {
			font-size: var(--g-token-font-size-sm) !important;
			font-weight: var(--g-token-font-weight-bold) !important;
			color: var(--g-token-color-primary) !important;
			text-transform: uppercase;
		}

		&__section {
			position: relative;
			display: grid;
			gap: var(--g-token-space-4);
			padding-block: var(--g-token-space-2);

			h2,
			h3,
			p {
				margin: 0;
			}

			h2 {
				font-size: 28px;
				font-weight: var(--g-token-font-weight-bold);
				line-height: 36px;
				color: var(--g-token-color-on-surface);
			}

			h3 {
				font-size: var(--g-token-font-size-lg);
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-color-on-surface);
			}

			p {
				max-width: 760px;
				font-size: var(--g-token-font-size-md);
				line-height: var(--g-token-line-height-lg);
				color: var(--g-token-text-soft);
			}
		}

		&__grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
			gap: var(--g-token-space-4);
		}

		&__anchor {
			position: absolute;
			top: calc(
				(var(--g-navbar-height, 56px) + var(--g-token-space-4)) * -1
			);
		}

		&__tile {
			display: grid;
			gap: var(--g-token-space-2);

			padding: var(--g-token-space-5);
			border: 1px solid var(--g-token-border-subtle);
			border-radius: var(--g-token-radius-md);

			background: rgba(var(--g-theme-surface), 0.72);

			h2,
			h3,
			p {
				margin: 0;
			}

			h2,
			h3 {
				font-size: var(--g-token-font-size-lg);
				font-weight: var(--g-token-font-weight-bold);
				color: var(--g-token-color-on-surface);
			}

			p {
				font-size: var(--g-token-font-size-sm);
				line-height: var(--g-token-line-height-lg);
				color: var(--g-token-text-soft);
			}
		}

		&__preview {
			display: flex;
			flex-wrap: wrap;
			gap: var(--g-token-space-3);
			align-items: center;

			min-height: 92px;
			padding: var(--g-token-space-4);
			border: 1px dashed var(--g-token-border-strong);
			border-radius: var(--g-token-radius-md);

			background: rgba(var(--g-theme-surface), 0.72);
		}

		&__link {
			width: fit-content;
			font-weight: var(--g-token-font-weight-medium);
			color: var(--g-token-color-primary);
		}
	}

	@media (width <= 780px) {
		.docs-layout {
			grid-template:
				'navbar' auto
				'main' 1fr
				/ minmax(0, 1fr);

			&__navbar {
				:deep(.g-navbar__items) {
					display: none;
				}
			}

			&__main {
				padding: var(--g-token-space-4);
			}

			&__menu-button {
				display: inline-flex;
			}

			&__page-aside {
				display: none;
			}
		}
	}
</style>
