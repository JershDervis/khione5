<script lang="ts">
	import { onMount } from 'svelte';
	import { initFirebase } from '$lib/Firebase.svelte';
	import Navbar from '../components/navbar.svelte';
	import '../app.css';

	onMount(() => {
		initFirebase();
	});
</script>

<div class="container flex columns-2">
	<Navbar />
	<div class="container m-4">
		<slot />
	</div>
</div>
