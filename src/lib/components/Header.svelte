<script lang="ts">
	import Icon from './Icon.svelte';
	import { cart } from '../data/cart.svelte';

	const links = ['Home', 'Devices', 'Audio', 'Cameras', 'Brands', 'New'];

	let menuOpen = $state(false);
	let searchOpen = $state(false);
	let query = $state('');
</script>

<!-- Top announcement bar -->
<div class="bg-black text-white">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[10px] tracking-[0.14em] uppercase sm:px-6">
		<span class="hidden md:block">Free shipping worldwide</span>
		<span class="mx-auto md:mx-0">Up to 10% off on selected tech. Limited time only.</span>
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
				class="p-2 -ml-2 md:hidden"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<Icon name={menuOpen ? 'close' : 'menu'} size={22} />
			</button>
			<nav class="hidden items-center gap-6 text-[11px] font-medium tracking-[0.18em] uppercase md:flex" aria-label="Primary">
				{#each links as link}
					<a href="#{link.toLowerCase()}" class="hover:opacity-60">{link}</a>
				{/each}
			</nav>
		</div>

		<!-- Centre: logo -->
		<a href="/" class="text-xl font-light tracking-[0.32em] uppercase md:text-2xl">Electdove</a>

		<!-- Right: icons -->
		<div class="flex flex-1 items-center justify-end gap-1 sm:gap-2">
			<button class="p-2 hover:opacity-60" aria-label="Search" onclick={() => (searchOpen = !searchOpen)}>
				<Icon name="search" size={20} />
			</button>
			<a href="/account" class="hidden p-2 hover:opacity-60 sm:block" aria-label="Account">
				<Icon name="user" size={20} />
			</a>
			<a href="/cart" class="relative p-2 hover:opacity-60" aria-label="Shopping bag">
				<Icon name="bag" size={20} />
				{#if cart.count > 0}
					<span class="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">{cart.count}</span>
				{/if}
			</a>
			<a href="/wishlist" class="hidden p-2 hover:opacity-60 sm:block" aria-label="Wishlist">
				<Icon name="heart" size={20} />
			</a>
		</div>
	</div>

	<!-- Expanding search -->
	{#if searchOpen}
		<div class="border-t border-line px-4 py-3 sm:px-6">
			<form
				class="mx-auto flex max-w-xl items-center gap-3"
				onsubmit={(e) => {
					e.preventDefault();
					searchOpen = false;
				}}
			>
				<Icon name="search" size={18} />
				<input
					bind:value={query}
					type="search"
					placeholder="Search devices, audio, cameras…"
					class="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
					aria-label="Search products"
				/>
				<button type="button" class="text-sm text-neutral-500" onclick={() => (searchOpen = false)}>Cancel</button>
			</form>
		</div>
	{/if}

	<!-- Mobile menu -->
	{#if menuOpen}
		<nav class="border-t border-line px-4 py-2 md:hidden" aria-label="Mobile">
			{#each links as link}
				<a
					href="#{link.toLowerCase()}"
					class="block border-b border-line py-3 text-xs font-medium tracking-[0.2em] uppercase last:border-0"
					onclick={() => (menuOpen = false)}
				>
					{link}
				</a>
			{/each}
			<div class="flex gap-6 py-3 text-xs font-medium tracking-[0.2em] uppercase">
				<a href="/contact">Contact</a>
				<a href="/about">About</a>
				<a href="/account">Account</a>
				<a href="/wishlist">Wishlist</a>
			</div>
		</nav>
	{/if}
</header>
