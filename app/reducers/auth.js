/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 7/27/2017
 * Project: How to Build a React Native/Redux app using a JWT-Powered API.
 */

'use strict';

var React = require('react-native');
var { AsyncStorage } = React;

import { combineReducers } from 'redux';

import { Actions } from 'react-native-router-flux';

import { LOGIN_SUCCESS, LOGGED_IN, LOGGED_OUT} from "../actions/action_types"

let userState = { loggedIn: false };

const authReducer = (state = userState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            state = Object.assign({}, state, {loggedIn: true});
            AsyncStorage.setItem('token', action.token); //save the token
            Actions.popTo('home');
            return state;

        case LOGGED_IN:
            state = Object.assign({}, state, {loggedIn: true});
            return state;

        case LOGGED_OUT:
            state = Object.assign({}, state, {loggedIn: false});
            AsyncStorage.removeItem('token'); //clear token on device
            Actions.welcome();
            return state;

        default:
            return state;
    }
};

// Combine all the reducers
const rootReducer = combineReducers({ authReducer })

export default rootReducer;