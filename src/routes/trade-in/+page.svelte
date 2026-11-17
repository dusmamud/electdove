<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '../../lib/actions/reveal';
	import { shop, formatPrice } from '../../lib/data/store.svelte';

	type Condition = { label: string; note: string; factor: number };

	const DEVICES = [
		{ name: 'iPhone 13 (128GB)', base: 22000 },
		{ name: 'iPhone 12 (128GB)', base: 16000 },
		{ name: 'iPhone 11 (128GB)', base: 11000 },
		{ name: 'Samsung Galaxy S23', base: 24000 },
		{ name: 'Samsung Galaxy S22', base: 17000 },
		{ name: 'Google Pixel 7', base: 15000 },
		{ name: 'Google Pixel 6', base: 10000 },
		{ name: 'OnePlus 11', base: 18000 }
	];

	const CONDITIONS: Condition[] = [
		{ label: 'Like new', note: 'No scratches, battery health 90%+', factor: 1 },
		{ label: 'Good', note: 'Light wear, everything works', factor: 0.8 },
		{ label: 'Fair', note: 'Visible wear or minor faults', factor: 0.6 }
	];

	let deviceName = $state(DEVICES[0].name);
	let condition = $state(CONDITIONS[0]);
	let applied = $state(false);

	const base = $derived(DEVICES.find((d) => d.name === deviceName)?.base ?? 0);
	const estimate = $derived(Math.round((base * condition.factor) / 100) * 100);

	function applyCredit() {
		shop.setTradeInCredit(estimate, `${deviceName} (${condition.label})`);
		applied = true;
	}
</script>

<svelte:head>
	<title>Trade-In | Electdove</title>
	<meta
		name="description"
		content="Trade in your old phone on Electdove — get an instant estimate and apply the credit straight to your bag."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
	<Breadcrumbs items={[{ label: 'Trade-In' }]} />

	<div use:reveal class="mt-4 max-w-2xl">
		<h1 class="text-h1 font-extralight tracking-[0.05em] uppercase text-balance">Trade in, upgrade more</h1>
		<p class="mt-2 text-sm leading-relaxed text-muted md:text-base">
			Your old phone is worth something. Get an instant estimate below and apply it as credit to your bag —
			it comes straight off your total at checkout.
		</p>
	</div>

	<div class="mt-8 grid gap-6 lg:grid-cols-5">
		<div use:reveal class="rounded-2xl border border-line bg-white p-5 sm:p-6 lg:col-span-3">
			<label class="block" for="trade-device">
				<span class="text-xs font-bold tracking-[0.14em] text-stone-500 uppercase">Your old device</span>
				<select
					id="trade-device"
					bind:value={deviceName}
					onchange={() => (applied = false)}
					class="mt-2 min-h-12 w-full rounded-lg border border-line bg-white px-3.5 text-sm font-semibold text-ink outline-none focus:border-black"
				>
					{#each DEVICES as d (d.name)}
						<option value={d.name}>{d.name} — up to {formatPrice(d.base)}</option>
					{/each}
				</select>
			</label>

			<p class="mt-6 text-xs font-bold tracking-[0.14em] text-stone-500 uppercase">Condition</p>
			<div class="mt-2.5 grid gap-2 sm:grid-cols-3" role="group" aria-label="Device condition">
				{#each CONDITIONS as c (c.label)}
					<button
						type="button"
						onclick={() => {
							condition = c;
							applied = false;
						}}
						aria-pressed={condition.label === c.label}
						class="min-h-11 rounded-lg border p-3 text-left transition {condition.label === c.label
							? 'border-black bg-black text-white'
							: 'border-line bg-white text-ink hover:border-black'}"
					>
						<span class="block text-sm font-bold">{c.label}</span>
						<span class="mt-0.5 block text-xs {condition.label === c.label ? 'text-white/70' : 'text-stone-500'}">
							{c.note}
						</span>
					</button>
				{/each}
			</div>

			<div class="mt-6 rounded-xl bg-mist p-4 text-sm leading-relaxed text-stone-600">
				<p class="font-bold text-ink">How it works</p>
				<ol class="mt-2 list-decimal space-y-1 pl-5">
					<li>Get your estimate here and apply it to your bag.</li>
					<li>Order your new device — the credit is already deducted.</li>
					<li>Hand your old device to the delivery partner when the new one arrives.</li>
				</ol>
				<p class="mt-2 text-xs text-stone-500">
					Demo estimates — final value is confirmed after a physical check. One trade-in per order.
				</p>
			</div>
		</div>

		<div use:reveal={{ delay: 120 }} class="flex flex-col rounded-2xl bg-black p-5 text-white sm:p-6 lg:col-span-2">
			<p class="text-xs font-bold tracking-[0.14em] text-white/60 uppercase">Your estimate</p>
			<p class="mt-1 text-sm font-medium text-white/80">{deviceName} · {condition.label}</p>
			<p class="mt-3 text-4xl font-extrabold tracking-tight" aria-live="polite">{formatPrice(estimate)}</p>
			<p class="mt-1 text-xs text-white/60">Base {formatPrice(base)} × {Math.round(condition.factor * 100)}% condition</p>

			{#if shop.tradeInCredit > 0}
				<p class="mt-5 rounded-xl bg-white/10 p-3.5 text-sm leading-relaxed">
					Credit applied: <span class="font-bold">{formatPrice(shop.tradeInCredit)}</span>
					<span class="text-white/60">({shop.tradeInDevice})</span>
					<button
						type="button"
						onclick={() => {
							shop.clearTradeIn();
							applied = false;
						}}
						class="ml-1 font-semibold text-white underline underline-offset-2"
					>
						Remove
					</button>
				</p>
			{/if}

			{#if applied}
				<a
					href="/cart"
					class="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
				>
					View bag with credit <Icon name="arrow-right" class="h-4 w-4" />
				</a>
			{:else}
				<button
					type="button"
					onclick={applyCredit}
					class="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
				>
					Apply {formatPrice(estimate)} to my bag
				</button>
			{/if}
			<p class="mt-3 text-center text-[11px] leading-relaxed text-white/50">
				The credit is saved on this device and deducted from your bag total until you check out or remove it.
			</p>
		</div>
	</div>
</div>
