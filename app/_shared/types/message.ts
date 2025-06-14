import { FileType, MessageType } from "utils/enum";

interface AssetDTO {
  full_path: string;
  type: FileType;
}

interface UserDTO {
  id: number;
  first_name: string;
  last_name: string;
  profile_asset: AssetDTO;
  //type: UserType;
}

export type Conversation = {
  id: number;
  last_message: string;
  fellow_unread_count: number;
  mentor_coach_unread_count: number;
  fellow: UserDTO;
  mentor_coach: UserDTO;
  created_at: Date;
  updated_at: Date;
};

export type ChatMessage = {
  id: number;
  sender: UserDTO;
  receiver: UserDTO;
  message: string;
  type: MessageType;
  is_read: boolean;
  created_at: Date;
  chat_asset: AssetDTO;
  conversation: Conversation;
};
