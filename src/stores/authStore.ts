import { writable } from 'svelte/store';
import type { UserInfo } from 'firebase/auth';
import type { DocumentData, DocumentReference } from 'firebase/firestore';

const authStore = writable<{
	isLoggedIn: boolean;
	isFirstLogin: boolean;
	user: UserInfo | null;
	userRef: DocumentReference<DocumentData> | null;
	firebaseControlled: boolean;
}>({
	isLoggedIn: false,
	isFirstLogin: false,
	user: null,
	userRef: null,
	firebaseControlled: false
});

export default {
	subscribe: authStore.subscribe,
	set: authStore.set
};
