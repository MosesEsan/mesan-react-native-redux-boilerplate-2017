/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 7/27/2017
 * Project: How to Build a React Native/Redux app using a JWT-Powered API.
 */

'use strict';

import React, {Component} from 'react';

import {connect} from 'react-redux';
import {register} from '../../actions/auth'; //Import your actions

import {Authentication} from './/index';

class Register extends Component {

    render() {
        return (
            <Authentication register onPress={this.register.bind(this)}/>
        );
    }

    register(data, errorCB) {
        this.props.register(data, errorCB);
    }
};


export default connect(null, {register})(Register);
