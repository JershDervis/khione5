<script lang="ts">
	import dayjs, { Dayjs } from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import DayCell from './DayCell.svelte';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('Australia/Sydney');

	const today = dayjs();
	let curMonth: number = 0;
	$: shownObj = dayjs().set('month', today.month() + curMonth);

	/**
	 * Convert integer month to string value
	 */
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

	const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
	<button on:click={() => curMonth--}>←</button>
	<button on:click={() => curMonth++}>→</button>
</div>
<div class="grid grid-cols-7">
	<!-- Days of Week -->
	{#each days as d}
		<h2 class="text-center">{d}</h2>
	{/each}
	{#each Array(shownObj.startOf('month').day()) as i}
		<div />
	{/each}
	<!-- Days of Month -->
	{#each Array(shownObj.daysInMonth()) as _, i}
		{@const day = i + 1}
		<DayCell {day} {today} dayObj={shownObj} on:selectday={selectDay} />
	{/each}
</div>
