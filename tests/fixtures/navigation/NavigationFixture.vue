<script setup lang="ts">
	import { ref } from 'vue';
	import {
		GTooltip,
		GModal,
		GExpansion,
		GBottomNavigation,
		GBottomNavigationItem,
		GNavbar,
		GNavbarItem,
		GTabs,
		GTabList,
		GTab
	} from '@/components';
	const value = ref('home');
	const modalOpen = ref(false);
	const disabled = ref(false);
	const labels = ref(true);
	const destinations = ref(['home', 'search', 'saved']);
	const tab = ref('a');
	const verticalTab = ref('a');
</script>
<template>
	<main class="navigation-fixture">
		<section class="transition-fixture">
			<g-tooltip content="Smooth tooltip"
				><button id="tooltip-trigger">Tooltip</button></g-tooltip
			>
			<button
				id="toggle-modal"
				@click="modalOpen = !modalOpen">
				Toggle modal
			</button>
			<g-modal
				v-model="modalOpen"
				title="Transition modal">
				<template #default="{ close }"
					><button
						id="close-modal"
						@click="close">
						Close
					</button></template
				>
			</g-modal>
			<g-expansion
				title="Custom title tag"
				title-tag="strong"
				>Content</g-expansion
			>
		</section>
		<div class="bottom-fixture">
			<g-bottom-navigation
				v-model="value"
				:disabled="disabled"
				:show-labels="labels"
				aria-label="App sections">
				<g-bottom-navigation-item
					v-for="destination in destinations"
					:key="destination"
					:value="destination"
					:label="destination"
					icon="home" />
				<g-bottom-navigation-item
					value="disabled"
					label="disabled"
					disabled />
			</g-bottom-navigation>
			<output id="selected">{{ value }}</output>
			<button
				id="disable"
				@click="disabled = !disabled">
				Disable
			</button>
			<button
				id="labels"
				@click="labels = !labels">
				Labels
			</button>
			<button
				id="reorder"
				@click="destinations.reverse()">
				Reorder
			</button>
			<button
				id="remove"
				@click="
					destinations = destinations.filter((item) => item !== value)
				">
				Remove selected
			</button>
		</div>
		<g-bottom-navigation
			class="links-fixture"
			default-value="linked">
			<g-bottom-navigation-item
				value="linked"
				label="Linked"
				to="/saved" />
			<g-bottom-navigation-item
				value="native"
				label="Native"
				href="#home" />
		</g-bottom-navigation>
		<g-bottom-navigation
			class="morph-fixture"
			variant="gradient"
			gradient-recipe="orbitalConic"
			morph
			:morph-options="{ preset: 'ripple', blobCount: 4 }"
			default-value="home">
			<g-bottom-navigation-item
				value="home"
				icon="home"
				label="Home" />
			<g-bottom-navigation-item
				value="saved"
				icon="heart"
				label="Saved" />
		</g-bottom-navigation>
		<g-bottom-navigation
			class="glass-fixture"
			variant="glass"
			:backdrop-blur="12"
			default-value="home">
			<g-bottom-navigation-item
				value="home"
				icon="home"
				label="Home" />
			<g-bottom-navigation-item
				value="saved"
				icon="heart"
				label="Saved" />
		</g-bottom-navigation>
		<g-navbar
			class="navbar-fixture"
			default-value="a">
			<g-navbar-item
				value="a"
				label="First" />
			<g-navbar-item
				value="b"
				label="Second" />
		</g-navbar>
		<g-tabs
			v-model="tab"
			class="tabs-fixture">
			<g-tab-list aria-label="Horizontal tabs"
				><g-tab
					value="a"
					label="First" /><g-tab
					value="b"
					label="Second" /><g-tab
					value="c"
					label="Third"
					disabled
			/></g-tab-list>
		</g-tabs>
		<g-tabs
			v-model="verticalTab"
			class="vertical-fixture"
			orientation="vertical">
			<g-tab-list aria-label="Vertical tabs"
				><g-tab
					value="a"
					label="First" /><g-tab
					value="b"
					label="Second"
			/></g-tab-list>
		</g-tabs>
		<g-tabs
			class="pill-fixture"
			variant="pill"
			default-value="a"
			><g-tab-list
				><g-tab
					value="a"
					label="First" /><g-tab
					value="b"
					label="Second" /></g-tab-list
		></g-tabs>
	</main>
</template>
<style lang="scss">
	.navigation-fixture {
		display: grid;
		gap: var(--g-token-space-4);

		max-width: 680px;
		margin: auto;
		padding: var(--g-token-space-4);
	}
</style>
