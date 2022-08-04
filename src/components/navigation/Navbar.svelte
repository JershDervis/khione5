<script context="module" lang="ts">
	type NavItem = {
		label: string;
		icon?: any; //TODO: CHANGE TYPE
		href: string | Function; // can link to url or run javascript function
		breakBefore?: boolean;
		breakAfter?: boolean;
		loggedInOnly?: boolean;
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import authStore from '$stores/authStore';
	import Image from '$lib/Image.svelte';
	import { slide } from 'svelte/transition';
	import { logout } from '$lib/Firebase.svelte';

	import HomeIcon from '$static/home.svelte';
	import BookingsIcon from '$static/bookings.svelte';

	import ProfileIcon from '$static/profile.svelte';
	import LogoutIcon from '$static/logout.svelte';

	// The currently navigated page
	$: curPath = $page.url.pathname;

	const navItems: NavItem[] = [
		{ label: 'Home', icon: HomeIcon, href: '/' },
		{ label: 'Bookings', icon: BookingsIcon, href: '/bookings' }
	];

	const profileItems: NavItem[] = [
		{ label: 'My Profile', icon: ProfileIcon, href: '/profile', breakBefore: true },
		{ label: 'Logout', icon: LogoutIcon, href: doLogout }
	];

	let showProfileItems = false;

	function doLogout() {
		logout();
		showProfileItems = false;
	}
</script>

<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
	<div class="container flex flex-wrap justify-between items-center mx-auto">
		<a href="#" class="flex items-center">
			<img src="/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Khione5 Logo" />
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				>Khione5</span
			>
		</a>
		{#if $authStore.isLoggedIn}
			{@const photoURL = $authStore.user?.photoURL}
			<div class="flex items-center md:order-2">
				<button
					type="button"
					class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
					on:click={() => {
						showProfileItems = !showProfileItems;
					}}
				>
					<span
						class="sr-only"
						on:click={() => {
							showProfileItems = !showProfileItems;
						}}>Open user menu</span
					>
					{#if photoURL}
						<Image
							class="w-8 h-8 rounded-full"
							src={photoURL}
							failedSrc="../static/icons/user.svg"
							alt="avatar"
						/>
					{/if}
				</button>
				<!-- Dropdown menu -->
				{#if showProfileItems}
					<div
						class="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
					>
						<div class="py-3 px-4">
							<span class="block text-sm text-gray-900 dark:text-white"
								>{$authStore.user?.displayName}</span
							>
							<span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400"
								>{$authStore.user?.email}</span
							>
						</div>
						<ul class="py-1" aria-labelledby="user-menu-button">
							{#each profileItems as nav, index}
								{#if nav.loggedInOnly && !$authStore.isLoggedIn}
									<!-- Skip displaying the current menu item -->
								{:else}
									<li>
										<a
											href={typeof nav.href === 'string' ? nav.href : ''}
											on:click={() => (typeof nav.href === 'function' ? nav.href() : null)}
											class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
											>{nav.label}</a
										>
									</li>
								{/if}
							{/each}
						</ul>
					</div>
				{/if}
				<button
					type="button"
					class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="w-6 h-6"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			</div>
		{/if}
		<div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1">
			<ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
				{#each navItems as nav, index}
					{#if nav.loggedInOnly && !$authStore.isLoggedIn}
						<!-- Skip displaying the current menu item -->
					{:else}
						<li>
							<a
								href={typeof nav.href === 'string' ? nav.href : ''}
								on:click={() => (typeof nav.href === 'function' ? nav.href() : null)}
								class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
								aria-current="page">{nav.label}</a
							>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
</nav>
