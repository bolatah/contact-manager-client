import { IContact } from "../interfaces/contact";
import axiosPrivate from "api/axiosPrivate";
import { AxiosResponse } from "axios";
const contactsUrl = `${process.env.REACT_APP_URL}/contacts`;

const SaveContact = async (contact): Promise<AxiosResponse> => {
  return await axiosPrivate.post(contactsUrl, contact as IContact);
};

const UpdateContact = async (
  id: number,
  contact: IContact
): Promise<AxiosResponse<IContact>> => {
  return await axiosPrivate.put(contactsUrl + "/" + id, contact as IContact);
};

const GetContactList = async (): Promise<AxiosResponse> => {
  return await axiosPrivate.get(contactsUrl);
};

const GetContactById = async (
  id: number,
  contact: IContact
): Promise<AxiosResponse<IContact>> => {
  return await axiosPrivate.put(contactsUrl + "/" + id, contact as IContact);
};

const DeleteContactById = async (id: number): Promise<AxiosResponse> => {
  return await axiosPrivate.delete(contactsUrl + "/" + id);
};

const contactService = {
  SaveContact,
  UpdateContact,
  GetContactList,
  GetContactById,
  DeleteContactById,
};

export default contactService;
