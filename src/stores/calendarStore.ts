import { writable } from 'svelte/store';
import type { Dayjs } from 'dayjs';

export const calendarStore = writable<{
	fstSelectedDay: Dayjs | undefined;
	sndSelectedDay: Dayjs | undefined;
}>({
	fstSelectedDay: undefined,
	sndSelectedDay: undefined
});
