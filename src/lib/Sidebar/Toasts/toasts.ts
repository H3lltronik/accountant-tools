import { toast } from "@zerodevx/svelte-toast";

const successStyles = {
    '--toastColor': 'mintcream',
    '--toastBackground': 'rgba(72,187,120,0.9)',
    '--toastBarBackground': '#2F855A'
}

const errorStyles = {
    '--toastColor': 'mintcream',
    '--toastBackground': 'rgba(239,68,68,0.9)',
    '--toastBarBackground': '#C53030'
}

const warningStyles = {
    '--toastColor': 'mintcream',
    '--toastBackground': 'rgba(255,193,7,0.9)',
    '--toastBarBackground': '#F6E05E'
}

const infoStyles = {
    '--toastColor': 'mintcream',
    '--toastBackground': 'rgba(66,153,225,0.9)',
    '--toastBarBackground': '#4299E1'
}

const getStyleByType = (type: string) => {
    switch (type) {
        case 'success':
            return successStyles;
        case 'error':
            return errorStyles;
        case 'warning':
            return warningStyles;
        case 'info':
            return infoStyles;
        default:
            return infoStyles;
    }
}

export const addToast = (params: ModalParams) => {
    const toastParams = {
        duration: 10000,
        theme: getStyleByType(params.type.toLocaleLowerCase())
    }

    toast.push(params.message, toastParams);
}
