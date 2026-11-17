<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '../../lib/actions/reveal';
	import { products, brands, productUrl } from '../../lib/data/products';

	const groups: { title: string; links: { label: string; href: string }[] }[] = [
		{
			title: 'Shop',
			links: [
				{ label: 'Home', href: '/' },
				{ label: 'All Products', href: '/shop' },
				{ label: 'Categories', href: '/categories' },
				{ label: 'Deals', href: '/deals' },
				{ label: 'New Arrivals', href: '/new-arrivals' },
				{ label: 'Brands', href: '/brands' },
				...brands.map((b) => ({ label: `${b.name} Store`, href: `/brands/${b.slug}` })),
				{ label: 'Compare Products', href: '/compare' },
				{ label: 'EMI Calculator', href: '/emi-calculator' },
				{ label: 'Trade-In', href: '/trade-in' },
				{ label: 'Gift Cards', href: '/gift-cards' },
				{ label: 'Rewards', href: '/rewards' }
			]
		},
		{
			title: 'Products',
			links: products.map((p) => ({ label: p.name, href: productUrl(p.id) }))
		},
		{
			title: 'Help & Support',
			links: [
				{ label: 'Help Centre', href: '/help' },
				{ label: 'Contact Us', href: '/contact' },
				{ label: 'Track Order', href: '/track-order' },
				{ label: 'Shipping & Delivery', href: '/shipping-policy' },
				{ label: 'Returns & Refunds', href: '/returns-policy' }
			]
		},
		{
			title: 'Your Account',
			links: [
				{ label: 'Log In', href: '/login' },
				{ label: 'Sign Up', href: '/signup' },
				{ label: 'My Account', href: '/account' },
				{ label: 'My Orders', href: '/orders' },
				{ label: 'Wishlist', href: '/wishlist' },
				{ label: 'Bag', href: '/cart' },
				{ label: 'Checkout', href: '/checkout' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'About Us', href: '/about' },
				{ label: 'Blog', href: '/blog' },
				{ label: 'How to Choose the Right Smartphone', href: '/blog/choose-right-smartphone' },
				{ label: 'Wireless Headphones Buying Guide', href: '/blog/wireless-headphones-buying-guide' },
				{ label: 'Smartwatch Buying Guide', href: '/blog/smartwatch-buying-guide' },
				{ label: 'Privacy Policy', href: '/privacy-policy' },
				{ label: 'Terms of Service', href: '/terms' },
				{ label: 'Sitemap', href: '/sitemap' }
			]
		}
	];
</script>

<svelte:head>
	<title>Sitemap | Electdove</title>
	<meta name="description" content="Every page on Electdove — shop, brands, products, help and account pages, all in one place." />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
	<Breadcrumbs items={[{ label: 'Sitemap' }]} />

	<div use:reveal class="mt-4 max-w-2xl">
		<h1 class="text-h1 font-extralight tracking-[0.05em] uppercase text-balance">Sitemap</h1>
		<p class="mt-2 text-sm leading-relaxed text-muted md:text-base">
			Every page on Electdove, grouped so you can find anything in one click.
		</p>
	</div>

	<div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each groups as group, i (group.title)}
			<div use:reveal={{ delay: i * 70 }} class="rounded-2xl border border-line bg-white p-5 sm:p-6">
				<h2 class="text-xs font-bold tracking-[0.16em] text-stone-500 uppercase">{group.title}</h2>
				<ul class="mt-4 space-y-2.5">
					{#each group.links as link (link.href)}
						<li>
							<a
								href={link.href}
								class="group flex items-center gap-2 text-sm font-medium text-ink transition hover:text-black"
							>
								<Icon name="arrow-right" class="h-3.5 w-3.5 shrink-0 text-stone-400 transition group-hover:text-black" />
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
