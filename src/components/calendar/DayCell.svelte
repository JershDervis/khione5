<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import { calendarStore } from '$stores/calendarStore';

	// Defines this DayCell's day of the month
	export let day: number;

	// The DayJS object for today
	export let today: Dayjs;

	// The DayJS object for date shown
	export let dayObj: Dayjs;

	/**
	 * Dayjs object of this object
	 */
	$: objDayjs = dayObj.clone().set('date', day);

	/**
	 * Updates depending on whether this day should be selectable
	 */
	$: isSelectable =
		(objDayjs.isAfter(today) && $calendarStore.fstSelectedDay === undefined) ||
		objDayjs.isAfter(today) ||
		(objDayjs.isAfter(today) &&
			$calendarStore.fstSelectedDay !== undefined &&
			$calendarStore.sndSelectedDay !== undefined);

	$: withinSelectedRange =
		$calendarStore.fstSelectedDay !== undefined &&
		$calendarStore.sndSelectedDay !== undefined &&
		(objDayjs.isAfter($calendarStore.fstSelectedDay) ||
			objDayjs.isSame($calendarStore.fstSelectedDay)) &&
		(objDayjs.isBefore($calendarStore.sndSelectedDay) ||
			objDayjs.isSame($calendarStore.sndSelectedDay));

	$: inHoverRange =
		$calendarStore.sndSelectedDay === undefined &&
		$calendarStore.fstSelectedDay !== undefined &&
		$calendarStore.hoveredDay !== undefined &&
		(objDayjs.isAfter($calendarStore.fstSelectedDay) ||
			objDayjs.isSame($calendarStore.fstSelectedDay)) &&
		(objDayjs.isBefore($calendarStore.hoveredDay) || objDayjs.isSame($calendarStore.hoveredDay));

	function selectDay() {
		if (isSelectable) {
			if ($calendarStore.fstSelectedDay === undefined) {
				calendarStore.set({
					fstSelectedDay: objDayjs,
					sndSelectedDay: undefined,
					hoveredDay: $calendarStore.hoveredDay
				});
			} else if (
				$calendarStore.fstSelectedDay !== undefined &&
				objDayjs.isBefore($calendarStore.fstSelectedDay)
			) {
				calendarStore.set({
					fstSelectedDay: objDayjs,
					sndSelectedDay: undefined,
					hoveredDay: $calendarStore.hoveredDay
				});
			} else if ($calendarStore.sndSelectedDay === undefined) {
				calendarStore.set({
					fstSelectedDay: $calendarStore.fstSelectedDay,
					sndSelectedDay: objDayjs,
					hoveredDay: $calendarStore.hoveredDay
				});
			} else {
				// Reset and re-run logic
				calendarStore.set({
					fstSelectedDay: undefined,
					sndSelectedDay: undefined,
					hoveredDay: undefined
				});
				selectDay();
			}
		}
	}

	function onMouseEnter() {
		if (
			isSelectable &&
			objDayjs.isAfter($calendarStore.fstSelectedDay) &&
			$calendarStore.sndSelectedDay === undefined
		) {
			$calendarStore.hoveredDay = objDayjs;
		}
	}

	function onMouseLeave() {
		$calendarStore.hoveredDay = undefined;
	}
</script>

{#if typeof day !== undefined}
	<div
		on:mouseenter={onMouseEnter}
		on:mouseleave={onMouseLeave}
		on:click={selectDay}
		class="py-2 md:py-6 lg:py-6 text-center 
      {isSelectable ? 'text-slate-900 hover:bg-slate-100 hover:cursor-pointer' : 'text-slate-400'}
      {inHoverRange ? 'bg-red-100 hover:bg-red-100 rounded-none' : ''}
      {withinSelectedRange ? 'bg-red-300 hover:bg-red-100 rounded-none font-semibold' : ''}"
	>
		<span>
			{day}
		</span>
	</div>
{/if}
