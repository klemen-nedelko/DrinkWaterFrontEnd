import React, { useEffect, useState, useMemo  } from "react";
import Header from "./Header"
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Zoom from '@mui/material/Zoom';
import { DataGrid, GridRowsProp, GridColDef  } from '@mui/x-data-grid';
import Button from '@mui/material/Button';


export default function AllUsers(){

    const users_role = localStorage.getItem("user_role");
    const [checked, setChecked] = useState(false);
    let history = useHistory();
    const [info, setInformation] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if(users_role === null || users_role === "" || users_role === undefined || users_role === "IS_CUSTOMER"){
          history.push('/Content');
        } 
      },[]);
    function getAllUsers(){
            const request = new Request('http://localhost:8000/api/allUsers', {
                method: 'POST',
                headers:{
                  'Content-Type': 'application/x-www-form-urlencoded',
                }
              });
            return fetch(request).then(response => {
              if (response.status < 200 || response.status >= 300) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .then(function(data){
                const info = data;
                setInformation(info);
                console.log(info);
              }).catch(error =>{
                console.log(error);
            }); 
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 300,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 300,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 450,
          editable: true,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          sortable: false,
          width: 400,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ];
      const deleteUser = e => {
        return(
            <Button style={{ backgroundColor:'blue'}}>Delete User</Button>
        );
      }
      const rows = useMemo(
        () => info.map((row, index) => ({ ...row, id: row.id, firstName: row.name, lastName: row.lastName, email: row.email})),
        [info]
      );
    useEffect(() => {
        setTimeout(function(){getAllUsers()},2000);
        setTimeout(function(){setIsLoading(false)},2000);
        setTimeout(function(){setChecked(true)},2000);
        },[]);
    return(
        <>
        <Header/>
        {!isLoading  ?
        <div style={{ height: 900, width: '100%' }}> 
        <Zoom in={checked}>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      /></Zoom>
        </div>: <CircularProgress color="success" style={{'color': 'blue'}} />}
        </>
    );
}