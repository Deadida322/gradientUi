<script setup lang="ts">
	/* global useGradientUI:readonly */

	import { onMounted, ref } from 'vue';
	import { useLoading, useSnackbar } from '@gradient-ui/core';
	import { useSsrViewport } from '@gradient-ui/core/ssr';

	const hydrated = ref(false);
	const modalOpen = ref(true);
	const drawerOpen = ref(false);
	const directiveLoading = ref(true);
	const loading = useLoading();
	const snackbar = useSnackbar();
	const services = useGradientUI();
	const ssrViewport = useSsrViewport();
	const sharedServices =
		loading === services.loading && snackbar === services.snackbar;

	const showSnackbar = () => {
		snackbar.show({ text: 'Hydrated snackbar', timeout: 0 });
	};
	const showLoading = () => {
		loading.show({
			target: '#service-loading-target',
			text: 'Hydrated loading'
		});
	};

	onMounted(() => {
		hydrated.value = true;
	});
</script>

<template>
	<main
		:data-hydrated="hydrated"
		:data-shared-services="sharedServices"
		:data-ssr-viewport-width="ssrViewport?.width"
		:data-ssr-viewport-height="ssrViewport?.height">
		<GButton>SSR button</GButton>
		<GCheckbox
			:model-value="true"
			label="SSR checkbox" />
		<GExpansion default-open>
			<template #header>SSR expansion</template>
			SSR content
		</GExpansion>

		<GProgress
			:model-value="42"
			label="SSR progress" />

		<GGradient
			data-testid="ssr-gradient"
			:border-width="2">
			<div>SSR gradient</div>
		</GGradient>

		<GImg
			data-testid="ssr-image"
			src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9'%3E%3Crect width='16' height='9' fill='%236d45ff'/%3E%3C/svg%3E"
			alt="SSR gradient image"
			aspect-ratio="16 / 9"
			cover
			gradient="to top, rgb(0 0 0 / 55%), transparent"
			loading="eager">
			<strong>SSR image overlay</strong>
		</GImg>

		<GNavbar
			default-value="home"
			aria-label="SSR navigation">
			<GNavbarItem
				value="home"
				label="Home" />
			<GNavbarItem
				value="settings"
				label="Settings" />
		</GNavbar>

		<GTooltip content="Hydrated tooltip">
			<button
				type="button"
				data-testid="tooltip-target">
				Tooltip target
			</button>
		</GTooltip>
		<button
			v-tooltip="'Directive tooltip'"
			type="button"
			data-testid="directive-tooltip-target">
			Directive tooltip target
		</button>

		<div
			id="directive-loading-target"
			v-loading="{ active: directiveLoading, text: 'Directive loading' }">
			Directive loading target
		</div>
		<div id="service-loading-target">Service loading target</div>

		<GButton
			data-testid="open-drawer"
			@click="drawerOpen = true">
			Open drawer
		</GButton>
		<GButton
			data-testid="show-snackbar"
			@click="showSnackbar">
			Show snackbar
		</GButton>
		<GButton
			data-testid="show-loading"
			@click="showLoading">
			Show loading
		</GButton>

		<GSnackbar
			default-open
			text="SSR snackbar"
			:timeout="30_000" />

		<GModal
			v-model="modalOpen"
			title="Hydration modal">
			SSR teleported modal
		</GModal>

		<GDrawer
			v-model="drawerOpen"
			title="Hydration drawer">
			Hydrated drawer content
		</GDrawer>
	</main>
</template>
