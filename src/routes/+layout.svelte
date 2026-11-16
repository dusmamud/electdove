<script lang="ts">
	import '../app.css';
	import type { LayoutProps } from './$types';
	import Header from '../lib/components/Header.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import Toast from '../lib/components/Toast.svelte';
	import CartDrawer from '../lib/components/CartDrawer.svelte';
	import QuickView from '../lib/components/QuickView.svelte';
	import BottomNav from '../lib/components/BottomNav.svelte';
	import CookieBanner from '../lib/components/CookieBanner.svelte';

	let { children }: LayoutProps = $props();

	const orgJsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Electdove',
		url: 'https://electdove.pages.dev/',
		sameAs: []
	});
</script>

<svelte:head>
	<title>Electdove — Premium Tech, Built for What's Next</title>
	<meta name="description" content="Electdove — premium smartphones, smartwatches, audio, cameras and gaming. Free shipping across India." />
	<meta property="og:title" content="Electdove — Premium Tech, Built for What's Next" />
	<meta property="og:type" content="website" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	{@html `<script type="application/ld+json">${orgJsonLd}</script>`}
</svelte:head>

<Header />
<main>{@render children()}</main>
<Footer />
<!-- Spacer so the fixed mobile bottom nav never covers footer content -->
<div class="h-14 lg:hidden" aria-hidden="true"></div>
<CartDrawer />
<QuickView />
<BottomNav />
<CookieBanner />
<Toast />
