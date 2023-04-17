use lazy_static::lazy_static;

pub struct EnvVariable {
    pub name: &'static str,
    pub value: &'static str,
}

lazy_static! {
    pub static ref DIOT_EXCEL_SHEET_NAME: EnvVariable = EnvVariable {
        name: "DIOT_EXCEL_SHEET_NAME",
        value: "DIOT",
    };
}
