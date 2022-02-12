/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Contact } from "../models/contact";
import { ContactService } from "../services/contactService";

export function ContactList() {
  const service = new ContactService();

  const [data, setData] = useState<Contact[]>([]);

  const columns = [
    {
      title: "name",
      field: "name",
    },
    {
      title: "email",
      field: "email",
    },
    {
      title: "message",
      field: "message",
    },
  ];

  const getData: any = async () => {
    let fetchedDataReq = await service.getContactList();
    if (fetchedDataReq.ok) {
      let fetchedData = await fetchedDataReq.json();
      setData(fetchedData);
    } else {
      console.log("Error while getting data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onAdd = async (newData: Contact) => {
    if (newData.name.length > 2) {
      if (newData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
        if (newData.message.length > 4) {
          let req = await service.saveContact(newData);
          if (req.ok) {
            await getData();
          }
        } else {
          alert("Message must be at least 4 characters");
        }
      } else {
        alert('Email must include "@"');
      }
    } else {
      alert("Name bust be longer than 2 characters");
    }
  };

  const onUpdate = async (newData, oldData) => {
    if (newData.name.length > 2) {
      if (newData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
        if (newData.message.length > 4) {
          let req = await service.updateContact(oldData.id, newData);
          if (req.ok) {
            await getData();
          }
        } else {
          alert("Message must be at least 4 characters");
        }
      } else {
        alert("A proper mail must be given");
      }
    } else {
      alert("Name must be longer than 2 characters");
    }
  };

  const onDelete = async (oldData: any) => {
    let req = await service.deleteContactById(oldData.id);

    if (req.ok) {
      await getData();
    } else {
      // todo notification to user
    }
  };
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
  );
}
