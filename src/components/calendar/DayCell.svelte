<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// The DayJS object for today
	export let today: Dayjs | undefined = undefined;

	// Defines this DayCell's day of the month
	export let day: number | undefined = undefined;

	// Set to true if the house is booked on this day
	export let isBooked: boolean = false;

	const isToday: boolean = day == today?.date();

	$: isSelectable = (day as number) > (today as Dayjs).date() /*|| !isBooked*/;

	/**
	 * Dispatch an event for when the user selects this day
	 */
	function selectDay() {
		if (isSelectable) dispatch('selectday', { day });
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
