<script lang="ts">
	import { onMount } from 'svelte';

	export let src: string;
	export let alt: string;
	export let failedSrc: string =
		'https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg';
	export let failedAlt: string = 'Not Found';

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
	<img class={$$props.class} src={failedSrc} alt={failedAlt} />
{:else if loading}
	<img class={$$props.class} src="/loading.gif" alt="Loading..." />
{/if}
