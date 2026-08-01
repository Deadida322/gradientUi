<script setup lang="ts">
	import {
		computed,
		nextTick,
		onBeforeUnmount,
		onMounted,
		ref,
		watch
	} from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import {
		GAside,
		GAsideItem,
		GButton,
		GDrawer,
		GNavbar,
		GNavbarItem,
		GNavbarMenu,
		GNavGroup,
		GNavItem,
		GNavList,
		GSwitch,
		useBreakpoints
	} from '@/components';
	import DocsReleaseBadge from '@docs/components/DocsReleaseBadge.vue';
	import { componentCatalog, componentGroups } from '@docs/data/componentApi';
	import { docsNavigation } from '@docs/data/navigation';
	import { docsPageAside } from '@docs/data/pageAside';
	import { useDocsTheme } from '@docs/use/docsTheme';
	import type { MdiIcon } from '@/types/CommonTypes';

	const route = useRoute();
	const router = useRouter();
	const drawerOpen = ref(false);
	const activePageAsideHref = ref('');
	const display = useBreakpoints();
	const drawerAvailable = display.down(1024);
	const { isDark } = useDocsTheme();
	let pageAsideScrollRaf = 0;
	const sourceLinks: {
		label: string;
		href: string;
		icon: MdiIcon;
	}[] = [
		{
			label: 'GitHub',
			href: 'https://github.com/Deadida322/gradientUi',
			icon: 'github'
		},
		{
			label: 'npm',
			href: 'https://www.npmjs.com/package/@gradient-ui/core',
			icon: 'npm'
		}
	];
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
	const groupedComponentMenu = computed(() =>
		componentGroups
			.map((group) => ({
				...group,
				items: componentCatalog
					.filter(
						(component) =>
							component.group === group.id && component.to
					)
					.map((component) => ({
						...component,
						to: component.to as string
					}))
			}))
			.filter((group) => group.items.length)
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
	const pageAsideModel = computed(
		() =>
			activePageAsideHref.value ||
			route.hash ||
			resolvedPageAsideItems.value[0]?.href
	);

	const openDrawer = () => {
		if (!drawerAvailable.value) return;

		drawerOpen.value = true;
	};

	const navigate = (to: string) => {
		void router.push(to);
	};

	const getPageAnchorElement = (href: string) => {
		if (!href.startsWith('#')) return null;

		return document.getElementById(href.slice(1));
	};

	const getScrollSpyOffset = () => {
		const navbarHeight =
			Number.parseFloat(
				getComputedStyle(document.documentElement).getPropertyValue(
					'--g-navbar-height'
				)
			) || 56;

		return navbarHeight + 56;
	};

	const updateActivePageAsideHref = () => {
		pageAsideScrollRaf = 0;

		const items = resolvedPageAsideItems.value;
		if (!items.length) {
			activePageAsideHref.value = '';
			return;
		}

		const offset = getScrollSpyOffset();
		const anchors = items
			.map((item) => ({
				href: item.href,
				element: getPageAnchorElement(item.href)
			}))
			.filter(
				(item): item is { href: string; element: HTMLElement } =>
					item.element instanceof HTMLElement
			);

		if (!anchors.length) {
			activePageAsideHref.value = items[0].href;
			return;
		}

		let activeHref = anchors[0].href;

		for (const anchor of anchors) {
			const top = anchor.element.getBoundingClientRect().top;

			if (top <= offset) {
				activeHref = anchor.href;
				continue;
			}

			break;
		}

		activePageAsideHref.value = activeHref;
	};

	const queuePageAsideScrollSpy = () => {
		if (pageAsideScrollRaf) return;

		pageAsideScrollRaf = window.requestAnimationFrame(
			updateActivePageAsideHref
		);
	};

	const activatePageAsideItem = (href: string) => {
		activePageAsideHref.value = href;
	};

	watch(
		() => route.fullPath,
		() => {
			drawerOpen.value = false;
			activePageAsideHref.value = route.hash;
			void nextTick(() => {
				queuePageAsideScrollSpy();
			});
		}
	);

	watch(drawerAvailable, (available) => {
		if (!available) {
			drawerOpen.value = false;
		}
	});

	watch(
		resolvedPageAsideItems,
		() => {
			activePageAsideHref.value =
				route.hash || resolvedPageAsideItems.value[0]?.href || '';
			void nextTick(() => {
				queuePageAsideScrollSpy();
			});
		},
		{ immediate: true }
	);

	onMounted(() => {
		window.addEventListener('scroll', queuePageAsideScrollSpy, {
			passive: true
		});
		window.addEventListener('resize', queuePageAsideScrollSpy);
		void nextTick(() => {
			queuePageAsideScrollSpy();
		});
	});

	onBeforeUnmount(() => {
		if (pageAsideScrollRaf) {
			window.cancelAnimationFrame(pageAsideScrollRaf);
		}

		window.removeEventListener('scroll', queuePageAsideScrollSpy);
		window.removeEventListener('resize', queuePageAsideScrollSpy);
	});
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
					<img
						class="docs-layout__brand-mark"
						src="/favicon.png"
						alt="" />
					<span>Gradient UI</span>
				</router-link>
			</template>

			<g-navbar-item
				v-for="item in navbarItems"
				:key="item.to"
				:label="item.label"
				:value="item.to"
				@click="navigate(item.to)">
				<span class="docs-layout__nav-label">
					<span>{{ item.label }}</span>
					<docs-release-badge
						v-if="item.badge"
						:badge="item.badge" />
				</span>
			</g-navbar-item>

			<g-navbar-menu
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
						<section
							v-for="group in groupedComponentMenu"
							:key="group.id"
							class="docs-layout__components-group">
							<h2>{{ group.title }}</h2>
							<router-link
								v-for="component in group.items"
								:key="component.id"
								class="docs-layout__components-link"
								:to="component.to">
								<span class="docs-layout__components-title">
									<span>{{ component.title }}</span>
									<docs-release-badge
										v-if="component.badge"
										:badge="component.badge" />
								</span>
								<small>{{ component.description }}</small>
							</router-link>
						</section>
					</div>
				</template>
			</g-navbar-menu>

			<template #append>
				<div
					class="docs-layout__source-links"
					aria-label="Project links">
					<g-button
						v-for="link in sourceLinks"
						:key="link.href"
						class="docs-layout__source-link"
						size="m"
						variant="text"
						:href="link.href"
						target="_blank"
						:icon-button="link.icon"
						:aria-label="link.label" />
				</div>

				<g-switch
					v-model="isDark"
					class="docs-layout__theme-switch"
					inline
					size="s"
					color="primary"
					:label="isDark ? 'Dark' : 'Light'" />

				<g-button
					v-if="drawerAvailable"
					class="docs-layout__menu-button"
					size="s"
					variant="text"
					icon-button="menu"
					aria-label="Open documentation menu"
					@click="openDrawer" />
			</template>
		</g-navbar>

		<g-drawer
			v-if="drawerAvailable"
			v-model="drawerOpen"
			class="docs-layout__drawer"
			placement="left"
			title="Gradient UI"
			text="Documentation"
			:width="320"
			:hide-close="false">
			<g-nav-list
				class="docs-layout__drawer-menu"
				:model-value="route.path"
				placement="left"
				align="start"
				indicator="line"
				surface="transparent"
				:width="'100%'"
				aria-label="Mobile documentation">
				<g-nav-group
					v-for="group in docsNavigation"
					:key="group.title"
					:label="group.title">
					<g-nav-item
						v-for="item in group.items"
						:key="item.to"
						:label="item.label"
						:value="item.to"
						:to="item.to">
						<span class="docs-layout__nav-label">
							<span>{{ item.label }}</span>
							<docs-release-badge
								v-if="item.badge"
								:badge="item.badge" />
						</span>
					</g-nav-item>
				</g-nav-group>

				<g-nav-group label="Components">
					<g-nav-item
						label="Overview"
						value="/docs/components"
						to="/docs/components" />
				</g-nav-group>

				<g-nav-group
					v-for="group in groupedComponentMenu"
					:key="group.id"
					:label="group.title">
					<g-nav-item
						v-for="component in group.items"
						:key="component.id"
						:label="component.title"
						:value="component.to"
						:to="component.to" />
				</g-nav-group>
			</g-nav-list>

			<template #footer>
				<div class="docs-layout__drawer-theme">
					<span>Theme</span>
					<g-switch
						v-model="isDark"
						inline
						size="s"
						color="primary"
						:label="isDark ? 'Dark' : 'Light'" />
				</div>
			</template>
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
				:model-value="pageAsideModel"
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
					:href="item.href"
					@click="activatePageAsideItem(item.href)" />
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
			display: block;
			width: 28px;
			height: 28px;
			object-fit: contain;
		}

		&__drawer-menu {
			box-sizing: border-box;
			width: 100%;
			padding: var(--g-token-space-2) 0 0;
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
			display: none;
		}

		&__source-links {
			display: inline-flex;
			gap: var(--g-token-space-1);
			align-items: center;
			margin-inline-end: var(--g-token-space-1);
		}

		&__nav-label,
		&__components-title {
			display: inline-flex;
			gap: var(--g-token-space-2);
			align-items: center;
			min-width: 0;
		}

		&__source-link {
			--g-token-icon-size-m: 24px;

			width: 40px;
			height: 40px;
		}

		&__theme-switch {
			width: auto;
			white-space: nowrap;
		}

		&__drawer-theme {
			display: flex;
			align-items: center;
			justify-content: space-between;

			padding: var(--g-token-space-3) 0 0;
			border-top: 1px solid var(--g-token-border-subtle);

			font-size: var(--g-token-font-size-sm);
			font-weight: var(--g-token-font-weight-medium);
			color: var(--g-token-text-soft);
		}

		&__components-menu {
			display: grid;
			gap: var(--g-token-space-3);

			width: min(320px, calc(100vw - var(--g-token-space-6)));
			max-width: 100%;
			padding: var(--g-token-space-2);
		}

		&__components-group {
			display: grid;
			gap: var(--g-token-space-1);

			h2 {
				margin: var(--g-token-space-1) var(--g-token-space-3);

				font-size: var(--g-token-font-size-xs);
				font-weight: var(--g-token-font-weight-bold);
				line-height: var(--g-token-line-height-xs);
				color: var(--g-token-text-muted);
				text-transform: uppercase;
			}
		}

		&__components-link {
			display: grid;
			gap: 2px;

			min-width: 0;
			padding: var(--g-token-space-2) var(--g-token-space-3);
			border-radius: var(--g-token-radius-sm);

			text-decoration: none;

			> span:not(.docs-layout__components-title),
			.docs-layout__components-title > span {
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

				> span:not(.docs-layout__components-title),
				.docs-layout__components-title > span {
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

	@media (width <= 1024px) {
		.docs-layout {
			grid-template:
				'navbar' auto
				'main' 1fr
				/ minmax(0, 1fr);

			&__navbar {
				.g-navbar__items {
					display: none;
				}
			}

			&__main {
				padding: var(--g-token-space-4);
			}

			&__menu-button {
				display: inline-flex;
			}

			&__theme-switch {
				.g-check-control__content {
					display: none;
				}
			}

			&__page-aside {
				display: none;
			}
		}
	}

	@media (width <= 560px) {
		.docs-layout {
			&__brand {
				gap: var(--g-token-space-2);
				font-size: var(--g-token-font-size-md);
			}

			&__brand-mark {
				width: 24px;
				height: 24px;
			}

			&__main {
				padding: var(--g-token-space-3);
			}
		}
	}
</style>
