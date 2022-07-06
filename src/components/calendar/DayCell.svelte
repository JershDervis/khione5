<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import dayjs from 'dayjs';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// The DayJS object for today
	export let dayObj: Dayjs | undefined = undefined;

	// Defines this DayCell's day of the month
	export let day: number | undefined = undefined;

	// NEED TO UPDATE TO WORK OFF DATE... NOT MONTH
	// OTHERWISE THIS WILL NOT WORK FROM DECEMBER TO THE NEW YEAR
	$: displayedMonth = dayObj?.month() as Number;
	$: displayedYear = dayObj?.year() as Number;

	/**
	 * Updates depending on whether this day should be selectable
	 */
	$: isSelectable =
		((displayedYear > dayjs().year() ? true : displayedMonth > dayjs().month()) &&
			displayedYear >= dayjs().year()) ||
		(displayedYear == dayjs().year() &&
			displayedMonth == dayjs().month() &&
			(day as Number) > dayjs().date());

	/**
	 * Dispatch an event for when the user selects this day
	 */
	function selectDay() {
		if (isSelectable) {
			const selectedObj = dayObj?.clone().set('date', day as number);
			dispatch('selectday', { selectedObj });
		}
	}
</script>

{#if typeof day !== undefined}
	{@const baseCellCss = 'text-slate-100 bg-slate-500 p-6'}
	<span
		on:click={selectDay}
		class="{baseCellCss} {isSelectable
			? 'hover:cursor-pointer hover:bg-slate-400'
			: 'bg-slate-800'}"
	>
		{day}
	</span>
{/if}
