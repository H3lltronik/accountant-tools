import { writable } from 'svelte/store';

export const STEPS = {
    SELECT_FILE: 0,
    PDF_HANDLING: 1,
}

export const step = writable(STEPS.SELECT_FILE);
export const selectedFile = writable<String>("");
export const convertedFile = writable<String>("");