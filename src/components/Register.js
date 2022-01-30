import { Typography } from "@mui/material";
import React, {useState}from "react";
import { Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useHistory } from "react-router-dom";
import qs from 'qs';
import { Snackbar,Slide,Alert } from '@mui/material';


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
          width: '25em',
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
function Register()
{
    function RegisterUser(){
        const request = new Request('http://localhost:8000/api/register', {
            method: 'POST',
            body: qs.stringify({
              email: email,
              password: password,
              name:name,
              lastName:lastName,
            }),
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          });
        return fetch(request).then(response => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
          return response.json();
        });
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setOpen(true);
        } else {
        RegisterUser({email,password,name,lastName,});
        setOpenSuccess(true);
        setTimeout(function(){history.push('/')},2000);
        }
    }
    let history = useHistory();
    
    const [hasError, setHasError] = useState(false);
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");
    const [name, onChangeName] = useState("");
    const [lastName, onChangelastName] = useState("");
    const [confirmPassword, onChangeConfirmPassword] = useState("");
    const classes = useStyles();
    return (
      <div className={classes.loginCard}>
          <Card className={classes.root}>
          <Typography variant="h3" component="h6">Register</Typography>
          <TextField  fullWidth label="fullWidth" id="fullWidth" label="FirstName" className={classes.input} value={name} onChange={e => onChangeName(e.target.value)}  required/>
          <TextField  fullWidth label="fullWidth" id="fullWidth" label="LastName"  className={classes.input} value={lastName} onChange={e => onChangelastName(e.target.value)}  required/>
          <TextField  fullWidth label="fullWidth" id="fullWidth" label="Email" className={classes.input} value={email} onChange={e => onChangeEmail(e.target.value)}  required/>
          <TextField  fullWidth label="fullWidth" id="fullWidth" label="Password" type="password" className={classes.input} value={password} onChange={e => onChangePassword(e.target.value)}  required/>
          <TextField  fullWidth label="fullWidth" id="fullWidth" label="ConfirmPassword" type="password" className={classes.input} value={confirmPassword} onChange={e => onChangeConfirmPassword(e.target.value)}  required/>
            <Button variant="contained"onClick={handleSubmit}>Register</Button>        
          </Card>
          <Snackbar
              className={classes.error}
              open={open}
              onClose={handleClose}
              key={TransitionUp}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Please enter correct password!
            </Alert></Snackbar>
            <Snackbar
              className={classes.error}
              open={openSuccess}
              onClose={handleClose}
              key={TransitionUp}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Register successfully!
            </Alert></Snackbar>
      </div>
    );
}

export default Register;