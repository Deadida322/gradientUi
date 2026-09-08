import { computed, toValue, type MaybeRefOrGetter } from 'vue';
import { useNavigationController } from '@/use/navigation';
import type { GNavigationRegistration } from '@/use/navigation';
import type {
	GStepValue,
	GStepperActivation,
	GStepperItem,
	GStepperOrientation,
	GStepperResolvedItem,
	GStepperSemanticState,
	GStepperStepState
} from '@/components/ui/GStepper/types';

export interface UseStepperControllerOptions<T = unknown, V = GStepValue> {
	items: MaybeRefOrGetter<readonly GStepperItem<T, V>[] | undefined>;
	modelValue: MaybeRefOrGetter<V | undefined>;
	defaultValue?: MaybeRefOrGetter<V | undefined>;
	disabled?: MaybeRefOrGetter<boolean | undefined>;
	mandatory?: MaybeRefOrGetter<boolean | undefined>;
	linear?: MaybeRefOrGetter<boolean | undefined>;
	editable?: MaybeRefOrGetter<boolean | undefined>;
	activation?: MaybeRefOrGetter<GStepperActivation | undefined>;
	orientation?: MaybeRefOrGetter<GStepperOrientation | undefined>;
	idPrefix: string;
	onUpdateModelValue: (value: V | undefined) => void;
	onSelect?: (
		value: V | undefined,
		item: GStepperResolvedItem<T, V> | undefined,
		event?: Event
	) => void;
	onNext?: (
		value: V | undefined,
		item: GStepperResolvedItem<T, V> | undefined,
		event?: Event
	) => void;
	onPrev?: (
		value: V | undefined,
		item: GStepperResolvedItem<T, V> | undefined,
		event?: Event
	) => void;
	onFinish?: (
		value: V | undefined,
		item: GStepperResolvedItem<T, V> | undefined,
		event?: Event
	) => void;
}

export function useStepperController<T = unknown, V = GStepValue>(
	options: UseStepperControllerOptions<T, V>
) {
	const items = computed<GStepperResolvedItem<T, V>[]>(() =>
		(toValue(options.items) ?? []).map((item, index) => ({
			...item,
			index
		}))
	);
	const itemByValue = computed(
		() => new Map(items.value.map((item) => [item.value, item]))
	);
	const activeIndex = computed(() =>
		items.value.findIndex((item) =>
			Object.is(item.value, navigation.model.value)
		)
	);
	const activeItem = computed(() =>
		activeIndex.value >= 0 ? items.value[activeIndex.value] : undefined
	);
	const isRootDisabled = () => Boolean(toValue(options.disabled));
	const isStepCompleted = (item: GStepperResolvedItem<T, V>) =>
		item.completed ??
		(activeIndex.value >= 0 && item.index < activeIndex.value);
	const isStepEditable = (item: GStepperResolvedItem<T, V>) =>
		Boolean(
			toValue(options.editable) || item.editable || isStepCompleted(item)
		);
	const isStepAvailable = (item: GStepperResolvedItem<T, V>) => {
		if (isRootDisabled() || item.disabled) return false;
		if (!toValue(options.linear)) return true;
		if (activeIndex.value < 0)
			return item.index === 0 || isStepEditable(item);
		if (item.index <= activeIndex.value + 1) return true;

		return isStepEditable(item);
	};
	const canSelect = (value: V | undefined) => {
		const item =
			value === undefined ? undefined : itemByValue.value.get(value);

		return item ? isStepAvailable(item) : false;
	};
	const navigation = useNavigationController<V>({
		modelValue: () => toValue(options.modelValue),
		defaultValue: () => toValue(options.defaultValue),
		disabled: options.disabled,
		mandatory: options.mandatory,
		orientation: options.orientation,
		selectOnFocus: () => toValue(options.activation) === 'automatic',
		selectOnAction: () => toValue(options.activation) === 'manual',
		idPrefix: options.idPrefix,
		itemIdSegment: 'step',
		panelIdSegment: 'step-panel',
		canSelect,
		onUpdateModelValue: options.onUpdateModelValue,
		onSelect: (value, event) =>
			options.onSelect?.(
				value,
				value === undefined ? undefined : itemByValue.value.get(value),
				event
			)
	});
	const getNextItem = () =>
		items.value.find(
			(item) => item.index > activeIndex.value && isStepAvailable(item)
		);
	const getPrevItem = () =>
		[...items.value]
			.reverse()
			.find(
				(item) =>
					item.index < activeIndex.value && isStepAvailable(item)
			);
	const canNext = computed(() => Boolean(getNextItem()));
	const canPrev = computed(() => Boolean(getPrevItem()));
	const isLast = computed(() => {
		const enabledItems = items.value.filter(isStepAvailable);
		const lastItem = enabledItems.at(-1);

		return Boolean(
			lastItem && Object.is(lastItem.value, navigation.model.value)
		);
	});
	const getItemState = (
		item: GStepperResolvedItem<T, V>
	): GStepperStepState => {
		if (!isStepAvailable(item)) return 'disabled';
		if (item.state === 'error' || item.error) return 'error';
		if (navigation.isSelected(item.value)) return 'active';
		if (isStepCompleted(item)) return 'completed';

		return 'pending';
	};
	const getItemSemanticState = (
		item: GStepperResolvedItem<T, V>
	): GStepperSemanticState | undefined => {
		if (item.state) return item.state;
		if (item.error) return 'error';

		return undefined;
	};
	const registerStep = (registration: GNavigationRegistration<V>) => {
		const item =
			registration.value === undefined
				? undefined
				: itemByValue.value.get(registration.value);

		navigation.registerItem({
			...registration,
			disabled:
				registration.disabled || (item ? !isStepAvailable(item) : true)
		});
	};
	const select = (value: V | undefined, event?: Event) =>
		navigation.select(value, event);
	const next = (event?: Event) => {
		const item = getNextItem();

		if (!item) return;

		select(item.value, event);
		options.onNext?.(item.value, item, event);
	};
	const prev = (event?: Event) => {
		const item = getPrevItem();

		if (!item) return;

		select(item.value, event);
		options.onPrev?.(item.value, item, event);
	};
	const finish = (event?: Event) => {
		options.onFinish?.(navigation.model.value, activeItem.value, event);
	};

	return {
		...navigation,
		items,
		activeIndex,
		activeItem,
		canNext,
		canPrev,
		isLast,
		isStepAvailable,
		isStepCompleted,
		getItemState,
		getItemSemanticState,
		registerStep,
		select,
		next,
		prev,
		finish
	};
}
