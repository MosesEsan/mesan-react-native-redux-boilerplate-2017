/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 7/27/2017
 * Project: How to Build a React Native/Redux app using a JWT-Powered API.
 */

'use strict';

var { NetInfo, Alert } = require('react-native');

import {LOGIN_SUCCESS, LOGGED_IN, LOGGED_OUT} from "./action_types";
import { NETWORK_ERROR, SERVER_ERROR, ERROR, NETWORK_MSG, SERVER_MSG} from "../config";
import api from '../api/auth';

NetInfo.isConnected.addEventListener('change', () => {});

//Register
export function register(data, callback) {
    return (dispatch) => {
        checkNetworkConnection(function () {
            api.register(data, function (success, data, error) {
                if (success) dispatch({type: LOGIN_SUCCESS, token: data.token});
                else if (error) showError(error, callback)
            });
        })
    };
}

//Login
export function login(data, callback) {
    return (dispatch) => {
        checkNetworkConnection(function () {
            api.login(data, function (success, data, error) {
                if (success) dispatch({type: LOGIN_SUCCESS, token: data.token});
                else if (error) showError(error, callback)
            });
        })
    };
}

//Logout
export function logout() {
    return (dispatch) => {
        checkNetworkConnection(function () {
            api.logout(function (success, error) {
                if (success) dispatch({type: LOGGED_OUT});
                else alert("Failed to log out. Please try again" + error);
            });
        })
    };
}

//Recover Password
export function recover(data, callback) {
    return (dispatch) => {
        checkNetworkConnection(function () {
            api.recover(data, function (success, data, error) {
                if (success) Alert.alert('Password Reset Sent', data.msg, [{text: 'Ok', style: 'cancel'}]);
                else if (error) showError(error, callback)
            });
        })
    };
}

//Set Logged in Status
export function setStatus(loggedIn) {
    return (dispatch) => {
        if (loggedIn) dispatch({type: LOGGED_IN});
        else dispatch({type: LOGGED_OUT});
    };
}

//Check Internet Connection
export function checkNetworkConnection(callback) {
    NetInfo.isConnected.fetch().then(isConnected => {
        if (isConnected) callback();
        else showError({type: NETWORK_ERROR});
    });
}

export function showError(error, callback) {
    if (error.type === ERROR) callback(error.msg)
    else {
        let type = error.type;
        let msg;

        if (type === SERVER_ERROR) msg = SERVER_MSG;
        else if (type === NETWORK_ERROR) msg = NETWORK_MSG;

        Alert.alert('Something went wrong!', msg, [{text: 'Ok', style: 'cancel'}]);
    }
}