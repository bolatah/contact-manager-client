//import useAxiosPrivate from "./hooks/useAxiosprivate";
import { Contact } from "../models/contact";
import axios from "axios";
require("dotenv").config();

const apiBaseUrl = `${process.env.REACT_APP_API}/contacts`;

const privateHeaderOptions = {
  "access-token": `${localStorage.getItem("access-token")}`,
};

export const ContactService = () => {
  const privateInstance = axios.create({
    headers: privateHeaderOptions,
    withCredentials: true,
  });

  const saveContact = async (contact) => {
    return await privateInstance.post(apiBaseUrl, contact as Contact);
  };

  const updateContact = async (
    id: number,
    contact: Contact
  ): Promise<Response> => {
    return await privateInstance.put(apiBaseUrl + "/" + id, contact as Contact);
  };

  const getContactList = async (): Promise<Response> => {
    return await privateInstance.get(apiBaseUrl);
  };

  const getContactById = async (
    id: number,
    contact: Contact
  ): Promise<Contact> => {
    return await privateInstance.put(apiBaseUrl + "/" + id, contact as Contact);
  };

  const deleteContactById = async (id: number): Promise<Response> => {
    return await privateInstance.delete(apiBaseUrl + "/" + id);
  };
  return {
    saveContact,
    updateContact,
    getContactList,
    getContactById,
    deleteContactById,
  };
};
