use std::fs::{File};
use std::io::prelude::*;
use std::path::PathBuf;
use std::process::Command;
use tauri::command;
use std::path::Path;
use std::fs::{self, DirBuilder};

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
    println!("Reading Path: {:?}", path);

    // Open the file from the constructed path
    let mut file = match File::open(path) {
        Ok(file) => file,
        Err(err) => {
            println!("Error on File::open: {}", err);
            return Err(err);
        }
    };
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}


pub fn ensure_dir_exists(path: &Path) -> Result<(), std::io::Error> {
    if path.exists() {
        if path.is_dir() {
            // Directory already exists
            return Ok(());
        } else {
            // Path exists but is not a directory
            return Err(std::io::Error::new(std::io::ErrorKind::AlreadyExists, "A file with the same name already exists"));
        }
    }
    
    // Path does not exist, create it
    let parent_dir = path.parent().ok_or(std::io::Error::new(std::io::ErrorKind::NotFound, "Invalid path"))?;
    DirBuilder::new().recursive(true).create(parent_dir)?;
    Ok(())
}
