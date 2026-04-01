import type { PropType } from 'vue';
import { type MdiIcon } from './../types/CommonTypes';
import { propsFactory } from '@/utils/propsFactory';
import { slotsFactory } from './slots';

export const makePLAProps = propsFactory({
	prepend: String as PropType<MdiIcon>,
	append: String as PropType<MdiIcon>,
	label: String
});

export const makePLASlots = slotsFactory({
	prepend: (_props: { icon: string }) => '',
	append: (_props: { label: string }) => '',
	label: (props: { label: string }) => props.label
});
