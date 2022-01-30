import qs from 'qs';
import { Snackbar,Slide,Alert } from '@mui/material';
import React, {useState, useEffect} from "react";
import { Card } from '@mui/material';
import Logo from '../img/logo512.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

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
    }
  });

function ForgotPassword()
{
    
    let history = useHistory();
    const  resetPassword = async () =>{
        const url= "http://localhost:8000/api/forgotPassword";
        const request = new Request(url,{
                method:'POST',
                body: qs.stringify({
                  username: email,
                }),
                headers:{
                  'Content-Type': 'application/x-www-form-urlencoded',
                }
      });
      return fetch(request).then(response =>{
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
          setOpen(true);
          setTimeout(function(){history.push('/')},3000);
          return response.json();
      }).catch(error =>{
        console.log("There is an error" + error);
    });
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
      function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
      }
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [email, onChangeEmail] = useState("");
    return(
        <div className={classes.loginCard}>
       <Card className={classes.root}>
       <img src={Logo} alt="Logo" style={{
            resizeMode: "cover",
            height: "10em",
            width: 'auto'
          }}/>
           <Typography>Enter email to reset password!</Typography>
          <TextField  fullWidth label="fullWidth" id="fullWidth" label="Email" className={classes.input} value={email} onChange={e => onChangeEmail(e.target.value)}  required/>
            <Button variant="contained"onClick={resetPassword}>Reset Password</Button>        
          </Card>
          <Snackbar
              className={classes.error}
              open={open}
              onClose={handleClose}
              key={TransitionUp}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Email send
            </Alert></Snackbar>
        </div>
    );
}

export default ForgotPassword;