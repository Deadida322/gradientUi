import { computed, onMounted, ref } from 'vue';
import type {
	PluginCommand,
	PluginSettings,
	PluginToUiMessage
} from '../../protocol';
import { clone } from './utils';

export const usePluginBridge = (
	state: PluginSettings,
	statusText: { value: string },
	assignSettings: (settings: PluginSettings) => void
) => {
	const selectionCount = ref(0);
	const runningCommand = ref<PluginCommand | null>(null);
	const hasSelection = computed(() => selectionCount.value > 0);
	const isWorking = computed(() => runningCommand.value !== null);

	const runCommand = (command: PluginCommand) => {
		if (runningCommand.value) return;

		state.colors = undefined;
		runningCommand.value = command;
		statusText.value = 'Working...';
		parent.postMessage(
			{
				pluginMessage: {
					command,
					settings: clone(state),
					type: 'run-command'
				}
			},
			'*'
		);
	};

	onMounted(() => {
		window.onmessage = (
			event: MessageEvent<{ pluginMessage?: PluginToUiMessage }>
		) => {
			const message = event.data.pluginMessage;
			if (!message) return;

			if (message.type === 'ready') {
				selectionCount.value = message.selectionCount;
				assignSettings(message.settings);
				statusText.value = 'Ready.';
				return;
			}

			if (message.type === 'selection-change') {
				selectionCount.value = message.selectionCount;
				return;
			}

			if (message.type === 'error') {
				if (!message.command || message.command === runningCommand.value) {
					runningCommand.value = null;
				}
				statusText.value = message.message;
				return;
			}

			if (message.type === 'result') {
				if (message.command === runningCommand.value) {
					runningCommand.value = null;
				}
				statusText.value = message.message;
			}
		};
	});

	return {
		hasSelection,
		isWorking,
		runCommand,
		runningCommand
	};
};
