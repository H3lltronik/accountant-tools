use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct MyResponse {
    pub result: ResponseType,
    pub notifications: Vec<Notification>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum ResponseType {
    Success(Result),
    Error(Result),
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Result {
    pub message: String,
    pub payload: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Notification {
    pub notification_type: NotificationType,
    pub title: String,
    pub description: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum NotificationType {
    Info,
    Success,
    Warning,
    Error,
}

