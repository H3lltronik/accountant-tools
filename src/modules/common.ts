import { open, type OpenDialogOptions } from "@tauri-apps/api/dialog";
import { openModal } from "@/store/modal.store";
import { excelToDiotTxt } from "@/api/batchDiot.service";
import { TAURI_RESPONSE_TYPES, openDirectory } from "@/api/common.service";

export const handleSelectFile = async (options: OpenDialogOptions) => {
    try {
      const selectedFile = (await open(options)) as string;
      if (!selectedFile) return;
      return selectedFile;
    } catch (error) {
      console.error(error);
    }
  };