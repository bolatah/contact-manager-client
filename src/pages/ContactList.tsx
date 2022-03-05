/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Contact } from "../models/contact";
import { ContactService } from "../services/contactService";
import { showToast } from "../repository/utils";

export function ContactList() {
  const service = new ContactService();

  const [data, setData] = useState<Contact[]>([]);

  const columns = [
    {
      title: "",
      field: "path",
      render: (rowData) => (
        <img
          src={rowData.path}
          // style={{ width: 40, borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "name",
      field: "name",
    },
    {
      title: "email",
      field: "email",
    },
    {
      title: "phone",
      field: "phone",
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
      setData(fetchedData.reverse());
    } else {
      console.log("Error while getting data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onAdd = async (newData: Contact) => {
    try {
      if (newData.name.length > 2) {
        if (
          newData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          if (newData.message.length > 4) {
            if (newData.phone.toString().length > 5) {
              let req = await service.saveContact(newData);
              if (req.ok) {
                showToast("success", `${newData.name} was added `);
                await getData();
              }
            } else {
              showToast("error", "phone must be at least 5 characters");
            }
          } else {
            showToast("error", "Message must be at least 4 characters");
          }
        } else {
          showToast("error", 'Email must include "@"');
        }
      } else {
        showToast("error", "Name bust be longer than 2 characters");
      }
    } catch {
      showToast("error", `${newData.name} was not added`);
    }
  };

  const onUpdate = async (newData, oldData) => {
    try {
      if (newData.name.length > 2) {
        if (
          newData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          if (newData.phone.toString().length > 5) {
            if (newData.message.length > 4) {
              let req = await service.updateContact(oldData.id, newData);
              if (req.ok) {
                showToast("success", `${newData.name} was updated `);
                await getData();
              }
            } else {
              showToast("error", "Message must be at least 4 characters");
            }
          } else {
            showToast("error", "Phone must be at least 5 characters");
          }
        } else {
          showToast("error", "A proper mail must be given");
        }
      } else {
        showToast("error", "Name must be longer than 2 characters");
      }
    } catch {
      showToast("error", `${oldData.name} was not updated`);
    }
  };

  const onDelete = async (oldData: any) => {
    try {
      let req = await service.deleteContactById(oldData.id);
      if (req.ok) {
        showToast("success", `${oldData.name} was deleted`);
        await getData();
      }
    } catch {
      showToast("error", `${oldData.name} was not deleted`);
    }
  };
  return (
    <>
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
      <ToastContainer />
    </>
  );
}
