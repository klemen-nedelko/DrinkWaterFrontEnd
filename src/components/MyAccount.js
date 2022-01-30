import React from "react";
import Header from "./Header";
import List from '@mui/material/List';

export default function MyAccount(){
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const email = localStorage.getItem('email');

    return (
        <>
        <Header/>
        <List>
        First Name: {firstName}
        </List>
        <List>
        Last Name: {lastName}
        </List>
        <List>
        Email: {email}
        </List>

        </>
    );
}