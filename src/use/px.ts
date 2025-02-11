import { computed, type Ref, type ComputedRef } from 'vue';
export default (value: Ref): ComputedRef =>
	computed((): string => {
		if (+value.value) {
			return `${value.value}px`;
		}
		return value.value;
	});
