use thiserror::Error;

#[derive(Error, Debug)]
pub enum ExcelDifferError {
    #[error("Failed to load Excel file")]
    ErrorLoadingWorkbook,
    #[error("Failed to load the worksheet")]
    ErrorLoadingWorksheet,
    #[error("Failed to find the worksheet")]
    ErrorWorksheetNotFound,
}

pub type Result<T> = std::result::Result<T, ExcelDifferError>;

pub fn report_error(error: ExcelDifferError) {
    match error {
        ExcelDifferError::ErrorLoadingWorkbook => {
        }
        ExcelDifferError::ErrorLoadingWorksheet => {
        }
        ExcelDifferError::ErrorWorksheetNotFound => {
        }
    }
}