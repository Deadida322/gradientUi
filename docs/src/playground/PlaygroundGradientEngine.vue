<script setup lang="ts">
	import { computed, onMounted, ref, watch, type CSSProperties } from 'vue';
	import DocsCode from '@docs/components/DocsCode.vue';
	import { GExpansion } from '@/components';
	import GInput from '@/components/ui/GInput/GInput.vue';
	import GSelect from '@/components/ui/GSelect/GSelect.vue';
	import GText from '@/components/ui/GText/GText.vue';
	import {
		createGradientModelFromColor,
		createGradientMorphBlobs,
		toCssGradient,
		toGradientAnimationCSS,
		toGradientBoxShadow,
		toGradientDropShadow,
		toGradientMorphCSS,
		toGradientMorphFilter,
		toGradientMorphFilterMarkup,
		toCanvasGradient,
		toSvgGradientMarkup,
		toSvgPathAnimationMarkup,
		toSvgSourceAnimationMarkup,
		gradientPresets,
		type GradientPresetName,
		type GradientRecipe,
		type GradientAnimationPreset,
		type GradientMorphBlendMode,
		type GradientMorphPreset,
		type GradientType
	} from '@/theme';

	type SelectOption<T extends string> = {
		label: string;
		value: T;
		color?: string;
	};

	const recipes = [
		{ label: 'Glare', value: 'glare' },
		{ label: 'Monochrome', value: 'monochrome' },
		{ label: 'Complementary', value: 'complementary' },
		{ label: 'Split complementary', value: 'split-complementary' },
		{ label: 'Analogous', value: 'analogous' },
		{ label: 'Triadic', value: 'triadic' },
		{ label: 'Tetradic', value: 'tetradic' },
		{ label: 'Rectangle', value: 'rectangle' },
		{ label: 'Square', value: 'square' },
		{ label: 'Duotone', value: 'duotone' }
	] as const satisfies readonly SelectOption<GradientRecipe>[];
	const gradientTypes = [
		{ label: 'Linear', value: 'linear' },
		{ label: 'Radial', value: 'radial' },
		{ label: 'Conic', value: 'conic' }
	] as const satisfies readonly SelectOption<GradientType>[];
	const seeds = [
		{ label: 'Primary violet', value: '#704bfd', color: '#704bfd' },
		{ label: 'Electric blue', value: '#4e51ff', color: '#4e51ff' },
		{ label: 'Cyan', value: '#00bcd4', color: '#00bcd4' },
		{ label: 'Pink', value: '#ff00aa', color: '#ff00aa' },
		{ label: 'Orange', value: '#ff9800', color: '#ff9800' },
		{ label: 'Green', value: '#2e7d32', color: '#2e7d32' }
	] as const satisfies readonly SelectOption<string>[];
	const positions = [
		{ label: 'Center', value: 'center' },
		{ label: 'Top', value: 'top' },
		{ label: 'Right', value: 'right' },
		{ label: 'Bottom', value: 'bottom' },
		{ label: 'Left', value: 'left' },
		{ label: 'Top left', value: 'top left' },
		{ label: 'Top right', value: 'top right' },
		{ label: 'Bottom left', value: 'bottom left' },
		{ label: 'Bottom right', value: 'bottom right' }
	] as const satisfies readonly SelectOption<string>[];
	const animationPresets = [
		{ label: 'Background shift', value: 'shift' },
		{ label: 'Pulse', value: 'pulse' },
		{ label: 'Rotate field', value: 'rotate' },
		{ label: 'Hue rotate', value: 'hue-rotate' }
	] as const satisfies readonly SelectOption<GradientAnimationPreset>[];
	const morphPresets = [
		{ label: 'Soft', value: 'soft' },
		{ label: 'Liquid', value: 'liquid' },
		{ label: 'Ripple', value: 'ripple' }
	] as const satisfies readonly SelectOption<GradientMorphPreset>[];
	const morphBlendModes = [
		{ label: 'Hard light', value: 'hard-light' },
		{ label: 'Normal', value: 'normal' },
		{ label: 'Overlay', value: 'overlay' },
		{ label: 'Screen', value: 'screen' },
		{ label: 'Soft light', value: 'soft-light' }
	] as const satisfies readonly SelectOption<GradientMorphBlendMode>[];
	const morphPresetDefaults = {
		soft: {
			blobCount: '5',
			blur: '40',
			contrast: '18',
			duration: '12000',
			opacity: '0.76'
		},
		liquid: {
			blobCount: '6',
			blur: '46',
			contrast: '22',
			duration: '9200',
			opacity: '0.82'
		},
		ripple: {
			blobCount: '7',
			blur: '34',
			contrast: '20',
			duration: '7200',
			opacity: '0.78'
		}
	} satisfies Record<
		GradientMorphPreset,
		{
			blobCount: string;
			blur: string;
			contrast: string;
			duration: string;
			opacity: string;
		}
	>;
	const presetItems = (
		Object.entries(gradientPresets) as [
			GradientPresetName,
			(typeof gradientPresets)[GradientPresetName]
		][]
	).map(([value, preset]) => ({
		label: preset.label,
		value
	}));

	const preset = ref<GradientPresetName>('brandGlare');
	const seed = ref('#704bfd');
	const recipe = ref<GradientRecipe>('glare');
	const type = ref<GradientType>('linear');
	const direction = ref('135');
	const position = ref('center');
	const duotoneFrom = ref('#ff734b');
	const duotoneTo = ref('#00dab0');
	const shadowLayers = ref('2');
	const shadowOpacity = ref('0.24');
	const shadowBlur = ref('16');
	const shadowX = ref('0');
	const shadowY = ref('6');
	const shadowSpread = ref('-3');
	const filterLayers = ref('3');
	const filterOpacity = ref('0.38');
	const filterBlur = ref('16');
	const filterY = ref('6');
	const morphPreset = ref<GradientMorphPreset>('soft');
	const morphBlendMode = ref<GradientMorphBlendMode>('hard-light');
	const morphBlobCount = ref('5');
	const morphBlur = ref('40');
	const morphContrast = ref('18');
	const morphDuration = ref('12000');
	const morphOpacity = ref('0.76');
	const animationPreset = ref<GradientAnimationPreset>('shift');
	const animationDuration = ref('6000');
	const svgStrokeWidth = ref('1.6');
	const canvasRef = ref<HTMLCanvasElement | null>(null);
	const sourceSvg = ref('');
	const sourceSvg2 = ref('');

	const selectedPreset = computed(() => gradientPresets[preset.value]);
	const applyPreset = (name: GradientPresetName | null) => {
		if (!name) return;

		const nextPreset = gradientPresets[name];
		const nextGradient = nextPreset.gradient;

		preset.value = name;
		recipe.value = nextGradient.recipe;
		type.value = nextGradient.type ?? 'linear';
		direction.value = String(nextGradient.direction ?? 135);
		position.value =
			'position' in nextGradient
				? (nextGradient.position ?? 'center')
				: 'center';

		if (nextPreset.shadow) {
			shadowLayers.value = String(nextPreset.shadow.layers ?? 2);
			shadowOpacity.value = String(nextPreset.shadow.opacity ?? 0.24);
			shadowBlur.value = String(nextPreset.shadow.blur ?? 14);
			shadowX.value = String(
				'x' in nextPreset.shadow ? (nextPreset.shadow.x ?? 0) : 0
			);
			shadowY.value = String(nextPreset.shadow.y ?? 6);
			shadowSpread.value = String(nextPreset.shadow.spread ?? -3);
		}

		if (nextPreset.dropShadow) {
			filterLayers.value = String(nextPreset.dropShadow.layers ?? 2);
			filterOpacity.value = String(nextPreset.dropShadow.opacity ?? 0.42);
			filterBlur.value = String(nextPreset.dropShadow.blur ?? 14);
			filterY.value = String(nextPreset.dropShadow.y ?? 6);
		}

		if (nextPreset.animation) {
			animationPreset.value = nextPreset.animation.preset;
			animationDuration.value = String(
				nextPreset.animation.duration ?? 6000
			);
		}
	};
	const directionValue = computed(() => Number(direction.value) || 0);
	const toNumber = (value: string, fallback: number) => {
		const parsed = Number(value);
		return Number.isFinite(parsed) ? parsed : fallback;
	};
	const shadowOptions = computed(() => ({
		layers: Math.max(1, Math.round(toNumber(shadowLayers.value, 2))),
		opacity: toNumber(shadowOpacity.value, 0.24),
		blur: toNumber(shadowBlur.value, 14),
		x: toNumber(shadowX.value, 0),
		y: toNumber(shadowY.value, 6),
		spread: toNumber(shadowSpread.value, -3)
	}));
	const filterOptions = computed(() => ({
		layers: Math.max(1, Math.round(toNumber(filterLayers.value, 2))),
		opacity: toNumber(filterOpacity.value, 0.42),
		blur: toNumber(filterBlur.value, 14),
		y: toNumber(filterY.value, 6)
	}));
	const applyMorphPreset = (name: GradientMorphPreset) => {
		const nextPreset = morphPresetDefaults[name];

		morphBlobCount.value = nextPreset.blobCount;
		morphBlur.value = nextPreset.blur;
		morphContrast.value = nextPreset.contrast;
		morphDuration.value = nextPreset.duration;
		morphOpacity.value = nextPreset.opacity;
	};
	const selectedSeed = computed(
		() => seeds.find((item) => item.value === seed.value) ?? seeds[0]
	);
	const model = computed(() =>
		createGradientModelFromColor(seed.value, {
			recipe: recipe.value,
			type: type.value,
			direction: directionValue.value,
			position: position.value,
			shape: 'circle',
			colors:
				recipe.value === 'duotone'
					? [duotoneFrom.value, duotoneTo.value]
					: undefined
		})
	);
	const cssGradient = computed(() => toCssGradient(model.value));
	const boxShadow = computed(() =>
		toGradientBoxShadow(model.value, shadowOptions.value)
	);
	const dropShadow = computed(() =>
		toGradientDropShadow(model.value, filterOptions.value)
	);
	const morphOptions = computed(() => ({
		blendMode: morphBlendMode.value,
		blobCount: Math.max(2, Math.round(toNumber(morphBlobCount.value, 5))),
		blur: toNumber(morphBlur.value, 40),
		contrast: toNumber(morphContrast.value, 18),
		duration: toNumber(morphDuration.value, 12000),
		id: 'playground-gradient-morph',
		opacity: toNumber(morphOpacity.value, 0.76),
		preset: morphPreset.value
	}));
	const morphFilter = computed(() =>
		toGradientMorphFilter(morphOptions.value)
	);
	const morphBlobs = computed(() =>
		createGradientMorphBlobs(model.value, morphOptions.value)
	);
	const morphFilterMarkup = computed(() =>
		toGradientMorphFilterMarkup(morphOptions.value)
	);
	const svgMarkup = computed(() =>
		toSvgGradientMarkup(model.value, {
			id: 'playground-gradient',
			width: 240,
			height: 120,
			rx: 18
		})
	);
	const createSourceSvgAnimation = (svg: string, id: string) =>
		toSvgSourceAnimationMarkup(svg, model.value, {
			id,
			strokeWidth: toNumber(svgStrokeWidth.value, 1.6),
			duration: toNumber(animationDuration.value, 6000),
			sourceOpacity: 0.16
		});
	const svgPathMarkup = computed(() =>
		sourceSvg.value
			? createSourceSvgAnimation(
					sourceSvg.value,
					'playground-source-gradient'
				)
			: toSvgPathAnimationMarkup(model.value, {
					id: 'playground-path-gradient',
					width: 360,
					height: 160,
					strokeWidth: toNumber(svgStrokeWidth.value, 1.6),
					duration: toNumber(animationDuration.value, 6000)
				})
	);
	const svgPathMarkup2 = computed(() =>
		sourceSvg2.value
			? createSourceSvgAnimation(
					sourceSvg2.value,
					'playground-source-gradient-2'
				)
			: ''
	);
	const animationCSS = computed(() =>
		toGradientAnimationCSS({
			name: 'playground-gradient-motion',
			selector: '.gradient-engine__animated',
			preset: animationPreset.value,
			duration: toNumber(animationDuration.value, 6000)
		})
	);
	const previewStyles = computed<CSSProperties>(() => ({
		backgroundImage: cssGradient.value
	}));
	const animatedStyles = computed<CSSProperties>(() => ({
		'--gradient-engine-animation-bg': cssGradient.value,
		'--gradient-engine-animation-duration': `${toNumber(animationDuration.value, 6000)}ms`,
		backgroundImage: cssGradient.value
	}));
	const formatCssDeclaration = (property: string, value: string) =>
		`${property}: ${value.replaceAll(', ', ',\n\t')};`;
	const formatFilterDeclaration = (property: string, value: string) =>
		`${property}: ${value.replaceAll(') ', ')\n\t')};`;

	const cssCode = computed(() =>
		formatCssDeclaration('background-image', cssGradient.value)
	);
	const modelSourceCode = computed(
		() => `const model = createGradientModelFromColor('${seed.value}', {
	recipe: '${recipe.value}',
	type: '${type.value}',
	direction: ${directionValue.value}${
		type.value !== 'linear' ? `,\n\tposition: '${position.value}'` : ''
	}${
		recipe.value === 'duotone'
			? `,\n\tcolors: ['${duotoneFrom.value}', '${duotoneTo.value}']`
			: ''
	}
});

const css = toCssGradient(model);`
	);
	const cssSourceCode = computed(
		() => `${modelSourceCode.value}

element.style.backgroundImage = css;`
	);
	const boxShadowCode = computed(() =>
		formatCssDeclaration('box-shadow', boxShadow.value)
	);
	const boxShadowSourceCode = computed(
		() => `${modelSourceCode.value}

const boxShadow = toGradientBoxShadow(model, {
	layers: ${shadowOptions.value.layers},
	opacity: ${shadowOptions.value.opacity},
	blur: ${shadowOptions.value.blur},
	x: ${shadowOptions.value.x},
	y: ${shadowOptions.value.y},
	spread: ${shadowOptions.value.spread}
});`
	);
	const filterCode = computed(() =>
		formatFilterDeclaration('filter', dropShadow.value)
	);
	const filterSourceCode = computed(
		() => `${modelSourceCode.value}

const filter = toGradientDropShadow(model, {
	layers: ${filterOptions.value.layers},
	opacity: ${filterOptions.value.opacity},
	blur: ${filterOptions.value.blur},
	y: ${filterOptions.value.y}
});`
	);
	const morphCssCode = computed(() =>
		toGradientMorphCSS(model.value, {
			...morphOptions.value,
			selector: '.gradient-card'
		})
	);
	const morphMarkupCode = computed(() => morphFilterMarkup.value);
	const morphSourceCode = computed(
		() => `${modelSourceCode.value}

const filterMarkup = toGradientMorphFilterMarkup({
	id: 'playground-gradient-morph',
	blendMode: '${morphBlendMode.value}',
	preset: '${morphPreset.value}',
	blobCount: ${morphOptions.value.blobCount},
	blur: ${morphOptions.value.blur},
	contrast: ${morphOptions.value.contrast},
	opacity: ${morphOptions.value.opacity},
	duration: ${morphOptions.value.duration}
});

const blobs = createGradientMorphBlobs(model, {
	preset: '${morphPreset.value}',
	blendMode: '${morphBlendMode.value}',
	blobCount: ${morphOptions.value.blobCount}
});

const css = toGradientMorphCSS(model, {
	selector: '.gradient-card',
	id: 'playground-gradient-morph',
	blendMode: '${morphBlendMode.value}',
	preset: '${morphPreset.value}'
});`
	);
	const svgCode = computed(() => svgMarkup.value);
	const svgSourceCode = computed(
		() => `${modelSourceCode.value}

const svg = toSvgGradientMarkup(model, {
	id: 'playground-gradient',
	width: 240,
	height: 120,
	rx: 18
});`
	);
	const canvasCode = computed(
		() => `const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const gradient = toCanvasGradient(context, model, {
	width: canvas.width,
	height: canvas.height
});

context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);`
	);
	const sourceSvgSourceCode = computed(
		() => `${modelSourceCode.value}

const sourceSvg = await fetch('/example.svg').then((response) => response.text());
const animatedSvg = toSvgSourceAnimationMarkup(sourceSvg, model, {
	id: 'playground-source-gradient',
	strokeWidth: ${toNumber(svgStrokeWidth.value, 1.6)},
	duration: ${toNumber(animationDuration.value, 6000)},
	sourceOpacity: 0.16
});`
	);
	const animationSourceCode = computed(
		() => `${modelSourceCode.value}

const animationCss = toGradientAnimationCSS({
	selector: '.gradient-card',
	name: 'playground-gradient-motion',
	preset: '${animationPreset.value}',
	duration: ${toNumber(animationDuration.value, 6000)}
});`
	);

	const drawCanvas = () => {
		const canvas = canvasRef.value;
		if (!canvas) return;

		const context = canvas.getContext('2d');
		if (!context) return;

		const ratio = window.devicePixelRatio || 1;
		const width = 360;
		const height = 180;

		canvas.width = width * ratio;
		canvas.height = height * ratio;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		context.setTransform(ratio, 0, 0, ratio, 0, 0);
		context.clearRect(0, 0, width, height);
		context.fillStyle = toCanvasGradient(context, model.value, {
			width,
			height
		});
		context.fillRect(0, 0, width, height);
	};

	onMounted(() => {
		drawCanvas();
		Promise.allSettled([
			fetch('/example.svg').then((response) => response.text()),
			fetch('/example-2.svg').then((response) => response.text())
		]).then(([first, second]) => {
			sourceSvg.value = first.status === 'fulfilled' ? first.value : '';
			sourceSvg2.value =
				second.status === 'fulfilled' ? second.value : '';
		});
	});
	watch(model, drawCanvas);
	watch(morphPreset, applyMorphPreset);
</script>

<template>
	<section class="gradient-engine">
		<div class="gradient-engine__intro">
			<g-text
				type="h-5"
				label="Interactive builder" />
			<p>
				Configure one gradient model and inspect how the same model is
				rendered as CSS, shadows, SVG, canvas, animation CSS and morph
				effects.
			</p>
		</div>

		<div class="gradient-engine__layout">
			<div class="gradient-engine__controls">
				<g-select
					:model-value="preset"
					label="Preset"
					:items="presetItems"
					@update:model-value="applyPreset" />
				<p class="gradient-engine__preset-description">
					{{ selectedPreset.description }}
				</p>

				<g-select
					v-model="seed"
					label="Seed"
					:items="seeds">
					<template #selection>
						<span class="gradient-engine__select-value">
							<span
								class="gradient-engine__swatch"
								:style="{
									backgroundColor: selectedSeed.color
								}"></span>
							{{ selectedSeed.label }} {{ selectedSeed.value }}
						</span>
					</template>
					<template #item="{ item }">
						<span class="gradient-engine__select-value">
							<span
								class="gradient-engine__swatch"
								:style="{
									backgroundColor: item.raw.color
								}"></span>
							{{ item.label }} {{ item.value }}
						</span>
					</template>
				</g-select>

				<g-select
					v-model="recipe"
					label="Recipe"
					:items="recipes" />

				<g-select
					v-model="type"
					label="Type"
					:items="gradientTypes" />

				<g-input
					v-model="direction"
					type="range"
					label="Direction"
					min="0"
					max="360"
					step="5"
					:message="`${directionValue}deg`" />

				<g-select
					v-if="type !== 'linear'"
					v-model="position"
					label="Position"
					:items="positions" />

				<div
					v-if="recipe === 'duotone'"
					class="gradient-engine__duotone">
					<g-input
						v-model="duotoneFrom"
						type="color"
						label="From" />
					<g-input
						v-model="duotoneTo"
						type="color"
						label="To" />
				</div>
			</div>

			<div class="gradient-engine__stage">
				<div
					class="gradient-engine__preview"
					:style="previewStyles">
					<span>{{ recipe }}</span>
				</div>

				<div
					class="gradient-engine__animated"
					:class="`gradient-engine__animated_${animationPreset}`"
					:style="animatedStyles">
					<span>{{ animationPreset }}</span>
				</div>
			</div>
		</div>

		<div class="gradient-engine__section-heading">
			<h3>Outputs</h3>
			<p>
				Each block shows the rendered result first, then the generated
				output and the source call that produced it.
			</p>
		</div>

		<div class="gradient-engine__format-grid">
			<section class="gradient-engine__format-card">
				<header class="gradient-engine__format-header">
					<strong>CSS background</strong>
					<span>Result</span>
				</header>
				<div
					class="gradient-engine__format-preview gradient-engine__format-preview_css"
					:style="{ backgroundImage: cssGradient }">
					CSS background
				</div>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Generated output"
					text="CSS"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="cssCode"
						language="css" />
				</g-expansion>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Source"
					text="TypeScript"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="cssSourceCode"
						language="ts" />
				</g-expansion>
			</section>

			<section class="gradient-engine__format-card">
				<header class="gradient-engine__format-header">
					<strong>Box shadow</strong>
					<span>Result</span>
				</header>
				<div class="gradient-engine__format-controls">
					<strong>Box shadow settings</strong>
					<div class="gradient-engine__format-controls-grid">
						<g-input
							v-model="shadowLayers"
							type="range"
							label="Elevation layers"
							min="1"
							max="2"
							step="1"
							:message="shadowLayers" />
						<g-input
							v-model="shadowOpacity"
							type="range"
							label="Opacity"
							min="0"
							max="1"
							step="0.01"
							:message="shadowOpacity" />
						<g-input
							v-model="shadowBlur"
							type="range"
							label="Blur"
							min="8"
							max="90"
							step="1"
							:message="`${shadowBlur}px`" />
						<g-input
							v-model="shadowX"
							type="range"
							label="X offset"
							min="-32"
							max="32"
							step="1"
							:message="`${shadowX}px`" />
						<g-input
							v-model="shadowY"
							type="range"
							label="Y offset"
							min="-24"
							max="48"
							step="1"
							:message="`${shadowY}px`" />
						<g-input
							v-model="shadowSpread"
							type="range"
							label="Spread"
							min="-40"
							max="16"
							step="1"
							:message="`${shadowSpread}px`" />
					</div>
				</div>
				<div class="gradient-engine__format-preview">
					<div
						class="gradient-engine__shadow-sample"
						:style="{
							backgroundImage: cssGradient,
							boxShadow
						}"></div>
				</div>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Generated output"
					text="CSS"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="boxShadowCode"
						language="css" />
				</g-expansion>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Source"
					text="TypeScript"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="boxShadowSourceCode"
						language="ts" />
				</g-expansion>
			</section>

			<section class="gradient-engine__format-card">
				<header class="gradient-engine__format-header">
					<strong>Drop shadow filter</strong>
					<span>Result</span>
				</header>
				<div class="gradient-engine__format-controls">
					<strong>Drop shadow settings</strong>
					<div class="gradient-engine__format-controls-grid">
						<g-input
							v-model="filterLayers"
							type="range"
							label="Layers"
							min="1"
							max="5"
							step="1"
							:message="filterLayers" />
						<g-input
							v-model="filterOpacity"
							type="range"
							label="Opacity"
							min="0"
							max="1"
							step="0.01"
							:message="filterOpacity" />
						<g-input
							v-model="filterBlur"
							type="range"
							label="Blur"
							min="4"
							max="60"
							step="1"
							:message="`${filterBlur}px`" />
						<g-input
							v-model="filterY"
							type="range"
							label="Y offset"
							min="-24"
							max="48"
							step="1"
							:message="`${filterY}px`" />
					</div>
				</div>
				<div class="gradient-engine__format-preview">
					<div
						class="gradient-engine__filter-sample"
						:style="{
							backgroundImage: cssGradient,
							filter: dropShadow
						}"></div>
				</div>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Generated output"
					text="CSS"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="filterCode"
						language="css" />
				</g-expansion>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Source"
					text="TypeScript"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="filterSourceCode"
						language="ts" />
				</g-expansion>
			</section>

			<section
				class="gradient-engine__format-card gradient-engine__format-card_wide">
				<header class="gradient-engine__format-header">
					<strong>Morph background</strong>
					<span>Result</span>
				</header>
				<div v-html="morphFilterMarkup"></div>
				<div class="gradient-engine__format-controls">
					<strong>Morph filter settings</strong>
					<div class="gradient-engine__format-controls-grid">
						<g-select
							v-model="morphPreset"
							label="Preset"
							:items="morphPresets" />
						<g-select
							v-model="morphBlendMode"
							label="Blend mode"
							:items="morphBlendModes" />
						<g-input
							v-model="morphBlobCount"
							type="range"
							label="Blobs"
							min="2"
							max="10"
							step="1"
							:message="morphBlobCount" />
						<g-input
							v-model="morphBlur"
							type="range"
							label="Blur"
							min="0"
							max="120"
							step="1"
							:message="`${morphBlur}px`" />
						<g-input
							v-model="morphContrast"
							type="range"
							label="Contrast"
							min="0"
							max="36"
							step="1"
							:message="morphContrast" />
						<g-input
							v-model="morphOpacity"
							type="range"
							label="Opacity"
							min="0"
							max="1"
							step="0.01"
							:message="morphOpacity" />
						<g-input
							v-model="morphDuration"
							type="range"
							label="Duration"
							min="1600"
							max="14000"
							step="100"
							:message="`${morphDuration}ms`" />
					</div>
				</div>
				<div class="gradient-engine__format-preview">
					<div
						class="gradient-engine__morph-sample"
						:style="{
							backgroundImage: `linear-gradient(135deg, rgb(24 18 54 / 78%), rgb(20 17 42 / 70%)), ${cssGradient}`
						}">
						<div
							class="gradient-engine__morph-blobs"
							:style="{
								filter: morphFilter,
								mixBlendMode: morphOptions.blendMode,
								'--gradient-engine-morph-blend-mode':
									morphOptions.blendMode,
								opacity: morphOptions.opacity
							}">
							<span
								v-for="(blob, index) in morphBlobs"
								:key="index"
								class="gradient-engine__morph-blob"
								:style="{
									top: `${blob.y}%`,
									left: `${blob.x}%`,
									width: `${blob.size}%`,
									'--gradient-engine-morph-blob-color':
										blob.color,
									'--gradient-engine-morph-x': `${blob.dx}%`,
									'--gradient-engine-morph-x2': `${blob.dx2}%`,
									'--gradient-engine-morph-y': `${blob.dy}%`,
									'--gradient-engine-morph-y2': `${blob.dy2}%`,
									'--gradient-engine-morph-origin-x':
										blob.originX,
									'--gradient-engine-morph-origin-y':
										blob.originY,
									'--gradient-engine-morph-animation':
										blob.animationName,
									'--gradient-engine-morph-blur': `${blob.blur}px`,
									'--gradient-engine-morph-opacity':
										blob.opacity,
									'--gradient-engine-morph-rotate-mid': `${blob.rotateMid}deg`,
									'--gradient-engine-morph-rotate-to': `${blob.rotateTo}deg`,
									'--gradient-engine-morph-scale-mid':
										blob.scaleMid,
									'--gradient-engine-morph-scale':
										blob.scaleTo,
									animationDelay: `${blob.delay}ms`,
									animationDuration:
										typeof blob.duration === 'number'
											? `${blob.duration}ms`
											: blob.duration
								}"></span>
						</div>
						<span>morph</span>
					</div>
				</div>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Generated SVG filter"
					text="HTML"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="morphMarkupCode"
						language="html" />
				</g-expansion>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Generated CSS"
					text="CSS"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="morphCssCode"
						language="css" />
				</g-expansion>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Source"
					text="TypeScript"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="morphSourceCode"
						language="ts" />
				</g-expansion>
			</section>

			<section class="gradient-engine__format-card">
				<header class="gradient-engine__format-header">
					<strong>SVG paint server</strong>
					<span>Result</span>
				</header>
				<div
					class="gradient-engine__format-preview gradient-engine__format-preview_svg"
					v-html="svgMarkup"></div>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Generated output"
					text="HTML"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="svgCode"
						language="html" />
				</g-expansion>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Source"
					text="TypeScript"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="svgSourceCode"
						language="ts" />
				</g-expansion>
			</section>

			<section class="gradient-engine__format-card">
				<header class="gradient-engine__format-header">
					<strong>Source SVG animation</strong>
					<span>Result</span>
				</header>
				<div class="gradient-engine__format-controls">
					<strong>Source SVG animation</strong>
					<div class="gradient-engine__format-controls-grid">
						<g-input
							v-model="svgStrokeWidth"
							type="range"
							label="Stroke"
							min="0.4"
							max="8"
							step="0.1"
							:message="`${svgStrokeWidth}px`" />
					</div>
				</div>
				<div
					class="gradient-engine__format-preview gradient-engine__format-preview_svg-path">
					<div class="gradient-engine__source-grid">
						<div
							class="gradient-engine__source-preview"
							v-html="svgPathMarkup"></div>
						<div
							v-if="svgPathMarkup2"
							class="gradient-engine__source-preview"
							v-html="svgPathMarkup2"></div>
					</div>
				</div>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Source"
					text="TypeScript"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="sourceSvgSourceCode"
						language="ts" />
				</g-expansion>
			</section>

			<section class="gradient-engine__format-card">
				<header class="gradient-engine__format-header">
					<strong>Canvas</strong>
					<span>Result</span>
				</header>
				<div
					class="gradient-engine__format-preview gradient-engine__format-preview_canvas">
					<canvas
						ref="canvasRef"
						class="gradient-engine__canvas"
						aria-label="Canvas gradient preview">
					</canvas>
				</div>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Source"
					text="TypeScript"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="canvasCode"
						language="ts" />
				</g-expansion>
			</section>

			<section
				class="gradient-engine__format-card gradient-engine__format-card_wide">
				<header class="gradient-engine__format-header">
					<strong>Animation CSS</strong>
					<span>Result</span>
				</header>
				<div class="gradient-engine__format-controls">
					<strong>Animation settings</strong>
					<div class="gradient-engine__format-controls-grid">
						<g-select
							v-model="animationPreset"
							label="Preset"
							:items="animationPresets" />
						<g-input
							v-model="animationDuration"
							type="range"
							label="Duration"
							min="1200"
							max="12000"
							step="100"
							:message="`${animationDuration}ms`" />
					</div>
				</div>
				<div
					class="gradient-engine__format-preview gradient-engine__format-preview_animation"
					:class="`gradient-engine__format-preview_animation-${animationPreset}`"
					:style="animatedStyles">
					<span>{{ animationPreset }}</span>
				</div>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Generated output"
					text="CSS"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="animationCSS"
						language="css" />
				</g-expansion>
				<g-expansion
					class="gradient-engine__disclosure"
					title="Source"
					text="TypeScript"
					variant="outlined"
					size="s"
					:border-width="1"
					:eager="true">
					<docs-code
						:code="animationSourceCode"
						language="ts" />
				</g-expansion>
			</section>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	.gradient-engine {
		display: grid;
		gap: 20px;
		margin: 28px 0;

		&__intro,
		&__section-heading {
			display: grid;
			gap: 6px;
		}

		&__intro p,
		&__section-heading p {
			max-width: 760px;
			margin: 0;

			font-size: var(--g-token-font-size-md);
			line-height: var(--g-token-line-height-lg);
			color: var(--g-token-text-muted);
		}

		&__section-heading {
			margin-top: 8px;
		}

		&__section-heading h3 {
			margin: 0;
			font-size: var(--g-token-font-size-xl);
			color: var(--g-token-color-on-surface);
		}

		&__layout {
			display: grid;
			grid-template-columns: minmax(260px, 360px) minmax(360px, 1fr);
			gap: 20px;
			align-items: stretch;
		}

		&__controls,
		&__stage,
		&__format-card {
			border: 1px solid var(--g-token-border-subtle);
			border-radius: 8px;
			background: var(--g-token-color-surface);
		}

		&__controls {
			display: grid;
			gap: 12px;
			padding: 16px;
		}

		&__duotone {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 12px;
		}

		&__preset-description {
			margin: -6px 0 0;
			font-size: var(--g-token-font-size-sm);
			line-height: var(--g-token-line-height-md);
			color: var(--g-token-text-muted);
		}

		&__select-value {
			display: inline-flex;
			gap: 8px;
			align-items: center;
			min-width: 0;
		}

		&__swatch {
			flex: 0 0 auto;

			width: 16px;
			height: 16px;
			border: 1px solid rgb(255 255 255 / 52%);
			border-radius: 4px;

			box-shadow: 0 0 0 1px rgb(0 0 0 / 8%);
		}

		&__stage {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			gap: 16px;
			align-items: stretch;

			padding: 16px;
		}

		&__preview,
		&__animated {
			position: relative;

			overflow: hidden;
			display: grid;
			place-items: center;

			min-height: 220px;
			border-radius: 18px;

			font-weight: 800;
			color: white;
			text-transform: uppercase;
		}

		&__preview span,
		&__animated span {
			position: relative;
			z-index: 1;
			text-shadow: 0 1px 18px rgb(0 0 0 / 35%);
		}

		&__animated {
			background: var(--gradient-engine-animation-bg);
		}

		&__animated_shift {
			background-size: 220% 220%;
			animation: gradient-engine-shift
				var(--gradient-engine-animation-duration) ease-in-out infinite;
		}

		&__animated_pulse {
			animation: gradient-engine-pulse
				var(--gradient-engine-animation-duration) ease-in-out infinite;
		}

		&__animated_hue-rotate {
			animation: gradient-engine-hue-rotate
				var(--gradient-engine-animation-duration) ease-in-out infinite;
		}

		&__animated_rotate {
			background: transparent;
		}

		&__animated_rotate::before {
			content: '';

			position: absolute;
			z-index: 0;
			top: 50%;
			left: 50%;
			transform-origin: center;

			width: 200%;
			min-width: 150vmax;
			height: 200%;
			min-height: 150vmax;

			background: var(--gradient-engine-animation-bg);

			animation: gradient-engine-rotate
				var(--gradient-engine-animation-duration) linear infinite;
		}

		&__format-grid {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 16px;
		}

		&__format-card {
			overflow: hidden;
			display: grid;
			min-width: 0;
		}

		&__format-header {
			display: flex;
			align-items: center;
			justify-content: space-between;

			padding: 14px 16px;
			border-bottom: 1px solid var(--g-token-border-subtle);
		}

		&__format-header strong {
			font-size: var(--g-token-font-size-sm);
			color: var(--g-token-color-on-surface);
		}

		&__format-header span {
			font-size: var(--g-token-font-size-xs);
			color: var(--g-token-text-muted);
			text-transform: uppercase;
		}

		&__disclosure {
			width: calc(100% - 24px);
			min-width: 0;
			max-width: calc(100% - 24px);
			margin: 12px;

			:deep(.g-expansion__surface),
			:deep(.g-expansion),
			:deep(.g-expansion__surface-content),
			:deep(.g-expansion__body),
			:deep(.g-expansion__content) {
				min-width: 0;
				max-width: 100%;
			}

			:deep(.docs-code) {
				min-width: 0;
				max-width: 100%;
				border: 0;
			}

			:deep(.docs-code__pre) {
				overflow-x: auto;
				max-width: 100%;
			}
		}

		&__format-controls {
			display: grid;
			gap: 12px;
			padding: 14px;
			border-bottom: 1px solid var(--g-token-border-subtle);
		}

		&__format-controls > strong {
			font-size: var(--g-token-font-size-sm);
			color: var(--g-token-color-on-surface);
		}

		&__format-controls-grid {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 12px;
		}

		&__format-card_wide {
			grid-column: 1 / -1;
		}

		&__format-preview {
			display: grid;
			place-items: center;

			min-height: 180px;
			padding: 18px;
			border-bottom: 1px solid var(--g-token-border-subtle);

			font-weight: 800;
			color: white;
			text-align: center;
			text-shadow: 0 1px 18px rgb(0 0 0 / 35%);
		}

		&__format-preview_svg,
		&__format-preview_svg-path {
			color: var(--g-token-color-on-surface);
			text-shadow: none;

			:deep(svg) {
				width: min(100%, 360px);
				height: auto;
				filter: drop-shadow(0 18px 26px rgb(0 0 0 / 18%));
			}
		}

		&__format-preview_svg-path {
			background:
				linear-gradient(
					135deg,
					rgb(var(--g-theme-primary) / 8%),
					transparent 44%
				),
				var(--g-token-color-background);
		}

		&__source-grid {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 14px;
			align-items: center;

			width: min(100%, 520px);
		}

		&__source-preview {
			display: grid;
			place-items: center;

			min-height: 132px;
			padding: 14px;
			border: 1px solid var(--g-token-border-subtle);
			border-radius: 8px;

			background: var(--g-token-color-surface);
		}

		&__format-preview_animation {
			position: relative;
			overflow: hidden;
		}

		&__format-preview_animation > span {
			position: relative;
			z-index: 1;
		}

		&__format-preview_animation-shift {
			background-size: 220% 220%;
			animation: gradient-engine-shift
				var(--gradient-engine-animation-duration, 6000ms) ease-in-out
				infinite;
		}

		&__format-preview_animation-pulse {
			animation: gradient-engine-pulse
				var(--gradient-engine-animation-duration, 6000ms) ease-in-out
				infinite;
		}

		&__format-preview_animation-hue-rotate {
			animation: gradient-engine-hue-rotate
				var(--gradient-engine-animation-duration, 6000ms) ease-in-out
				infinite;
		}

		&__format-preview_animation-rotate {
			background: transparent;

			&::before {
				content: '';

				position: absolute;
				top: 50%;
				left: 50%;
				transform-origin: center;

				width: 200%;
				min-width: 150vmax;
				height: 200%;
				min-height: 150vmax;

				background: var(--gradient-engine-animation-bg);

				animation: gradient-engine-rotate
					var(--gradient-engine-animation-duration, 6000ms) linear
					infinite;
			}
		}

		&__canvas {
			display: block;
			max-width: 100%;
			border-radius: 18px;
			filter: drop-shadow(0 18px 26px rgb(0 0 0 / 18%));
		}

		&__shadow-sample,
		&__filter-sample,
		&__morph-sample {
			aspect-ratio: 1.6;
			width: min(72%, 260px);
			height: fit-content;
			border-radius: 18px;
		}

		&__morph-sample {
			position: relative;

			overflow: hidden;
			display: grid;
			place-items: center;

			width: min(100%, 920px);
			min-height: 360px;

			font-weight: 800;
			color: white;
			text-transform: uppercase;

			box-shadow: 0 20px 50px rgb(0 0 0 / 18%);
		}

		&__morph-blobs {
			position: absolute;
			inset: -18%;
			mix-blend-mode: var(
				--gradient-engine-morph-blend-mode,
				hard-light
			);
		}

		&__morph-blob {
			position: absolute;
			transform-origin: var(--gradient-engine-morph-origin-x)
				var(--gradient-engine-morph-origin-y);
			transform: translate(-50%, -50%) scale(0.94);

			aspect-ratio: 1;
			border-radius: 999px;

			opacity: var(--gradient-engine-morph-opacity);
			background: radial-gradient(
				circle,
				var(--gradient-engine-morph-blob-color) 0%,
				transparent 72%
			);
			filter: blur(var(--gradient-engine-morph-blur));

			animation: var(--gradient-engine-morph-animation) 7600ms ease-in-out
				infinite alternate;
		}

		&__morph-sample > span {
			position: relative;
			z-index: 1;
			text-shadow: 0 1px 18px rgb(0 0 0 / 35%);
		}
	}

	@keyframes gradient-engine-shift {
		0% {
			background-position: 0% 50%;
		}

		50% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0% 50%;
		}
	}

	@keyframes gradient-engine-pulse {
		0%,
		100% {
			filter: saturate(1) brightness(1);
		}

		50% {
			filter: saturate(1.22) brightness(1.08);
		}
	}

	@keyframes gradient-engine-hue-rotate {
		0%,
		100% {
			filter: hue-rotate(0deg) saturate(1);
		}

		50% {
			filter: hue-rotate(28deg) saturate(1.18);
		}
	}

	@keyframes gradient-engine-rotate {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}

		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	@keyframes g-gradient-morph-drift {
		0% {
			transform: translate(-50%, -50%) scale(0.94);
		}

		42% {
			transform: translate(
					calc(-50% + var(--gradient-engine-morph-x)),
					calc(-50% + var(--gradient-engine-morph-y))
				)
				scale(var(--gradient-engine-morph-scale));
		}

		100% {
			transform: translate(
					calc(-50% + var(--gradient-engine-morph-x2)),
					calc(-50% + var(--gradient-engine-morph-y2))
				)
				scale(var(--gradient-engine-morph-scale-mid));
		}
	}

	@keyframes g-gradient-morph-float {
		0% {
			transform: translate(-50%, -50%) scale(1);
		}

		50% {
			transform: translate(
					calc(-50% + var(--gradient-engine-morph-x)),
					calc(-50% + var(--gradient-engine-morph-y))
				)
				scale(var(--gradient-engine-morph-scale-mid));
		}

		100% {
			transform: translate(
					calc(-50% + var(--gradient-engine-morph-x2)),
					calc(-50% + var(--gradient-engine-morph-y2))
				)
				scale(var(--gradient-engine-morph-scale));
		}
	}

	@keyframes g-gradient-morph-orbit {
		0% {
			transform: translate(-50%, -50%) rotate(0deg) scale(0.96);
		}

		50% {
			transform: translate(
					calc(-50% + var(--gradient-engine-morph-x)),
					calc(-50% + var(--gradient-engine-morph-y))
				)
				rotate(var(--gradient-engine-morph-rotate-mid))
				scale(var(--gradient-engine-morph-scale-mid));
		}

		100% {
			transform: translate(
					calc(-50% + var(--gradient-engine-morph-x2)),
					calc(-50% + var(--gradient-engine-morph-y2))
				)
				rotate(var(--gradient-engine-morph-rotate-to))
				scale(var(--gradient-engine-morph-scale));
		}
	}

	@media (width <= 900px) {
		.gradient-engine {
			&__layout,
			&__stage,
			&__format-grid {
				grid-template-columns: 1fr;
			}

			&__format-card_wide {
				grid-column: auto;
			}

			&__format-controls-grid {
				grid-template-columns: 1fr;
			}
		}
	}
</style>

<style lang="scss">
	@keyframes g-gradient-morph-drift {
		0% {
			transform: translate(-50%, -50%) scale(0.94);
		}

		42% {
			transform: translate(
					calc(-50% + var(--gradient-engine-morph-x)),
					calc(-50% + var(--gradient-engine-morph-y))
				)
				scale(var(--gradient-engine-morph-scale));
		}

		100% {
			transform: translate(
					calc(-50% + var(--gradient-engine-morph-x2)),
					calc(-50% + var(--gradient-engine-morph-y2))
				)
				scale(var(--gradient-engine-morph-scale-mid));
		}
	}

	@keyframes g-gradient-morph-float {
		0% {
			transform: translate(-50%, -50%) scale(1);
		}

		50% {
			transform: translate(
					calc(-50% + var(--gradient-engine-morph-x)),
					calc(-50% + var(--gradient-engine-morph-y))
				)
				scale(var(--gradient-engine-morph-scale-mid));
		}

		100% {
			transform: translate(
					calc(-50% + var(--gradient-engine-morph-x2)),
					calc(-50% + var(--gradient-engine-morph-y2))
				)
				scale(var(--gradient-engine-morph-scale));
		}
	}

	@keyframes g-gradient-morph-orbit {
		0% {
			transform: translate(-50%, -50%) rotate(0deg) scale(0.96);
		}

		50% {
			transform: translate(
					calc(-50% + var(--gradient-engine-morph-x)),
					calc(-50% + var(--gradient-engine-morph-y))
				)
				rotate(130deg) scale(var(--gradient-engine-morph-scale-mid));
		}

		100% {
			transform: translate(
					calc(-50% + var(--gradient-engine-morph-x2)),
					calc(-50% + var(--gradient-engine-morph-y2))
				)
				rotate(260deg) scale(var(--gradient-engine-morph-scale));
		}
	}
</style>
