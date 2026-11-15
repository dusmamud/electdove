<script lang="ts">
	import Icon from './Icon.svelte';
	import { addToCart } from '../data/cart.svelte';
	import { formatPrice, type Product } from '../data/products';

	const { product }: { product: Product } = $props();
</script>

<article class="group">
	<div class="relative overflow-hidden bg-white">
		<img
			src={product.image}
			alt={product.name}
			loading="lazy"
			class="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
		/>
		{#if product.tag}
			<span class="absolute top-3 left-3 bg-black px-2 py-1 text-[10px] font-medium tracking-[0.14em] text-white uppercase">{product.tag}</span>
		{/if}
		<button
			class="absolute right-3 bottom-3 flex items-center gap-2 bg-black px-4 py-2.5 text-[11px] font-medium tracking-[0.12em] text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-100"
			onclick={() => addToCart(product.name)}
			aria-label="Add {product.name} to bag"
		>
			Add to bag
		</button>
	</div>
	<h3 class="mt-4 text-[11px] font-medium tracking-[0.14em] uppercase md:text-xs">{product.name}</h3>
	<p class="mt-1 text-xs text-muted md:text-sm">{formatPrice(product.price)}</p>
</article>
