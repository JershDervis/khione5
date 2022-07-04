<script lang="ts">
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import DayCell from './DayCell.svelte';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('Australia/Sydney');

	// Todays dayjs object
	const today = dayjs();

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
		const { day } = event.detail;
		console.log('Selected day: ' + day);
	}

	/**
	 * Need some sort of array of booking ranges.
	 * Filter for my bookings / availabilities
	 * If the user is an admin then the array returned includes more info about the bookings
	 */

	// Bit of logging for debugging
	if (process.env.NODE_ENV !== 'production') {
		console.log('Current Date: ' + today.format());
		console.log('Current Month: ' + months[today.month()]);
		console.log('Todays day: ' + today.date());
	}
</script>

<!-- Calendar Header (Title - Month Selector) -->
<div>
	<h1 class="text-3xl font-semibold text-gray-800 m-2">{months[dayjs().month()]}</h1>
</div>
<!-- Days of Month -->
<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
	{#each Array(today.daysInMonth()) as _, i}
		{@const day = i + 1}
		<DayCell {today} {day} on:selectday={selectDay} />
	{/each}
</div>
