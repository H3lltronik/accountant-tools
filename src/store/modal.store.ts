import { writable } from 'svelte/store';

interface ModalParams {
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

const defaultModalParams: ModalParams = {
    title: '',
    message: '',
    type: 'info',
};

export const isModalOpened = writable(false);
export const modalParams = writable(defaultModalParams);

export const toasts = writable<ModalParams[]>([]);

export const openModal = (params: ModalParams) => {
    isModalOpened.set(true);
    modalParams.set(params);
};

export const closeModal = () => {
    isModalOpened.set(false);
    modalParams.set(defaultModalParams);
}

export const addToast = (params: ModalParams) => {
    toasts.update((toasts) => {
        return [...toasts, params];
    });
}
