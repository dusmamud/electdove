// Tiny cart + toast store (runes need a .svelte.ts file).
export const cart = $state({ count: 0, items: [] as string[] });
export const toast = $state({ message: '', key: 0 });

export function showToast(message: string) {
	toast.message = message;
	toast.key += 1;
}

export function addToCart(name: string) {
	cart.count += 1;
	cart.items = [...cart.items, name];
	showToast(`${name} added to bag`);
}
