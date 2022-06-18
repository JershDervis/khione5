<script context="module" lang="ts">
	import { initializeApp, getApps } from 'firebase/app';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { getFirestore } from 'firebase/firestore';
	import authStore from '../stores/authStore';

	/**
	 * Call this method to initialize firebase services
	 */
	export function initFirebase() {
		if (!getApps().length) {
			const app = initializeApp({
				apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY,
				authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN,
				projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
				storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
				messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
				appId: import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID,
				measurementId: import.meta.env.VITE_PUBLIC_FIREBASE_MEASUREMENT_ID
			});

			// Initialize Authentication
			const auth = getAuth(app);
			onAuthStateChanged(auth, (user) => {
				authStore.set({
					isLoggedIn: user !== null,
					user: user,
					firebaseControlled: true
				});
			});

			// Initialize Database
			const db = getFirestore(app);
		}
	}
</script>
