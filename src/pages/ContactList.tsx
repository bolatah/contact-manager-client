import MaterialTable from "material-table";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { IContact } from "../interfaces/contact";
import contactService from "../services/contactService";
import { showToast } from "../repository/utils";

export function ContactList() {
  const [data, setData] = useState<IContact[]>([]);
  const columns = [
    {
      title: "photo",
      field: "photo",
      render: (rowData) => (
        <img
          src={`data:image/jpeg;base64,${rowData.img}`}
          width="45"
          alt="contact"
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

  const getData: any = useCallback(async () => {
    let fetchedDataReq = await contactService.GetContactList();
    if (fetchedDataReq) {
      const fetchedData = await fetchedDataReq["data"];
      setData(fetchedData.reverse());
    } else {
      console.log("Error while getting data");
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // const onAdd = async (newData: IContact) => {
  //   try {
  //     if (newData.name.length > 2) {
  //       if (
  //         newData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
  //       ) {
  //         if (newData.message.length > 4) {
  //           if (newData.phone.toString().length > 5) {
  //             let resp = await contactService.saveContact(newData);
  //             if (resp) {
  //               showToast("success", `${newData.name} was added `);
  //               await getData();
  //             }
  //           } else {
  //             showToast("error", "phone must be at least 5 characters");
  //           }
  //         } else {
  //           showToast("error", "Message must be at least 4 characters");
  //         }
  //       } else {
  //         showToast("error", 'Email must include "@"');
  //       }
  //     } else {
  //       showToast("error", "Name bust be longer than 2 characters");
  //     }
  //   } catch {
  //     showToast("error", `${newData.name} was not added`);
  //   }
  // };

  const onUpdate = async (newData, oldData) => {
    try {
      if (newData.name.length > 2) {
        if (
          newData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          if (newData.phone.toString().length > 5) {
            if (newData.message.length > 4) {
              let resp = await contactService.UpdateContact(
                oldData.id,
                newData
              );
              if (resp) {
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
      let resp = await contactService.DeleteContactById(oldData.id);
      if (resp) {
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
          // onRowAdd: onAdd,
          onRowUpdate: onUpdate,
          onRowDelete: onDelete,
        }}
      />
      <ToastContainer />
    </>
  );
}
