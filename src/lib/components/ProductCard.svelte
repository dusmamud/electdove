<script lang="ts">
	import Icon from './Icon.svelte';
	import { shop } from '../data/store.svelte';
	import { formatPrice, type Product } from '../data/products';

	const { product }: { product: Product } = $props();

	let added = $state(false);
	function addToBag() {
		shop.addToCart(product.id, 1, { openDrawer: false });
		added = true;
		setTimeout(() => (added = false), 1600);
	}
</script>

<article class="group">
	<div class="relative overflow-hidden bg-white">
		<a href="/product/{product.id}" aria-label={product.name} class="block">
			<img
				src={product.src}
				alt={product.name}
				loading="lazy"
				class="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
			/>
		</a>
		{#if product.tag}
			<span class="absolute bottom-3 left-3 bg-black px-2 py-1 text-[11px] font-medium tracking-[0.14em] text-white uppercase md:top-3 md:bottom-auto">{product.tag}</span>
		{/if}
		<button
			type="button"
			aria-label={shop.isWished(product.id) ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
			aria-pressed={shop.isWished(product.id)}
			onclick={() => shop.toggleWishlist(product.id)}
			class="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow transition hover:scale-110 {shop.isWished(product.id)
				? 'text-red-500'
				: 'text-stone-500'}"
		>
			<Icon name="heart" class="h-5 w-5 {shop.isWished(product.id) ? 'fill-red-500' : ''}" />
		</button>
		<button
			type="button"
			onclick={() => shop.openQuickView(product.id)}
			class="absolute bottom-3 left-3 flex min-h-11 items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-[11px] font-medium tracking-[0.08em] text-ink uppercase opacity-0 shadow transition group-hover:opacity-100 focus:opacity-100 max-md:hidden"
		>
			Quick view
		</button>
		<button
			class="absolute right-3 bottom-3 hidden min-h-11 items-center gap-2 bg-black px-4 py-3 text-[11px] font-medium tracking-[0.12em] text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex"
			onclick={addToBag}
			aria-label="Add {product.name} to bag"
		>
			Add to bag
		</button>
	</div>
	<h3 class="mt-4 text-xs font-medium tracking-[0.14em] uppercase text-balance md:text-sm">
		<a href="/product/{product.id}" class="hover:opacity-60">{product.name}</a>
	</h3>
	<p class="mt-1 text-xs text-muted md:text-sm">
		{formatPrice(product.price)}
		{#if product.oldPrice > product.price}
			<span class="ml-1.5 text-stone-400 line-through">{formatPrice(product.oldPrice)}</span>
		{/if}
	</p>
	<button
		type="button"
		onclick={addToBag}
		aria-label="Add {product.name} to bag"
		class="press mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-3 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase transition md:hidden {added
			? 'bg-black text-white'
			: 'border border-line bg-white text-ink hover:border-black'}"
	>
		<Icon name={added ? 'check' : 'cart'} class="h-4 w-4" />
		{added ? 'Added to Bag' : 'Add to Bag'}
	</button>
</article>
