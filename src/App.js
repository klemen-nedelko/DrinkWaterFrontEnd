import React from 'react';
import './App.css';
import Login from './components/Login';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Content from './components/Content';
import ForgotPassword from './components/ForgotPassword';
import Register from './components/Register';
import MyAccount from './components/MyAccount';
import WaterInput from './components/WaterInput';
import AllUsers from './components/AllUsers';
import { ThemeProvider, createTheme} from '@mui/material/styles';


function App() {

  const THEME = createTheme({
    typography: {
     "fontFamily": `'Poppins', sans-serif`,
    }
 });
  return (
    <div className="App">
      <ThemeProvider theme={THEME}>
      <BrowserRouter>
      <Switch>
      <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/Content">
            <Content/>
          </Route>
          <Route exact path="/ForgotPassword">
            <ForgotPassword />
            </Route>
            <Route exact path="/Register">
            <Register/>
            </Route>
            <Route exact path="/MyAccount">
            <MyAccount/>
            </Route>
            <Route exact path="/WaterInput">
            <WaterInput/>
            </Route>
            <Route exact path="/AllUsers">
            <AllUsers/>
            </Route>
            </Switch>
          </BrowserRouter> 
          </ThemeProvider>
    </div>
    
  );

}

export default App;
