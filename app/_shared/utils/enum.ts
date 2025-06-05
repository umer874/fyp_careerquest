const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

// enum UserType {
//   Participant,
//   Fellow,
//   Mentor,
//   Coach,
// }

enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

enum FileType {
  IMAGE = "image",
  VIDEO = "video",
  PDF = "pdf",
}

enum MessageType {
  Text,
  File,
}
enum NotificationType {
  Message,
  Event,
  CoachAssigned,
  MentorAssigned,
  Job,
}

export {
  SUPPORTED_FORMATS,
  //UserType,
  HTTP_METHODS,
  FileType,
  MessageType,
  NotificationType,
};
