import { CustomerContactStatusEnum } from "./enums";

export interface NewsletterCustomer {
  id: string;
  email: string;
}

export interface CustomerContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: CustomerContactStatusEnum;
  createdAt: string;
  updatedAt: string;
}
