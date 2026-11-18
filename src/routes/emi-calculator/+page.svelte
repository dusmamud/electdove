<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '../../lib/actions/reveal';
	import { products, getProductBySlug } from '../../lib/data/products';
	import { formatPrice, calcEmi } from '../../lib/data/store.svelte';
	import { srcset } from '../../lib/images';

	const TENURES = [3, 6, 9, 12, 18, 24];
	const RATES = [
		{ label: 'No-cost EMI (0%)', value: 0 },
		{ label: '12% p.a.', value: 12 },
		{ label: '14% p.a.', value: 14 },
		{ label: '16% p.a.', value: 16 }
	];

	let productId = $state(1);
	let downPct = $state(20);
	let tenure = $state(12);
	let rate = $state(0);

	// Preselect the product from ?product=<slug> (PDP "Calculate EMI" links here).
	// Read in onMount: url.searchParams is unavailable during prerendering.
	onMount(() => {
		const id = getProductBySlug(page.url.searchParams.get('product') ?? '')?.id;
		if (id) productId = id;
	});

	const product = $derived(products.find((p) => p.id === productId) ?? products[0]);
	const price = $derived(product.price);
	const downPayment = $derived(Math.round((price * downPct) / 100));
	const loan = $derived(price - downPayment);
	const emi = $derived(Math.round(calcEmi(loan, rate, tenure)));
	const totalPayable = $derived(emi * tenure + downPayment);
	const totalInterest = $derived(Math.max(0, totalPayable - price));
	const interestShare = $derived(totalPayable > 0 ? Math.round((totalInterest / totalPayable) * 100) : 0);
</script>

<svelte:head>
	<title>EMI Calculator | Electdove</title>
	<meta
		name="description"
		content="Work out your monthly EMI for any Electdove device — pick a product, down payment, tenure and interest rate, and see the exact monthly instalment."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
	<Breadcrumbs items={[{ label: 'EMI Calculator' }]} />

	<div use:reveal class="mt-4 max-w-2xl">
		<h1 class="text-h1 font-extralight tracking-[0.05em] uppercase text-balance">EMI calculator</h1>
		<p class="mt-2 text-sm leading-relaxed text-muted md:text-base">
			Spread the cost of your next device over monthly instalments. No-cost EMI is available on 6 and
			12-month plans with major credit cards — the calculator below uses demo rates.
		</p>
	</div>

	<div class="mt-8 grid gap-6 lg:grid-cols-5">
		<!-- Controls -->
		<div use:reveal class="rounded-2xl border border-line bg-white p-5 sm:p-6 lg:col-span-3">
			<label class="block" for="emi-product">
				<span class="text-xs font-bold tracking-[0.14em] text-stone-500 uppercase">Choose a product</span>
				<select
					id="emi-product"
					bind:value={productId}
					class="mt-2 min-h-12 w-full rounded-lg border border-line bg-white px-3.5 text-sm font-semibold text-ink outline-none focus:border-black"
				>
					{#each products as p (p.id)}
						<option value={p.id}>{p.name} — {formatPrice(p.price)}</option>
					{/each}
				</select>
			</label>

			<div class="mt-6">
				<div class="flex items-baseline justify-between gap-3">
					<label class="text-xs font-bold tracking-[0.14em] text-stone-500 uppercase" for="emi-down">
						Down payment
					</label>
					<span class="text-sm font-bold text-ink">{downPct}% · {formatPrice(downPayment)}</span>
				</div>
				<input
					id="emi-down"
					type="range"
					min="0"
					max="50"
					step="5"
					bind:value={downPct}
					class="mt-3 w-full accent-black"
					aria-label="Down payment percentage"
				/>
				<div class="mt-1 flex justify-between text-xs text-stone-400">
					<span>0%</span><span>25%</span><span>50%</span>
				</div>
			</div>

			<div class="mt-6">
				<p class="text-xs font-bold tracking-[0.14em] text-stone-500 uppercase">Tenure</p>
				<div class="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="EMI tenure in months">
					{#each TENURES as t (t)}
						<button
							type="button"
							onclick={() => (tenure = t)}
							aria-pressed={tenure === t}
							class="min-h-11 rounded-lg border px-4 py-2 text-sm font-semibold transition {tenure === t
								? 'border-black bg-black text-white'
								: 'border-line bg-white text-ink hover:border-black'}"
						>
							{t} mo
						</button>
					{/each}
				</div>
			</div>

			<div class="mt-6">
				<p class="text-xs font-bold tracking-[0.14em] text-stone-500 uppercase">Interest rate</p>
				<div class="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="Interest rate">
					{#each RATES as r (r.value)}
						<button
							type="button"
							onclick={() => (rate = r.value)}
							aria-pressed={rate === r.value}
							class="min-h-11 rounded-lg border px-4 py-2 text-sm font-semibold transition {rate === r.value
								? 'border-black bg-black text-white'
								: 'border-line bg-white text-ink hover:border-black'}"
						>
							{r.label}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Result -->
		<div use:reveal={{ delay: 120 }} class="flex flex-col rounded-2xl bg-black p-5 text-white sm:p-6 lg:col-span-2">
			<div class="flex items-center gap-3">
				<img
					src={product.src}
					srcset={srcset(product.src)}
					sizes="56px"
					alt=""
					class="h-14 w-14 rounded-xl object-cover"
				/>
				<div class="min-w-0">
					<p class="truncate text-sm font-bold">{product.name}</p>
					<p class="text-xs text-white/60">Price {formatPrice(price)}</p>
				</div>
			</div>

			<p class="mt-6 text-xs font-bold tracking-[0.14em] text-white/60 uppercase">Monthly EMI</p>
			<p class="mt-1 text-4xl font-extrabold tracking-tight" aria-live="polite">
				{formatPrice(emi)}
				<span class="text-base font-medium text-white/60">/month</span>
			</p>
			<p class="mt-1 text-xs text-white/60">for {tenure} months · {rate === 0 ? 'no-cost EMI' : `${rate}% p.a.`}</p>

			<div class="mt-6 space-y-2.5 text-sm">
				<div class="flex justify-between gap-3">
					<span class="text-white/60">Down payment</span><span class="font-semibold">{formatPrice(downPayment)}</span>
				</div>
				<div class="flex justify-between gap-3">
					<span class="text-white/60">Loan amount</span><span class="font-semibold">{formatPrice(loan)}</span>
				</div>
				<div class="flex justify-between gap-3">
					<span class="text-white/60">Total interest</span><span class="font-semibold">{formatPrice(totalInterest)}</span>
				</div>
				<div class="flex justify-between gap-3 border-t border-white/15 pt-2.5">
					<span class="text-white/60">Total payable</span><span class="font-bold">{formatPrice(totalPayable)}</span>
				</div>
			</div>

			{#if totalInterest > 0}
				<div class="mt-5" aria-hidden="true">
					<div class="flex h-2 overflow-hidden rounded-full bg-white/15">
						<div class="h-full bg-white" style="width: {100 - interestShare}%"></div>
						<div class="h-full bg-white/40" style="width: {interestShare}%"></div>
					</div>
					<p class="mt-1.5 text-[11px] text-white/50">
						{100 - interestShare}% principal · {interestShare}% interest
					</p>
				</div>
			{/if}

			<a
				href="/product/{product.slug}"
				class="mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 pt-3 pb-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
			>
				Buy {product.name} on EMI <Icon name="arrow-right" class="h-4 w-4" />
			</a>
			<p class="mt-3 text-center text-[11px] leading-relaxed text-white/50">
				Indicative only — final EMI depends on your bank and card. Demo calculator, no payment is processed.
			</p>
		</div>
	</div>

	<div use:reveal class="mt-8 grid gap-4 sm:grid-cols-3">
		<div class="rounded-2xl border border-line bg-white p-5">
			<Icon name="credit-card" class="h-6 w-6" />
			<p class="mt-3 text-sm font-bold text-ink">No-cost EMI, 6 &amp; 12 months</p>
			<p class="mt-1 text-sm leading-relaxed text-muted">
				Zero interest on 6 and 12-month plans with major credit cards — you pay exactly the product price.
			</p>
		</div>
		<div class="rounded-2xl border border-line bg-white p-5">
			<Icon name="shield" class="h-6 w-6" />
			<p class="mt-3 text-sm font-bold text-ink">No hidden charges</p>
			<p class="mt-1 text-sm leading-relaxed text-muted">
				What the calculator shows is what you pay. No processing fee surprises at checkout.
			</p>
		</div>
		<div class="rounded-2xl border border-line bg-white p-5">
			<Icon name="check-circle" class="h-6 w-6" />
			<p class="mt-3 text-sm font-bold text-ink">Instant approval, in theory</p>
			<p class="mt-1 text-sm leading-relaxed text-muted">
				With a real gateway, eligible cards get approved in seconds. This demo stops at the calculation.
			</p>
		</div>
	</div>
</div>
