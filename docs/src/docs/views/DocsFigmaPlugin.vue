<template>
	<article class="docs-page docs-figma">
		<header class="docs-page__header">
			<p class="docs-page__eyebrow">Design tooling</p>
			<h1>Figma plugin</h1>
			<p>
				Gradient UI Builder turns a seed color into editable Figma
				gradients, light and dark design tokens, glow layers and morph
				backgrounds that follow the same recipes as Gradient UI.
			</p>
		</header>

		<section class="docs-page__section">
			<span
				id="overview"
				class="docs-page__anchor"></span>
			<h2>What you can create</h2>
			<div class="docs-page__grid">
				<div class="docs-page__tile">
					<h3>Gradients</h3>
					<p>
						Apply a generated gradient to the fill or stroke of one
						or more selected layers, or create a standalone preview.
					</p>
				</div>
				<div class="docs-page__tile">
					<h3>Design tokens</h3>
					<p>
						Create a local Gradient UI variable collection with
						Light and Dark modes, reusable paint styles and a token
						page.
					</p>
				</div>
				<div class="docs-page__tile">
					<h3>Morph artwork</h3>
					<p>
						Generate soft, liquid or ripple backgrounds as raster
						artwork or editable Figma variants.
					</p>
				</div>
			</div>
		</section>

		<section class="docs-page__section">
			<span
				id="quick-start"
				class="docs-page__anchor"></span>
			<h2>Quick start</h2>
			<ol class="docs-figma__steps">
				<li>
					Open <strong>Gradient UI Builder</strong> from the Figma
					Plugins menu.
				</li>
				<li>
					Choose <strong>Generator</strong>,
					<strong>Tokens</strong> or <strong>Morph</strong> according
					to the result you need.
				</li>
				<li>
					Pick a seed color and tune the live preview. Presets provide
					a useful starting point without locking the controls.
				</li>
				<li>
					Select layers before applying a fill, stroke or glow. Token
					and preview actions do not require a selection.
				</li>
			</ol>
		</section>

		<section class="docs-page__section">
			<span
				id="generator"
				class="docs-page__anchor"></span>
			<h2>Generator</h2>
			<p>
				Start with a preset or choose the seed, recipe and gradient type
				yourself. Linear and conic gradients expose direction; radial
				gradients use position. The Duotone recipe also lets you set
				both endpoint colors.
			</p>
			<div class="docs-figma__actions">
				<div>
					<strong>Apply fill</strong>
					<span
						>Replaces the fill on every compatible selected
						layer.</span
					>
				</div>
				<div>
					<strong>Apply stroke</strong>
					<span
						>Replaces the stroke; a zero-width stroke is changed to
						2 px.</span
					>
				</div>
				<div>
					<strong>Apply glow</strong>
					<span
						>Creates a separate native gradient backing with layer
						blur.</span
					>
				</div>
				<div>
					<strong>Create preview</strong>
					<span>
						Adds a named sample frame to the current page without
						changing a selection.
					</span>
				</div>
			</div>
			<p>
				Glow blur, opacity and X/Y offset affect the backing layer only,
				so the source layer remains editable.
			</p>
		</section>

		<section class="docs-page__section">
			<span
				id="tokens"
				class="docs-page__anchor"></span>
			<h2>Tokens</h2>
			<p>
				Choose the theme seed and main gradient, then select the output
				you need. Running a sync again updates matching local resources
				instead of creating a second naming system.
			</p>
			<ul class="docs-figma__list">
				<li>
					<strong>Sync variables</strong> creates the local
					<code>Gradient UI</code> collection with Light and Dark
					modes.
				</li>
				<li>
					<strong>Sync paint styles</strong> creates reusable theme
					colors and gradient styles with consistent names.
				</li>
				<li>
					<strong>Create token page</strong> builds color and gradient
					swatches on the <code>Gradient UI Tokens</code> page.
					Running it again recreates that page's generated contents.
				</li>
			</ul>
		</section>

		<section class="docs-page__section">
			<span
				id="morph"
				class="docs-page__anchor"></span>
			<h2>Morph</h2>
			<p>
				Use the Soft, Liquid or Ripple preset, then tune blob count,
				blend mode, blur, radius, intensity, opacity, contrast and
				motion duration. <strong>Create background</strong> produces the
				rendered background; <strong>Create variants</strong> creates
				Figma-native states for further editing and prototyping.
			</p>
		</section>

		<section class="docs-page__section">
			<span
				id="editing"
				class="docs-page__anchor"></span>
			<h2>Edit and reopen generated layers</h2>
			<p>
				Fills, strokes, variables, styles and glow backings are native
				Figma objects. Generated gradient layers also keep their
				Gradient UI settings: use the layer's
				<strong>Open Gradient UI generator</strong> relaunch action to
				continue from that result.
			</p>
		</section>

		<section class="docs-page__section">
			<span
				id="limitations"
				class="docs-page__anchor"></span>
			<h2>What differs from the browser</h2>
			<ul class="docs-figma__list">
				<li>
					Conic gradients use Figma angular gradients, so their
					rendering can differ slightly from CSS.
				</li>
				<li>
					CSS animation cannot be transferred as native Figma
					geometry.
				</li>
				<li>
					Glow is represented by a separate blurred backing layer
					rather than a browser filter.
				</li>
				<li>
					Raster morph backgrounds are flattened; use variants when
					you need editable states.
				</li>
			</ul>
		</section>
	</article>
</template>

<style scoped lang="scss">
	.docs-figma {
		&__steps,
		&__list {
			display: grid;
			gap: var(--g-token-space-3);

			max-width: 780px;
			margin: 0;
			padding-inline-start: var(--g-token-space-6);

			font-size: var(--g-token-font-size-md);
			line-height: var(--g-token-line-height-lg);
			color: var(--g-token-text-soft);
		}

		&__actions {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
			gap: var(--g-token-space-3);

			> div {
				display: grid;
				gap: var(--g-token-space-2);

				padding: var(--g-token-space-4);
				border: 1px solid var(--g-token-border-subtle);
				border-radius: var(--g-token-radius-md);

				background: rgba(var(--g-theme-surface), 0.72);
			}

			strong {
				color: var(--g-token-color-on-surface);
			}

			span {
				font-size: var(--g-token-font-size-sm);
				line-height: var(--g-token-line-height-lg);
				color: var(--g-token-text-soft);
			}
		}
	}
</style>
