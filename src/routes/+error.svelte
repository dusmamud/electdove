<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6">
	<p class="text-6xl font-extralight">{page.status}</p>
	<h1 class="mt-4 text-2xl font-light tracking-[0.08em] uppercase">
		{page.status === 404 ? 'Page not found' : 'Something went wrong'}
	</h1>
	<p class="mt-3 max-w-sm text-sm text-muted">
		The page you're looking for doesn't exist or has moved. Let's get you back to the latest tech.
	</p>
	<a href="/" class="mt-8 bg-black px-7 py-3.5 text-xs font-medium tracking-[0.18em] text-white uppercase hover:bg-neutral-800">
		Back to home
	</a>
</div>
