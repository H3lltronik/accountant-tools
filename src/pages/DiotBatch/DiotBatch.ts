import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";

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

export const handleSelectFile = async () => {
  try {
    const selectedFile = (await open()) as string;
    if (!selectedFile) return;
    return selectedFile;
  } catch (error) {
    console.error(error);
  }
};

export const handleBeginProccess = async (folderPath, filePath) => {
  try {
    const result = await invoke("excel", { filePath, folderPath });
  } catch (error) {
    console.error(error);
  }
};
