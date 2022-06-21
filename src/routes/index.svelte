<script lang="ts">
	import authStore from '../stores/authStore';
	import { logout } from '$lib/Firebase.svelte';
</script>

<h1>Welcome to Khione5</h1>

{#if $authStore.isLoggedIn}
	<button on:click={async () => await logout()}>Logout</button>
{/if}
