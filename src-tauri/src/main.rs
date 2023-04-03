// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{error::Error, io::Write};
use std::io::{Cursor, BufReader};
use base64::Engine;
use calamine::{open_workbook_auto, DataType, Reader, Xlsx};
use tauri::regex::Regex;
use std::fs::File;
use anyhow::Context;
use data_encoding::BASE64;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn excel(fullPath: &str) -> Result<String, String> {
    let mut path = "";
    let mut filename = "";
    let mut extension = "";

    let re = Regex::new(r"(?P<path>[A-Z]:\\.+\\)(?P<filename>[^\\]+)\.(?P<extension>[^.\\]+)$").unwrap();
    if let Some(captures) = re.captures(fullPath) {
        path = captures.name("path").unwrap().as_str();
        filename = captures.name("filename").unwrap().as_str();
        extension = captures.name("extension").unwrap().as_str();
    }


    let mut workbook = open_workbook_auto(fullPath).unwrap();
    let tab_file_path = path.to_owned() + filename + "[DIOT].txt";
    println!("{}", tab_file_path);

    xlsx_to_tab_delimited(&mut workbook, &tab_file_path).unwrap();

    Ok(String::from("ok"))
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, excel])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn xlsx_to_tab_delimited(workbook: &mut calamine::Sheets<BufReader<File>>, tab_file_path: &str) -> Result<(), Box<dyn std::error::Error>> {
    let range_result = workbook.worksheet_range("Hoja1");

    let range = match range_result {
        Some(Ok(r)) => r,
        Some(Err(e)) => {
            eprintln!("Failed to get worksheet range: {}", e);
            return Ok(());
        },
        None => {
            eprintln!("Failed to get worksheet range: no worksheet found");
            return Ok(());
        },
    };
    
    let mut file = std::fs::File::create(tab_file_path)?;

    for row in range.rows() {
        let mut first = true;
        for cell in row {
            if !first {
                file.write_all(b"|")?;
            }

            match cell {
                DataType::Empty => {},
                DataType::String(s) => {
                    file.write_all(s.trim().as_bytes())?;
                },
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
                            },
                            None => {
                                file.write_all("0".as_bytes())?;
                            },
                        }
                    } else {
                        file.write_all(value.unwrap_or("0".to_string()).to_string().as_bytes() )?;
                    }
                },
                DataType::Int(i) => {
                    file.write_all(i.to_string().as_bytes())?;
                },
                DataType::Bool(b) => {
                    file.write_all(if *b { b"TRUE" } else { b"FALSE" })?;
                },
                _ => {
                    file.write_all(0.to_string().as_bytes())?;
                }, 
            }

            first = false;
        }
        file.write_all(b"|\n")?;
    }

    Ok(())
}
