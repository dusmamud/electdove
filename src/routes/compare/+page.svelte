<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { reveal } from '../../lib/actions/reveal';
	import { products, productUrl } from '../../lib/data/products';
	import { shop, formatPrice } from '../../lib/data/store.svelte';
	import { srcset } from '../../lib/images';

	const items = $derived(shop.compareProducts);
	let differencesOnly = $state(false);

	/** Union of spec labels, in first-appearance order. */
	const specLabels = $derived.by(() => {
		const seen: string[] = [];
		for (const p of items) for (const s of p.specs) if (!seen.includes(s.label)) seen.push(s.label);
		return seen;
	});

	const bestPrice = $derived(items.length ? Math.min(...items.map((p) => p.price)) : 0);
	const bestRating = $derived(items.length ? Math.max(...items.map((p) => p.rating)) : 0);

	type Row = { label: string; values: string[]; best?: boolean[] };
	const rows = $derived.by((): Row[] => {
		const all: Row[] = [
			{ label: 'Price', values: items.map((p) => formatPrice(p.price)), best: items.map((p) => p.price === bestPrice) },
			{ label: 'Rating', values: items.map((p) => `${p.rating.toFixed(1)} / 5 (${p.reviews} reviews)`), best: items.map((p) => p.rating === bestRating) },
			{ label: 'Category', values: items.map((p) => p.category) },
			{ label: 'Stock', values: items.map((p) => (p.stock > 0 ? `${p.stock} in stock` : 'Out of stock')) },
			...specLabels.map((label) => ({
				label,
				values: items.map((p) => p.specs.find((s) => s.label === label)?.value ?? '—')
			}))
		];
		return differencesOnly ? all.filter((r) => new Set(r.values).size > 1) : all;
	});
</script>

<svelte:head>
	<title>Compare Products | Electdove</title>
	<meta
		name="description"
		content="Compare smartphones, wearables, audio and gaming side by side — price, rating, display, chip, camera and battery — on Electdove."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
	<Breadcrumbs items={[{ label: 'Compare' }]} />

	<div use:reveal class="mt-4 flex flex-wrap items-end justify-between gap-4">
		<div>
			<h1 class="text-h1 font-extralight tracking-[0.05em] uppercase text-balance">Compare products</h1>
			<p class="mt-2 max-w-xl text-sm leading-relaxed text-muted md:text-base">
				Side-by-side specs, prices and ratings — so you can pick the right device without opening ten tabs.
				Add up to 4 products from any product page or card.
			</p>
		</div>
		{#if items.length > 0}
			<button
				type="button"
				onclick={() => shop.clearCompare()}
				class="flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white px-4 text-sm font-semibold text-stone-600 transition hover:border-black hover:text-black"
			>
				<Icon name="close" class="h-4 w-4" /> Clear all
			</button>
		{/if}
	</div>

	{#if items.length < 2}
		<div use:reveal class="mt-8 rounded-2xl border border-line bg-white p-8 text-center">
			<Icon name="compare" class="mx-auto h-10 w-10 text-stone-300" />
			<p class="mt-4 text-lg font-bold text-ink">
				{#if items.length === 0}Nothing to compare yet{:else}Add one more product to compare{/if}
			</p>
			<p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
				Tap <span class="font-semibold text-ink">Add to compare</span> on any product card or product page.
				You can compare up to 4 devices at once.
			</p>
			<a
				href="/shop"
				class="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900"
			>
				Browse products <Icon name="arrow-right" class="h-4 w-4" />
			</a>
		</div>

		{#if items.length === 1}
			<h2 class="mt-10 text-lg font-bold text-ink">Your pick so far</h2>
			<div class="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
				{#each items as product (product.id)}
					<ProductCard {product} />
				{/each}
			</div>
		{:else}
			<h2 class="mt-10 text-lg font-bold text-ink">Popular to compare</h2>
			<div class="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
				{#each products as product (product.id)}
					<ProductCard {product} />
				{/each}
			</div>
		{/if}
	{:else}
		<label use:reveal class="mt-8 flex min-h-11 cursor-pointer items-center gap-2.5 text-sm font-semibold text-ink">
			<input
				type="checkbox"
				bind:checked={differencesOnly}
				class="h-5 w-5 accent-black"
			/>
			Show only differences
			<span class="font-normal text-stone-500">— hides rows where every product matches</span>
		</label>

		<div use:reveal class="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
			<table class="w-full min-w-[640px] border-collapse text-left text-sm">
				<thead>
					<tr class="align-top">
						<th scope="col" class="w-36 min-w-36 p-4 align-bottom text-xs font-bold tracking-[0.14em] text-stone-500 uppercase">
							{items.length} products
						</th>
						{#each items as product (product.id)}
							<th scope="col" class="min-w-44 p-4">
								<a href={productUrl(product.id)} class="block">
									<img
										src={product.src}
										srcset={srcset(product.src)}
										sizes="176px"
										alt={product.name}
										loading="lazy"
										class="aspect-square w-full max-w-44 rounded-xl object-cover"
									/>
									<span class="mt-3 block text-sm leading-snug font-bold text-ink hover:opacity-60">
										{product.name}
									</span>
								</a>
								<button
									type="button"
									onclick={() => shop.removeFromCompare(product.id)}
									class="mt-1.5 flex min-h-9 items-center gap-1 text-xs font-semibold text-stone-500 transition hover:text-red-600"
									aria-label="Remove {product.name} from compare"
								>
									<Icon name="close" class="h-3.5 w-3.5" /> Remove
								</button>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each rows as row, ri (row.label)}
						<tr class={ri % 2 === 0 ? 'bg-mist/60' : 'bg-white'}>
							<th scope="row" class="p-4 text-xs font-bold tracking-[0.1em] text-stone-500 uppercase">
								{row.label}
							</th>
							{#each row.values as value, i (i)}
								<td class="p-4 align-top text-sm leading-relaxed text-ink">
									{#if row.label === 'Rating'}
										<span class="flex items-center gap-1.5">
											<Stars rating={items[i].rating} class="h-3.5 w-3.5" />
											<span class={row.best?.[i] ? 'font-bold text-green-700' : ''}>{value}</span>
										</span>
									{:else if row.best?.[i]}
										<span class="font-bold text-green-700">{value}</span>
										<span class="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-bold text-green-800">Best</span>
									{:else}
										{value}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
					<tr>
						<th scope="row" class="p-4"></th>
						{#each items as product (product.id)}
							<td class="p-4">
								<button
									type="button"
									onclick={() => shop.addToCart(product.id, 1, { openDrawer: false })}
									class="press flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-xs font-semibold tracking-[0.1em] text-white uppercase transition hover:bg-neutral-900"
								>
									<Icon name="cart" class="h-4 w-4" /> Add to Bag
								</button>
								<a
									href="/emi-calculator?product={product.slug}"
									class="mt-2 block text-center text-xs font-semibold text-stone-500 underline underline-offset-2 hover:text-black"
								>
									EMI from {formatPrice(Math.ceil(product.price / 12))}/month
								</a>
							</td>
						{/each}
					</tr>
				</tbody>
			</table>
		</div>

		<p class="mt-4 text-xs leading-relaxed text-stone-500">
			Prices are inclusive of all taxes. Specs are as listed on each product page — demo catalogue data.
		</p>
	{/if}
</div>
