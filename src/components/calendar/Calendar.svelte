<script lang="ts">
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc';
	import timezone from 'dayjs/plugin/timezone';
	import DayCell from './DayCell.svelte';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('Australia/Sydney');

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

	// Need to make these writable stores
	var firstSelected: number | undefined = undefined;
	var secondSelected: number | undefined = undefined;

	const selectDay = (day: number) => () => {
		if (firstSelected == undefined) {
			firstSelected = day;
		} else if (firstSelected != undefined && firstSelected == day) {
			firstSelected = undefined;
		} else if (secondSelected == undefined) {
			secondSelected = day;
		} else if (secondSelected != undefined && secondSelected == day) {
			secondSelected = undefined;
		} else {
			firstSelected = undefined;
			secondSelected = undefined;
		}
	};

	$: firstUpdater = firstSelected;
	$: secondUpdater = secondSelected;

	/**
	 * Need some sort of array of booking ranges.
	 * Filter for my bookings / availabilities
	 * If the user is an admin then the array returned includes more info about the bookings
	 */

	// Bit of logging for debugging
	if (process.env.NODE_ENV !== 'production') {
		console.log('Current Date: ' + dayjs().format());
		console.log('Current Month: ' + months[dayjs().month()]);
		console.log('Todays day: ' + dayjs().date());
	}
</script>

<!-- Calendar Header (Title - Month Selector) -->
<div>
	<h1 class="text-3xl font-semibold text-gray-800 m-2">{months[dayjs().month()]}</h1>
</div>
<!-- Days of Month -->
<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
	{#each Array(dayjs().daysInMonth()) as _, i}
		{@const day = i + 1}
		{@const isToday = day == dayjs().date()}
		{@const baseCellCss = 'bg-slate-400 hover:cursor-pointer p-6'}

		<div
			on:click={selectDay(day)}
			class="{baseCellCss} {isToday ? 'bg-slate-600 hover:bg-slate-500' : 'hover:bg-slate-200'}"
		>
			<DayCell {day} {isToday} />
		</div>
	{/each}
</div>
