<script lang="ts">
	// Defines this DayCell's day of the month
	export let day: number | undefined = undefined;

	// Set to true if this is todays date
	export let isToday: boolean = false;

	// Set to true if the house is booked on this day
	export let isBooked: boolean = false;
</script>

{#if typeof day !== undefined}
	<span class={isToday ? 'text-slate-100' : ''}>
		{day}
	</span>
{/if}
