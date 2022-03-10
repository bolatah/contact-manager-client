import axios from "axios";
import { Contact } from "../models/contact";
require("dotenv").config();

const apiBaseUrl = `${process.env.REACT_APP_API}/contacts`;

const privateHeaderOptions = {
  "access-token": `${localStorage.getItem("access-token")}`,
};

const publicHeaderOptions = {
  Accept: "application/json",
};

const headerOptions = {
  ...privateHeaderOptions,
  ...publicHeaderOptions,
} as any;

// const publicInstance = axios.create({
//   baseURL: apiBaseUrl,
//   headers: publicHeaderOptions,
// });

const privateInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: headerOptions,
  withCredentials: true,
});

export class ContactService {
  saveContact = async (contact) => {
    return await privateInstance.post(apiBaseUrl, contact as Contact);
  };

  updateContact = async (id: number, contact: Contact): Promise<Response> => {
    return await privateInstance.put(apiBaseUrl + "/" + id, contact as Contact);
  };

  getContactList = async (): Promise<Response> => {
    return await privateInstance.get(apiBaseUrl);
  };

  getContactById = async (id: number, contact: Contact): Promise<Contact> => {
    return await privateInstance.put(apiBaseUrl + "/" + id, contact as Contact);
  };

  deleteContactById = async (id: number): Promise<Response> => {
    return await privateInstance.delete(apiBaseUrl + "/" + id);
  };
}
