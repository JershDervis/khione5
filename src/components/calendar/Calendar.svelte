<script lang="ts">
	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	import DayCell from './DayCell.svelte';
	import { calendarStore } from '$stores/calendarStore';

	dayjs.extend(utc);
	dayjs.extend(timezone);
	dayjs.tz.setDefault('Australia/Sydney');

	/**
	 * Set the minimum stay length
	 */
	export let minNightsStay: number = 2;

	const dateFormat: string = 'DD/MM/YYYY';

	const today = dayjs();

	let curMonth: number = 0;
	$: shownObj = dayjs().set('month', today.month() + curMonth);
	$: prevObj = shownObj.set('month', shownObj.month() - 1);
	$: futureObj = shownObj.set('month', shownObj.month() + 1);

	$: errors = [''];

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

	/**
	 * Called when a valid day cell is selected
	 */
	function daySelected(event: CustomEvent) {
		const { objDayjs } = event.detail; // Dayjs object of the selected cells date
		if ($calendarStore.fstSelectedDay === undefined) {
			calendarStore.set({
				fstSelectedDay: objDayjs,
				sndSelectedDay: undefined,
				hoveredDay: $calendarStore.hoveredDay
			});
		} else if (objDayjs.isBefore($calendarStore.fstSelectedDay)) {
			calendarStore.set({
				fstSelectedDay: objDayjs,
				sndSelectedDay: undefined,
				hoveredDay: $calendarStore.hoveredDay
			});
		} else if ($calendarStore.sndSelectedDay === undefined) {
			if (objDayjs.diff($calendarStore.fstSelectedDay, 'day') < minNightsStay) {
				let errorMessage = 'Minimum nights stay is ' + minNightsStay + ' nights';
				if (!errors.includes(errorMessage)) errors = [...errors, errorMessage];
			} else {
				calendarStore.set({
					fstSelectedDay: $calendarStore.fstSelectedDay,
					sndSelectedDay: objDayjs,
					hoveredDay: $calendarStore.hoveredDay
				});
			}
		} else {
			// Reset and re-run logic
			calendarStore.set({
				fstSelectedDay: undefined,
				sndSelectedDay: undefined,
				hoveredDay: undefined
			});
			daySelected(event);
		}
	}

	/**
	 * Called the user closes an error message
	 */
	function removeError(pos: number) {
		errors = [...errors.slice(0, pos), ...errors.slice(pos + 1)];
	}
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
		<DayCell day={lastDayOfLastMonth} {today} dayObj={prevObj} on:selectday={daySelected} />
	{/each}

	<!-- Days of Displayed Month -->
	{#each Array(shownObj.daysInMonth()) as _, i}
		{@const day = i + 1}
		<DayCell {day} {today} dayObj={shownObj} on:selectday={daySelected} />
	{/each}

	<!-- Account for start of future month -->
	{#each Array(daysShort.length - shownObj.endOf('month').day() - 1) as aDay, i}
		<DayCell day={i + 1} {today} dayObj={futureObj} on:selectday={daySelected} />
	{/each}
</div>

<!-- Display how many nights stay is selected -->
{#if $calendarStore.fstSelectedDay !== undefined}
	<div>
		<b>From</b>: {daysLong[$calendarStore.fstSelectedDay.day()] +
			' ' +
			$calendarStore.fstSelectedDay.format(dateFormat)}
		{#if $calendarStore.sndSelectedDay !== undefined}
			{@const nightsStay = $calendarStore.sndSelectedDay.diff($calendarStore.fstSelectedDay, 'day')}
			<b>To</b>: {$calendarStore.sndSelectedDay.format(dateFormat)}
			<div>
				({nightsStay} nights stay)
			</div>
		{/if}
	</div>
{/if}

{#if errors.length > 1}
	{#each Array(errors.length) as _, i}
		{@const error = errors[i]}
		{#if error !== ''}
			<div
				class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative my-1"
				role="alert"
			>
				<strong class="font-bold mr-2">Info</strong>
				<span class="block sm:inline">{error}</span>
				<span class="absolute top-0 bottom-0 right-0 px-4 py-3" on:click={() => removeError(i)}>
					<svg
						class="fill-current h-6 w-6 blue-red-500"
						role="button"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						><title>Close</title>
						<path
							d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
						/>
					</svg>
				</span>
			</div>
		{/if}
	{/each}
{/if}
