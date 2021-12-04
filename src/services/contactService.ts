import { Contact } from "../models/contact";


const url = "http://localhost:8000/api/contacts"
export class ContactService {
    saveContact = async (contact: Contact) => {
        return await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(contact)
        });
    }

    updateContact = (id: number, contact: Contact) => {

    }

    getContactList = async (): Promise<Contact[]> => {

        return [];
    }

    getContactById = async (id: number): Promise<Contact> => {

        return {} as Contact;
    }

    deleteContactById = async (id: number): Promise<Contact> => {

        return {} as Contact;
    }
}
