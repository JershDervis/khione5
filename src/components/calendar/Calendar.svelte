<script lang="ts">
	import dayjs, { Dayjs } from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import DayCell from './DayCell.svelte';
	import { calendarStore } from '$stores/calendarStore';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('Australia/Sydney');

	const today = dayjs();
	let curMonth: number = 0;
	$: shownObj = dayjs().set('month', today.month() + curMonth);

	$: prevObj = shownObj.set('month', shownObj.month() - 1);
	$: futureObj = shownObj.set('month', shownObj.month() + 1);

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

	const days: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	/**
	 * Event is fired when user selects the child <code>DayCell.svelte</code>
	 * @param event
	 */
	function selectDay(event: CustomEvent) {
		const { selectedObj } = event.detail;
		if ($calendarStore.fstSelectedDay === undefined) {
			calendarStore.set({
				fstSelectedDay: selectedObj,
				sndSelectedDay: undefined
			});
		} else if ($calendarStore.sndSelectedDay === undefined) {
			calendarStore.set({
				fstSelectedDay: $calendarStore.fstSelectedDay,
				sndSelectedDay: selectedObj
			});
		} else {
			// Reset and re-run logic
			calendarStore.set({
				fstSelectedDay: undefined,
				sndSelectedDay: undefined
			});
			selectDay(event);
		}

		if (
			$calendarStore.fstSelectedDay !== undefined &&
			$calendarStore.sndSelectedDay !== undefined
		) {
			console.log($calendarStore.fstSelectedDay.format());
			console.log($calendarStore.sndSelectedDay.format());
		}
	}

	/**
	 * Need some sort of array of booking ranges.
	 * Filter for 'my' bookings / availabilities
	 * If the user is an admin then the array returned includes more info about the bookings
	 */
</script>

<div class="grid grid-cols-3">
	<h1 class="text-3xl font-semibold text-gray-800 m-2 col-span-2">
		{months[shownObj.month()]}
		{shownObj.year()}
	</h1>
	<div class="flex flex-row-reverse">
		<button class="px-4 hover:bg-slate-100 rounded-md" on:click={() => curMonth++}>→</button>
		<button class="px-4 hover:bg-slate-100 rounded-md" on:click={() => curMonth--}>←</button>
	</div>
</div>
<div class="grid grid-cols-7">
	<!-- Days of Week -->
	{#each days as d}
		<h2 class="text-center font-bold">{d}</h2>
	{/each}

	<!-- Account for end of Previous Month -->
	{#each Array(shownObj.startOf('month').day()) as aDay, i}
		{@const lastDayOfLastMonth =
			prevObj.endOf('month').date() - shownObj.startOf('month').day() + i + 1}
		<DayCell day={lastDayOfLastMonth} {today} dayObj={prevObj} on:selectday={selectDay} />
	{/each}

	<!-- Days of Displayed Month -->
	{#each Array(shownObj.daysInMonth()) as _, i}
		{@const day = i + 1}
		<DayCell {day} {today} dayObj={shownObj} on:selectday={selectDay} />
	{/each}

	<!-- Account for start of future month -->
	{#each Array(days.length - shownObj.endOf('month').day() - 1) as aDay, i}
		<DayCell day={i + 1} {today} dayObj={futureObj} on:selectday={selectDay} />
	{/each}
</div>
