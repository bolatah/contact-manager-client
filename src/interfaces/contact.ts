export interface IContact {
  _id?: string;
  name: string;
  email: string;
  phone: number;
  message: string;
  file: string;
  dateCreated?: Date;
  href?: string;
}

export interface IContactFormData extends FormData {
  _id?: string;
  name: string;
  email: string;
  phone: number;
  message: string;
  file: string;
  dateCreated?: Date;
  href?: string;
}

export interface IContactAdding {
  _id?: string;
  file?: string;
  name: string;
  email: string;
  phone: number;
  message: string;
  dateCreated?: Date;
  href?: string;
}
