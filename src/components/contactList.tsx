/* eslint-disable react-hooks/rules-of-hooks */

import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";


const url ="http://localhost:8000/api/contacts"


export function ContactList() {
  
  const [data, setData] =useState <any>([]);

  const columns = [
    {title: "name", field: "name"},
    {title: "email", field: "email"},
    {title: "message", field: "message"}
    ];
    
  
  const getData :any = ()  => {
      fetch(url)
      .then(resp => resp.json())
      .then(json => setData(json))
      .catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return(

<MaterialTable
    title="Contact List"
    columns={columns}
    data={data}
    options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
    editable={{
      
      onRowAdd: (newData: any) => 
      new Promise((resolve, reject) => {
        setTimeout(() => {
          fetch(url, {
            method: "POST",
            headers: {
              'Content-type': "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(newData)
          }).then(resp => resp.json())
            .then(() => {
              getData();
              resolve('ok');
            })
            .catch((error) => {
              reject(error);
            });
        }, 1000)
      }),
      
      onRowUpdate: (newData , oldData) => 
      new Promise((resolve, reject) => {
        setTimeout(() => {
         
          fetch(url + "/" + oldData.id, {
            method: "PUT",
            headers: {
              'Content-type': "application/json",
              "Accept": "application/json"
            }
          })
            .then(resp => resp.json())
            .then(() => {
              getData(); 
              resolve("ok");
            })
            .catch((error) => {
              reject(error);
            });
        }, 1000)
      }),

      onRowDelete: (oldData: any) =>
       new Promise((resolve, reject) => {
        setTimeout(() => {
          fetch(url + "/" + oldData.id, {
            method: "DELETE",
            headers: {
              'Content-type': "application/json",
              "Accept": "application/json"
            },
          }).then(resp => resp.json())
            .then(() => {
              getData();
              resolve("ok");
            }).catch((error) => {
              reject(error);
            });
        }, 1000)
      }),
    }}
  />
  )};


  // window.addEventListener('unhandledrejection', function(event) {
  //   // the event object has two special properties:
  //   alert(event.promise); // [object Promise] - the promise that generated the error
  //   alert(event.reason); // Error: Whoops! - the unhandled error object
  // });
  