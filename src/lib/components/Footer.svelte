<script lang="ts">
	import Icon from './Icon.svelte';

	const shop = [
		{ label: 'Smartphones', href: '#smartphones' },
		{ label: 'Smartwatches', href: '#ready-to-wear' },
		{ label: 'Audio', href: '#ready-to-wear' },
		{ label: 'Cameras', href: '#collection' },
		{ label: 'Gaming', href: '#ready-to-wear' },
		{ label: 'Accessories', href: '#collection' }
	];
	const support = ['Track Order', 'Shipping & Delivery', 'Returns & Refunds', 'Warranty', 'Contact Us'];
	const company = ['About Us', 'Careers', 'Press', 'Privacy Policy', 'Terms of Service'];

	let email = $state('');
	let subscribed = $state(false);
</script>

<footer id="contact" class="border-t border-line bg-white">
	<!-- Trust strip -->
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 border-b border-line px-4 py-8 sm:grid-cols-3 sm:px-6">
		<div class="flex items-center gap-4">
			<Icon name="truck" size={26} />
			<div>
				<p class="text-xs font-semibold tracking-[0.14em] uppercase">Free shipping</p>
				<p class="mt-1 text-xs text-muted">On all orders worldwide, no minimum.</p>
			</div>
		</div>
		<div class="flex items-center gap-4">
			<Icon name="shield" size={26} />
			<div>
				<p class="text-xs font-semibold tracking-[0.14em] uppercase">2-year warranty</p>
				<p class="mt-1 text-xs text-muted">Every device covered, hassle-free.</p>
			</div>
		</div>
		<div class="flex items-center gap-4">
			<Icon name="refresh" size={26} />
			<div>
				<p class="text-xs font-semibold tracking-[0.14em] uppercase">30-day returns</p>
				<p class="mt-1 text-xs text-muted">Changed your mind? Send it back.</p>
			</div>
		</div>
	</div>

	<!-- Link columns + newsletter -->
	<div class="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-5">
		<div id="about" class="col-span-2 md:col-span-2">
			<p class="text-xl font-light tracking-[0.32em] uppercase">Electdove</p>
			<p class="mt-4 max-w-xs text-sm leading-relaxed text-muted">
				Premium devices for a smarter tomorrow. The best in technology, design and performance — in one place.
			</p>
			<form
				class="mt-6 flex max-w-xs border border-line"
				onsubmit={(e) => {
					e.preventDefault();
					if (email.trim()) subscribed = true;
				}}
			>
				<input
					bind:value={email}
					type="email"
					required
					placeholder="Your email address"
					class="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-neutral-400"
					aria-label="Email address"
				/>
				<button class="shrink-0 bg-black px-4 text-[11px] font-medium tracking-[0.14em] text-white uppercase">Join</button>
			</form>
			{#if subscribed}
				<p class="mt-3 text-xs text-green-700">Thanks — you're on the list.</p>
			{/if}
		</div>
		<div>
			<p class="text-xs font-semibold tracking-[0.18em] uppercase">Shop</p>
			<ul class="mt-4 space-y-2.5 text-sm text-muted">
				{#each shop as item}<li><a href={item.href} class="hover:text-black">{item.label}</a></li>{/each}
			</ul>
		</div>
		<div>
			<p class="text-xs font-semibold tracking-[0.18em] uppercase">Support</p>
			<ul class="mt-4 space-y-2.5 text-sm text-muted">
				{#each support as item}<li><a href="#contact" class="hover:text-black">{item}</a></li>{/each}
			</ul>
		</div>
		<div>
			<p class="text-xs font-semibold tracking-[0.18em] uppercase">Company</p>
			<ul class="mt-4 space-y-2.5 text-sm text-muted">
				{#each company as item}<li><a href={item === 'About Us' ? '#about' : '#contact'} class="hover:text-black">{item}</a></li>{/each}
			</ul>
		</div>
	</div>

	<div class="border-t border-line">
		<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-[11px] tracking-wide text-muted sm:flex-row sm:px-6">
			<p>© 2026 Electdove. All rights reserved.</p>
			<p>Designed for what's next.</p>
		</div>
	</div>
</footer>
