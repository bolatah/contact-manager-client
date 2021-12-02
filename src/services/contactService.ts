import { Contact } from "../models/contact";

export const saveContact = (contact: Contact)=> {

}

export const getContactList = async ():  Promise<Contact[]>=> {

    return [];
}

export const getContactById =  async (id:number):  Promise<Contact>=> {

    return { } as Contact;
}
/* async getContact(id){
    return new Promise ((resolve, reject) => {
        db.get(
            'SELECT * FROM contacts where id=?',
                [id],
                (error, row) => {
                    if(error){
                        reject(error);
                    } else {
                        resolve(row);
                    }
                }
        );
    })
}
 */



export const deleteByContactId = async (id:number):  Promise<boolean> => {

    return true;
}

/* app.get("/api/contacts/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const contact = await contactsManager.getContact(id);
    if (contact) {
      response.status(200).send(contact);
    } else {
      response.status(404).send();
    }
  }); */