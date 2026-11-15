export type Product = {
	id: string;
	name: string;
	price: number;
	image: string;
	tag?: string;
};

export const readyToWear: Product[] = [
	{ id: 'watch-ultra-2', name: 'Apple Watch Ultra 2', price: 899, image: '/product-watch.webp', tag: 'New' },
	{ id: 'airpods-max', name: 'AirPods Max', price: 549, image: '/product-headphones.webp' },
	{ id: 'playstation-5', name: 'PlayStation 5', price: 499, image: '/product-ps5.webp', tag: 'Best Seller' },
	{ id: 'galaxy-s24-ultra', name: 'Samsung Galaxy S24 Ultra', price: 1299, image: '/product-galaxy.webp' }
];

export const smartphones: Product[] = [
	{ id: 'iphone-15-pro', name: 'iPhone 15 Pro', price: 999, image: '/phone-iphone15pro.webp', tag: 'New' },
	{ id: 'pixel-8-pro', name: 'Google Pixel 8 Pro', price: 899, image: '/phone-pixel8pro.webp' },
	{ id: 'galaxy-s24-ultra-2', name: 'Samsung Galaxy S24 Ultra', price: 1299, image: '/phone-galaxy-s24.webp' },
	{ id: 'iphone-14', name: 'iPhone 14', price: 899, image: '/phone-iphone14.webp' }
];

export function formatPrice(n: number): string {
	return '$' + n.toLocaleString('en-US');
}
