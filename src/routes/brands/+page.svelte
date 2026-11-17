<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '../../lib/actions/reveal';
	import { brands, brandProducts, formatPrice } from '../../lib/data/products';

	const withCounts = brands.map((b) => {
		const items = brandProducts(b.name);
		return { ...b, count: items.length, from: Math.min(...items.map((p) => p.price)) };
	});
</script>

<svelte:head>
	<title>Brands | Electdove</title>
	<meta
		name="description"
		content="Shop by brand on Electdove — Apple, Samsung, Google and Sony flagships, wearables, audio and gaming."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
	<Breadcrumbs items={[{ label: 'Brands' }]} />

	<div use:reveal class="mt-4 max-w-2xl">
		<h1 class="text-h1 font-extralight tracking-[0.05em] uppercase text-balance">Shop by brand</h1>
		<p class="mt-2 text-sm leading-relaxed text-muted md:text-base">
			The brands that make the tech you love — every device genuine, covered by a 2-year Electdove
			warranty and 30-day returns.
		</p>
	</div>

	<div class="mt-8 grid gap-5 sm:grid-cols-2">
		{#each withCounts as brand, i (brand.slug)}
			<a
				href="/brands/{brand.slug}"
				use:reveal={{ delay: i * 80 }}
				class="group overflow-hidden rounded-2xl border border-line bg-white transition hover:border-black"
			>
				<div class="overflow-hidden">
					<img
						src={brand.photo}
						alt={brand.name}
						loading="lazy"
						class="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
					/>
				</div>
				<div class="p-5 sm:p-6">
					<div class="flex items-baseline justify-between gap-3">
						<h2 class="text-xl font-extrabold tracking-tight text-ink">{brand.name}</h2>
						<span class="shrink-0 text-xs font-semibold text-stone-500">{brand.count} products</span>
					</div>
					<p class="mt-1 text-sm text-stone-500">{brand.tagline}</p>
					<p class="mt-3 flex items-center gap-2 text-sm font-semibold text-ink">
						From {formatPrice(brand.from)}
						<Icon name="arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</p>
				</div>
			</a>
		{/each}
	</div>
</div>
