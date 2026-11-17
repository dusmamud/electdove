<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Icon from '#lib/components/Icon.svelte';
	import { reveal } from '../../lib/actions/reveal';
	import { formatPrice } from '../../lib/data/store.svelte';

	type GiftCard = { code: string; amount: number; recipient: string; message: string; createdAt: string };

	const AMOUNTS = [500, 1000, 2500, 5000, 10000];

	function readCards(): GiftCard[] {
		if (typeof window === 'undefined') return [];
		try {
			return JSON.parse(localStorage.getItem('electdove_giftcards') ?? '[]') as GiftCard[];
		} catch {
			return [];
		}
	}

	let cards = $state<GiftCard[]>(readCards());
	let amount = $state(2500);
	let customAmount = $state('');
	let recipient = $state('');
	let recipientEmail = $state('');
	let message = $state('');
	let error = $state('');
	let justBought = $state<GiftCard | null>(null);

	const chosenAmount = $derived(customAmount.trim() ? Number(customAmount) || 0 : amount);

	function buyCard() {
		error = '';
		if (!recipient.trim()) {
			error = 'Add the recipient’s name.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim())) {
			error = 'Enter a valid email for the recipient.';
			return;
		}
		if (!Number.isFinite(chosenAmount) || chosenAmount < 100) {
			error = 'Gift card value must be at least ₹100.';
			return;
		}
		const card: GiftCard = {
			code: 'EDGC-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
			amount: Math.round(chosenAmount),
			recipient: recipient.trim(),
			message: message.trim(),
			createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
		};
		cards = [card, ...cards];
		localStorage.setItem('electdove_giftcards', JSON.stringify(cards));
		justBought = card;
		recipient = '';
		recipientEmail = '';
		message = '';
		customAmount = '';
	}
</script>

<svelte:head>
	<title>Gift Cards | Electdove</title>
	<meta
		name="description"
		content="Electdove gift cards — the gift that lets them pick their own tech. Delivered instantly by email, valid for a year."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
	<Breadcrumbs items={[{ label: 'Gift Cards' }]} />

	<div use:reveal class="mt-4 max-w-2xl">
		<h1 class="text-h1 font-extralight tracking-[0.05em] uppercase text-balance">Gift cards</h1>
		<p class="mt-2 text-sm leading-relaxed text-muted md:text-base">
			Not sure which phone they want? A gift card lets them choose. Delivered instantly by email, valid
			for 12 months, no expiry stress.
		</p>
	</div>

	<div class="mt-8 grid gap-6 lg:grid-cols-5">
		<div use:reveal class="rounded-2xl border border-line bg-white p-5 sm:p-6 lg:col-span-3">
			<p class="text-xs font-bold tracking-[0.14em] text-stone-500 uppercase">Choose an amount</p>
			<div class="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="Gift card amount">
				{#each AMOUNTS as a (a)}
					<button
						type="button"
						onclick={() => {
							amount = a;
							customAmount = '';
						}}
						aria-pressed={amount === a && !customAmount.trim()}
						class="min-h-11 rounded-lg border px-4 py-2 text-sm font-semibold transition {amount === a && !customAmount.trim()
							? 'border-black bg-black text-white'
							: 'border-line bg-white text-ink hover:border-black'}"
					>
						{formatPrice(a)}
					</button>
				{/each}
			</div>
			<label class="mt-4 block" for="gc-custom">
				<span class="text-xs font-bold tracking-[0.14em] text-stone-500 uppercase">Or a custom amount (₹)</span>
				<input
					id="gc-custom"
					type="number"
					min="100"
					inputmode="numeric"
					bind:value={customAmount}
					placeholder="e.g. 7500"
					class="mt-2 min-h-12 w-full rounded-lg border border-line bg-white px-3.5 text-sm text-ink outline-none placeholder:text-stone-400 focus:border-black"
				/>
			</label>

			<div class="mt-6 grid gap-4 sm:grid-cols-2">
				<label class="block" for="gc-name">
					<span class="text-xs font-bold tracking-[0.14em] text-stone-500 uppercase">Recipient’s name</span>
					<input
						id="gc-name"
						bind:value={recipient}
						placeholder="Who is it for?"
						class="mt-2 min-h-12 w-full rounded-lg border border-line bg-white px-3.5 text-sm text-ink outline-none placeholder:text-stone-400 focus:border-black"
					/>
				</label>
				<label class="block" for="gc-email">
					<span class="text-xs font-bold tracking-[0.14em] text-stone-500 uppercase">Recipient’s email</span>
					<input
						id="gc-email"
						type="email"
						bind:value={recipientEmail}
						placeholder="name@example.com"
						class="mt-2 min-h-12 w-full rounded-lg border border-line bg-white px-3.5 text-sm text-ink outline-none placeholder:text-stone-400 focus:border-black"
					/>
				</label>
			</div>
			<label class="mt-4 block" for="gc-msg">
				<span class="text-xs font-bold tracking-[0.14em] text-stone-500 uppercase">Message (optional)</span>
				<textarea
					id="gc-msg"
					bind:value={message}
					rows="3"
					maxlength="200"
					placeholder="Happy birthday — pick something you’ll love."
					class="mt-2 w-full resize-none rounded-lg border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none placeholder:text-stone-400 focus:border-black"
				></textarea>
			</label>

			{#if error}
				<p class="mt-4 flex items-start gap-1.5 text-sm text-red-600">
					<Icon name="alert" class="mt-0.5 h-4 w-4 shrink-0" /> {error}
				</p>
			{/if}
			<button
				type="button"
				onclick={buyCard}
				class="press mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900"
			>
				Buy gift card — {formatPrice(chosenAmount)}
			</button>
			<p class="mt-2 text-center text-[11px] text-stone-500">
				Demo checkout — no payment is taken and no email is actually sent.
			</p>
		</div>

		<div use:reveal={{ delay: 120 }} class="lg:col-span-2">
			{#if justBought}
				<div class="rounded-2xl bg-black p-5 text-white sm:p-6" aria-live="polite">
					<p class="text-xs font-bold tracking-[0.14em] text-white/60 uppercase">Gift card ready</p>
					<p class="mt-3 font-mono text-2xl font-bold tracking-widest">{justBought.code}</p>
					<p class="mt-2 text-sm text-white/80">
						{formatPrice(justBought.amount)} for {justBought.recipient}
					</p>
					{#if justBought.message}
						<p class="mt-2 text-sm text-white/60">“{justBought.message}”</p>
					{/if}
					<p class="mt-3 text-xs text-white/50">Share this code with them — it’s also saved below.</p>
				</div>
			{:else}
				<div class="rounded-2xl border border-line bg-white p-5 sm:p-6">
					<Icon name="gift" class="h-6 w-6" />
					<p class="mt-3 text-sm font-bold text-ink">How gift cards work</p>
					<ul class="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
						<li>Pick an amount — or type your own, from ₹100.</li>
						<li>We email the code to the recipient instantly.</li>
						<li>They redeem it at checkout, in full or in part.</li>
						<li>Valid for 12 months from purchase.</li>
					</ul>
				</div>
			{/if}

			{#if cards.length > 0}
				<h2 class="mt-6 text-sm font-bold text-ink">Your gift cards on this device</h2>
				<ul class="mt-3 space-y-2">
					{#each cards as card (card.code)}
						<li class="flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm">
							<span>
								<span class="font-mono font-bold text-ink">{card.code}</span>
								<span class="block text-xs text-stone-500">{card.recipient} · {card.createdAt}</span>
							</span>
							<span class="font-bold text-ink">{formatPrice(card.amount)}</span>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</div>
