import {  createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import axios from "axios";





const initialState = {
    value: false,
    auth:""
};
export const loggedSlice = createSlice({
    name: "logged",
    initialState,
    reducers: {
        loginslice: (state) => {
            state.auth = localStorage.getItem("auth")
            state.value = true;
            
        },
        logoutslice: (state) => {
            state.auth = localStorage.setItem("auth","")
            state.value = false;
        }
    }
});
 
export const { loginslice, logoutslice} = loggedSlice.actions;
export const selectLog = (state) => state.logged.value;
export const selectAuth = (state) => state.logged.auth;
export default loggedSlice.reducer;
