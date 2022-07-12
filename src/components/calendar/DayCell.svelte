<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import { calendarStore } from '$stores/calendarStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// Defines this DayCell's day of the month
	export let day: number;

	// The DayJS object for today
	export let today: Dayjs;

	// The DayJS object for date shown
	export let dayObj: Dayjs;

	/**
	 * Dayjs object of this object
	 */
	$: todayDayjs = dayObj.clone().set('date', day);

	/**
	 * Updates depending on whether this day should be selectable
	 */
	$: isSelectable = todayDayjs.isAfter(today);

	/**
	 * Dispatch an event for when the user selects this day
	 */
	function selectDay() {
		if (isSelectable) {
			const selectedObj = dayObj.clone().set('date', day);
			dispatch('selectday', { selectedObj });
		}
	}

	/**
	 *
	 * @param dateToCheck
	 * @param dateToCompareBefore
	 */
	function isDateBefore(dateToCheck: Dayjs, dateToCompareBefore: Dayjs): boolean {
		return dateToCheck.isBefore(dateToCompareBefore);
	}
</script>

{#if typeof day !== undefined}
	<span
		on:click={selectDay}
		class="py-2 md:py-6 lg:py-6 text-center {isSelectable
			? 'text-slate-900 hover:bg-slate-100 rounded-md hover:cursor-pointer'
			: 'text-slate-400'}"
	>
		{day}
	</span>
{/if}
