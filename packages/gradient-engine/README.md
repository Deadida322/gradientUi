# Gradient Engine

Framework-free gradient generation engine used by Gradient UI.

`@gradient-ui/gradient-engine` creates deterministic gradient models, CSS
gradients, SVG gradients, canvas gradient descriptors, shadows, morph effects,
animation CSS and material tokens. It does not touch the DOM by default, so it
can be used from Vue, React, vanilla JavaScript, server builds or design-system
tooling.

## Install

```bash
npm install @gradient-ui/gradient-engine
```

## Quick Start

```ts
import {
	createGradientFromColor,
	createGradientMaterial
} from '@gradient-ui/gradient-engine';

const background = createGradientFromColor('#704aff', {
	recipe: 'glare',
	type: 'linear',
	direction: 135
});

const material = createGradientMaterial('#704aff', {
	preset: 'materialAction',
	animation: {
		preset: 'shift',
		duration: 6000
	}
});
```

`createGradientFromColor` returns a ready-to-use CSS background value.
`createGradientMaterial` returns a richer object for components: CSS variables,
CSS text, optional keyframes, effects and the underlying gradient model.

## API Layers

The package is split into small subpath exports:

```ts
import { createGradientFromColor } from '@gradient-ui/gradient-engine/core';
import { toCssGradient } from '@gradient-ui/gradient-engine/formatters';
import { createGradientMorph } from '@gradient-ui/gradient-engine/effects';
import { toGradientAnimationCSS } from '@gradient-ui/gradient-engine/animation';
import { createGradientMaterial } from '@gradient-ui/gradient-engine/material';
```

- `core` creates palettes, recipes and gradient models.
- `formatters` converts models to CSS, SVG and canvas-friendly output.
- `effects` creates shadow, drop-shadow and morph effect values.
- `animation` creates CSS keyframes and animation declarations.
- `material` creates component-oriented tokens for UI libraries.

## Recipes

Gradient recipes describe color harmony, not rendering format.

```ts
createGradientFromColor('#704aff', { recipe: 'monochrome' });
createGradientFromColor('#704aff', { recipe: 'complementary' });
createGradientFromColor('#704aff', { recipe: 'split-complementary' });
createGradientFromColor('#704aff', { recipe: 'analogous' });
createGradientFromColor('#704aff', { recipe: 'triadic' });
createGradientFromColor('#704aff', { recipe: 'tetradic' });
createGradientFromColor('#704aff', { recipe: 'rectangle' });
createGradientFromColor('#704aff', { recipe: 'square' });
createGradientFromColor('#704aff', { recipe: 'duotone' });
createGradientFromColor('#704aff', { recipe: 'glare' });
```

## Gradient Types

```ts
createGradientFromColor('#704aff', {
	type: 'linear',
	direction: 135
});

createGradientFromColor('#704aff', {
	type: 'radial',
	shape: 'circle',
	position: '50% 45%'
});

createGradientFromColor('#704aff', {
	type: 'conic',
	position: '50% 50%'
});
```

## Materials

Materials are the bridge between the pure engine and component libraries.

```ts
const material = createGradientMaterial('#704aff', {
	preset: 'materialAction',
	recipe: 'glare',
	effects: true,
	animation: {
		preset: 'shift',
		duration: 6000
	}
});
```

The returned object is intentionally serializable:

```ts
material.id;
material.className;
material.style;
material.cssVars;
material.cssText;
material.keyframes;
material.gradient;
material.effects;
material.animation;
```

This lets a Vue, React or vanilla adapter decide how to apply the result:
inline styles, a generated stylesheet, CSS variables, SSR-injected CSS or a
client runtime registry.

## SVG

```ts
import {
	createGradientModelFromColor,
	toSvgGradient
} from '@gradient-ui/gradient-engine';

const model = createGradientModelFromColor('#704aff', {
	recipe: 'analogous',
	type: 'linear'
});

const svg = toSvgGradient(model, {
	id: 'brand-gradient'
});
```

SVG helpers are for generated markup and definitions. They do not mount the SVG
into the document.

## Animations

```ts
import { toGradientAnimationCSS } from '@gradient-ui/gradient-engine';

const animation = toGradientAnimationCSS({
	name: 'hero-gradient',
	preset: 'shift',
	duration: 8000
});
```

Available presets: `shift`, `pulse`, `rotate`, `hue-rotate`.

Different surfaces should opt into animation carefully. For example, `rotate`
is useful for large decorative surfaces, but usually too aggressive for compact
buttons and borders.

## Effects

Effects are plain strings or serializable descriptions.

```ts
import {
	createGradientBoxShadow,
	createGradientDropShadow,
	createGradientMorph
} from '@gradient-ui/gradient-engine/effects';

const boxShadow = createGradientBoxShadow('#704aff');
const dropShadow = createGradientDropShadow('#704aff');
const morph = createGradientMorph('#704aff', {
	preset: 'liquid',
	blobCount: 5
});
```

The engine only creates values. DOM-specific mounting for SVG filters, style
tags or animation lifecycles belongs in an adapter.

## SSR

The core package is SSR-safe because it has no browser side effects. For SSR,
generate the material/model on the server, serialize `cssVars`, `cssText` and
`keyframes`, then let the client adapter mount optional runtime effects such as
morph SVG filters.

## Version

`0.5.0` is the first standalone release line for the engine extracted from
Gradient UI.

## License

MIT
