use tauri;
use std::path::PathBuf;
use std::path::Path;
extern crate directories;
use directories::{BaseDirs, UserDirs, ProjectDirs};

use crate::pdf_excel_extractor::utils::ensure_dir_exists;

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
    let data_pdf2html_path = String::from("./binaries/pdf2htmlEX/data");
    let filename = Path::new(&path).file_stem().unwrap();
    

    let data_dir = match ProjectDirs::from("com", "h3lltronik", "accountant-tools-app") {
        Some(dirs) => dirs.data_local_dir().to_owned(),
        None => {
            println!("Error on ProjectDirs");
            return Err("Error on ProjectDirs".to_string());
        }
    };

    let output_path = data_dir.join("pdf2htmlEX");

    let path_output = PathBuf::from(&output_path);
    match ensure_dir_exists(&path_output) {
        Ok(_) => (),
        Err(err) => {
            println!("Error on ensure_dir_exists: {}", err);
            return Err(err.to_string());
        }
    }

    let output = match Command::new("pdf2htmlEX.exe")
        .args(&["--data-dir", &data_pdf2html_path, path.as_str(), "--dest-dir", output_path.to_str().unwrap()])
        .output() {
        Ok(output) => output,
        Err(err) => {
            println!("Error on pdf2htmlEX: {}", err);
            return Err(err.to_string());
        }
    };

    if !output.status.success() {
        return Err(format!("Command exited with status code {}", output.status.code().unwrap_or(-1)));
    }

    let result_path = PathBuf::from(&output_path);
    let mut full_result_path = match result_path.canonicalize() {
        Ok(path) => path,
        Err(err) => {
            println!("Error on canonicalize: {}", err);
            return Err(err.to_string());
        }
    };

    full_result_path.push(filename.to_str().unwrap().to_owned() + ".html");

    Ok(String::from(full_result_path.to_str().unwrap()))
}

