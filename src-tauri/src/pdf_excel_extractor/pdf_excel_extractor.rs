use pdf_extract;
use tauri;
use std::fs::File;
use std::io::prelude::*;

use super::utils::read_file;

#[tauri::command]
pub fn test_pdf(path: String) -> Result<String, String> {
    return match read_file(path.as_str()) {
        Ok(out) => Ok(out),
        Err(err) => {
            println!("Error: {}", err);
            return Err(err.to_string());
        }
    }
}

// pub fn test_pdf() -> Result<(), Box<dyn std::error::Error>> {
//     let out = match pdf_extract::extract_text(".\\assets\\pdf.pdf") {
//         Ok(out) => out,
//         Err(err) => {
//             println!("Error: {}", err);
//             return Ok(());
//         }
//     };

//     // println!("{:?}", out);

//     Ok(())
// }
