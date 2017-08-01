/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 7/27/2017
 * Project: How to Build a React Native/Redux app using a JWT-Powered API.
 */

'use strict';

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {login} from '../../actions/auth'; //Import your actions

import {Authentication} from './index';

class Login extends Component {
    render() {
        return (
            <Authentication login onPress={this.login.bind(this)}/>
        );
    }

    login(data, errorCB) {
        this.props.login(data, errorCB);
    }
};

export default connect(null, {login})(Login);