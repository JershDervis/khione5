<script context="module" lang="ts">
	import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
	import { getAnalytics, type Analytics } from 'firebase/analytics';
	import { initializeAppCheck, ReCaptchaV3Provider, type AppCheck } from 'firebase/app-check';
	import { getAuth, onAuthStateChanged, type Auth, type UserInfo } from 'firebase/auth';
	import { getFirestore, doc, getDoc, setDoc, Firestore, Timestamp } from 'firebase/firestore';
	import { getRemoteConfig, type RemoteConfig } from 'firebase/remote-config';
	import authStore from '../stores/authStore';

	/**
	 * Call this method to initialize firebase services
	 */
	export function initFirebase() {
		if (!getApps().length) {
			const app: FirebaseApp = initializeApp({
				apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_API_KEY,
				authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_AUTH_DOMAIN,
				projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECT_ID,
				storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
				messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
				appId: import.meta.env.VITE_PUBLIC_FIREBASE_APP_ID,
				measurementId: import.meta.env.VITE_PUBLIC_FIREBASE_MEASUREMENT_ID
			});

			// Initialize AppCheck -- perhaps only do this if user is logged in
			const appCheck: AppCheck = initializeAppCheck(app, {
				provider: new ReCaptchaV3Provider(import.meta.env.VITE_PUBLIC_RECAPTCHA_PUBLIC_KEY),
				isTokenAutoRefreshEnabled: true
			});

			// Initialize Google Analytics
			const analytics: Analytics = getAnalytics(app);

			// Initialize Authentication
			const auth: Auth = getAuth(app);

			// Initialize Firestore
			const db: Firestore = getFirestore(app);

			// Initialize Remote Config
			const remoteConfig: RemoteConfig = getRemoteConfig(app);
			if (process.env.NODE_ENV !== 'production')
				remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

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
