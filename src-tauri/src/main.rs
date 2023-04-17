// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod globals;
mod responses;
mod diot_file;
mod excel_differ;
use std::env;

use std::process::Command;

use crate::diot_file::diot_file::excel_to_diot;
use crate::excel_differ::excel_differ::{excel_differ, Equivalence};

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


#[tauri::command]
fn copy_file(source: &str, destination: &str) {
    #[cfg(target_os = "windows")]
    {
        match std::fs::copy(source, destination.to_owned()) {
            Ok(_) => println!("Ok"),
            Err(err) => println!("{}", err),
        };
    }
    #[cfg(target_os = "macos")]
    {
        let source = "./assets/diot_example.xlsx";
        let destination = format!("{}/Downloads/diot_example.xlsx", std::env::var("HOME").unwrap());
        let _ = Command::new("cp").args(&[source, destination.as_str()]).output();
    }
    #[cfg(target_os = "linux")]
    {
        let source = "./assets/diot_example.xlsx";
        let destination = format!("{}/Downloads/diot_example.xlsx", std::env::var("HOME").unwrap());
        let _ = Command::new("cp").args(&[source, destination.as_str()]).output();
    }
}



fn test () {
    let file1 = "G:\\Users\\H3LLT\\Downloads\\Nueva carpeta (2)\\file 1.xlsx";
    let file2 = "G:\\Users\\H3LLT\\Downloads\\Nueva carpeta (2)\\file 2.xlsx";
    let equivalences = vec![
        Equivalence {
            column1: String::from("A"),
            column2: String::from("A"),
        },
    ];

    println!("Hi");
    
    match excel_differ(file1, file2, equivalences) {
        Ok(_) => println!("Ok"),
        Err(err) => excel_differ::errors::report_error(err),
    };
}

fn main() {
    test(); 
    env::set_var(globals::DIOT_EXCEL_SHEET_NAME.name, globals::DIOT_EXCEL_SHEET_NAME.value);

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![excel_to_diot, open_folder, copy_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}