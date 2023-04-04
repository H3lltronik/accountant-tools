// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use calamine::{open_workbook_auto, DataType, Reader, Xlsx};
use std::fs::File;
use std::io::BufReader;
use std::io::Write;
use std::process::Command;
use std::vec;
use tauri::regex::Regex;

mod responses;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn excel_to_diot(file_path: &str, folder_path: &str) -> Result<responses::MyResponse, String> {
    let mut filename = "";

    let re =
        Regex::new(r"(?P<path>[A-Z]:\\.+\\)(?P<filename>[^\\]+)\.(?P<extension>[^.\\]+)$").unwrap();
    if let Some(captures) = re.captures(file_path) {
        filename = captures.name("filename").unwrap().as_str();
    }

    let folder_path = if folder_path.ends_with("\\") {
        folder_path.to_owned()
    } else {
        folder_path.to_owned() + "\\"
    };

    let mut workbook = open_workbook_auto(file_path).unwrap();
    let tab_file_path = folder_path.to_owned() + filename + "[DIOT].txt";

    

    if std::path::Path::new(&tab_file_path).exists() {
        let response = responses::MyResponse {
            result: responses::ResponseType::Error(responses::Result {
                message: String::from("El archivo ya existe"),
                payload: Option::Some(String::from("El archivo ya existe")),
            }),
            notifications: vec![
                responses::Notification {
                    notification_type: responses::NotificationType::Error,
                    title: String::from("Error"),
                    description: String::from("El archivo ya existe"),
                },
            ],
        };
        return Ok(response);
    }

    xlsx_to_tab_delimited(&mut workbook, &tab_file_path).unwrap();

    let response = responses::MyResponse {
        result: responses::ResponseType::Success(responses::Result {
            message: String::from("Se creó el archivo correctamente"),
            payload: None,
        }),
        notifications: vec![
            responses::Notification {
                notification_type: responses::NotificationType::Info,
                title: String::from("Correcto"),
                description: String::from("Se creó el archivo correctamente"),
            },
        ],
    };
    Ok(response)
}

#[tauri::command]
fn open_folder(path: &str) {
    #[cfg(target_os = "windows")]
    {
        let _ = Command::new("explorer.exe").arg(path).output();
    }
    #[cfg(target_os = "macos")]
    {
        let _ = Command::new("open").arg(path).output();
    }
    #[cfg(target_os = "linux")]
    {
        let _ = Command::new("xdg-open").arg(path).output();
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![excel_to_diot, open_folder])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn xlsx_to_tab_delimited(
    workbook: &mut calamine::Sheets<BufReader<File>>,
    tab_file_path: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    let range_result = workbook.worksheet_range("Hoja1");

    let range = match range_result {
        Some(Ok(r)) => r,
        Some(Err(e)) => {
            eprintln!("Failed to get worksheet range: {}", e);
            return Ok(());
        }
        None => {
            eprintln!("Failed to get worksheet range: no worksheet found");
            return Ok(());
        }
    };

    let mut file = std::fs::File::create(tab_file_path)?;

    for row in range.rows() {
        let mut first = true;
        for cell in row {
            if !first {
                file.write_all(b"|")?;
            }

            match cell {
                DataType::Empty => {}
                DataType::String(s) => {
                    file.write_all(s.trim().as_bytes())?;
                }
                DataType::Float(f) => {
                    let value: Option<String> = Some(f.to_string());
                    if first {
                        let is_lower_than_ten = *f < 10.0;
                        match value {
                            Some(v) => {
                                if is_lower_than_ten {
                                    file.write_all(("0".to_string() + &v).as_bytes())?;
                                } else {
                                    file.write_all(v.as_bytes())?;
                                }
                            }
                            None => {
                                file.write_all("0".as_bytes())?;
                            }
                        }
                    } else {
                        file.write_all(value.unwrap_or("0".to_string()).to_string().as_bytes())?;
                    }
                }
                DataType::Int(i) => {
                    file.write_all(i.to_string().as_bytes())?;
                }
                DataType::Bool(b) => {
                    file.write_all(if *b { b"TRUE" } else { b"FALSE" })?;
                }
                _ => {
                    file.write_all(0.to_string().as_bytes())?;
                }
            }

            first = false;
        }
        file.write_all(b"|\n")?;
    }

    Ok(())
}
