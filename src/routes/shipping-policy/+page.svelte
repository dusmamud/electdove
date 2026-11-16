<script lang="ts">
	import Icon from '#lib/components/Icon.svelte';

	const points = [
		{
			icon: 'truck',
			title: 'Free shipping over ₹499',
			text: 'Orders of ₹499 or more ship free. Orders under ₹499 carry a flat ₹99 shipping fee, shown clearly in your cart before checkout.'
		},
		{
			icon: 'clock',
			title: 'Delivery in 3–4 business days',
			text: 'Most orders arrive within 3–4 business days of being placed. Your estimated delivery date is shown at checkout and on the Track Order page — in this demo it is set to 4 days after you order.'
		},
		{
			icon: 'package',
			title: 'Track every order',
			text: 'Every order gets an ID starting with “ED”. Enter it on the Track Order page to see its current step — Placed, Processing, Shipped, Out for delivery, Delivered.'
		},
		{
			icon: 'pin',
			title: 'Where we deliver',
			text: 'We deliver to addresses across the country. If your pincode is not serviceable, the delivery check on a product page will tell you before you order.'
		}
	];
</script>

<svelte:head>
	<title>Shipping Policy — Electdove</title>
	<meta
		name="description"
		content="Electdove shipping policy: free shipping on orders over ₹499 (otherwise ₹99), delivery in 3–4 business days, and order tracking by ID."
	/>
	<meta property="og:title" content="Shipping Policy — Electdove" />
	<meta
		property="og:description"
		content="Free shipping over ₹499, ₹99 flat otherwise, delivery in 3–4 business days, and tracking for every order."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://electdove.pages.dev/hero.webp" />
</svelte:head>

<section class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
	<nav aria-label="Breadcrumb" class="text-xs text-stone-500">
		<a href="/" class="hover:text-black">Home</a>
		<span class="mx-1.5">/</span>
		<span class="font-medium text-ink">Shipping Policy</span>
	</nav>

	<h1 class="mt-4 text-title font-extrabold tracking-tight text-ink">Shipping Policy</h1>
	<p class="mt-4 text-base leading-relaxed text-stone-600">
		Shipping is simple at Electdove: one flat fee, free over ₹499, and delivery in 3–4 business days.
		The exact cost and date are always shown before you pay — there are no surprises at checkout.
	</p>

	<div class="mt-8 space-y-4">
		{#each points as point (point.title)}
			<article class="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-6">
				<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-black">
					<Icon name={point.icon} class="h-5 w-5" />
				</span>
				<div>
					<h2 class="text-base font-bold text-ink">{point.title}</h2>
					<p class="mt-1.5 text-sm leading-relaxed text-stone-600">{point.text}</p>
				</div>
			</article>
		{/each}
	</div>

	<h2 class="mt-10 text-lg font-bold text-ink sm:text-xl">If something goes wrong</h2>
	<p class="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
		If your parcel is late, arrives damaged, or looks tampered with, let us know as soon as you
		can. Contact us through the
		<a href="/contact" class="font-semibold text-black underline underline-offset-2">Contact page</a>
		with your order ID and a photo of the parcel if it is damaged — we will arrange a replacement or
		a refund under our
		<a href="/returns-policy" class="font-semibold text-black underline underline-offset-2">
			Returns &amp; Refunds policy</a
		>.
	</p>
	<p class="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
		One honest note: Electdove is a demo store, so no parcel is actually shipped. The shipping
		rules above describe how the store is designed to work.
	</p>
</section>
