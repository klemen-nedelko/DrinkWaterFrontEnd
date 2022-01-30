import React, {useState, useEffect} from "react";
import Header from "./Header";
import { Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import qs from 'qs';
import { Snackbar,Slide,Alert } from '@mui/material';
import { Typography } from "@mui/material";

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

const useStyles = makeStyles({
    root: {
        marginTop: '10em',
      },
      loginCard:{
          marginLeft:'auto !important',
          marginRight:'auto !important',
          width: '40em',
      },
      input:{
          display: 'block !important',
          marginTop:'1em! important',
          marginBottom:'1em! important',
          paddingRight:'5px !important',
      },
      buttonForgot:{
          display: 'block !important',
          marginTop:'1em!important',
          marginBottom:'1em!important',
          padding: '1em !important',
      },
});


export default function WaterInput(){
    const users_id = localStorage.getItem("id");
    const [amount, onChangeAmount] = useState("");
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [checked, setChecked] = useState(false);
    const classes = useStyles();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    function WaterAmount(){
        const request = new Request('http://localhost:8000/api/amountWrite', {
            method: 'POST',
            body: qs.stringify({
              amount: amount,
              users_id:users_id,
            }),
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          });
        return fetch(request).then(response => {
          if (response.status < 200 || response.status >= 300) {
            setOpen(true);
            throw new Error(response.statusText);
            
          }else {
              setOpenSuccess(true);
          return response.json();
        }
        });
    }
    useEffect(() => {
      setTimeout(function(){setChecked(true)},500);
      },[]);
    const handleSubmit = e => {
        e.preventDefault();
        WaterAmount(amount, users_id);
        setOpenSuccess(true);
        }
    return(
        <>
        <Header/>
        <Slide in={checked}  direction="up">
        <div className={classes.loginCard}>
          <Card className={classes.root}>
          <Typography variant="h3" component="h6">Input Water amount</Typography>
          <TextField  fullWidth label="fullWidth" type='number' id="fullWidth" label="Amount(ml)" className={classes.input} value={amount} onChange={e => onChangeAmount(e.target.value)}  required/>
           <Button variant="contained"onClick={handleSubmit}>Write Amount</Button>        
          </Card>
          <Snackbar
              className={classes.error}
              open={open}
              onClose={handleClose}
              key={TransitionUp}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              There was and error
            </Alert></Snackbar>
            <Snackbar
              className={classes.error}
              open={openSuccess}
              onClose={handleClose}
              key={TransitionUp}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Successfully added amount!
            </Alert></Snackbar>
      </div>
      </Slide>
        </>
    );
}