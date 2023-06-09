pub use crate::excel_differ::utils;
use super::errors::Result;

pub struct Equivalence {
    pub column1: String,
    pub column2: String,
}

fn get_cell_equivalence_value<'a>(row: &'a utils::Row, column: &str) -> Option<&'a str> {
    for (_, cell) in row.cells.iter().enumerate() {
        if cell.column != column { continue; }

        return Some(&cell.value);
    }

    None
}

pub fn excel_differ(file1_path: &str, file2_path: &str, equivalences: Vec<Equivalence>) -> Result<String> {
    let mut file1 = utils::load_excel_file(file1_path)?;
    let file2 = utils::load_excel_file(file2_path)?;

    for (_, equivalence) in equivalences.iter().enumerate() {
        for (_, row) in file1.rows.iter_mut().enumerate() {
            let equivalence1_value = match get_cell_equivalence_value(&row, &equivalence.column1) {
                Some(value) => value,
                None => continue,
            };
            let mut found_in_reference = false;

            for (_, row2) in file2.rows.iter().enumerate() {
                let equivalence2_value = match get_cell_equivalence_value(&row2, &equivalence.column2) {
                    Some(value) => value,
                    None => continue,
                };

                if equivalence1_value == equivalence2_value {
                    println!("{} == {}", equivalence1_value, equivalence2_value);
                    found_in_reference = true;
                } else {
                    println!("{} != {}", equivalence1_value, equivalence2_value);
                }
            }
            row.found_in_reference = found_in_reference;
        }
    }

    print!("File 1: {}", file1);
    print!("File 2: {}", file2);
    Ok(String::from("Hola"))
}