use calamine::{open_workbook_auto, DataType, Reader};
use std::fs::File;
use std::io::BufReader;
use std::io::Write;
use std::vec;
use tauri::regex::Regex;

use crate::globals;
use crate::responses::responses;
use crate::responses::responses::Notification;
use crate::responses::responses::ResponseType;
use super::errors::{ Result as DiotResult, DiotFileError };
use chrono::{Datelike, Local, Timelike};

fn excel_to_diot_per_file(file_path: &str, folder_path: &str) -> DiotResult<bool> {
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

    let now = Local::now();
    let year = now.year();
    let day = now.day();
    let hour = now.hour();
    let minute = now.minute();
    let new_filename = format!("{}_{}_{}_{}_{:02}.txt", filename, year, day, hour, minute);

    let mut workbook = open_workbook_auto(file_path).unwrap();
    let tab_file_path = folder_path.to_owned() + &new_filename;

    if std::path::Path::new(&tab_file_path).exists() {
        return Err(DiotFileError::FileAlreadyExists(tab_file_path));
    }

    match xlsx_to_tab_delimited(&mut workbook, &tab_file_path) {
        Ok(_) => {}
        Err(e) => match e {
            DiotFileError::ErrorLoadingWorkbook => return Err(DiotFileError::ErrorLoadingWorkbook),
            DiotFileError::ErrorLoadingWorksheet => return Err(DiotFileError::ErrorLoadingWorksheet),
            DiotFileError::ErrorWorksheetNotFound => return Err(DiotFileError::ErrorWorksheetNotFound),
            DiotFileError::FileAlreadyExists(_) => {
                return Err(DiotFileError::FileAlreadyExists(tab_file_path));
            }
            DiotFileError::GenericError(_) => {
                return Err(DiotFileError::GenericError(e.to_string()));
            }
        },
    };

    Ok(true)
}

#[tauri::command]
pub fn excel_to_diot(file_paths: &str, folder_path: &str) -> Result<responses::MyResponse, String> {
    let array_file_paths: Vec<&str> = file_paths.split(",").collect();
    let mut notifications: Vec<Notification> = vec![];
    let mut ok_counter = 0;

    for file_path in &array_file_paths {
        match excel_to_diot_per_file(file_path, &folder_path) {
            Ok(_) => {
                ok_counter += 1;
                println!("Archivo creado correctamente");
            }
            Err(e) => {
                println!("Error: {:?}", e);
                match e {
                    DiotFileError::ErrorLoadingWorkbook => {
                        notifications.push(Notification {
                            notification_type: responses::NotificationType::Error,
                            title: String::from("Error"),
                            description: String::from("No se pudo cargar el archivo"),
                        });
                    },
                    DiotFileError::ErrorLoadingWorksheet => {
                        notifications.push(Notification {
                            notification_type: responses::NotificationType::Error,
                            title: String::from("Error"),
                            description: String::from("No se pudo cargar la hoja"),
                        });
                    },
                    DiotFileError::ErrorWorksheetNotFound => {
                        notifications.push(Notification {
                            notification_type: responses::NotificationType::Error,
                            title: String::from("Error"),
                            description: format!("No se encontró la hoja {}", globals::DIOT_EXCEL_SHEET_NAME.value),
                        });
                    },
                    DiotFileError::FileAlreadyExists(_) => {
                        notifications.push(Notification {
                            notification_type: responses::NotificationType::Error,
                            title: String::from("Error"),
                            description: String::from("El archivo ya existe"),
                        });
                    },
                    DiotFileError::GenericError(_) => {
                        notifications.push(Notification {
                            notification_type: responses::NotificationType::Error,
                            title: String::from("Error"),
                            description: String::from("Ocurrió un error"),
                        });
                    },
                }
            }
        };
    }

    let result = if ok_counter == array_file_paths.len() {
        Some(responses::Result {
            message: String::from("Se crearon los archivos correctamente"),
            payload: None,
        })
    } else {
        None
    };
    
    let response_type = if let Some(result) = result {
        responses::ResponseType::Success(result)
    } else if ok_counter == 0 {
        responses::ResponseType::Error(responses::Result {
            message: String::from("No se pudo crear ningún archivo"),
            payload: None,
        })
    } else {
        responses::ResponseType::Error(responses::Result {
            message: String::from("Algunos archivos se crearon correctamente"),
            payload: None,
        })
    };
    
    let response = responses::MyResponse { result: response_type, notifications };
    Ok(response)
}

fn xlsx_to_tab_delimited(workbook: &mut calamine::Sheets<BufReader<File>>, tab_file_path: &str) -> DiotResult<bool> {
    let sheet_name = match std::env::var(globals::DIOT_EXCEL_SHEET_NAME.name).ok() {
        Some(s) => s,
        None => return Err(DiotFileError::GenericError( format!("No se encontró la variable de entorno {}", globals::DIOT_EXCEL_SHEET_NAME.name) ))
    }; 

    let range_result = workbook.worksheet_range(&sheet_name);
    let range = match range_result {
        Some(Ok(r)) => r,
        Some(Err(e)) => return Err(DiotFileError::ErrorLoadingWorksheet),
        None => return Err(DiotFileError::ErrorWorksheetNotFound)
    };

    let mut file =  match std::fs::File::create(tab_file_path) {
        Ok(f) => f,
        Err(_) => return Err(DiotFileError::FileAlreadyExists(tab_file_path.to_string()))
    };

    
    fn write_all_checked<W: Write>(file: &mut W, data: &[u8]) -> DiotResult<()> {
        match file.write_all(data) {
            Ok(_) => Ok(()),
            Err(e) => Err(DiotFileError::GenericError(e.to_string())),
        }
    }

    let mut rows = range.rows();
    rows.next(); // Skip header
    
    for row in rows {
        let mut first = true;
        for (index, cell) in row.into_iter().enumerate() {
            if !first {
                write_all_checked(&mut file, b"|")?;
            }
    
            match cell {
                DataType::Empty => {}
                DataType::String(s) => {
                    write_all_checked(&mut file, s.trim().as_bytes())?;
                }
                DataType::Float(f) => {
                    let value: Option<String> = Some(f.to_string());
                    if index < 2 { 
                        let is_lower_than_ten = *f < 10.0;
                        match value {
                            Some(v) => {
                                if is_lower_than_ten {
                                    write_all_checked(&mut file, ("0".to_string() + &v).as_bytes())?;
                                } else {
                                    write_all_checked(&mut file, v.as_bytes())?;
                                }
                            }
                            None => {
                                write_all_checked(&mut file, "0".as_bytes())?;
                            }
                        }
                    } else {
                        write_all_checked(&mut file, value.unwrap_or("0".to_string()).to_string().as_bytes())?;
                    }
                }
                DataType::Int(i) => {
                    write_all_checked(&mut file, i.to_string().as_bytes())?;
                }
                DataType::Bool(b) => {
                    write_all_checked(&mut file, if *b { b"TRUE" } else { b"FALSE" })?;
                }
                _ => {
                    write_all_checked(&mut file, 0.to_string().as_bytes())?;
                }
            }
    
            first = false;
        }
        write_all_checked(&mut file, b"|\n")?;
    }
    

    Ok(true)
}
