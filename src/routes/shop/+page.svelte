<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import Icon from '#lib/components/Icon.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { categories, products, type Product } from '../../lib/data/products';
	import { shop } from '../../lib/data/store.svelte';

	type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
	type PriceKey = 'all' | 'under600' | '600-900' | '900-1100' | '1100plus';

	const PRICE_BUCKETS: { key: PriceKey; label: string }[] = [
		{ key: 'all', label: 'All prices' },
		{ key: 'under600', label: 'Under $600' },
		{ key: '600-900', label: '$600 – $900' },
		{ key: '900-1100', label: '$900 – $1,100' },
		{ key: '1100plus', label: '$1,100+' }
	];

	const RATING_OPTIONS: { value: number; label: string }[] = [
		{ value: 0, label: 'All ratings' },
		{ value: 4.5, label: '4.5+' },
		{ value: 4.0, label: '4.0+' }
	];

	let q = $state('');
	let category = $state('All');
	let sort = $state<SortKey>('featured');
	let price = $state<PriceKey>('all');
	let minRating = $state(0);
	let onSale = $state(false);
	let inStock = $state(false);
	let filtersOpen = $state(false);
	let added = $state(new Set<number>());
	let filterCloseBtn: HTMLButtonElement | undefined = $state();

	// Read ?q= / ?category= only in the browser: searchParams is unavailable
	// while the page is prerendered on the server. $effect never runs on the
	// server, so this also stays in sync on same-page navigation.
	$effect(() => {
		q = page.url.searchParams.get('q') ?? '';
		category = page.url.searchParams.get('category') ?? 'All';
	});

	// Bottom-sheet drawer: focus the close button and lock body scroll.
	$effect(() => {
		if (!filtersOpen) return;
		filterCloseBtn?.focus();
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = prev;
		};
	});

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && filtersOpen) filtersOpen = false;
	}

	const categoryCounts = $derived.by(() => {
		const counts = new Map<string, number>();
		for (const p of products) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
		return counts;
	});

	function priceMatches(p: Product): boolean {
		switch (price) {
			case 'under600':
				return p.price < 600;
			case '600-900':
				return p.price >= 600 && p.price <= 900;
			case '900-1100':
				return p.price > 900 && p.price <= 1100;
			case '1100plus':
				return p.price > 1100;
			default:
				return true;
		}
	}

	const activeFilterCount = $derived(
		(price !== 'all' ? 1 : 0) + (minRating > 0 ? 1 : 0) + (onSale ? 1 : 0) + (inStock ? 1 : 0)
	);

	const activeChips = $derived.by(() => {
		const chips: { key: string; label: string; clear: () => void }[] = [];
		if (price !== 'all') {
			chips.push({
				key: 'price',
				label: PRICE_BUCKETS.find((b) => b.key === price)?.label ?? 'Price',
				clear: () => (price = 'all')
			});
		}
		if (minRating > 0) {
			chips.push({
				key: 'rating',
				label: `${minRating.toFixed(1)}+ stars`,
				clear: () => (minRating = 0)
			});
		}
		if (onSale) chips.push({ key: 'sale', label: 'On sale', clear: () => (onSale = false) });
		if (inStock) chips.push({ key: 'stock', label: 'In stock', clear: () => (inStock = false) });
		return chips;
	});

	const filtered = $derived.by(() => {
		let list: Product[] = products;
		if (category !== 'All') list = list.filter((p) => p.category === category);
		const needle = q.trim().toLowerCase();
		if (needle) {
			list = list.filter(
				(p) => p.name.toLowerCase().includes(needle) || p.category.toLowerCase().includes(needle)
			);
		}
		if (price !== 'all') list = list.filter(priceMatches);
		if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
		if (onSale) list = list.filter((p) => p.oldPrice > p.price);
		if (inStock) list = list.filter((p) => p.stock > 0);
		switch (sort) {
			case 'price-asc':
				return [...list].sort((a, b) => a.price - b.price);
			case 'price-desc':
				return [...list].sort((a, b) => b.price - a.price);
			case 'rating':
				return [...list].sort((a, b) => b.rating - a.rating);
			case 'discount':
				return [...list].sort(
					(a, b) => b.oldPrice - b.price - (a.oldPrice - a.price)
				);
			default:
				return list;
		}
	});

	function syncUrl() {
		const params = new URLSearchParams();
		if (q.trim()) params.set('q', q.trim());
		if (category !== 'All') params.set('category', category);
		const qs = params.toString();
		goto(qs ? `/shop?${qs}` : '/shop', { replaceState: true });
	}

	function pickCategory(name: string) {
		category = name;
		syncUrl();
	}

	function clearFilters() {
		price = 'all';
		minRating = 0;
		onSale = false;
		inStock = false;
	}

	function clearAll() {
		q = '';
		category = 'All';
		clearFilters();
		syncUrl();
	}

	function addToCart(id: number) {
		shop.addToCart(id);
		added.add(id);
		added = new Set(added);
		setTimeout(() => {
			added.delete(id);
			added = new Set(added);
		}, 1400);
	}
</script>

<svelte:window onkeydown={onKeydown} />

<svelte:head>
	<title>Shop — Electdove</title>
	<meta
		name="description"
		content="Shop all products at Electdove — electronics, fashion, home, beauty and more with free shipping over $50."
	/>
</svelte:head>

{#snippet filterControls()}
	<div>
		<h3 class="text-sm font-bold text-ink">Price</h3>
		<div class="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="Filter by price">
			{#each PRICE_BUCKETS as bucket (bucket.key)}
				<button
					type="button"
					onclick={() => (price = bucket.key)}
					aria-pressed={price === bucket.key}
					class="min-h-11 rounded-full px-4 text-sm font-semibold transition {price === bucket.key
						? 'bg-black text-white'
						: 'border border-line bg-white text-ink hover:border-black'}"
				>
					{bucket.label}
				</button>
			{/each}
		</div>
	</div>

	<div>
		<h3 class="text-sm font-bold text-ink">Rating</h3>
		<div class="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="Filter by minimum rating">
			{#each RATING_OPTIONS as option (option.value)}
				<button
					type="button"
					onclick={() => (minRating = option.value)}
					aria-pressed={minRating === option.value}
					class="flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition {minRating ===
					option.value
						? 'bg-black text-white'
						: 'border border-line bg-white text-ink hover:border-black'}"
				>
					{#if option.value > 0}<Stars rating={option.value} class="h-3.5 w-3.5" />{/if}
					{option.label}
				</button>
			{/each}
		</div>
	</div>

	<div>
		<h3 class="text-sm font-bold text-ink">Availability</h3>
		<div class="mt-2.5 flex flex-wrap gap-2">
			<button
				type="button"
				onclick={() => (onSale = !onSale)}
				aria-pressed={onSale}
				class="flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition {onSale
					? 'bg-black text-white'
					: 'border border-line bg-white text-ink hover:border-black'}"
			>
				{#if onSale}<Icon name="check" class="h-4 w-4" />{/if}
				On sale only
			</button>
			<button
				type="button"
				onclick={() => (inStock = !inStock)}
				aria-pressed={inStock}
				class="flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold transition {inStock
					? 'bg-black text-white'
					: 'border border-line bg-white text-ink hover:border-black'}"
			>
				{#if inStock}<Icon name="check" class="h-4 w-4" />{/if}
				In stock only
			</button>
		</div>
	</div>
{/snippet}

<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
	<Breadcrumbs items={[{ label: 'Shop' }]} />
	<h1 class="mt-4 text-xl font-extrabold tracking-tight text-ink sm:text-2xl">Shop All Products</h1>
	<p class="mt-1 text-sm text-stone-500">
		{filtered.length} {filtered.length === 1 ? 'product' : 'products'}
		{#if category !== 'All'} in {category}{/if}
		{#if q.trim()} matching “{q.trim()}”{/if}
	</p>

	<!-- Search -->
	<form
		class="mt-5"
		onsubmit={(e) => {
			e.preventDefault();
			syncUrl();
		}}
	>
		<label class="relative block">
			<span class="sr-only">Search products</span>
			<Icon name="search" class="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone-400" />
			<input
				type="search"
				bind:value={q}
				oninput={syncUrl}
				placeholder="Search products..."
				class="w-full rounded-lg border border-line bg-white py-3 pr-4 pl-11 text-sm text-ink placeholder:text-stone-400 focus:border-black focus:ring-2 focus:ring-black/30 focus:outline-none"
			/>
		</label>
	</form>

	<!-- Category chips -->
	<div class="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by category">
		<button
			type="button"
			onclick={() => pickCategory('All')}
			aria-pressed={category === 'All'}
			class="shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition {category === 'All'
				? 'bg-black text-white'
				: 'border border-line bg-white text-ink hover:border-black'}"
		>
			All ({products.length})
		</button>
		{#each categories as cat}
			<button
				type="button"
				onclick={() => pickCategory(cat.name)}
				aria-pressed={category === cat.name}
				class="shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition {category === cat.name
					? 'bg-black text-white'
					: 'border border-line bg-white text-ink hover:border-black'}"
			>
				{cat.name} ({categoryCounts.get(cat.name) ?? 0})
			</button>
		{/each}
	</div>

	<div class="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
		<!-- Desktop filter sidebar -->
		<aside class="hidden lg:block">
			<div class="sticky top-24 rounded-2xl border border-line bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
				<div class="flex items-center justify-between gap-2">
					<h2 class="flex items-center gap-2 text-base font-bold text-ink">
						<Icon name="sliders" class="h-4 w-4 text-black" /> Filters
					</h2>
					{#if activeFilterCount > 0}
						<button
							type="button"
							onclick={clearFilters}
							class="text-xs font-semibold text-black hover:text-neutral-800"
						>
							Clear all
						</button>
					{/if}
				</div>
				<div class="mt-5 space-y-6">{@render filterControls()}</div>
			</div>
		</aside>

		<div class="min-w-0">
			<!-- Sort + mobile Filters button -->
			<div class="flex flex-wrap items-center justify-between gap-3">
				<p class="text-sm text-stone-500">
					Showing <span class="font-semibold text-ink">{filtered.length}</span> of {products.length} products
				</p>
				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={() => (filtersOpen = true)}
						class="flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white px-4 text-sm font-semibold text-ink transition hover:border-black lg:hidden"
					>
						<Icon name="sliders" class="h-4 w-4" /> Filters
						{#if activeFilterCount > 0}
							<span
								class="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[11px] font-bold text-white"
							>
								{activeFilterCount}
							</span>
						{/if}
					</button>
					<label class="flex items-center gap-2 text-sm text-stone-500">
						<span class="sr-only sm:not-sr-only">Sort by</span>
						<select
							bind:value={sort}
							class="rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-ink focus:border-black focus:ring-2 focus:ring-black/30 focus:outline-none"
						>
							<option value="featured">Featured</option>
							<option value="price-asc">Price: Low to High</option>
							<option value="price-desc">Price: High to Low</option>
							<option value="rating">Top Rated</option>
							<option value="discount">Biggest Discount</option>
						</select>
					</label>
				</div>
			</div>

			<!-- Active filter chips -->
			{#if activeChips.length > 0}
				<div class="mt-4 flex flex-wrap items-center gap-2" aria-label="Active filters">
					{#each activeChips as chip (chip.key)}
						<button
							type="button"
							onclick={chip.clear}
							aria-label="Remove filter {chip.label}"
							class="flex min-h-8 items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-black hover:text-white"
						>
							{chip.label}
							<Icon name="close" class="h-3.5 w-3.5" />
						</button>
					{/each}
					<button
						type="button"
						onclick={clearFilters}
						class="min-h-8 px-2 text-xs font-semibold text-stone-500 underline underline-offset-2 hover:text-ink"
					>
						Clear all
					</button>
				</div>
			{/if}

			{#if filtered.length === 0}
				<div class="mt-6 rounded-2xl border border-dashed border-line bg-mist px-6 py-14 text-center">
					<Icon name="search" class="mx-auto h-10 w-10 text-stone-300" />
					<p class="mt-4 text-base font-semibold text-ink">No products found</p>
					<p class="mt-1 text-sm text-stone-500">
						Try a different search or category, or clear the filters.
					</p>
					<button
						type="button"
						onclick={clearAll}
						class="mt-5 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-900"
					>
						Clear Filters
					</button>
				</div>
			{:else}
				<div class="mt-6 grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3">
					{#each filtered as product, i (product.id)}
						<article style="--i: {i}" class="card-in group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-xl">
							<div class="relative aspect-square overflow-hidden bg-mist">
								<a href="/product/{product.id}" aria-label={product.name} class="block h-full w-full">
									<img
										src={product.src}
										alt={product.name}
										loading="lazy"
										class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
									/>
								</a>
								<button
									type="button"
									aria-label={`Quick view ${product.name}`}
									onclick={() => shop.openQuickView(product.id)}
									class="absolute top-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-stone-500 shadow transition hover:scale-110"
								>
									<Icon name="eye" class="h-5 w-5" />
								</button>
								<button
									type="button"
									aria-label={shop.isWished(product.id) ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
									aria-pressed={shop.isWished(product.id)}
									onclick={() => shop.toggleWishlist(product.id)}
									class="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition hover:scale-110 {shop.isWished(product.id)
										? 'text-red-500'
										: 'text-stone-500'}"
								>
									<Icon
										name="heart"
										class="h-4 w-4 {shop.isWished(product.id) ? 'fill-red-500' : ''}"
									/>
								</button>
							</div>
							<div class="flex flex-1 flex-col p-3 sm:p-4">
								<h2 class="text-sm font-semibold text-ink">
									<a href="/product/{product.id}" class="hover:text-black">{product.name}</a>
								</h2>
								<p class="mt-1.5 flex items-center gap-1 text-xs text-stone-500">
									<Stars rating={product.rating} class="h-3 w-3 sm:h-3.5 sm:w-3.5" />
									<span class="font-semibold text-ink">{product.rating.toFixed(1)}</span>
									<span>({product.reviews})</span>
								</p>
								<p class="mt-2 flex items-baseline gap-2">
									<span class="text-base font-extrabold text-ink">${product.price.toFixed(2)}</span>
									<span class="text-xs text-stone-400 line-through">${product.oldPrice.toFixed(2)}</span>
								</p>
								<button
									type="button"
									onclick={() => addToCart(product.id)}
									class="press mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-white transition {added.has(product.id)
										? 'bg-neutral-900'
										: 'bg-black hover:bg-neutral-900'}"
								>
									<Icon name={added.has(product.id) ? 'check' : 'cart'} class="h-4 w-4" />
									{added.has(product.id) ? 'Added to Cart' : 'Add to Cart'}
								</button>
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- Mobile filter bottom sheet -->
{#if filtersOpen}
	<div class="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
		<button
			type="button"
			aria-label="Close filters"
			class="absolute inset-0 cursor-default bg-black/50"
			onclick={() => (filtersOpen = false)}
			transition:fade={{ duration: 200 }}
		></button>
		<div
			class="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-white shadow-2xl"
			transition:fly={{ y: 400, duration: 300 }}
		>
			<div class="flex justify-center pt-3">
				<span class="h-1.5 w-12 rounded-full bg-stone-300" aria-hidden="true"></span>
			</div>
			<div class="flex items-center justify-between border-b border-line px-5 py-3">
				<h2 class="flex items-center gap-2 text-base font-bold text-ink">
					<Icon name="sliders" class="h-4 w-4 text-black" /> Filters
					{#if activeFilterCount > 0}
						<span class="rounded-full bg-black px-2 py-0.5 text-xs font-bold text-white">
							{activeFilterCount}
						</span>
					{/if}
				</h2>
				<button
					type="button"
					bind:this={filterCloseBtn}
					aria-label="Close filters"
					onclick={() => (filtersOpen = false)}
					class="flex h-11 w-11 items-center justify-center rounded-full text-ink transition hover:bg-mist"
				>
					<Icon name="close" class="h-5 w-5" />
				</button>
			</div>
			<div class="space-y-6 overflow-y-auto px-5 py-5">{@render filterControls()}</div>
			<div class="flex gap-3 border-t border-line px-5 py-4">
				<button
					type="button"
					onclick={clearFilters}
					class="flex-1 rounded-lg border border-line px-4 py-3 text-sm font-semibold text-ink transition hover:border-black"
				>
					Clear all
				</button>
				<button
					type="button"
					onclick={() => (filtersOpen = false)}
					class="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900"
				>
					Apply filters
				</button>
			</div>
		</div>
	</div>
{/if}
