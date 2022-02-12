import { Contact } from "../models/contact";

const apiBaseUrl = `${process.env.REACT_APP_API}/contacts`;


export class ContactService {

    saveContact = async (contact: Contact) => {

        return await fetch(apiBaseUrl, {
            method: "POST",
            credentials: "include",
            headers : {
                "Content-type": "application/json",
                "Accept": "application/json",
               "x-access-token" : `${window.localStorage.getItem("x-access-token")}`, 
                "x-access-token-expiration": `${window.localStorage.getItem("x-access-token-expiration")}`, 
            },
            body: JSON.stringify(contact), 
        });
    }

    updateContact = async (id: number, contact: Contact): Promise<Response> => {
        return await fetch(apiBaseUrl + "/" + id, {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-type': "application/json",
                "Accept": "application/json",
                "x-access-token" : `${window.localStorage.getItem("x-access-token")}`, 
                "x-access-token-expiration": `${window.localStorage.getItem("x-access-token-expiration")}`, 
            },
            body: JSON.stringify(contact)
        });
    }

    getContactList = async (): Promise<Response> => {
        return await fetch(apiBaseUrl, {
            credentials: "include",
            headers : {
                "Content-type": "application/json",
                "Accept": "application/json",
               "x-access-token" : `${window.localStorage.getItem("x-access-token")}`, 
                "x-access-token-expiration": `${window.localStorage.getItem("x-access-token-expiration")}`, 
            },
        });
    }

    getContactById = async (id: number): Promise<Contact> => {

        return {} as Contact;
    }

    deleteContactById = async (id: number): Promise<Response> => {
        return await fetch(apiBaseUrl + "/" + id, {
            method: "DELETE",
            credentials: "include",
            headers : {
                "Content-type": "application/json",
                "Accept": "application/json",
               "x-access-token" : `${window.localStorage.getItem("x-access-token")}`, 
                "x-access-token-expiration": `${window.localStorage.getItem("x-access-token-expiration")}`, 
            },
        });
    }
}
