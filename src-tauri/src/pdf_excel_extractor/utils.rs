use std::fs::{File, self};
use std::io::prelude::*;
use std::path::PathBuf;
use std::process::Command;
use tauri::command;

pub fn read_file(relative_path: &str) -> std::io::Result<String> {
    // Run the "dir" command to list the files in the directory
    // match Command::new("cmd")
    //     .arg("/c")
    //     .arg("dir")
    //     .output() {
    //     Ok(output) => {
    //         println!("Output: {}", String::from_utf8_lossy(&output.stdout));
    //     },
    //     Err(err) => {
    //         println!("Error on dir: {}", err);
    //     }
    // };

    let path = PathBuf::from(&relative_path);
    // let path = PathBuf::from("./assets/pdf.html");
    println!("Path: {:?}", path);

    // Open the file from the constructed path
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}
