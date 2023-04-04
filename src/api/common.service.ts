export const TAURI_RESPONSE_TYPES: {
    ERROR: ResponseNotificationType;
    SUCCESS: ResponseNotificationType;
} = {
    ERROR: "error",
    SUCCESS: "success"
}

import { tauriCall } from "./interceptor";

export const openDirectory = async (path: string) => {
    return await tauriCall("open_folder", { path });
}