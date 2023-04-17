use thiserror::Error;

#[derive(Error, Debug)]
pub enum DiotFileError {
    #[error("Failed to load Excel file")]
    ErrorLoadingWorkbook,
    #[error("Failed to load the worksheet")]
    ErrorLoadingWorksheet,
    #[error("Failed to find the worksheet")]
    ErrorWorksheetNotFound,
    #[error("File already exists: {0}")]
    FileAlreadyExists(String),
    #[error("File already exists: {0}")]
    GenericError(String),
}

pub type Result<T> = std::result::Result<T, DiotFileError>;

pub fn report_error(error: DiotFileError) {
    match error {
        DiotFileError::ErrorLoadingWorkbook => {
        }
        DiotFileError::ErrorLoadingWorksheet => {
        }
        DiotFileError::ErrorWorksheetNotFound => {
        }
        DiotFileError::FileAlreadyExists(file) => {
        }
        DiotFileError::GenericError(file) => {
        }
    }
}