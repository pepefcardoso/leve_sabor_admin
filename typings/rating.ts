import { User } from "./user";

export interface Rating {
  id: string;
  rating: string;
  user_id: string;
  rateable_id: string;
  rateable_type: string;
  created_at: string;
  updated_at: string;
  user?: User;
}
