import { writable } from 'svelte/store';
import type { UserInfo } from 'firebase/auth';

const authStore = writable<{
	isLoggedIn: boolean;
	user: UserInfo | null;
	firebaseControlled: boolean;
}>({
	isLoggedIn: false,
	user: null,
	firebaseControlled: false
});

export default {
	subscribe: authStore.subscribe,
	set: authStore.set
};
