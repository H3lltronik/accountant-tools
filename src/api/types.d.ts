type ResponseNotificationType = "error" | "success" | "info" | "warning";

interface ResponseNotification {
  notification_type: ResponseNotificationType;
  title: string;
  description: string;
}

interface ResponseCall<T> {
    message: string;
    payload?: T;
}

interface ResponseResult<T> {
  Success?: ResponseCall<T>;
  Error?: ResponseCall<T>;
}

interface TauriResponse<T> {
  notifications?: ResponseNotification[];
  result: ResponseResult<T>;
}

interface TauriCallResponse<T> {
    type: ResponseNotificationType;
    body: ResponseCall<T>
}