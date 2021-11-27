import * as React from 'react';
import {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import DataTable from './routes/getContacts'

ReactDOM.render(
<StyledEngineProvider injectFirst>

<Router>
  <Fragment>
    <Routes>
      <Route path="/" element ={<App/>}> </Route> 
      <Route path="/DataTable" element={<DataTable/>} /> 
      <Route path="*" element={<Navigate to ="/" />}/>
    </Routes>
  </Fragment>
</Router>  

</StyledEngineProvider>
,
  document.querySelector("#root")
);

