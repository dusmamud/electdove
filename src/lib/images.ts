/**
 * Responsive image helpers.
 *
 * Every photo in static/ is a WebP with pre-generated width variants
 * (`{name}-400.webp`, `{name}-800.webp`, and `{name}-1200.webp` for the
 * hero). The browser picks the smallest candidate that covers the rendered
 * slot (slot width from `sizes` × device pixel ratio), so a phone never
 * downloads the 1600px original.
 *
 * Original widths (the `w` descriptor for the full-size file):
 * - gallery photos: 1600 (default)
 * - product mains (phone-*.webp, product-*.webp): 900
 * - collection photos: 960
 * - hero: 2352
 */

const ORIG_WIDTH: Record<string, number> = {
	'/hero.webp': 2352,
	'/collection-cases.webp': 960,
	'/collection-laptop.webp': 960,
	'/phone-iphone15pro.webp': 900,
	'/phone-iphone14.webp': 900,
	'/phone-pixel8pro.webp': 900,
	'/phone-galaxy-s24.webp': 900,
	'/product-galaxy.webp': 900,
	'/product-headphones.webp': 900,
	'/product-ps5.webp': 900,
	'/product-watch.webp': 900
};

/** Width variants that exist on disk for a given image. */
function variants(src: string): number[] {
	if (src === '/hero.webp') return [800, 1200];
	return [400, 800];
}

/**
 * Build a `srcset` string for a static WebP image, e.g.
 * `srcset(src)` → "/phone-iphone15pro-400.webp 400w, … , /phone-iphone15pro.webp 900w".
 * Returns '' for non-WebP sources (SVG, external URLs).
 */
export function srcset(src: string): string {
	if (!src.endsWith('.webp')) return '';
	const base = src.slice(0, -5);
	const origW = ORIG_WIDTH[src] ?? 1600;
	const parts = variants(src)
		.filter((w) => w < origW)
		.map((w) => `${base}-${w}.webp ${w}w`);
	parts.push(`${src} ${origW}w`);
	return parts.join(', ');
}

/** `sizes` for product-card grids (2 cols mobile → 3 → 4 on xl). */
export const SIZES_CARD = '(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw';
/** `sizes` for the PDP gallery main image (full width mobile, half on desktop). */
export const SIZES_PDP = '(max-width: 1023px) 100vw, 50vw';
/** `sizes` for the full-width home hero. */
export const SIZES_HERO = '100vw';
