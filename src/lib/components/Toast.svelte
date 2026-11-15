<script lang="ts">
	import { toast } from '../data/cart.svelte';

	let visible = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	$effect(() => {
		if (toast.key > 0) {
			visible = true;
			clearTimeout(timer);
			timer = setTimeout(() => (visible = false), 2600);
		}
	});
</script>

{#if visible}
	<div class="animate-toast-in fixed bottom-6 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 bg-black px-5 py-3 text-center text-xs font-medium tracking-wide text-white shadow-lg">
		{toast.message}
	</div>
{/if}
