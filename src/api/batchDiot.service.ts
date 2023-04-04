import { tauriCall } from "./interceptor";

export const excelToDiotTxt = function (filePath: string, folderPath: string) {
  return tauriCall<String>("excel_to_diot", { filePath, folderPath });
}