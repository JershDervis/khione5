<script context="module" lang="ts">
	import { initializeApp, getApps } from 'firebase/app';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { getFirestore, collection, addDoc } from 'firebase/firestore';
	import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
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

			// Initialize App Check
			const appCheck = initializeAppCheck(app, {
				provider: new ReCaptchaV3Provider(import.meta.env.VITE_PUBLIC_RECAPTCHA_PUBLIC_KEY),
				isTokenAutoRefreshEnabled: true
			});

			// Initialize Authentication
			const auth = getAuth(app);

			// Initialize Firestore
			const db = getFirestore(app);

			// Listen for user auth state change
			onAuthStateChanged(auth, (user) => {
				authStore.set({
					isLoggedIn: user !== null,
					user: user,
					firebaseControlled: true
				});
			});
		}
	}

	/**
	 * Logout the user from the Firebase app
	 */
	export async function logout() {
		try {
			await getAuth().signOut();
		} catch (e) {
			console.log(e);
		}
	}
</script>
