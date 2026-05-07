/* eslint-disable vue/one-component-per-file */
import {
	createApp,
	defineComponent,
	h,
	onUnmounted,
	reactive,
	shallowRef,
	type App,
	type PropType
} from 'vue';
import GSnackbar from '@/components/ui/GSnackbar/GSnackbar.vue';
import type {
	GSnackbarAction,
	GSnackbarCloseReason,
	GSnackbarLocation,
	GSnackbarProps
} from '@/components/ui/GSnackbar/types';

export type GSnackbarTransition = 'fade' | 'scale' | 'slide-x' | 'slide-y';

export interface SnackbarOptions extends Partial<
	Omit<GSnackbarProps, 'action' | 'transition'>
> {
	action?: GSnackbarAction | string;
	location?: GSnackbarLocation;
	transition?: GSnackbarTransition;
}

interface SnackbarItem extends SnackbarOptions {
	id: number;
	open: boolean;
	action?: GSnackbarAction;
	location: GSnackbarLocation;
}

interface SnackbarHostInstance {
	app: App;
	container: HTMLElement;
	items: SnackbarItem[];
}

const DEFAULT_LOCATION: GSnackbarLocation = 'bottom-center';
const DEFAULT_TRANSITION: GSnackbarTransition = 'slide-y';
const hosts = new Map<GSnackbarLocation, SnackbarHostInstance>();
let snackbarId = 0;

function normalizeAction(action: SnackbarOptions['action']) {
	if (typeof action === 'string') {
		return {
			label: action
		};
	}

	return action;
}

function getTransitionName(
	transition: GSnackbarTransition,
	location: GSnackbarLocation
) {
	if (transition === 'fade') return 'fade';
	if (transition === 'scale') return 'scale';
	if (transition === 'slide-x') {
		return location.endsWith('right') ? 'slide-x-reverse' : 'slide-x';
	}

	return location.startsWith('top') ? 'slide-y' : 'slide-y-reverse';
}

function createSnackbarHost() {
	return defineComponent({
		name: 'GSnackbarHost',
		props: {
			items: {
				type: Array as PropType<SnackbarItem[]>,
				required: true
			},
			location: {
				type: String as PropType<GSnackbarLocation>,
				required: true
			},
			transition: {
				type: String as PropType<GSnackbarTransition>,
				required: true
			},
			close: {
				type: Function as PropType<
					(id: number, reason: GSnackbarCloseReason) => void
				>,
				required: true
			},
			remove: {
				type: Function as PropType<(id: number) => void>,
				required: true
			}
		},
		setup(props) {
			return () =>
				h(
					'div',
					{
						class: [
							'g-snackbar-stack',
							`g-snackbar-stack_location-${props.location}`
						]
					},
					[
						h(
							'div',
							{
								class: 'g-snackbar-stack__items'
							},
							props.items.map((item) =>
								h(GSnackbar, {
									key: item.id,
									...item,
									modelValue: item.open,
									position: 'static',
									transition: {
										name: getTransitionName(
											item.transition ?? props.transition,
											item.location
										),
										appear: true,
										duration: 240,
										leaveDuration: 180,
										distance: '18px',
										scale: 0.96
									},
									'onUpdate:modelValue': (value: boolean) => {
										item.open = value;
									},
									onClose: (reason: GSnackbarCloseReason) =>
										props.close(item.id, reason),
									onAfterClose: () => props.remove(item.id)
								})
							)
						)
					]
				);
		}
	});
}

function ensureHost(
	location: GSnackbarLocation,
	transition: GSnackbarTransition,
	close: (id: number, reason: GSnackbarCloseReason) => void,
	remove: (id: number) => void
) {
	const existingHost = hosts.get(location);
	if (existingHost) return existingHost;

	const container = document.createElement('div');
	container.className = 'g-snackbar-stack__container';
	document.body.appendChild(container);

	const items = reactive<SnackbarItem[]>([]);
	const app = createApp(createSnackbarHost(), {
		items,
		location,
		transition,
		close,
		remove
	});
	app.mount(container);

	const host = {
		app,
		container,
		items
	};
	hosts.set(location, host);

	return host;
}

export function useSnackbar() {
	const activeItems = shallowRef<SnackbarItem[]>([]);

	function remove(id: number) {
		for (const [location, host] of hosts.entries()) {
			const index = host.items.findIndex((item) => item.id === id);
			if (index === -1) continue;

			host.items.splice(index, 1);
			activeItems.value = activeItems.value.filter(
				(item) => item.id !== id
			);

			if (!host.items.length) {
				window.setTimeout(() => {
					if (host.items.length) return;

					host.app.unmount();
					host.container.remove();
					hosts.delete(location);
				}, 220);
			}

			return;
		}
	}

	function close(id: number, _reason: GSnackbarCloseReason = 'manual') {
		for (const host of hosts.values()) {
			const item = host.items.find((item) => item.id === id);
			if (!item) continue;

			item.open = false;
			return;
		}
	}

	function show(options: SnackbarOptions | string) {
		const normalizedOptions =
			typeof options === 'string' ? { text: options } : options;
		const location = normalizedOptions.location ?? DEFAULT_LOCATION;
		const transition = normalizedOptions.transition ?? DEFAULT_TRANSITION;
		const id = ++snackbarId;
		const item: SnackbarItem = {
			...normalizedOptions,
			id,
			open: true,
			location,
			transition,
			action: normalizeAction(normalizedOptions.action)
		};
		const host = ensureHost(location, transition, close, remove);

		host.items.push(item);
		activeItems.value = [...activeItems.value, item];

		return {
			id,
			close: (reason: GSnackbarCloseReason = 'manual') => {
				close(id, reason);
			}
		};
	}

	function closeAll() {
		for (const [location, host] of hosts.entries()) {
			host.app.unmount();
			host.container.remove();
			hosts.delete(location);
		}

		activeItems.value = [];
	}

	onUnmounted(() => {
		closeAll();
	});

	return {
		show,
		closeAll,
		items: activeItems
	};
}
