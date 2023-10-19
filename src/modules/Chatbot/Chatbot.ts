import { open, type OpenDialogOptions } from "@tauri-apps/api/dialog";
import { openModal } from "@/store/modal.store";
import { excelToDiotTxt } from "@/api/batchDiot.service";
import { TAURI_RESPONSE_TYPES, openDirectory } from "@/api/common.service";

export const handleSelectFolder = async (title) => {
  try {
    const selectedFolder = (await open({
      directory: true,
      multiple: false,
      title,
    })) as string;
    if (!selectedFolder) return;

    return selectedFolder;
  } catch (error) {
    console.error(error);
  }
};

export const handleSelectFile = async (options: OpenDialogOptions) => {
  try {
    const selectedFiles = (await open(options)) as string | string[];
    if (!selectedFiles) return;
    if (Array.isArray(selectedFiles)) {
      return selectedFiles;
    } else {
      return selectedFiles as string;
    }
  } catch (error) {
    console.error(error);
  }
};


export const handleBeginProcess = async (folderPath, filePath) => {
  console.log(folderPath, filePath);
  try {
    const result = await excelToDiotTxt(filePath, folderPath);
    console.log(result);
    if (result.type == TAURI_RESPONSE_TYPES.SUCCESS) {
      openModal({ title: "Success", message: "Proceso completado", type: "success" });
      await openDirectory(folderPath);
    }
  } catch (error) {
    console.error(error);
  }
};
