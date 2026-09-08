<script setup lang="ts">
	defineOptions({ name: 'CardLayoutsExample' });
	import { GBadge, GButton, GCard } from '@/components';

	const photos = {
		gradient:
			'https://images.unsplash.com/photo-1786108503420-2881fec216b1?auto=format&fit=crop&fm=jpg&q=80&w=1200',
		architecture:
			'https://images.unsplash.com/photo-1752477296332-4194308c025f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200',
		mountain:
			'https://images.unsplash.com/photo-1770753105322-fdca548966b0?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1200',
		plant: 'https://images.unsplash.com/photo-1657046309976-f1e80ce2fd5f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=900'
	};
</script>

<template>
	<div
		class="docs-component-detail__card-grid docs-component-detail__card-grid_wide">
		<g-card
			title="Media layout"
			subtitle="Preview first"
			text="A stacked composition for articles, products and gallery items."
			layout="media"
			variant="tonal">
			<template #media>
				<figure class="card-demo-photo">
					<img
						:src="photos.gradient"
						alt="The Golden Gate Bridge spanning the bay in San Francisco under a clear sky" />
					<figcaption>
						Photo by
						<a
							href="https://unsplash.com/@vegfrt?utm_source=gradient_ui_docs&utm_medium=referral"
							target="_blank"
							rel="noopener noreferrer">
							Aliaksei Lepik
						</a>
						on
						<a
							href="https://unsplash.com/photos/golden-gate-bridge-in-san-francisco-goa_pgKhAnI?utm_source=gradient_ui_docs&utm_medium=referral"
							target="_blank"
							rel="noopener noreferrer">
							Unsplash
						</a>
					</figcaption>
				</figure>
			</template>
		</g-card>

		<g-card
			title="Horizontal layout"
			subtitle="Dense comparison"
			text="Use horizontal cards when the image and copy need equal scanning weight."
			layout="horizontal"
			variant="outlined">
			<template #media>
				<figure class="card-demo-photo">
					<img
						:src="photos.architecture"
						alt="Symmetrical abstract architecture against a dark background" />
					<figcaption>
						Photo by
						<a
							href="https://unsplash.com/@mikehindle?utm_source=gradient_ui_docs&utm_medium=referral"
							target="_blank"
							rel="noopener noreferrer">
							Mike Hindle
						</a>
						on
						<a
							href="https://unsplash.com/photos/abstract-architecture-against-a-dark-background-4NtZ0yU50lY?utm_source=gradient_ui_docs&utm_medium=referral"
							target="_blank"
							rel="noopener noreferrer">
							Unsplash
						</a>
					</figcaption>
				</figure>
			</template>
		</g-card>

		<g-card
			title="Overlay layout"
			subtitle="Image-backed emphasis"
			text="Titles sit over the media for editorial and feature cards."
			layout="overlay"
			variant="tonal">
			<template #media>
				<figure class="card-demo-photo">
					<img
						:src="photos.mountain"
						alt="Rugged mountain peaks under a cloudy sky" />
					<figcaption>
						Photo by
						<a
							href="https://unsplash.com/@intricateexplorer?utm_source=gradient_ui_docs&utm_medium=referral"
							target="_blank"
							rel="noopener noreferrer">
							Intricate Explorer
						</a>
						on
						<a
							href="https://unsplash.com/photos/rugged-mountain-peaks-under-a-cloudy-sky-yPXr1TdNL-U?utm_source=gradient_ui_docs&utm_medium=referral"
							target="_blank"
							rel="noopener noreferrer">
							Unsplash
						</a>
					</figcaption>
				</figure>
			</template>
			<template #actions>
				<g-button
					label="Explore"
					size="s"
					variant="glass"
					:border-width="1" />
			</template>
		</g-card>

		<g-card
			title="Profile layout"
			subtitle="Ada Lovelace"
			text="Centered anatomy for people, creators and compact identity cards."
			layout="profile"
			color="pink"
			variant="tonal">
			<template #media>
				<figure class="card-demo-photo card-demo-photo_profile">
					<img
						:src="photos.plant"
						alt="Minimalist dried plant on a black background" />
				</figure>
			</template>
			<template #footer>
				<span class="card-demo-credit">
					Photo by
					<a
						href="https://unsplash.com/@molnj?utm_source=gradient_ui_docs&utm_medium=referral"
						target="_blank"
						rel="noopener noreferrer">
						Jocelyn Morales
					</a>
					on
					<a
						href="https://unsplash.com/photos/a-close-up-of-a-plant-jA6VMitLtoM?utm_source=gradient_ui_docs&utm_medium=referral"
						target="_blank"
						rel="noopener noreferrer">
						Unsplash
					</a>
				</span>
			</template>
		</g-card>

		<g-card
			title="Banner layout"
			subtitle="Compact campaign row"
			text="Banner cards keep media and text side by side with a shorter visual height."
			layout="banner"
			variant="tonal"
			color="cyan">
			<template #media>
				<figure class="card-demo-photo card-demo-photo_compact">
					<img
						:src="photos.architecture"
						alt="Symmetrical abstract architecture against a dark background" />
				</figure>
			</template>
			<template #footer>
				<span class="card-demo-credit">
					Photo by
					<a
						href="https://unsplash.com/@mikehindle?utm_source=gradient_ui_docs&utm_medium=referral"
						target="_blank"
						rel="noopener noreferrer">
						Mike Hindle
					</a>
					on
					<a
						href="https://unsplash.com/photos/abstract-architecture-against-a-dark-background-4NtZ0yU50lY?utm_source=gradient_ui_docs&utm_medium=referral"
						target="_blank"
						rel="noopener noreferrer">
						Unsplash
					</a>
				</span>
			</template>
		</g-card>

		<g-card
			title="Inset layout"
			subtitle="Padded media"
			text="Inset keeps the image inside the card shape for softer editorial blocks."
			layout="inset"
			variant="outlined">
			<template #media>
				<figure class="card-demo-photo">
					<img
						:src="photos.plant"
						alt="Minimalist dried plant on a black background" />
					<figcaption>
						Photo by
						<a
							href="https://unsplash.com/@molnj?utm_source=gradient_ui_docs&utm_medium=referral"
							target="_blank"
							rel="noopener noreferrer">
							Jocelyn Morales
						</a>
						on
						<a
							href="https://unsplash.com/photos/a-close-up-of-a-plant-jA6VMitLtoM?utm_source=gradient_ui_docs&utm_medium=referral"
							target="_blank"
							rel="noopener noreferrer">
							Unsplash
						</a>
					</figcaption>
				</figure>
			</template>
		</g-card>

		<g-card
			title="Media bottom"
			subtitle="Copy first"
			text="This layout flips the image after the body for summary-first cards."
			layout="media-bottom"
			variant="tonal">
			<template #media>
				<figure class="card-demo-photo">
					<img
						:src="photos.mountain"
						alt="Rugged mountain peaks under a cloudy sky" />
					<figcaption>
						Photo by
						<a
							href="https://unsplash.com/@intricateexplorer?utm_source=gradient_ui_docs&utm_medium=referral"
							target="_blank"
							rel="noopener noreferrer">
							Intricate Explorer
						</a>
						on
						<a
							href="https://unsplash.com/photos/rugged-mountain-peaks-under-a-cloudy-sky-yPXr1TdNL-U?utm_source=gradient_ui_docs&utm_medium=referral"
							target="_blank"
							rel="noopener noreferrer">
							Unsplash
						</a>
					</figcaption>
				</figure>
			</template>
		</g-card>

		<g-badge
			class="card-demo-badge"
			content="+8"
			state="success"
			variant="tonal">
			<g-card
				title="94%"
				subtitle="Metric layout"
				text="Centered cards for stats, health checks and short numeric signals."
				layout="metric"
				state="success"
				variant="tonal" />
		</g-badge>
	</div>
</template>

<style scoped lang="scss">
	.card-demo-photo {
		position: relative;

		width: 100%;
		height: 100%;
		min-height: 168px;
		margin: 0;

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		figcaption {
			position: absolute;
			right: var(--g-token-space-2);
			bottom: var(--g-token-space-2);

			padding: 2px var(--g-token-space-2);
			border-radius: var(--g-token-radius-pill);

			font-size: var(--g-token-font-size-xs);
			line-height: var(--g-token-line-height-xs);
			color: white;

			background: rgb(0 0 0 / 56%);
			backdrop-filter: blur(8px);
		}

		a {
			color: inherit;
			text-decoration: underline;
			text-underline-offset: 2px;
		}

		&_profile {
			min-height: 0;
		}

		&_compact {
			min-height: 0;
		}
	}

	.card-demo-credit {
		min-width: 0;
		overflow-wrap: anywhere;

		a {
			color: inherit;
			text-decoration: underline;
			text-underline-offset: 2px;
		}
	}

	.card-demo-badge {
		width: 100%;

		:deep(.g-badge__wrapper) {
			width: 100%;
			min-width: 0;
		}
	}
</style>
