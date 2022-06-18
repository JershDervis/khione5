<script>
	import authStore from '../stores/authStore';
	import { getAuth } from 'firebase/auth';
</script>

<h1>
	Welcome to SvelteKit
	{#if $authStore.isLoggedIn}
		{$authStore.user?.email}
	{/if}
</h1>

<button on:click={async () => await getAuth().signOut()}>Logout</button>
