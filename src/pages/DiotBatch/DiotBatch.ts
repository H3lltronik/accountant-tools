import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { openModal } from "@/store/modal.store";

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
    const filters = [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }];
    const selectedFile = (await open({ filters })) as string;
    if (!selectedFile) return;
    return selectedFile;
  } catch (error) {
    console.error(error);
  }
};

export const handleBeginProcess = async (folderPath, filePath) => {
  try {
    const result = await invoke("excel_to_diot", { filePath, folderPath });
    console.log(result);
    if (result == "ok") {
      openModal({ title: "Success", message: "Proceso completado", type: "success" });
      await invoke("open_folder", { path: folderPath });
    }
  } catch (error) {
    console.error(error);
  }
};
