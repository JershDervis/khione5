<script>
	import authStore from '../stores/authStore';
	import { getAuth } from 'firebase/auth';
</script>

<h1>Welcome to SvelteKit</h1>

{#if $authStore.isLoggedIn}
	<button on:click={async () => await getAuth().signOut()}>Logout</button>
{/if}
