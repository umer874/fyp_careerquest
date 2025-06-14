import { FileType, NotificationType } from "utils/enum";

interface AssetDTO {
  full_path: string;
  type: FileType;
}

interface UserDTO {
  first_name: string;
  last_name: string;
  profile_asset: AssetDTO;
  //type: UserType;
}

interface JobDTO {
  id: number;
  title: string;
}

interface ConversationDTO {
  id: number;
  last_message: string;
}

interface EventDTO {
  id: number;
  title: string;
  date: Date;
  start_time: string;
}

export type Notification = {
  id: number;
  type: NotificationType;
  user: UserDTO;
  receiver: UserDTO;
  is_read: string;
  created_at: Date;
  job: JobDTO;
  event: EventDTO;
  conversation: ConversationDTO;
};
