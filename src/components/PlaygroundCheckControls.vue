<script lang="ts" setup>
	import { ref } from 'vue';
	import GText from './ui/GText/GText.vue';
	import GCheckbox from './ui/GCheckbox/GCheckbox.vue';
	import GCheckboxGroup from './ui/GCheckboxGroup/GCheckboxGroup.vue';
	import GRadio from './ui/GRadio/GRadio.vue';
	import GSwitch from './ui/GSwitch/GSwitch.vue';
	import GSquircle from './ui/GSquircle/GSquircle.vue';
	import GToggleButton from './ui/GToggleButton/GToggleButton.vue';
	import type { GCheckboxGroupProps } from './ui/GCheckboxGroup';
	import type { GRadioProps } from './ui/GRadio';

	type AccessLevel = 'viewer' | 'editor' | 'owner';
	type ReleaseChannel = {
		id: number;
		label: string;
	};
	type FeatureOption = {
		label: string;
		value: string;
		disabled?: boolean;
	};
	type AccessOption = {
		label: string;
		value: AccessLevel;
	};

	const checkboxValue = ref(false);
	const checkboxWithMessage = ref(true);
	const switchValue = ref(false);
	const notificationsValue = ref(true);
	const toggleValue = ref(false);
	const toggleTonal = ref(true);
	const toggleText = ref(false);
	const toggleRounded = ref(true);
	const toggleSizeS = ref(false);
	const toggleSizeM = ref(true);
	const toggleSizeL = ref(false);
	const toggleSizeXL = ref(true);
	const toggleWarning = ref(false);
	const toggleError = ref(true);
	const toggleSuccess = ref(false);
	const toggleActiveVariant = ref(true);
	const toggleIconOnly = ref(true);
	const sizeS = ref(false);
	const sizeM = ref(true);
	const sizeL = ref(false);
	const sizeXL = ref(true);
	const warningValue = ref(true);
	const errorValue = ref(false);
	const successValue = ref(true);
	const colorCheckbox = ref(true);
	const colorSwitch = ref(true);
	const colorRadio = ref<'red' | 'teal' | 'purple'>('teal');
	const squircleCheckbox = ref(true);
	const squircleRadio = ref<'compact' | 'expressive' | 'dense'>('compact');
	const diamondCheckbox = ref(true);
	const softCheckbox = ref(true);
	const blobCheckbox = ref(true);
	const cutCornerCheckbox = ref(true);
	const diamondRadio = ref<'one' | 'two' | 'three'>('two');
	const softRadio = ref<'alpha' | 'beta' | 'gamma'>('beta');
	const blobRadio = ref<'north' | 'south' | 'west'>('south');
	const cutCornerRadio = ref<'draft' | 'ship' | 'hold'>('ship');
	const selectedFeatures = ref<string[]>(['analytics']);
	const validatedFeatures = ref<string[]>([]);
	const accessLevel = ref<AccessLevel | null>('editor');
	const validatedAccess = ref<AccessLevel | null>(null);
	const releaseChannel = ref<ReleaseChannel | null>(null);

	const featureOptions: FeatureOption[] = [
		{ label: 'Analytics', value: 'analytics' },
		{ label: 'Auto-save', value: 'autosave' },
		{ label: 'Live collaboration', value: 'collaboration' },
		{ label: 'Audit trail', value: 'audit', disabled: true }
	];

	const accessOptions: AccessOption[] = [
		{ label: 'Viewer', value: 'viewer' },
		{ label: 'Editor', value: 'editor' },
		{ label: 'Owner', value: 'owner' }
	];

	const releaseOptions: ReleaseChannel[] = [
		{ id: 1, label: 'Stable' },
		{ id: 2, label: 'Beta' },
		{ id: 3, label: 'Nightly' }
	];
	const squircleColors = [
		'red40',
		'pink40',
		'orange40',
		'teal40',
		'blue40',
		'deep-purple-40'
	];
	const colorRadioOptions = ['red', 'teal', 'purple'] as const;
	const featureGroupProps: Omit<
		GCheckboxGroupProps<FeatureOption, string, false>,
		'modelValue'
	> = {
		options: featureOptions,
		labelKey: 'label',
		valueKey: 'value'
	};
	const accessRadioProps: Omit<
		GRadioProps<AccessOption, AccessLevel, false>,
		'modelValue'
	> = {
		options: accessOptions,
		labelKey: 'label',
		valueKey: 'value'
	};
	const releaseRadioProps: Omit<
		GRadioProps<ReleaseChannel, ReleaseChannel, true>,
		'modelValue'
	> = {
		options: releaseOptions,
		labelKey: 'label',
		returnObject: true,
		valueComparator: (a, b) => a?.id === b?.id
	};

	const requireFeatures = (value: string[]) =>
		value.length > 0 ? true : 'Choose at least one feature';
	const requireAccess = (value: AccessLevel | null) =>
		value ? true : 'Access level is required';
	const requireChecked = (value: boolean) =>
		value ? true : 'Consent is required';
</script>

<template>
	<g-text
		type="h-5"
		label="Check controls examples" />

	<div class="col">
		<div class="row row_two">
			<g-checkbox
				v-model="checkboxValue"
				label="Enable workspace"
				message="Classic boolean checkbox with validation-ready field contract" />

			<g-switch
				v-model="switchValue"
				label="Live updates"
				message="Switch is built on the same base control primitives" />
		</div>

		<div class="row row_two">
			<g-toggle-button
				v-model="toggleValue"
				label="Pin panel"
				prepend="pin"
				variant="outlined"
				message="Toggle button extends the same boolean form foundation" />

			<g-toggle-button
				v-model="toggleRounded"
				label="Rounded selection"
				prepend="check-circle-outline"
				append="chevron-down"
				variant="tonal"
				rounded />
		</div>

		<div class="row row_three">
			<g-toggle-button
				v-model="toggleTonal"
				label="Tonal"
				prepend="flash"
				variant="tonal" />
			<g-toggle-button
				v-model="toggleText"
				label="Text"
				prepend="format-text"
				variant="text" />
			<g-toggle-button
				v-model="toggleValue"
				label="Outlined"
				prepend="pin"
				variant="outlined" />
		</div>

		<div class="row row_four">
			<g-toggle-button
				v-model="toggleSizeS"
				size="s"
				label="Size S"
				prepend="minus" />
			<g-toggle-button
				v-model="toggleSizeM"
				size="m"
				label="Size M"
				prepend="equal" />
			<g-toggle-button
				v-model="toggleSizeL"
				size="l"
				label="Size L"
				prepend="plus" />
			<g-toggle-button
				v-model="toggleSizeXL"
				size="xl"
				label="Size XL"
				prepend="resize" />
		</div>

		<div class="row row_three">
			<g-toggle-button
				v-model="toggleWarning"
				label="Warning"
				prepend="alert-outline"
				state="warning" />
			<g-toggle-button
				v-model="toggleError"
				label="Error"
				prepend="alert-circle-outline"
				state="error" />
			<g-toggle-button
				v-model="toggleSuccess"
				label="Success"
				prepend="check"
				state="success" />
		</div>

		<div class="row row_two">
			<g-toggle-button
				v-model="toggleActiveVariant"
				label="Active variant glow"
				prepend="star-four-points"
				variant="text"
				active-variant="tonal"
				message="`active-variant` applies only while the toggle is selected" />

			<g-toggle-button
				v-model="toggleActiveVariant"
				label="Outlined to filled"
				prepend="swap-horizontal"
				variant="outlined"
				active-variant="filled" />
		</div>

		<div class="row row_two">
			<g-toggle-button
				v-model="toggleIconOnly"
				prepend="heart-outline"
				variant="outlined"
				message="Compact icon-only toggle via prepend slot/prop" />

			<g-toggle-button
				v-model="toggleIconOnly"
				variant="text">
				<template #prepend>
					<span>AI</span>
				</template>
				Custom slot label
			</g-toggle-button>
		</div>

		<div class="row row_two">
			<g-checkbox
				v-model="checkboxWithMessage"
				label="Custom slots">
				Receive digest reports
				<template #message>
					This helper comes from the `message` slot.
				</template>
			</g-checkbox>

			<g-switch
				v-model="notificationsValue"
				label="Notifications"
				state="success">
				<template #message
					>Success state styling is shared too.</template
				>
			</g-switch>
		</div>

		<div class="row row_four">
			<g-checkbox
				v-model="sizeS"
				size="s"
				label="Size S" />
			<g-checkbox
				v-model="sizeM"
				size="m"
				label="Size M" />
			<g-checkbox
				v-model="sizeL"
				size="l"
				label="Size L" />
			<g-switch
				v-model="sizeXL"
				size="xl"
				label="Size XL" />
		</div>

		<div class="row row_three">
			<g-checkbox
				v-model="warningValue"
				label="Warning"
				state="warning" />
			<g-checkbox
				v-model="errorValue"
				label="Error"
				state="error" />
			<g-switch
				v-model="successValue"
				label="Success"
				state="success" />
		</div>

		<div class="row row_three">
			<g-checkbox
				v-model="colorCheckbox"
				color="red40"
				label="Red 40" />
			<g-switch
				v-model="colorSwitch"
				color="teal40"
				label="Teal 40" />
			<g-radio
				v-model="colorRadio"
				color="deep-purple-40"
				label="Deep purple"
				:options="colorRadioOptions" />
		</div>

		<div class="row row_two">
			<g-checkbox
				v-model="squircleCheckbox"
				color="pink40"
				indicator-view="squircle"
				label="Squircle checkbox" />
			<g-radio
				v-model="squircleRadio"
				color="blue40"
				indicator-view="squircle"
				label="Squircle radio"
				:options="['compact', 'expressive', 'dense']" />
		</div>

		<div class="row row_four">
			<g-checkbox
				v-model="diamondCheckbox"
				color="orange40"
				indicator-view="diamond"
				label="Diamond" />
			<g-checkbox
				v-model="softCheckbox"
				color="teal40"
				indicator-view="soft"
				label="Soft" />
			<g-radio
				v-model="diamondRadio"
				color="red40"
				indicator-view="diamond"
				label="Diamond radio"
				:options="['one', 'two', 'three']" />
			<g-radio
				v-model="softRadio"
				color="green40"
				indicator-view="soft"
				label="Soft radio"
				:options="['alpha', 'beta', 'gamma']" />
		</div>

		<div class="row row_two">
			<g-checkbox
				v-model="blobCheckbox"
				color="deep-purple-40"
				indicator-view="blob"
				label="Blob checkbox" />
			<g-radio
				v-model="blobRadio"
				color="pink40"
				indicator-view="blob"
				label="Blob radio"
				:options="['north', 'south', 'west']" />
		</div>

		<div class="row row_two">
			<g-checkbox
				v-model="cutCornerCheckbox"
				color="blue-grey-40"
				indicator-view="cut-corner"
				label="Cut-corner checkbox" />
			<g-radio
				v-model="cutCornerRadio"
				color="amber40"
				indicator-view="cut-corner"
				label="Cut-corner radio"
				:options="['draft', 'ship', 'hold']" />
		</div>

		<div class="squircle-demo">
			<g-squircle
				v-for="color in squircleColors"
				:key="`tonal-${color}`"
				:color="color"
				variant="tonal"
				:size="44"
				:shadow="false"
				:border="1"
				border-color="color-mix(in srgb, var(--g-color) 38%, transparent)">
				{{ color.slice(0, 1).toUpperCase() }}
			</g-squircle>
			<g-squircle
				v-for="color in squircleColors"
				:key="`primary-${color}`"
				:color="color"
				variant="primary"
				:size="44"
				:shadow="false">
				{{ color.slice(0, 1).toUpperCase() }}
			</g-squircle>
		</div>

		<g-checkbox-group
			v-model="selectedFeatures"
			label="Feature toggles"
			v-bind="featureGroupProps"
			vertical />
		<div class="value-line">selected features: {{ selectedFeatures }}</div>

		<g-checkbox-group
			v-model="validatedFeatures"
			label="Validated checkbox group"
			v-bind="featureGroupProps"
			:rules="[requireFeatures]" />
		<div class="value-line">
			validated features: {{ validatedFeatures }}
		</div>

		<g-radio
			v-model="accessLevel"
			label="Access level"
			v-bind="accessRadioProps" />
		<div class="value-line">access level: {{ accessLevel }}</div>

		<g-radio
			v-model="validatedAccess"
			label="Validated access"
			v-bind="accessRadioProps"
			vertical
			:rules="[requireAccess]" />
		<div class="value-line">validated access: {{ validatedAccess }}</div>

		<g-radio
			v-model="releaseChannel"
			label="Object values"
			v-bind="releaseRadioProps">
			<template #item="{ item, checked }">
				<div class="item-row">
					<span>{{ item.label }}</span>
					<span class="item-meta">{{
						checked ? 'selected' : ''
					}}</span>
				</div>
			</template>
		</g-radio>
		<div class="value-line">
			release channel: {{ releaseChannel?.label ?? 'none' }}
		</div>

		<div class="value-line">toggle value: {{ toggleValue }}</div>
		<div class="value-line">
			toggle variants: tonal={{ toggleTonal }}, text={{ toggleText }},
			rounded={{ toggleRounded }}
		</div>
		<div class="value-line">
			toggle sizes: s={{ toggleSizeS }}, m={{ toggleSizeM }}, l={{
				toggleSizeL
			}}, xl={{ toggleSizeXL }}
		</div>
		<div class="value-line">
			toggle states: warning={{ toggleWarning }}, error={{ toggleError }},
			success={{ toggleSuccess }}, activeVariant={{
				toggleActiveVariant
			}}, icon={{ toggleIconOnly }}
		</div>

		<g-checkbox
			v-model="checkboxValue"
			label="Required consent"
			:rules="[requireChecked]" />
	</div>
</template>

<style scoped>
	.col {
		display: flex;
		flex-direction: column;
		gap: 14px;
		margin-block: 20px;
	}

	.row {
		display: grid;
		gap: 12px;
	}

	.row_two {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}

	.row_three {
		grid-template-columns: repeat(1, minmax(0, 1fr));
	}

	.row_four {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.value-line {
		font-size: 14px;
		color: rgba(var(--g-theme-on-surface), 0.75);
		text-align: left;
	}

	.item-row {
		display: flex;
		gap: 10px;
		justify-content: space-between;
		min-width: 180px;
	}

	.item-meta {
		font-size: 12px;
		opacity: 0.6;
	}

	.squircle-demo {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
	}

	@media (width >= 900px) {
		.row_two {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.row_three {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.row_four {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
</style>
