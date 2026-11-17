import { brands } from '../../../lib/data/products';

export function entries() {
	return brands.map((b) => ({ slug: b.slug }));
}
