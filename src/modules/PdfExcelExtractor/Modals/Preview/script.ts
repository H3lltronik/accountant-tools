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
