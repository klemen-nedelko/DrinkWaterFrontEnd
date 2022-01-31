import React, { useEffect, useState, useMemo  } from "react";
import Header from "./Header"
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Zoom from '@mui/material/Zoom';
import { DataGrid} from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
  table: {
    width:'70% !important',
    marginLeft: '1em',
    borderRadius: '15px',
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

});

export default function AllWrittenData(){
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
      const  getAllWritenData = () =>{
        const userId = localStorage.getItem('id');
        const url= "http://localhost:8000/api/displayAllWater";
        const request = new Request(url,{
                method:'POST',
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
        {
          field: 'firstName',
          headerName: 'First Name',
          width: 300,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last Name',
          width: 300,
          editable: true,
        },
        {
          field: 'Amount',
          headerName: 'Amount ml',
          width: 300,
          editable: true,
        },
        {
          field: 'Date',
          headerName: 'Date',
          width: 200,
          editable: true,
        },
      ];
      const rows = useMemo(
        () => info.map((row, index) => ({ ...row,id: index ,firstName: row.name, lastName: row.lastName, Amount: row.amount, Date: row.date_water_input})),
        [info]
      );
    useEffect(() => {
        setTimeout(function(){getAllWritenData()},2000);
        setTimeout(function(){setIsLoading(false)},2000);
        setTimeout(function(){setChecked(true)},2000);
        },[]);
        
    const classes = useStyles();
    return(
        <>
        <Header/>
        <Typography variant="h3" component="h6">All data written</Typography>
        {!isLoading  ?
        <div style={{ height: 900, width: '100%' }}> 
        <Zoom in={checked}>
        <DataGrid
        className={classes.table}
        rows={rows}
        columns={columns}
        disableSelectionOnClick
      /></Zoom>
        </div>: <CircularProgress color="success" style={{'color': 'blue'}} />}
        </>
    );

}