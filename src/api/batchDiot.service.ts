import { tauriCall } from "./interceptor";

export const excelToDiotTxt = function (filePaths: string[], folderPath: string) {
  return tauriCall<String>("excel_to_diot", { filePaths, folderPath });
}