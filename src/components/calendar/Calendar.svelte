<script lang="ts">
	import dayjs, { Dayjs } from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import DayCell from './DayCell.svelte';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('Australia/Sydney');

	let curMonth: number = 0;
	const today = dayjs();
	$: shownObj = dayjs().set('month', today.month() + curMonth);

	// This may already exist in DayJS library
	const months: string[] = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	/**
	 * Event is fired when user selects the child <code>DayCell.svelte</code>
	 * @param event
	 */
	function selectDay(event: CustomEvent) {
		const { selectedObj } = event.detail;

		console.log((selectedObj as Dayjs).format());
	}

	/**
	 * Need some sort of array of booking ranges.
	 * Filter for my bookings / availabilities
	 * If the user is an admin then the array returned includes more info about the bookings
	 */
</script>

<div class="grid grid-cols-3">
	<h1 class="text-3xl font-semibold text-gray-800 m-2">
		{months[shownObj.month()]}
		{shownObj.year()}
	</h1>
	<button on:click={() => curMonth--}>Back</button>
	<button on:click={() => curMonth++}>Forward</button>
</div>
<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
	<!-- Days of Month -->
	{#each Array(shownObj.daysInMonth()) as _, i}
		{@const day = i + 1}
		<DayCell dayObj={shownObj} {day} on:selectday={selectDay} />
	{/each}
</div>
