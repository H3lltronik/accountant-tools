import { Sheet } from "svelte-sheets";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function convertToTableData(data: Column[]): string[][] {
  const columns = [];
  const rows = [];

  for (const item of data) {
    columns.push(item.name as string);
    for (const value of item.values) {
      const rowIndex = Number(value.row) - 1;
      const colIndex = columns.indexOf(item.name as string);
      if (!rows[rowIndex]) rows[rowIndex] = [];
      rows[rowIndex][colIndex] = value.value;
    }
  }

  return [columns, ...rows];
}

export const exportToExcel = (data) => {
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  const fileName = "pdf_excel_extracted.xlsx";
  saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    fileName
  );
};

// converts a string to an ArrayBuffer
const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
};
