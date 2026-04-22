<script setup lang="ts">
	import { ref } from 'vue';
	import GButton from './ui/GButton/GButton.vue';
	import GExpansion from './ui/GExpansion/GExpansion.vue';
	import GExpansionGroup from './ui/GExpansionGroup/GExpansionGroup.vue';
	import GText from './ui/GText/GText.vue';

	type FaqKey = 'tokens' | 'group' | 'slots';
	type SetupKey = 'install' | 'theme' | 'ship';
	type DensityKey = 's' | 'm' | 'l' | 'xl';
	type ActionKey = 'filters' | 'metrics';
	type UndividedKey = 'overview' | 'details';
	type VariantKey = 'default' | 'tonal' | 'outlined' | 'text';
	type GradientKey = 'glow' | 'persistent' | 'directional';
	type StateKey = 'warning' | 'error' | 'success' | 'mixed';
	type GapKey = 'gap-a' | 'gap-b';

	const materialExpansionColors = [
		'red40',
		'pink40',
		'purple40',
		'deep-purple-40',
		'indigo40',
		'blue40',
		'light-blue-40',
		'cyan40',
		'teal40',
		'green40',
		'light-green-40',
		'lime40',
		'yellow40',
		'amber40',
		'orange40',
		'deep-orange-40',
		'brown40',
		'grey40',
		'blue-grey-40'
	];
	const materialExpansionTones = [
		'blue20',
		'blue30',
		'blue40',
		'blue50',
		'blue60',
		'blue70',
		'blue80',
		'blue90',
		'blue100'
	];
	const materialExpansionToneRows = [
		'red20',
		'red40',
		'red60',
		'red80',
		'orange20',
		'orange40',
		'orange60',
		'orange80',
		'green20',
		'green40',
		'green60',
		'green80',
		'teal20',
		'teal40',
		'teal60',
		'teal80',
		'blue20',
		'blue40',
		'blue60',
		'blue80',
		'deep-purple-20',
		'deep-purple-40',
		'deep-purple-60',
		'deep-purple-80'
	];
	const gradientExpansionColors = [
		'red40',
		'red70',
		'orange40',
		'orange70',
		'green40',
		'green70',
		'teal40',
		'teal70',
		'blue40',
		'blue70',
		'deep-purple-40',
		'deep-purple-70',
		'pink40',
		'blue-grey-40'
	];

	const standaloneOpen = ref(true);
	const singleValue = ref<FaqKey | null>('tokens');
	const multipleValue = ref<SetupKey[]>(['install']);
	const readonlyValue = ref<FaqKey[]>(['group']);
	const densityValue = ref<DensityKey | null>('m');
	const variantsValue = ref<VariantKey | null>('default');
	const actionValue = ref<ActionKey | null>('filters');
	const undividedValue = ref<UndividedKey[]>(['overview']);
	const controlledSlotOpen = ref(false);
	const gradientValue = ref<GradientKey | null>('persistent');
	const stateValue = ref<StateKey | null>('warning');
	const gapValue = ref<GapKey | null>('gap-a');
	const glowOnExpansionOpen = ref(false);
</script>

<template>
	<g-text
		type="h-5"
		label="Expansion examples" />

	<div class="expansion-playground">
		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="Standalone item" />

			<g-expansion
				v-model="standaloneOpen"
				title="Controlled standalone"
				text="This item is tied to an external boolean model.">
				<div class="expansion-playground__body-copy">
					Use this when another part of the app should read or write
					the open state.
				</div>
			</g-expansion>

			<div class="value-line">standalone: {{ standaloneOpen }}</div>

			<g-expansion
				default-open
				title="Uncontrolled standalone"
				text="This item owns its open state internally.">
				<div class="expansion-playground__body-copy">
					Use this when you only need a collapsible region and do not
					want to manage a boolean model outside.
				</div>
			</g-expansion>
		</div>

		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="Single selection group" />

			<g-expansion-group v-model="singleValue">
				<g-expansion
					value="tokens"
					title="Design tokens"
					text="Component spacing, typography and surfaces come from shared tokens.">
					<div class="expansion-playground__body-copy">
						This mirrors the rest of the library: visuals stay in
						token layers, while interaction logic lives in
						composables.
					</div>
				</g-expansion>

				<g-expansion
					value="group"
					title="Group controller"
					text="Single mode keeps one active item at a time.">
					<div class="expansion-playground__body-copy">
						The group controller provides a typed selection contract
						so individual items stay dumb and reusable.
					</div>
				</g-expansion>

				<g-expansion
					value="slots"
					title="Slot surface"
					text="Title, text, actions and body all support typed slot props.">
					<div class="expansion-playground__body-copy">
						This makes it easy to build richer custom headers
						without re-implementing open/close logic.
					</div>
				</g-expansion>
			</g-expansion-group>

			<div class="value-line">single group: {{ singleValue }}</div>
		</div>

		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="Multiple + mandatory" />

			<g-expansion-group
				v-model="multipleValue"
				multiple
				mandatory>
				<g-expansion
					value="install"
					title="Install package"
					text="First step of a setup checklist.">
					<div class="expansion-playground__body-copy">
						With `multiple` several items can stay open, and
						`mandatory` prevents collapsing the last active one.
					</div>
				</g-expansion>

				<g-expansion
					value="theme"
					title="Configure theme"
					text="Map the generated tokens to your app shell.">
					<div class="expansion-playground__body-copy">
						Theme wiring stays independent from the item component
						API.
					</div>
				</g-expansion>

				<g-expansion
					value="ship"
					title="Ship examples"
					text="Document the component with a playground and usage notes.">
					<div class="expansion-playground__body-copy">
						This is helpful when the component has both standalone
						and grouped usage patterns.
					</div>
				</g-expansion>
			</g-expansion-group>

			<div class="value-line">
				multiple group: {{ multipleValue.join(', ') }}
			</div>
		</div>

		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="Custom slots and states" />

			<g-expansion-group
				v-model="readonlyValue"
				multiple
				readonly>
				<g-expansion
					value="tokens"
					size="s">
					<template #title="{ expanded }">
						<div class="title-row">
							<span>Compact custom title</span>
							<span class="chip">{{
								expanded ? 'open' : 'closed'
							}}</span>
						</div>
					</template>
					<template #text>
						Readonly group shows the current state but blocks
						interaction.
					</template>

					This content stays mounted from the initial value and keeps
					custom header markup.
				</g-expansion>

				<g-expansion
					value="group"
					size="l"
					rounded
					disabled
					title="Disabled item"
					text="Disabled state can be applied per item even inside a group.">
					This panel is intentionally disabled.
				</g-expansion>

				<g-expansion
					value="slots"
					size="xl"
					hide-actions
					eager>
					<template #title="{ readonly }">
						<div class="title-row">
							<span>Eager body without actions</span>
							<span class="chip">{{
								readonly ? 'readonly' : 'live'
							}}</span>
						</div>
					</template>
					<template #text>
						Useful when the header already has its own visual
						affordance.
					</template>

					<div class="expansion-playground__body-copy">
						`eager` keeps the region mounted, so internal local
						state or measurements can survive closing.
					</div>
				</g-expansion>
			</g-expansion-group>

			<div class="value-line">
				readonly group: {{ readonlyValue.join(', ') }}
			</div>
		</div>

		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="Size ladder" />

			<g-expansion-group v-model="densityValue">
				<g-expansion
					value="s"
					size="s"
					title="Size S"
					text="Compact spacing for dense admin surfaces.">
					<div class="expansion-playground__body-copy">
						Useful for side panels, filters and data-heavy control
						areas.
					</div>
				</g-expansion>

				<g-expansion
					value="m"
					size="m"
					title="Size M"
					text="Balanced default for most application screens.">
					<div class="expansion-playground__body-copy">
						This is the safest base size for general product UI.
					</div>
				</g-expansion>

				<g-expansion
					value="l"
					size="l"
					title="Size L"
					text="More breathing room for dashboard summaries.">
					<div class="expansion-playground__body-copy">
						The larger header makes hierarchy easier to scan in
						roomy layouts.
					</div>
				</g-expansion>

				<g-expansion
					value="xl"
					size="xl"
					title="Size XL"
					text="Best for marketing-ish or onboarding-heavy sections.">
					<div class="expansion-playground__body-copy">
						Good when the panel itself is part of the content
						presentation.
					</div>
				</g-expansion>
			</g-expansion-group>

			<div class="value-line">size group: {{ densityValue }}</div>
		</div>

		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="Variants" />

			<g-expansion-group
				v-model="variantsValue"
				gap="12">
				<g-expansion
					value="default"
					variant="filled"
					title="Default variant"
					text="The neutral surface stays closest to the current implementation.">
					<div class="expansion-playground__body-copy">
						Use this when expansions should blend into the base
						surface system.
					</div>
				</g-expansion>

				<g-expansion
					value="tonal"
					variant="tonal"
					title="Tonal variant"
					text="A soft primary tint that feels more expressive even while closed.">
					<div class="expansion-playground__body-copy">
						Good for feature highlights, settings sections and
						guided flows.
					</div>
				</g-expansion>

				<g-expansion
					value="outlined"
					variant="outlined"
					title="Outlined variant"
					text="Relies more on border definition than on fill or elevation.">
					<div class="expansion-playground__body-copy">
						Works well in denser admin layouts where stronger
						structure matters.
					</div>
				</g-expansion>

				<g-expansion
					value="text"
					variant="text"
					title="Text variant"
					text="The lightest treatment for minimalist accordion rows.">
					<div class="expansion-playground__body-copy">
						Useful when the container around the list already
						provides enough framing.
					</div>
				</g-expansion>
			</g-expansion-group>

			<div class="value-line">variants: {{ variantsValue }}</div>
		</div>

		<div
			class="expansion-playground__section expansion-playground__section_wide">
			<g-text
				type="subtitle-1"
				label="Colors" />

			<div class="expansion-color-grid">
				<g-expansion
					v-for="color in materialExpansionColors"
					:key="`filled-${color}`"
					:color="color"
					variant="filled"
					size="s"
					:title="color"
					text="filled">
					<div class="expansion-playground__body-copy">
						{{ color }}
					</div>
				</g-expansion>
			</div>

			<div class="expansion-color-grid">
				<g-expansion
					v-for="color in materialExpansionColors"
					:key="`tonal-${color}`"
					:color="color"
					variant="tonal"
					size="s"
					:title="color"
					text="tonal">
					<div class="expansion-playground__body-copy">
						{{ color }}
					</div>
				</g-expansion>
			</div>

			<div class="expansion-color-grid">
				<g-expansion
					v-for="color in materialExpansionColors"
					:key="`outlined-${color}`"
					:color="color"
					variant="outlined"
					size="s"
					:title="color"
					text="outlined">
					<div class="expansion-playground__body-copy">
						{{ color }}
					</div>
				</g-expansion>
			</div>

			<div class="expansion-color-grid">
				<g-expansion
					v-for="color in materialExpansionColors"
					:key="`text-${color}`"
					:color="color"
					variant="text"
					size="s"
					:title="color"
					text="text">
					<div class="expansion-playground__body-copy">
						{{ color }}
					</div>
				</g-expansion>
			</div>

			<div class="expansion-color-grid expansion-color-grid_tones">
				<g-expansion
					v-for="color in materialExpansionTones"
					:key="`tone-${color}`"
					:color="color"
					variant="filled"
					size="s"
					:title="color"
					text="tone scale">
					<div class="expansion-playground__body-copy">
						{{ color }}
					</div>
				</g-expansion>
			</div>

			<div class="expansion-color-grid expansion-color-grid_tones">
				<g-expansion
					v-for="color in materialExpansionToneRows"
					:key="`outlined-tone-${color}`"
					:color="color"
					variant="outlined"
					size="s"
					:title="color"
					text="outlined tone">
					<div class="expansion-playground__body-copy">
						{{ color }}
					</div>
				</g-expansion>
			</div>

			<div class="expansion-color-grid">
				<g-expansion
					v-for="color in gradientExpansionColors"
					:key="`gradient-${color}`"
					:color="color"
					variant="tonal"
					border-width="2"
					glow
					size="s"
					:title="`gradient ${color}`"
					text="border and glow use the same color">
					<div class="expansion-playground__body-copy">
						{{ color }}
					</div>
				</g-expansion>
			</div>
		</div>

		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="Gradient surface + active props" />

			<g-expansion-group
				v-model="gradientValue"
				gap="12">
				<g-expansion
					value="glow"
					title="Glow only while open"
					text="Base state stays neutral, active state turns on gradient glow."
					variant="outlined"
					border-width="0"
					:active-border-width="1"
					:active-glow="true"
					:active-animate-glow="true"
					active-state="success">
					<div class="expansion-playground__body-copy">
						This pattern is nice when you want the accordion to stay
						quiet until the user opens a section.
					</div>
				</g-expansion>

				<g-expansion
					value="persistent"
					title="Persistent border, stronger active state"
					text="The component uses GGradient as a persistent surface shell."
					variant="tonal"
					border-width="1"
					state="warning"
					:active-border-width="2"
					:active-shadow="true"
					:active-glow="true"
					active-state="error">
					<div class="expansion-playground__body-copy">
						Closed and open states can now use different gradient
						props without rewiring the component markup.
					</div>
				</g-expansion>

				<g-expansion
					value="directional"
					title="Directional active border"
					text="Placement can also change on open for a more expressive accent."
					variant="text"
					border-width="1"
					placement="left"
					active-placement="top"
					active-state="success">
					<div class="expansion-playground__body-copy">
						This gives you a lightweight directional cue while still
						keeping the component API declarative.
					</div>
				</g-expansion>
			</g-expansion-group>

			<div class="value-line">gradient state: {{ gradientValue }}</div>
		</div>

		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="Glow on expansion" />

			<g-expansion
				v-model="glowOnExpansionOpen"
				title="Glow appears only after expand"
				text="Closed state stays quiet, then border, glow and semantic success accent appear together."
				variant="outlined"
				border-width="0"
				:active-border-width="1"
				:active-glow="true"
				:active-animate-glow="true">
				<div class="stack">
					<div class="expansion-playground__body-copy">
						This is a focused `glow-on-expansion` example for
						confirmations, revealed success states and celebratory
						micro-feedback.
					</div>

					<div class="summary-row">
						<span>Glow status</span>
						<span class="summary-meta">
							{{ glowOnExpansionOpen ? 'active' : 'idle' }}
						</span>
					</div>
				</div>
			</g-expansion>

			<div class="value-line">
				glow-on-expansion: {{ glowOnExpansionOpen }}
			</div>
		</div>

		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="State colors" />

			<g-expansion-group
				v-model="stateValue"
				gap="12">
				<g-expansion
					value="warning"
					title="Warning becomes stronger on open"
					text="Closed state uses warning, open state keeps the same semantic color and intensifies it."
					variant="filled"
					state="warning"
					active-state="warning">
					<div class="expansion-playground__body-copy">
						This is the simplest semantic case: the panel reads as
						warning even before interaction.
					</div>
				</g-expansion>

				<g-expansion
					value="error"
					title="Neutral closed, error on open"
					text="`activeState` now affects the actual panel surface and title color, not only the border gradient."
					variant="outlined"
					border-width="1"
					:active-border-width="2"
					active-state="error"
					:active-glow="true">
					<div class="expansion-playground__body-copy">
						Useful for destructive or blocking sections that should
						escalate only when expanded.
					</div>
				</g-expansion>

				<g-expansion
					value="success"
					title="Tonal success panel"
					text="State color mixes with tonal styling so the whole component reads as success."
					variant="tonal"
					state="success"
					active-state="success"
					border-width="1">
					<div class="expansion-playground__body-copy">
						This works well for confirmations, completed steps and
						positive system feedback.
					</div>
				</g-expansion>

				<g-expansion
					value="mixed"
					title="Mixed visual transition"
					text="Closed warning, open success, with active gradient props on top."
					variant="filled"
					state="warning"
					active-state="success"
					:active-glow="true"
					:active-shadow="true"
					:active-border-width="1">
					<div class="expansion-playground__body-copy">
						This demonstrates that semantic surface color and
						gradient accent can now evolve together on expand.
					</div>
				</g-expansion>
			</g-expansion-group>

			<div class="value-line">state group: {{ stateValue }}</div>
		</div>

		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="Custom actions and summary rows" />

			<g-expansion-group v-model="actionValue">
				<g-expansion
					value="filters"
					title="Applied filters"
					text="3 active constraints across project, status and owner.">
					<template #actions="{ expanded }">
						<div class="actions-row">
							<span class="chip">3 active</span>
							<span class="chip">{{
								expanded ? 'collapse' : 'expand'
							}}</span>
						</div>
					</template>

					<div class="stack">
						<div class="summary-row">
							<span>Status</span>
							<span class="summary-meta">In review, Blocked</span>
						</div>
						<div class="summary-row">
							<span>Owner</span>
							<span class="summary-meta"
								>Design systems squad</span
							>
						</div>
						<div class="summary-row">
							<span>Updated</span>
							<span class="summary-meta">Last 14 days</span>
						</div>
					</div>
				</g-expansion>

				<g-expansion
					value="metrics"
					title="Release metrics"
					text="Header actions can be replaced completely with custom UI.">
					<template #actions="{ expanded }">
						<div class="actions-row">
							<span class="chip">99.8%</span>
							<span class="chip">{{
								expanded ? 'open' : 'closed'
							}}</span>
						</div>
					</template>

					<div class="stack">
						<div class="summary-row">
							<span>Success rate</span>
							<span class="summary-meta">99.8%</span>
						</div>
						<div class="summary-row">
							<span>Lead time</span>
							<span class="summary-meta">2h 14m</span>
						</div>
						<div class="summary-row">
							<span>Rollback</span>
							<span class="summary-meta"
								>0 incidents this week</span
							>
						</div>
					</div>
				</g-expansion>
			</g-expansion-group>

			<div class="value-line">actions group: {{ actionValue }}</div>
		</div>

		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="Undivided cards" />

			<g-expansion-group
				v-model="undividedValue"
				multiple
				:divided="false">
				<g-expansion
					value="overview"
					rounded
					title="Overview card"
					text="No divider lines between siblings, closer to independent cards.">
					<div class="expansion-playground__body-copy">
						`divided=false` is handy when each item already feels
						like a separate card and you want cleaner vertical
						rhythm.
					</div>
				</g-expansion>

				<g-expansion
					value="details"
					rounded
					title="Detail card"
					text="Pairs well with custom shadows and more spacious layouts.">
					<div class="expansion-playground__body-copy">
						This mode visually separates panels without relying on
						inner borders.
					</div>
				</g-expansion>
			</g-expansion-group>

			<div class="value-line">
				undivided group: {{ undividedValue.join(', ') }}
			</div>
		</div>

		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="Group gap" />

			<g-expansion-group
				v-model="gapValue"
				gap="16"
				:divided="false">
				<g-expansion
					value="gap-a"
					title="Gap 16px"
					text="The group can space items apart without relying on dividers.">
					<div class="expansion-playground__body-copy">
						This is handy when panels should read as separate blocks
						instead of a tight accordion stack.
					</div>
				</g-expansion>

				<g-expansion
					value="gap-b"
					title="Independent rhythm"
					text="Gap works especially well together with rounded card-like items."
					rounded>
					<div class="expansion-playground__body-copy">
						You can combine `gap` with `divided=false` to get a
						looser layout.
					</div>
				</g-expansion>
			</g-expansion-group>

			<div class="value-line">gap group: {{ gapValue }}</div>
		</div>

		<div class="expansion-playground__section">
			<g-text
				type="subtitle-1"
				label="Programmatic toggle via slot props" />

			<g-expansion
				v-model="controlledSlotOpen"
				title="Slot props can drive external controls"
				text="The body and title slots both receive the same toggle contract.">
				<template #title="{ expanded, toggle }">
					<div class="title-row">
						<span>Programmatic toggle via slot props</span>
						<g-button
							size="s"
							variant="text"
							:label="expanded ? 'Close' : 'Open'"
							@click.stop="toggle" />
					</div>
				</template>

				<div class="stack">
					<div class="expansion-playground__body-copy">
						This is useful when the header contains more than one
						control and you still want a single source of truth for
						open state.
					</div>
					<g-button
						size="s"
						variant="outlined"
						:label="
							controlledSlotOpen
								? 'Collapse from body'
								: 'Expand from body'
						"
						@click="controlledSlotOpen = !controlledSlotOpen" />
				</div>
			</g-expansion>

			<div class="value-line">
				slot-controlled standalone: {{ controlledSlotOpen }}
			</div>
		</div>
	</div>
</template>

<style scoped>
	.expansion-playground {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-block: 20px;
	}

	.expansion-playground__section {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 780px;
	}

	.expansion-playground__body-copy {
		text-align: left;
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.title-row {
		display: flex;
		gap: 12px;
		align-items: center;
		justify-content: space-between;
	}

	.actions-row {
		display: inline-flex;
		gap: 8px;
		align-items: center;
	}

	.summary-row {
		display: flex;
		gap: 12px;
		justify-content: space-between;

		padding-bottom: 8px;
		border-bottom: 1px solid rgba(var(--g-theme-on-surface), 0.08);

		text-align: left;
	}

	.summary-meta {
		color: rgba(var(--g-theme-on-surface), 0.68);
	}

	.chip {
		padding: 2px 8px;
		border: 1px solid rgba(var(--g-theme-on-surface), 0.12);
		border-radius: 999px;

		font-size: 12px;
		line-height: 16px;
		color: rgba(var(--g-theme-on-surface), 0.7);

		background: rgba(var(--g-theme-on-surface), 0.04);
	}

	.value-line {
		font-size: 14px;
		color: rgba(var(--g-theme-on-surface), 0.75);
		text-align: left;
	}
</style>
