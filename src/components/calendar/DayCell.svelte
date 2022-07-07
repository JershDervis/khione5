<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// Defines this DayCell's day of the month
	export let day: number;

	// The DayJS object for today
	export let today: Dayjs;

	// The DayJS object for date shown
	export let dayObj: Dayjs;

	/**
	 * Updates depending on whether this day should be selectable
	 */
	$: isSelectable =
		((dayObj.year() > today.year() ? true : dayObj.month() > today.month()) &&
			dayObj.year() >= today.year()) ||
		(dayObj.year() == today.year() && dayObj.month() == today.month() && day > today.date());

	/**
	 * Dispatch an event for when the user selects this day
	 */
	function selectDay() {
		if (isSelectable) {
			const selectedObj = dayObj.clone().set('date', day);
			dispatch('selectday', { selectedObj });
		}
	}
</script>

{#if typeof day !== undefined}
	<span
		on:click={selectDay}
		class="py-2 md:py-6 lg:py-6 text-center {isSelectable
			? 'text-slate-600 bg-slate-300 hover:bg-slate-400 hover:cursor-pointer'
			: 'bg-slate-600 text-slate-400'}"
	>
		{day}
	</span>
{/if}
