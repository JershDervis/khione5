<script context="module" lang="ts">
	type NavItem = {
		label: string;
		icon?: any; //TODO: CHANGE TYPE
		href: string;
		breakBefore?: boolean;
		breakAfter?: boolean;
		loggedInOnly?: boolean;
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import authStore from '../stores/authStore';
	import Image from '$lib/Image.svelte';

	import HomeIcon from '$static/icons/home.svelte';
	import BookingsIcon from '$static/icons/bookings.svelte';

	// The currently navigated page
	$: curPath = $page.url.pathname;

	const navItems: NavItem[] = [
		{ label: 'Home', icon: HomeIcon, href: '/' },
		{ label: 'My Bookings', icon: BookingsIcon, href: '/bookings' }
	];
</script>

<div
	class="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600"
>
	<h2 class="text-3xl font-semibold text-gray-800 dark:text-white">Khione 5</h2>

	<div class="flex flex-col justify-between flex-1 mt-6">
		<nav>
			{#each navItems as nav, index}
				<!-- svelte-ignore empty-block -->
				{#if nav.loggedInOnly && !$authStore.isLoggedIn}
					<!-- Skip displaying the current menu item -->
				{:else}
					{#if nav.breakBefore}
						<hr class="my-6 border-gray-200 dark:border-gray-600" />
					{/if}
					<a
						class="flex items-center px-4 py-2 {index > 0 ? 'mt-5' : ''} {nav.href == curPath
							? 'text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200'
							: 'text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700'}"
						href={nav.href}
					>
						{#if nav.icon}
							<svelte:component this={nav.icon} class="w-5 h-5 dark:fill-white" />
						{/if}
						<span class="mx-4 font-medium">{nav.label}</span>
					</a>
					{#if nav.breakAfter}
						<hr class="my-6 border-gray-200 dark:border-gray-600" />
					{/if}
				{/if}
			{/each}
		</nav>
		{#if $authStore.isLoggedIn}
			{@const photoURL = $authStore.user?.photoURL}
			<div class="flex items-center px-4 -mx-2">
				{#if photoURL}
					<Image
						class="object-cover mx-2 rounded-full h-9 w-9"
						src={photoURL}
						failedSrc="../static/icons/user.svg"
						alt="avatar"
					/>
				{/if}
				<h4 class="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
					{$authStore.user?.displayName}
				</h4>
			</div>
		{/if}
	</div>
</div>
