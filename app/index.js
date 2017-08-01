/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 7/27/2017
 * Project: How to Build a React Native/Redux app using a JWT-Powered API.
 */

'use strict';

import React, {Component} from 'react';
import { View } from 'react-native';

import {Router, Scene, Reducer} from 'react-native-router-flux';

import Home from './components/home'
import Welcome from './components/auth/welcome'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Password from './components/auth/password'


//Reducer for Router - See react-native-router-flux package README for more info
const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);
    };
};

// Scene Style
/* NavigationSceneRendererProps */
const getSceneStyle = (props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null
    };

    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
    }

    return style;
};

export default class Main extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
                    <Scene key="root">
                        <Scene key="home" component={Home} title="Home" initial/>
                        <Scene key="welcome" hideNavBar={true} hideTabBar panHandlers={null}
                               schema="modal" direction="vertical" title="Login">
                            <Scene key="welcome-" component={Welcome} title="Welcome" initial={true}
                                   panHandlers={null}/>
                            <Scene key="login" component={Login} title="Login" panHandlers={null}/>
                            <Scene key="register" component={Register} title="Register"
                                   panHandlers={null}/>
                            <Scene key="password" component={Password} title="Password"
                                   panHandlers={null}/>
                        </Scene>
                    </Scene>
                </Router>
            </View>
        );
    }
}