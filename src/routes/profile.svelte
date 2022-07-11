<script lang="ts">
	import authStore from '$stores/authStore';
</script>

<svelte:head>
	<title>My Profile • Khione 5</title>
</svelte:head>

{#if $authStore.isLoggedIn}
	<h1>Welcome {$authStore.user?.displayName}</h1>
{/if}
