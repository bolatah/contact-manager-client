import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {formDataJSON}   from '../models/postFormData';

export default function DataTable() {
    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell> id </TableCell>
                            <TableCell> Name</TableCell>
                            <TableCell> Email</TableCell>
                            <TableCell> Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {formDataJSON.map((list, index) => (
                        <TableRow key={index}>
                            <TableCell>{list.id}</TableCell>
                            <TableCell>{list.name}</TableCell>
                            <TableCell>{list.email}</TableCell>
                            <TableCell>{list.message}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};

// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'name', headerName: 'Name', width: 130 },
//   { field: 'email', headerName: 'Email', width: 130 },
  
//   {
//     field: 'name',
//     headerName: 'Name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
// ];

// const rows = [
//   { id: 1, name: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, name: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, name: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, name: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, name: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, name: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, name: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, name: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, name: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function DataTable() {
//   return (import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'name', headerName: 'Name', width: 130 },
//   { field: 'email', headerName: 'Email', width: 130 },
  
//   {
//     field: 'name',
//     headerName: 'Name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.getValue(params.id, 'firstName') || ''} ${
//         params.getValue(params.id, 'lastName') || ''
//       }`,
//   },
// ];

// const rows = [
//   { id: 1, name: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, name: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, name: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, name: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, name: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, name: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, name: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, name: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, name: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function DataTable() {
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//       />
//     </div>
//   );
// }
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//       />
//     </div>
//   );
// }