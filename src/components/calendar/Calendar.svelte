<script lang="ts">
	import dayjs from 'dayjs';
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

	$: datesDefined =
		$calendarStore.fstSelectedDay !== undefined && $calendarStore.sndSelectedDay !== undefined;

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

	const daysShort: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	const daysLong: string[] = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];
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
	{#each daysShort as d}
		<h2 class="text-center font-bold">{d}</h2>
	{/each}

	<!-- Account for end of Previous Month -->
	{#each Array(shownObj.startOf('month').day()) as aDay, i}
		{@const lastDayOfLastMonth =
			prevObj.endOf('month').date() - shownObj.startOf('month').day() + i + 1}
		<DayCell day={lastDayOfLastMonth} {today} dayObj={prevObj} />
	{/each}

	<!-- Days of Displayed Month -->
	{#each Array(shownObj.daysInMonth()) as _, i}
		{@const day = i + 1}
		<DayCell {day} {today} dayObj={shownObj} />
	{/each}

	<!-- Account for start of future month -->
	{#each Array(daysShort.length - shownObj.endOf('month').day() - 1) as aDay, i}
		<DayCell day={i + 1} {today} dayObj={futureObj} />
	{/each}
</div>

<!-- Display how many nights stay is selected -->
{#if $calendarStore.fstSelectedDay !== undefined}
	<div>
		<b>From</b>: {daysLong[$calendarStore.fstSelectedDay.day()] +
			' ' +
			$calendarStore.fstSelectedDay.format('DD/MM/YYYY')}
		{#if $calendarStore.sndSelectedDay !== undefined}
			{@const nightsStay = $calendarStore.sndSelectedDay.diff($calendarStore.fstSelectedDay, 'day')}
			<b>To</b>: {$calendarStore.sndSelectedDay.format('DD/MM/YYYY')}
			<div>
				({nightsStay} nights stay)
			</div>
		{/if}
	</div>
{/if}
