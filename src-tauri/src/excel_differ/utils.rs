use std::fmt;
use calamine::{self, DataType, Reader};

use super::errors::ExcelDifferError::{ErrorLoadingWorkbook, ErrorLoadingWorksheet, ErrorWorksheetNotFound};
use super::errors::Result;

pub struct ExcelFile {
    pub name: String,
    pub rows: Vec<Row>,
}
impl fmt::Display for ExcelFile {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        writeln!(f, "Name: {}", self.name)?;
        writeln!(f, "Qnt of rows: {}", self.rows.len())?;
        for row in &self.rows {
            writeln!(f, "Row Number: {}, Found in reference: {}", row.row_number, row.found_in_reference)?;
            for cell in &row.cells {
                writeln!(f, "Column: {}, Value: {}", cell.column, cell.value)?;
            }
        }
        Ok(())
    }
}

pub struct Row {
    pub row_number: i32,
    pub cells: Vec<Cell>,
    pub found_in_reference: bool,
}

pub struct Cell {
    pub column: String,
    pub value: String,
}

pub struct File {
    pub name: String,
    pub rows: Vec<Row>,
}

fn col_index_to_column(index: usize) -> String {
    let mut column = String::new();
    let mut index = index;

    while index > 25 {
        column.insert(0, (index % 26 + 65) as u8 as char);
        index /= 26;
        index -= 1;
    }

    column.insert(0, (index + 65) as u8 as char);

    column
}

pub fn load_excel_file(path: &str) -> Result<ExcelFile> {
    let mut workbook = match calamine::open_workbook_auto(path) {
        Ok(w) => w,
        Err(e) => { return Err(ErrorLoadingWorkbook) } 
    };

    let range_result = workbook.worksheet_range("diff");
    let mut excel_file = ExcelFile {
        name: path.to_string(),
        rows: Vec::new(),
    };

    let range = match range_result {
        Some(Ok(r)) => r,
        Some(Err(e)) => { return Err(ErrorLoadingWorksheet) }
        None => { return Err(ErrorWorksheetNotFound) }
    };

    for (row_idx, row) in range.rows().into_iter().enumerate() {
        let mut cells = Vec::new();

        for (index, cell) in row.iter().enumerate() {
            let column = col_index_to_column(index);
            let value = match cell {
                DataType::Empty => "".to_string(),
                DataType::String(s) => s.trim().to_string(),
                DataType::Float(f) => f.to_string(),
                DataType::Int(i) => i.to_string(),
                DataType::Bool(b) => b.to_string(),
                DataType::DateTime(d) => d.to_string(),
                DataType::Error(e) => e.to_string(),
            };

            cells.push(Cell {
                column,
                value,
            });
        }

        excel_file.rows.push(Row {
            row_number: row_idx as i32,
            found_in_reference: false,
            cells,
        });
    }

    Ok(excel_file)
}