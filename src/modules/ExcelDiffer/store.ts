import { writable } from 'svelte/store';

export const pickedExcel1 = writable<string | null>(null);
export const pickedExcel2 = writable<string | null>(null);