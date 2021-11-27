import { Contact } from "../models/contact";

export const saveContact = (contact: Contact)=> {

}

export const getContactList = async ():  Promise<Contact[]>=> {

    return [];
}

export const getContactById =  async (id:number):  Promise<Contact>=> {

    return { } as Contact;
}

export const deleteByContactId = async (id:number):  Promise<boolean>=> {

    return true;
}