<script context="module" lang="ts">
	import { initializeApp, getApps } from 'firebase/app';
	import { getAnalytics } from 'firebase/analytics';
	import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
	import { getAuth, onAuthStateChanged, type UserInfo } from 'firebase/auth';
	import { getFirestore, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
	import { getRemoteConfig, fetchAndActivate, getNumber } from 'firebase/remote-config';
	import authStore from '$stores/authStore';

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

			// Initialize AppCheck -- perhaps only do this if user is logged in
			const appCheck = initializeAppCheck(app, {
				provider: new ReCaptchaV3Provider(import.meta.env.VITE_PUBLIC_RECAPTCHA_PUBLIC_KEY),
				isTokenAutoRefreshEnabled: false
			});

			// Initialize Google Analytics
			const analytics = getAnalytics(app);

			// Initialize Authentication
			const auth = getAuth(app);

			// Initialize Firestore
			const db = getFirestore(app);

			// Initialize Remote Config
			const remoteConfig = getRemoteConfig(app);
			if (process.env.NODE_ENV !== 'production')
				remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
			// await fetchAndActivate(remoteConfig); // Might need to incorporate loading screen for these values
			// READ: https://firebase.google.com/docs/remote-config/loading?authuser=0&hl=en

			// Listen for user auth state change
			onAuthStateChanged(auth, async (user: UserInfo | null) => {
				const loggedIn = user !== null;
				const userRef = loggedIn ? doc(db, 'users', user?.uid as string) : null;
				let isFirstLogin = false;
				if (loggedIn && userRef) {
					try {
						const userDoc = await getDoc(userRef);
						isFirstLogin = !userDoc.exists();
						if (isFirstLogin) {
							await setDoc(userRef, {
								registrationDate: Timestamp.fromDate(new Date())
							});
						}
					} catch (e) {
						console.log(e);
					}
				}
				authStore.set({
					isLoggedIn: loggedIn,
					isFirstLogin: isFirstLogin,
					user: user,
					userRef: userRef,
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
