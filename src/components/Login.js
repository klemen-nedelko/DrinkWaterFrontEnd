import React, {useState, useEffect} from "react";
import { Card } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Logo from '../img/logo512.png';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { Snackbar,Slide,Alert } from '@mui/material';

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
    img:{
        height: '20px !important',
      }
  });

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }
function Login() {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let history = useHistory();
    const [hasError, setHasError] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

      function loginUser() {
        const request = new Request('http://localhost:8000/api/login', {
            method: 'POST',
            body: qs.stringify({
              email: username,
              password: password
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
        }
        ).then(function(data) {
        const token = data['Authorization'];
        localStorage.setItem('Authorization', token);
        getIdentified();
        if(token === null || token ==='' || token === 'undefined'){
          isLoggedIn = false;  
          localStorage.setItem("isLoggedIn", isLoggedIn);
        }else{
          isLoggedIn = true;
          localStorage.setItem("isLoggedIn", isLoggedIn);
          getIdentified();
        }
        if(isLoggedIn === true){
            history.push('/Content');
            getIdentified();  
          }
          else if (isLoggedIn === false || isLoggedIn === null){
          history.push('/');
          }
          })
          .catch(error => {
            console.log(error);
            setHasError(true);
            setOpen(true);
          })
          }
          useEffect(() => {
            if(isLoggedIn === null || isLoggedIn === "" || isLoggedIn === undefined){
              history.push('/');
              isLoggedIn = false;
            }else{
              isLoggedIn = true;
            }   
          },[]);
            useEffect(() => {
              if(isLoggedIn === true){
                isLoggedIn = true;
                history.push('/Content');
              }else{
                history.push('/');
                isLoggedIn = false;
              }   
            },[]);
        const  getIdentified = async () =>{
          const token = localStorage.getItem('Authorization');
          const url= "http://localhost:8000/api/authorization";
          const request = new Request(url,{
                  method:'GET',
                  headers:{
                  'Authorization':token,
              }
        });
        return fetch(request).then(response =>{
          if (response.status < 200 || response.status >= 300) {
              throw new Error(response.statusText);
            }
            return response.json();
        }).then(function(data){
        localStorage.setItem("id", data.id);
        localStorage.setItem("firstName", data.name);
        localStorage.setItem("lastName", data.lastName);
        localStorage.setItem("user_role", data.user_role);
        localStorage.setItem("email", data.email);
        //history.push('/Content');
    }).catch(error =>{
        console.log("There is an error" + error);
    }) 
}
 const handleSubmit = e => {
    e.preventDefault();
    loginUser({username,password});
    getIdentified();
    }
    const forgotPassword = e =>{
      e.preventDefault();
      history.push('/ForgotPassword');
    }
    const RegisterUser = e =>{
      e.preventDefault();
      history.push('/Register');
    }
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const classes = useStyles();
    return (
      <div className={classes.loginCard}>
          <Card className={classes.root}>
          <img src={Logo} alt="Logo" style={{
            resizeMode: "cover",
            height: "10em",
            width: 'auto'
          }}/>
          <Typography variant="h3" component="h6">Drink Water</Typography>
          <TextField  fullWidth label="fullWidth" id="fullWidth" label="Email" className={classes.input} value={username} onChange={e => onChangeUsername(e.target.value)}  required/>
          <TextField  fullWidth label="fullWidth" id="fullWidth" label="Password" type="password" className={classes.input} value={password} onChange={e => onChangePassword(e.target.value)}  required/>
            <Button className={classes.buttonForgot} onClick={forgotPassword} >Forgot Password?</Button>
            <Button className={classes.buttonForgot} onClick={RegisterUser} >Register</Button>
            <Button variant="contained"onClick={handleSubmit}  >Login</Button>        
          </Card>
          <Snackbar
              className={classes.error}
              open={open}
              onClose={handleClose}
              key={TransitionUp}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Please enter correct username and password!
            </Alert></Snackbar>
      </div>
    );
  }
  
  export default Login;