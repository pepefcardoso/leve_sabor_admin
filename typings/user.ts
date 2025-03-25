import { RolesEnum } from "./enums";
import { Image } from "./image";

export interface User {
  id: string;
  name: string;
  email: string;
  birthday: string;
  phone: string;
  role: RolesEnum;
  image?: Image;
  created_at: string;
  updated_at: string;
}
