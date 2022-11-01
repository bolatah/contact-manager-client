import useAxiosPrivate from "api/axiosPrivate";
import MaterialTable, {
  Column,
  EditComponentProps,
} from "@material-table/core";
import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { IContact, IContactFormData } from "../interfaces/contact";
import { showToast } from "../repository/utils";

export const ContactList = () => {
  const url = `${process.env.REACT_APP_URL}/contacts`;
  const axiosInstance = useAxiosPrivate();
  const [data, setData] = useState<IContact[]>([]);
  //const [_file, setFile] = useState<React.ReactNode>();

  const columns: Array<Column<any>> = [
    {
      title: "file",
      field: "file",

      editComponent: (rowData: EditComponentProps<IContact>) => (
        <div>
          <img alt="" id="input-img" width="45" />
          <input
            type="file"
            id="File"
            name="file"
            accept="image/*"
            onChange={(event: any) => {
              try {
                let inputTag = document.getElementById(
                  "File"
                ) as HTMLInputElement;
                const file = event.target.files[0];
                let imgTag = document.getElementById(
                  "input-img"
                ) as HTMLImageElement;

                const reader = new FileReader();
                reader.onloadend = () => {
                  imgTag.src = `${reader.result}`;
                  rowData.rowData.file = imgTag.src;
                  //inputTag.setAttribute("value", imgTag.src);
                  // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
                };
                reader.readAsDataURL(file);

                console.log(imgTag, inputTag, rowData.rowData.file);
              } catch (err) {
                console.log(err);
              }
            }}
          />
        </div>
      ),
      render: (rowData: IContact) => (
        <img
          src={
            rowData.file.startsWith("data:image/")
              ? `${rowData.file}`
              : `data:image/jpg;base64,${rowData.file}`
          }
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

  const getData = useCallback(async () => {
    let fetchedDataReq = await axiosInstance.get(url);
    if (fetchedDataReq) {
      let fetchedData = await fetchedDataReq["data"];
      setData(fetchedData.reverse());
    } else {
      console.log("Error while getting data");
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onAdd = async (newData: IContactFormData) => {
    try {
      if (newData.name.length > 2) {
        if (
          newData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          if (newData.message.length > 4) {
            if (newData.phone.toString().length > 5) {
              let resp = await axiosInstance.post(url, newData);

              if (resp) {
                showToast("success", `${newData.name} was added `);
                return await getData();
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

  const onUpdate = async (newData: IContact, oldData: any) => {
    try {
      if (newData.name.length > 2) {
        if (
          newData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          if (newData.phone.toString().length > 5) {
            if (newData.message.length > 4) {
              let resp = await axiosInstance.put(
                url + "/" + oldData._id,
                newData as IContact
              );
              if (resp) {
                await getData();
                showToast("success", `${newData.name} was updated `);
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

  const onDelete = async (contact: IContact) => {
    try {
      let resp = await axiosInstance.delete(url + "/" + contact._id);

      if (resp) {
        showToast("success", `${contact.name} was deleted`);
        await getData();
      }
    } catch {
      showToast("error", `${contact.name} was not deleted`);
    }
  };

  return (
    <div>
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
    </div>
  );
};
