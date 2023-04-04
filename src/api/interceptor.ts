import { openModal } from "@/store/modal.store";
import { invoke } from "@tauri-apps/api/tauri";
import { TAURI_RESPONSE_TYPES } from './common.service'
import { addToast } from "@/lib/Sidebar/Toasts/toasts";

export const tauriCall = async <T>(command: string, params: any): Promise<TauriCallResponse<T>> => {
  try {
    const { notifications, result } = await invoke<TauriResponse<T>>(command, params);

    if (notifications) {
        notifications.forEach((notification) => {
            addToast({
                title: notification.title,
                message: notification.description,
                type: notification.notification_type
            });
        });
    }

    if (isSuccess(result)) {
        return {
            type: TAURI_RESPONSE_TYPES.SUCCESS,
            body: result.Success
        };
    } else {
        return {
            type: TAURI_RESPONSE_TYPES.ERROR,
            body: result.Error
        };
    }

  } catch (error) {
    console.error(error);
  }
};

const isError = (result: any) => result.hasOwnProperty("Error");
const isSuccess = (result: any) => result.hasOwnProperty("Success");
const isWarning = (result: any) => result.hasOwnProperty("Warning");
const isInfo = (result: any) => result.hasOwnProperty("Info");
