import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { describe, expect, it } from 'vitest';

import GImg from '@gradient-ui/core/components/GImg';

describe('GImg SSR', () => {
	it('renders responsive image metadata and stable geometry on the server', async () => {
		const app = createSSRApp({
			render: () =>
				h(
					GImg,
					{
						alt: 'Mountain lake',
						aspectRatio: '16 / 9',
						cover: true,
						gradient: 'to top, rgb(0 0 0 / 70%), transparent',
						sizes: '(min-width: 960px) 50vw, 100vw',
						src: '/lake.webp',
						srcset: '/lake-640.webp 640w, /lake-1280.webp 1280w'
					},
					{ default: () => h('strong', 'Lake') }
				)
		});
		const html = await renderToString(app);

		expect(html).toContain('<img');
		expect(html).toContain('src="/lake.webp"');
		expect(html).toContain('srcset="/lake-640.webp 640w');
		expect(html).toContain('alt="Mountain lake"');
		expect(html).toContain('--g-img-aspect-ratio:16 / 9');
		expect(html).toContain('--g-img-fit:cover');
		expect(html).toContain('linear-gradient(to top');
		expect(html).toContain('<strong>Lake</strong>');
	});

	it('renders picture sources and a progressive placeholder without DOM APIs', async () => {
		const app = createSSRApp({
			render: () =>
				h(
					GImg,
					{
						alt: '',
						loading: 'eager',
						src: {
							aspectRatio: 1,
							lazySrc: '/thumb.jpg',
							src: '/photo.jpg'
						}
					},
					{
						sources: () =>
							h('source', {
								srcset: '/photo.avif',
								type: 'image/avif'
							})
					}
				)
		});
		const html = await renderToString(app);

		expect(html).toContain('<picture');
		expect(html).toContain('srcset="/photo.avif"');
		expect(html).toContain('src="/photo.jpg"');
		expect(html).toContain('src="/thumb.jpg"');
		expect(html).toContain('loading="eager"');
	});
});
