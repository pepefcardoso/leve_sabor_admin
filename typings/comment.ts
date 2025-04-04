import { User } from "./user";

export interface Comment {
  id: string;
  content: string;
  user_id: string;
  commentable_id: string;
  commentable_type: string;
  created_at: string;
  updated_at: string;
  user?: User;
}
