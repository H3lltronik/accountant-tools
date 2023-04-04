export const TAURI_RESPONSE_TYPES: {
    ERROR: ResponseNotificationType;
    SUCCESS: ResponseNotificationType;
    INFO: ResponseNotificationType;
    WARNING: ResponseNotificationType;
} = {
    ERROR: "error",
    SUCCESS: "success",
    INFO: "info",
    WARNING: "warning",
}

import { tauriCall } from "./interceptor";

export const openDirectory = async (path: string) => {
    return await tauriCall("open_folder", { path });
}