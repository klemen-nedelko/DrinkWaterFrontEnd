import React, { useEffect, useState, useMemo  } from "react";
import Header from "./Header"
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Zoom from '@mui/material/Zoom';
import { DataGrid, GridRowsProp, GridColDef  } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';


export default function History(){

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
      const  getWater = () =>{
        const userId = localStorage.getItem('id');
        const url= "http://localhost:8000/api/amountDisplay?users_id="+userId;
        const request = new Request(url,{
                method:'GET',
                headers:{
                users_id:userId,
                
            }
      });
      return fetch(request).then(response =>{
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
          return response.json();
      }).then(function(data){
          const info = data;
          setInformation(info);
        }).catch(error =>{
          console.log(error);
      }) 
  }
    const columns = [
        { field: 'id', headerName: 'ID', width: 300 },
        {
          field: 'Amount',
          headerName: 'Amount',
          width: 600,
          editable: true,
        },
        {
          field: 'Date',
          headerName: 'Date',
          width: 600,
          editable: true,
        },
        {
          field: 'Edit',
          headerName: 'Edit',
          width: 500,
        },
      ];
      const deleteUser = e => {
        return(
            <Button style={{ backgroundColor:'blue'}}>Delete User</Button>
        );
      }
      const editAmount = () => {

      }
      const rows = useMemo(
        () => info.map((row, index) => ({ ...row, id: row.id, Amount: row.amount, Date: row.date_water_input, Edit: editAmount()})),
        [info]
      );
    useEffect(() => {
        setTimeout(function(){getWater()},2000);
        setTimeout(function(){setIsLoading(false)},2000);
        setTimeout(function(){setChecked(true)},2000);
        },[]);
    return(
        <>
        <Header/>
        <Typography variant="h3" component="h6">My history</Typography>
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