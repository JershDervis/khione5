<script context="module" lang="ts">
</script>

<script lang="ts">
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();

	/**
	 * Gets the amount of days in the specified month
	 * @param month
	 * @param year
	 */
	function daysInMonth(month: number, year: number): number {
		return new Date(year, month, 0).getDate();
	}

	/**
	 * Need some sort of array of booking ranges.
	 * Filter for my bookings / availabilities
	 * If the user is an admin then the array returned includes more info about the bookings
	 */
</script>
