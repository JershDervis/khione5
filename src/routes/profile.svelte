<script lang="ts">
	import authStore from '../stores/authStore';
</script>

{#if $authStore.isLoggedIn}
	<h1>Welcome {$authStore.user?.displayName}</h1>
{/if}
