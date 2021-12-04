/* eslint-disable react-hooks/rules-of-hooks */

import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Contact } from "../models/contact";
import { ContactService } from "../services/contactService";


const url = "http://localhost:8000/api/contacts"


export function ContactList() {
 
  const service = new ContactService();

  const [data, setData] = useState<Contact[]>([]);

  const columns = [
    { title: "name", field: "name" },
    { title: "email", field: "email" },
    { title: "message", field: "message" }
  ];


  const getData: any = async () => {
    let fetchedDataReq = await fetch(url);
    if (fetchedDataReq.ok) {
      let fetchedData = await fetchedDataReq.json();
      setData(fetchedData);
    } else {
      // log erro
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onAdd = async (newData: Contact) => {
    let req = await service.saveContact(newData)

    if (req.ok) {
      await getData()
    } else {
      // todo notification to user
    }
  }

  const onUpdate = async (newData, oldData) => {
    let updateReq = await fetch(url + "/" + oldData.id, {
      method: "PUT",
      headers: {
        'Content-type': "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newData)
    });

    if (updateReq.ok) {
      await getData();
    } else {

      // todo notification to user
    }
  }

  const onDelete = async (oldData: any) =>  { 
        let req = await fetch(url + "/" + oldData.id, {
          method: "DELETE",
          headers: {
            'Content-type': "application/json",
            "Accept": "application/json"
          },
        });
      
        if (req.ok) {
          await getData();
        } else {
    
          // todo notification to user
        }
      }
  return (

    <MaterialTable
      title="Contact List"
      columns={columns}
      data={data}
      options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
      editable={{
        onRowAdd: onAdd,
        onRowUpdate: onUpdate,
        onRowDelete: onDelete,
      }}
    />
  )
};


  // window.addEventListener('unhandledrejection', function(event) {
  //   // the event object has two special properties:
  //   alert(event.promise); // [object Promise] - the promise that generated the error
  //   alert(event.reason); // Error: Whoops! - the unhandled error object
  // });
