<script lang="ts">
	import '../app.css';
	import type { LayoutProps } from './$types';
	import Header from '../lib/components/Header.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import Toast from '../lib/components/Toast.svelte';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Electdove — Premium Tech, Built for What's Next</title>
	<meta name="description" content="Electdove — premium smartphones, smartwatches, audio, cameras and gaming. Free shipping worldwide." />
	<meta property="og:title" content="Electdove — Premium Tech, Built for What's Next" />
	<meta property="og:type" content="website" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</svelte:head>

<Header />
<main>{@render children()}</main>
<Footer />
<Toast />
