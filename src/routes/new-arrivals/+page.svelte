<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '../../lib/actions/reveal';
	import { newArrivals } from '../../lib/data/products';
</script>

<svelte:head>
	<title>New Arrivals | Electdove</title>
	<meta
		name="description"
		content="The newest tech on Electdove — just-landed flagships, wearables and audio, fresh in stock."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
	<Breadcrumbs items={[{ label: 'New Arrivals' }]} />

	<div use:reveal class="mt-4 max-w-2xl">
		<p class="text-xs font-bold tracking-[0.2em] text-black uppercase">Just landed</p>
		<h1 class="mt-2 text-h1 font-extralight tracking-[0.05em] uppercase text-balance">New arrivals</h1>
		<p class="mt-2 text-sm leading-relaxed text-muted md:text-base">
			The latest flagships and wearables, fresh in stock and ready to ship. New drops land here first —
			before they hit the main shop.
		</p>
	</div>

	<div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
		{#each newArrivals as product, i (product.id)}
			<div use:reveal={{ delay: i * 70 }}>
				<ProductCard {product} />
			</div>
		{/each}
	</div>

	<div use:reveal class="mt-12 rounded-2xl bg-black p-6 text-white sm:p-8">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 class="text-lg font-bold">Never miss a drop</h2>
				<p class="mt-1 max-w-md text-sm leading-relaxed text-white/70">
					New arrivals sell fast. Browse the full shop while you’re here — or compare the new flagships
					side by side before you decide.
				</p>
			</div>
			<div class="flex flex-wrap gap-3">
				<a
					href="/shop"
					class="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
				>
					Shop all <Icon name="arrow-right" class="h-4 w-4" />
				</a>
				<a
					href="/compare"
					class="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:border-white"
				>
					<Icon name="compare" class="h-4 w-4" /> Compare flagships
				</a>
			</div>
		</div>
	</div>
</div>
