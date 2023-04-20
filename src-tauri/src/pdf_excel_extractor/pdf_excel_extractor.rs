use pdf_extract;
use tauri;
use std::fs::File;
use std::io::prelude::*;
use std::path::PathBuf;

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

#[tauri::command]
pub fn convert_pdf_to_html(path: String) -> Result<String, String> {
    use std::process::Command;
    println!("Path: {}", path);

    let output_path = String::from("./assets/temp_pdf.html");

    let output = match Command::new("pdf2htmlEX.exe")
        .args(&["--data-dir", "C:\\Stuff\\pdf2htmlEX-win32-0.14.6-upx-with-poppler-data\\data", path.as_str(), output_path.as_str()])
        .output() {
        Ok(output) => output,
        Err(err) => {
            println!("Error on pdf2htmlEX: {}", err);
            return Err(err.to_string());
        }
    };


    println!("status: {}", output.status);
    println!("stdout: {}", String::from_utf8_lossy(&output.stdout));
    println!("stderr: {}", String::from_utf8_lossy(&output.stderr));

    if !output.status.success() {
        return Err(format!(
            "Command exited with status code {}",
            output.status.code().unwrap_or(-1)
        ));
    }

    //fs::canonicalize(&srcdir) 
    let result_path = PathBuf::from(&output_path);
    let full_result_path = match result_path.canonicalize() {
        Ok(path) => path,
        Err(err) => {
            println!("Error on canonicalize: {}", err);
            return Err(err.to_string());
        }
    };

    Ok(String::from(full_result_path.to_str().unwrap()))
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
