import * as React from 'react';
import setState from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useState} from 'react';

export default function ButtonAppBar() {
    let history = useHistory();
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const firstName = localStorage.getItem('firstName');
    const logout = e =>{
        e.preventDefault();
        history.push('/');
        localStorage.removeItem("id");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("Authorization");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("user_role");
        localStorage.removeItem("email");
      }
      const myAccount = e =>{
          e.preventDefault();
          history.push('/MyAccount');
      }
      const goHome = e =>{
          e.preventDefault();
          history.push('/Content');
      }
      const waterInput = e =>{
          e.preventDefault();
          history.push('/WaterInput');
      }
      const allUsers = e =>{
          e.preventDefault();
          history.push('/AllUsers');
      }

      const userRole = localStorage.getItem("user_role");

  return (
     <Box sx={{ flexGrow: 1 }}>
     <AppBar position="static">
       <Toolbar>
         {/* <IconButton
           size="large"
           edge="start"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
         >
           <MenuIcon />
         </IconButton> */}
         <MenuItem onClick={goHome}>Home</MenuItem>
         <MenuItem onClick={waterInput}>Water Input</MenuItem>
         {userRole == 'IS_ADMIN' ? <MenuItem onClick={allUsers}>All Users</MenuItem>:<></>}
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello {firstName}
         </Typography>
         {auth && (
           <div>
             <IconButton
               size="large"
               aria-label="account of current user"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               onClick={handleMenu}
               color="inherit"
             >
               <AccountCircle />
             </IconButton>
             <Menu
               id="menu-appbar"
               anchorEl={anchorEl}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               open={Boolean(anchorEl)}
               onClose={handleClose}
             >
               <MenuItem onClick={myAccount}>My account</MenuItem>
               <MenuItem onClick={logout}>Logout</MenuItem>
             </Menu>
           </div>
         )}
       </Toolbar>
     </AppBar>
   </Box>
   
  );
}
