<script lang="ts">
	import type { Dayjs } from 'dayjs';
	import { calendarStore } from '$stores/calendarStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// Defines this DayCell's day of the month
	export let day: number;

	// The DayJS object for today
	export let today: Dayjs;

	// The DayJS object for date shown
	export let dayObj: Dayjs; //TODO: this object is sometimes undefined

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

	$: isFirstSelected =
		$calendarStore.fstSelectedDay !== undefined &&
		$calendarStore.sndSelectedDay === undefined &&
		objDayjs.isSame($calendarStore.fstSelectedDay);

	function selectDay() {
		if (isSelectable) {
			// Pass the event back up to the parent element
			dispatch('selectday', {
				objDayjs
			});
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
		class="py-2 md:py-6 lg:py-6 text-center transition-colors duration-100 transform
      {isSelectable ? 'text-slate-900 hover:bg-slate-100 hover:cursor-pointer' : 'text-slate-400'}
      {inHoverRange ? 'bg-slate-200 hover:bg-slate-200 rounded-none' : ''}
      {withinSelectedRange || isFirstSelected
			? 'bg-slate-300 hover:bg-slate-200 rounded-none font-semibold'
			: ''}"
	>
		<span>
			{day}
		</span>
	</div>
{/if}
