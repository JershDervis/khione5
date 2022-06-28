<script lang="ts">
	import { onMount } from 'svelte';
	import { initFirebase } from '$lib/Firebase.svelte';
	import Navbar from '$components/Navbar.svelte';
	import '../app.css';

	onMount(() => {
		initFirebase();
	});
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
</svelte:head>

<div class="flex columns-2">
	<div>
		<Navbar />
	</div>
	<div class="w-full m-4">
		<slot />
	</div>
</div>
