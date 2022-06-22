<script lang="ts">
	import { onMount } from 'svelte';
	import { getAuth } from 'firebase/auth';
	import { GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
	import authStore from '../stores/authStore';
	import 'firebaseui/dist/firebaseui.css';

	const contentID: string = 'auth-container';

	onMount(async () => {
		if (!$authStore.isLoggedIn) {
			const firebaseui = await import('firebaseui');
			const ui = new firebaseui.auth.AuthUI(getAuth());
			ui.start(`#${contentID}`, {
				signInSuccessUrl: '/profile',
				signInOptions: [
					// Leave the lines as is for the providers you want to offer your users.
					GoogleAuthProvider.PROVIDER_ID,
					FacebookAuthProvider.PROVIDER_ID
				]
			});
		}
	});
</script>

{#if !$authStore.isLoggedIn}
	<div id={contentID} />
{/if}
