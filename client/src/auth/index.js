import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    CLOSE_MODAL: "CLOSE_MODAL",
    LOGOUT_USER: "LOGOUT_USER"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: "",
        displayError: false
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: "",
                    displayError: false
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: payload.errorMessage,
                    displayError: payload.displayError
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: payload.errorMessage,
                    displayError: payload.displayError
                })
            }
            case AuthActionType.CLOSE_MODAL: {
                return setAuth({
                    user: null,
                    loggedIn: null,
                    errorMessage: "",
                    displayError: false
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: null,
                    errorMessage: "",
                    displayError: false
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        try{
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    auth.logoutUser = async function () {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: {}
            })
            history.push("/");
        }
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user,
                        errorMessage: "",
                        loggedIn: true,
                        displayError: false
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch(err) {
            if(err.response && err.response.data) {
                let error = err.response.data.errorMessage;
                console.log(error);
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        errorMessage: error,
                        loggedIn: false,
                        user: null,
                        displayError: true
                    }
                })
            }
        }
    }

    auth.loginUser = async function(userData, store) {
        try {
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user,
                        loggedIn: true,
                        errorMessage: "",
                        displayError: false
                    }
                });
            history.push("/");
            store.loadIdNamePairs();
            }
        }
        catch(err) {
            if(err.response && err.response.data) {
                let error = err.response.data.errorMessage;
                console.log(error);
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        errorMessage: error,
                        loggedIn: false,
                        user: null,
                        displayError: true
                    }
                })
            }
        }
    }

    const handleClose = () => {
        authReducer({
            type: AuthActionType.CLOSE_MODAL,
            payload: {}
        })
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
            <Modal
            open= {auth.displayError}
            onClose = {handleClose}
            >
                <Box sx={style}>
                    <Alert severity = "error">{auth.errorMessage}</Alert>
                    <Button onClick = {handleClose}>Close</Button>
                </Box>
            </Modal>
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };