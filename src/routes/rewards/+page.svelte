<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '../../lib/actions/reveal';
	import { shop, formatPrice } from '../../lib/data/store.svelte';

	const TIERS = [
		{
			name: 'Silver',
			min: 0,
			perks: ['1 point per ₹100 spent', 'Birthday month 5% off', 'Early access to deals']
		},
		{
			name: 'Gold',
			min: 50000,
			perks: ['Everything in Silver', '2x points on accessories', 'Free express delivery', 'Priority support']
		},
		{
			name: 'Platinum',
			min: 150000,
			perks: ['Everything in Gold', '3x points on everything', 'Exclusive launch invites', 'Dedicated tech advisor']
		}
	];

	/** Lifetime spend from this account's orders (0 when logged out). */
	const spend = $derived(shop.myOrders().reduce((n, o) => n + o.total, 0));
	const points = $derived(Math.floor(spend / 100));
	const tierIndex = $derived(spend >= 150000 ? 2 : spend >= 50000 ? 1 : 0);
	const tier = $derived(TIERS[tierIndex]);
	const nextTier = $derived(TIERS[tierIndex + 1]);
	const progress = $derived(
		nextTier ? Math.min(100, Math.round(((spend - tier.min) / (nextTier.min - tier.min)) * 100)) : 100
	);
</script>

<svelte:head>
	<title>Rewards | Electdove</title>
	<meta
		name="description"
		content="Electdove Rewards — earn points on every order, climb from Silver to Platinum, and unlock exclusive perks."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
	<Breadcrumbs items={[{ label: 'Rewards' }]} />

	<div use:reveal class="mt-4 max-w-2xl">
		<h1 class="text-h1 font-extralight tracking-[0.05em] uppercase text-balance">Electdove rewards</h1>
		<p class="mt-2 text-sm leading-relaxed text-muted md:text-base">
			Every order earns you points — 1 point for every ₹100 you spend. Points unlock tiers, and tiers
			unlock the good stuff: faster delivery, bigger rewards and launch invites.
		</p>
	</div>

	{#if shop.user}
		<div use:reveal class="mt-8 rounded-2xl bg-black p-6 text-white sm:p-8">
			<div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p class="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">Hi, {shop.user.name}</p>
					<p class="mt-2 text-4xl font-extrabold tracking-tight">{points.toLocaleString('en-IN')} points</p>
					<p class="mt-1 text-sm text-white/70">
						{tier.name} member · {formatPrice(spend)} lifetime spend
					</p>
				</div>
				<div class="w-full max-w-sm">
					{#if nextTier}
						<p class="flex justify-between text-xs font-semibold">
							<span>{tier.name}</span>
							<span class="text-white/70">
								{formatPrice(nextTier.min - spend)} to {nextTier.name}
							</span>
						</p>
						<div class="mt-2 h-2.5 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" aria-label="Progress to {nextTier.name}">
							<div class="h-full rounded-full bg-white transition-all duration-700" style="width: {progress}%"></div>
						</div>
					{:else}
						<p class="text-sm font-semibold">You’re at the top — Platinum, our highest tier.</p>
						<div class="mt-2 h-2.5 overflow-hidden rounded-full bg-white/15">
							<div class="h-full w-full rounded-full bg-white"></div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<div use:reveal class="mt-8 rounded-2xl bg-black p-6 text-white sm:p-8">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 class="text-lg font-bold">Log in to see your points</h2>
					<p class="mt-1 max-w-md text-sm leading-relaxed text-white/70">
						Your points and tier live on your account. Log in (or create one) and every order you’ve
						placed with that email counts toward your tier.
					</p>
				</div>
				<a
					href="/login"
					class="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
				>
					Log in <Icon name="arrow-right" class="h-4 w-4" />
				</a>
			</div>
		</div>
	{/if}

	<div class="mt-8 grid gap-5 md:grid-cols-3">
		{#each TIERS as t, i (t.name)}
			<div
				use:reveal={{ delay: i * 90 }}
				class="rounded-2xl border p-5 sm:p-6 {i === tierIndex && shop.user
					? 'border-black bg-white shadow-lg'
					: 'border-line bg-white'}"
			>
				<div class="flex items-center justify-between gap-3">
					<h2 class="text-lg font-extrabold text-ink">{t.name}</h2>
					{#if i === tierIndex && shop.user}
						<span class="rounded-full bg-black px-2.5 py-1 text-[11px] font-bold text-white uppercase">Your tier</span>
					{:else}
						<span class="text-xs font-semibold text-stone-500">{formatPrice(t.min)}+ spend</span>
					{/if}
				</div>
				<ul class="mt-4 space-y-2.5">
					{#each t.perks as perk (perk)}
						<li class="flex items-start gap-2 text-sm text-stone-600">
							<Icon name="check" class="mt-0.5 h-4 w-4 shrink-0 text-black" /> {perk}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<p use:reveal class="mt-6 text-xs leading-relaxed text-stone-500">
		Demo programme — points are calculated from orders placed on this device with your account email.
		Points never expire in this demo.
	</p>
</div>
