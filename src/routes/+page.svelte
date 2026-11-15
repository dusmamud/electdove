<script lang="ts">
	import Icon from '../lib/components/Icon.svelte';
	import ProductCard from '../lib/components/ProductCard.svelte';
	import { readyToWear, smartphones } from '../lib/data/products';
</script>

<!-- HERO -->
<section id="top" class="relative overflow-hidden bg-[#8d99ad]">
	<img
		src="/hero.webp"
		alt="New collection — flagship smartphones in blue, silver and purple"
		class="h-[560px] w-full object-cover object-[70%_center] sm:h-[620px] md:h-[680px] lg:object-center"
		fetchpriority="high"
	/>
	<!-- Copy, left -->
	<div class="absolute inset-0">
		<div class="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6">
			<div class="animate-fade-up max-w-md pt-10">
				<h1 class="text-5xl leading-[0.95] font-extralight tracking-[0.04em] text-white uppercase sm:text-6xl md:text-7xl">
					New<br />Collection
				</h1>
				<a
					href="#ready-to-wear"
					class="mt-8 inline-flex items-center gap-3 bg-black px-7 py-3.5 text-xs font-medium tracking-[0.18em] text-white uppercase transition hover:bg-neutral-800"
				>
					Shop Now <Icon name="arrow-right" class="h-4 w-4" />
				</a>
			</div>
			<!-- Right-side note, desktop only -->
			<div class="absolute top-1/2 right-6 hidden -translate-y-1/2 text-right text-white md:block lg:right-10">
				<p class="text-3xl leading-none font-extralight tracking-wide">22/23</p>
				<p class="mt-2 text-sm font-light tracking-[0.28em] uppercase">Smartwatches</p>
				<p class="mt-1 text-[11px] tracking-[0.22em] text-white/80 uppercase">Built for what's next</p>
			</div>
		</div>
	</div>
	<!-- Diagonal white divider into the light section -->
	<svg class="absolute bottom-0 left-0 h-[46px] w-full sm:h-[70px]" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
		<path d="M0 70 L0 38 C 360 10, 720 58, 1080 34 C 1260 22, 1380 26, 1440 18 L1440 70 Z" fill="#f4f4f2" />
	</svg>
</section>

<!-- READY-TO-WEAR -->
<section id="ready-to-wear" class="bg-mist">
	<div class="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 md:pt-16 md:pb-20">
		<div class="flex items-end justify-between gap-4">
			<h2 class="text-3xl font-extralight tracking-[0.05em] uppercase sm:text-4xl md:text-5xl">Ready-to-wear</h2>
			<a href="#smartphones" class="mb-1 flex shrink-0 items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase hover:opacity-60">
				See more <Icon name="arrow-right" class="h-3.5 w-3.5" />
			</a>
		</div>
		<div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
			{#each readyToWear as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</section>

<!-- NEW COLLECTION FEATURE -->
<section id="collection" class="bg-mist">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 md:grid-cols-2 md:gap-12 md:pb-20">
		<div class="overflow-hidden bg-[#e8e8e8]">
			<img
				src="/collection-laptop.webp"
				alt="Premium black laptop from the new collection"
				loading="lazy"
				class="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.03] md:aspect-auto md:h-full"
			/>
		</div>
		<div class="flex flex-col">
			<div class="flex items-end justify-between gap-4">
				<h2 class="text-3xl leading-[1.05] font-extralight tracking-[0.05em] uppercase sm:text-4xl md:text-5xl">
					New<br />Collection
				</h2>
				<a href="#smartphones" class="mb-1 flex shrink-0 items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase hover:opacity-60">
					See more <Icon name="arrow-right" class="h-3.5 w-3.5" />
				</a>
			</div>
			<p class="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
				Premium devices for a smarter tomorrow. From powerful laptops to next-gen smartphones, our collection
				brings together the best in technology, design and performance.
			</p>
			<div class="mt-auto overflow-hidden bg-[#e8e8e8] pt-8">
				<img
					src="/collection-cases.webp"
					alt="Smartphone cases in black, white, pink and purple"
					loading="lazy"
					class="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
				/>
			</div>
		</div>
	</div>
</section>

<!-- SMARTPHONES FOR YOU -->
<section id="smartphones" class="bg-mist">
	<div class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24">
		<div class="flex items-end justify-between gap-4">
			<h2 class="text-3xl font-extralight tracking-[0.05em] uppercase sm:text-4xl md:text-5xl">Smartphones for you</h2>
			<a href="#ready-to-wear" class="mb-1 flex shrink-0 items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase hover:opacity-60">
				See more <Icon name="arrow-right" class="h-3.5 w-3.5" />
			</a>
		</div>
		<div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
			{#each smartphones as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</section>
