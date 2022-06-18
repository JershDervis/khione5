<script lang="ts">
	import { onMount } from 'svelte';
	export let src: string;
	export let alt: string;

	let loaded = false;
	let failed = false;
	let loading = false;

	onMount(() => {
		const img = new Image();
		img.src = src;
		img.alt = alt;
		loading = true;

		img.onload = () => {
			loading = false;
			loaded = true;
		};
		img.onerror = () => {
			loading = false;
			failed = true;
		};
	});
</script>

{#if loaded}
	<img class={$$props.class} {src} {alt} />
{:else if failed}
	<img
		class={$$props.class}
		src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg"
		alt="Not Found"
	/>
{:else if loading}
	<img
		class={$$props.class}
		src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif"
		alt="Loading..."
	/>
{/if}
