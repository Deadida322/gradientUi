<script setup lang="ts">
import FButton from '../ui-kit/FButton.vue';
import { usePluginAppContext } from './context';

const app = usePluginAppContext();
</script>

<template>
	<div
		class="action-bar"
		:class="{
			'action-bar_generator': app.activeTab.value === 'generator',
			'action-bar_morph': app.activeTab.value === 'morph',
			'action-bar_tokens': app.activeTab.value === 'tokens'
		}">
		<template v-if="app.activeTab.value === 'generator'">
			<FButton
				:disabled="app.isWorking.value || !app.hasSelection.value"
				:loading="app.runningCommand.value === 'apply-current-gradient'"
				@click="app.runCommand('apply-current-gradient')">
				Apply fill
			</FButton>
			<FButton
				:disabled="app.isWorking.value || !app.hasSelection.value"
				:loading="app.runningCommand.value === 'apply-current-stroke'"
				variant="secondary"
				@click="app.runCommand('apply-current-stroke')">
				Apply stroke
			</FButton>
			<FButton
				:disabled="app.isWorking.value || !app.hasSelection.value"
				:loading="app.runningCommand.value === 'apply-current-glow'"
				variant="secondary"
				@click="app.runCommand('apply-current-glow')">
				Apply glow
			</FButton>
			<FButton
				:disabled="app.isWorking.value"
				:loading="app.runningCommand.value === 'create-current-preview'"
				variant="secondary"
				@click="app.runCommand('create-current-preview')">
				Create preview
			</FButton>
		</template>
		<template v-else-if="app.activeTab.value === 'morph'">
			<FButton
				:disabled="app.isWorking.value"
				:loading="app.runningCommand.value === 'create-current-morph-raster'"
				@click="app.createRasterMorph">
				Create background
			</FButton>
			<FButton
				:disabled="app.isWorking.value"
				:loading="app.runningCommand.value === 'create-current-morph'"
				variant="secondary"
				@click="app.runCommand('create-current-morph')">
				Create variants
			</FButton>
		</template>
		<template v-else>
			<FButton
				:disabled="app.isWorking.value"
				:loading="app.runningCommand.value === 'sync-variables'"
				@click="app.runCommand('sync-variables')">
				Sync variables
			</FButton>
			<FButton
				:disabled="app.isWorking.value"
				:loading="app.runningCommand.value === 'sync-paint-styles'"
				variant="secondary"
				@click="app.runCommand('sync-paint-styles')">
				Sync paint styles
			</FButton>
			<FButton
				:disabled="app.isWorking.value"
				:loading="app.runningCommand.value === 'generate-preview'"
				variant="secondary"
				@click="app.runCommand('generate-preview')">
				Create token page
			</FButton>
		</template>
	</div>
</template>

<style scoped>
.action-bar {
	position: fixed;
	z-index: 8;
	right: 0;
	bottom: 0;
	left: 0;

	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 8px;

	padding: 10px 12px 12px;
	border-top: 1px solid var(--figma-color-border);

	background: var(--figma-color-bg);
	box-shadow: 0 -10px 24px rgb(0 0 0 / 10%);
}

.action-bar_tokens {
	grid-template-columns: repeat(3, minmax(0, 1fr));
}

.action-bar_generator {
	grid-template-columns: repeat(4, minmax(0, 1fr));
}

.action-bar_morph {
	grid-template-columns: 1fr 1fr;
}

@media (width <= 700px) {
	.action-bar,
	.action-bar_generator,
	.action-bar_tokens {
		grid-template-columns: 1fr;
	}
}
</style>
