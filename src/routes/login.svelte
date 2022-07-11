<script lang="ts">
	import { onMount } from 'svelte';
	import { getAuth } from 'firebase/auth';
	import { GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider } from 'firebase/auth';
	import authStore from '$stores/authStore';
	import 'firebaseui/dist/firebaseui.css';

	// The element ID for FirebaseUI to insert to
	const contentID: string = 'auth-container';

	onMount(async () => {
		if (!$authStore.isLoggedIn) {
			const firebaseui = await import('firebaseui');
			const ui = new firebaseui.auth.AuthUI(getAuth());
			ui.start(`#${contentID}`, {
				signInSuccessUrl: '/profile',
				signInOptions: [
					EmailAuthProvider.PROVIDER_ID,
					GoogleAuthProvider.PROVIDER_ID,
					FacebookAuthProvider.PROVIDER_ID
					// PhoneAuthProvider.PROVIDER_ID
				]
			});
		}
	});
</script>

{#if !$authStore.isLoggedIn}
	<div id={contentID} />
{/if}
