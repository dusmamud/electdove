<script lang="ts">
	import { page } from '$app/state';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '../../../lib/actions/reveal';
	import { getBrand, brandProducts, formatPrice } from '../../../lib/data/products';
	import { srcset } from '../../../lib/images';

	const brand = $derived(getBrand(page.params.slug ?? ''));
	const items = $derived(brand ? brandProducts(brand.name) : []);
	const from = $derived(items.length ? Math.min(...items.map((p) => p.price)) : 0);
	const best = $derived(items.length ? Math.max(...items.map((p) => p.rating)) : 0);
</script>

<svelte:head>
	{#if brand}
		<title>{brand.name} | Electdove</title>
		<meta name="description" content="Shop {brand.name} on Electdove — {brand.tagline}" />
	{:else}
		<title>Brand not found | Electdove</title>
	{/if}
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
	<Breadcrumbs items={[{ label: 'Brands', href: '/brands' }, { label: brand?.name ?? 'Not found' }]} />

	{#if brand}
		<div class="mt-4 grid gap-8 md:grid-cols-2 md:gap-12">
			<div use:reveal class="overflow-hidden rounded-2xl">
				<img
					src={brand.photo}
					srcset={srcset(brand.photo)}
					sizes="(max-width: 767px) 100vw, 50vw"
					alt={brand.name}
					class="aspect-[4/3] w-full object-cover md:aspect-auto md:h-full"
				/>
			</div>
			<div use:reveal={{ delay: 120 }} class="flex flex-col justify-center">
				<p class="text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">Brand</p>
				<h1 class="mt-2 text-h1 font-extralight tracking-[0.05em] uppercase text-balance">{brand.name}</h1>
				<p class="mt-2 text-lg font-medium text-ink">{brand.tagline}</p>
				<p class="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">{brand.blurb}</p>
				<div class="mt-6 flex flex-wrap gap-6 text-sm">
					<p><span class="block text-xl font-extrabold text-ink">{items.length}</span><span class="text-stone-500">products</span></p>
					<p><span class="block text-xl font-extrabold text-ink">{formatPrice(from)}</span><span class="text-stone-500">starting at</span></p>
					<p><span class="block text-xl font-extrabold text-ink">{best.toFixed(1)} / 5</span><span class="text-stone-500">top rating</span></p>
				</div>
				<div class="mt-6 flex flex-wrap gap-3">
					<a
						href="#products"
						class="inline-flex min-h-11 items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900"
					>
						Shop {brand.name} <Icon name="arrow-right" class="h-4 w-4" />
					</a>
					<a
						href="/compare"
						class="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-black"
					>
						<Icon name="compare" class="h-4 w-4" /> Compare
					</a>
				</div>
			</div>
		</div>

		<div id="products" class="mt-12 scroll-mt-24">
			<h2 class="text-lg font-bold text-ink">All {brand.name} products</h2>
			<div class="mt-5 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
				{#each items as product (product.id)}
					<ProductCard {product} />
				{/each}
			</div>
		</div>
	{:else}
		<div use:reveal class="mt-8 rounded-2xl border border-line bg-white p-8 text-center">
			<p class="text-lg font-bold text-ink">This brand isn’t here yet</p>
			<p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
				We stock Apple, Samsung, Google and Sony. Pick one below to browse its range.
			</p>
			<a
				href="/brands"
				class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900"
			>
				All brands <Icon name="arrow-right" class="h-4 w-4" />
			</a>
		</div>
	{/if}
</div>
