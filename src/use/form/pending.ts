import { computed, nextTick, shallowReactive, watch, type Ref } from 'vue';

export const createFormPendingTasks = () => {
	const tasks = shallowReactive(new Set<Readonly<Ref<boolean>>>());
	const pending = computed(() => [...tasks].some((task) => task.value));
	const registerPending = (task: Readonly<Ref<boolean>>) => {
		tasks.add(task);
		return () => tasks.delete(task);
	};
	const waitForPending = async () => {
		while (pending.value) {
			await new Promise<void>((resolve) => {
				const stop = watch(
					pending,
					(value) => {
						if (!value) {
							stop();
							resolve();
						}
					},
					{ flush: 'post' }
				);
			});
			await nextTick();
		}
	};
	return { pending, registerPending, waitForPending };
};
