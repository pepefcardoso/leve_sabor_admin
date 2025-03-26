import { Image } from "./image";
import { User } from "./user";

export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  category_id: string;
  category?: PostCategory;
  user_id: string;
  user?: User;
  topics?: PostTopic[];
  image?: Image;
  created_at: string;
  updated_at: string;
}

export interface PostCategory {
  id: string;
  name: string;
  normalized_name: string;
}

export interface PostTopic {
  id: string;
  name: string;
  normalized_name: string;
}

export interface PostFilters {
  search?: string;
  category_id?: string;
}
