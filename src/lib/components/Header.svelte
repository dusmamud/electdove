<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from './Icon.svelte';
	import { products, formatPrice } from '../data/products';
	import { shop } from '../data/store.svelte';

	const links: { label: string; href: string }[] = [
		{ label: 'Home', href: '/' },
		{ label: 'Shop', href: '/shop' },
		{ label: 'Categories', href: '/categories' },
		{ label: 'Deals', href: '/deals' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: '/contact' }
	];

	let menuOpen = $state(false);
	let searchOpen = $state(false);
	let query = $state('');
	let searchInput: HTMLInputElement | undefined = $state();

	const suggestions = $derived(
		query.trim().length >= 2
			? products
					.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
					.slice(0, 5)
			: []
	);

	function toggleSearch() {
		searchOpen = !searchOpen;
		if (searchOpen) {
			// Focus the input once the panel is in the DOM.
			requestAnimationFrame(() => searchInput?.focus());
		}
	}

	function submitSearch() {
		if (query.trim()) goto(`/shop?q=${encodeURIComponent(query.trim())}`);
		searchOpen = false;
	}

	function pickSuggestion(slug: string) {
		searchOpen = false;
		query = '';
		goto(`/product/${slug}`);
	}

	function onSearchKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') searchOpen = false;
	}
</script>

<!-- Top announcement bar -->
<div class="bg-black text-white">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] tracking-[0.14em] uppercase sm:px-6">
		<span class="hidden md:block">Free shipping across India</span>
		<span class="mx-auto md:mx-0"><span class="sm:hidden">Up to 10% off — limited time only.</span><span class="hidden sm:inline">Up to 10% off on selected tech. Limited time only.</span></span>
		<span class="hidden gap-5 md:flex">
			<a href="/contact" class="hover:opacity-70">Contact</a>
			<a href="/about" class="hover:opacity-70">About</a>
		</span>
	</div>
</div>

<!-- Main navbar -->
<header class="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:py-4">
		<!-- Left: hamburger (mobile) + nav links (desktop) -->
		<div class="flex flex-1 items-center gap-2">
			<button
				class="flex h-11 w-11 -ml-2 items-center justify-center lg:hidden"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<Icon name={menuOpen ? 'close' : 'menu'} class="h-[22px] w-[22px]" />
			</button>
			<nav class="hidden items-center gap-6 text-[11px] font-medium tracking-[0.18em] uppercase lg:flex" aria-label="Primary">
				{#each links as link}
					<a href={link.href} class="hover:opacity-60">{link.label}</a>
				{/each}
			</nav>
		</div>

		<!-- Centre: logo -->
		<a href="/" class="text-xl font-light tracking-[0.32em] uppercase lg:text-2xl">Electdove</a>

		<!-- Right: icons -->
		<div class="flex flex-1 items-center justify-end gap-1 sm:gap-2">
			<button class="flex h-11 w-11 items-center justify-center hover:opacity-60" aria-label="Search" onclick={toggleSearch}>
				<Icon name="search" class="h-5 w-5" />
			</button>
			<a href={shop.user ? '/account' : '/login'} class="hidden h-11 w-11 items-center justify-center hover:opacity-60 sm:flex" aria-label="Account">
				<Icon name="user" class="h-5 w-5" />
			</a>
			<button
				class="relative flex h-11 w-11 items-center justify-center hover:opacity-60"
				aria-label="Shopping bag, {shop.cartCount} items"
				onclick={() => shop.openCart()}
			>
				<Icon name="bag" class="h-5 w-5" />
				{#if shop.cartCount > 0}
					<span class="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">{shop.cartCount}</span>
				{/if}
			</button>
			<a href="/wishlist" class="relative hidden h-11 w-11 items-center justify-center hover:opacity-60 sm:flex" aria-label="Wishlist">
				<Icon name="heart" class="h-5 w-5" />
				{#if shop.wishlistCount > 0}
					<span class="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">{shop.wishlistCount}</span>
				{/if}
			</a>
			<a href="/compare" class="relative hidden h-11 w-11 items-center justify-center hover:opacity-60 sm:flex" aria-label="Compare products">
				<Icon name="compare" class="h-5 w-5" />
				{#if shop.compareCount > 0}
					<span class="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">{shop.compareCount}</span>
				{/if}
			</a>
		</div>
	</div>

	<!-- Expanding search with live suggestions -->
	{#if searchOpen}
		<div class="border-t border-line px-4 py-3 sm:px-6">
			<form
				class="mx-auto flex max-w-xl items-center gap-3"
				onsubmit={(e) => {
					e.preventDefault();
					submitSearch();
				}}
			>
				<Icon name="search" class="h-[18px] w-[18px] shrink-0" />
				<input
					bind:this={searchInput}
					bind:value={query}
					type="search"
					placeholder="Search devices, audio, cameras…"
					class="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
					aria-label="Search products"
					onkeydown={onSearchKeydown}
				/>
				<button type="button" class="text-sm text-neutral-500" onclick={() => (searchOpen = false)}>Cancel</button>
			</form>
			{#if suggestions.length > 0}
				<ul class="mx-auto mt-2 max-w-xl divide-y divide-line overflow-hidden rounded-xl border border-line bg-white shadow-lg" role="listbox" aria-label="Search suggestions">
					{#each suggestions as p (p.id)}
						<li>
							<button
								type="button"
								role="option"
								aria-selected="false"
								onclick={() => pickSuggestion(p.slug)}
								class="flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-mist"
							>
								<img src={p.src} alt="" class="h-10 w-10 shrink-0 rounded-lg object-cover" />
								<span class="min-w-0 flex-1">
									<span class="block truncate text-sm font-medium text-ink">{p.name}</span>
									<span class="block text-xs text-stone-500">{p.category}</span>
								</span>
								<span class="text-sm font-bold text-ink">{formatPrice(p.price)}</span>
							</button>
						</li>
					{/each}
				</ul>
			{:else if query.trim().length >= 2}
				<p class="mx-auto mt-2 max-w-xl text-sm text-stone-500">
					No products match “{query.trim()}”.
					<button type="button" class="font-semibold text-black underline underline-offset-2" onclick={submitSearch}>
						Search anyway
					</button>
				</p>
			{/if}
		</div>
	{/if}

	<!-- Mobile menu -->
	{#if menuOpen}
		<nav class="border-t border-line px-4 py-2 lg:hidden" aria-label="Mobile">
			{#each links as link}
				<a
					href={link.href}
					class="block border-b border-line py-3 text-xs font-medium tracking-[0.2em] uppercase last:border-0"
					onclick={() => (menuOpen = false)}
				>
					{link.label}
				</a>
			{/each}
			<div class="flex flex-wrap gap-x-6 gap-y-2 py-3 text-xs font-medium tracking-[0.2em] uppercase">
				<a href={shop.user ? '/account' : '/login'} onclick={() => (menuOpen = false)}>Account</a>
				<a href="/wishlist" onclick={() => (menuOpen = false)}>Wishlist</a>
				<a href="/compare" onclick={() => (menuOpen = false)}>Compare</a>
				<a href="/emi-calculator" onclick={() => (menuOpen = false)}>EMI Calculator</a>
				<a href="/orders" onclick={() => (menuOpen = false)}>Orders</a>
				<a href="/track-order" onclick={() => (menuOpen = false)}>Track Order</a>
				<a href="/about" onclick={() => (menuOpen = false)}>About</a>
			</div>
		</nav>
	{/if}
</header>
