async function handleFormSubmit (e:any) { 
    e.preventDefault();
    const form:any = e.currentTarget;
    const url:any = form.action
    alert("The message was submitted");
  
    try {
        const formData  = new FormData(form);
        const responseData = await postFormDataAsJson ({url, formData});
        console.log(responseData );
    }catch (err) {
        console.log(err);
    }
  };

   
  // Format the data as JSON and POST it to a URL with a fetch function
async function postFormDataAsJson({url, formData}){
    const plainFormData = Object.fromEntries(formData.entries());  
    const formDataJsonString = JSON.stringify(plainFormData);
    /* module.exports.formDataJsonString=formDataJsonString; */
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: formDataJsonString,
    };
    const response = await fetch(url, fetchOptions);
  
    if (!response.ok){
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
  };




  export {handleFormSubmit};