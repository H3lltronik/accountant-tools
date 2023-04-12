import { open, type OpenDialogOptions } from "@tauri-apps/api/dialog";
import { openModal } from "@/store/modal.store";
import { excelToDiotTxt } from "@/api/batchDiot.service";
import { TAURI_RESPONSE_TYPES, openDirectory } from "@/api/common.service";

export const handleSelectFolder = async () => {
  try {
    const selectedFolder = (await open({
      directory: true,
      multiple: false,
    })) as string;
    if (!selectedFolder) return;

    return selectedFolder;
  } catch (error) {
    console.error(error);
  }
};

export const handleSelectFile = async (options: OpenDialogOptions) => {
  try {
    const selectedFile = (await open(options)) as string;
    if (!selectedFile) return;
    return selectedFile;
  } catch (error) {
    console.error(error);
  }
};

export const handleBeginProcess = async (folderPath, filePath) => {
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
