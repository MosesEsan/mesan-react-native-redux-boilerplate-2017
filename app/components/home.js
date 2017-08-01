/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 7/27/2017
 * Project: How to Build a React Native/Redux app using a JWT-Powered API.
 */

'use strict';

import React, {Component} from 'react';
var { View, Text, AsyncStorage } = require('react-native');

import {connect} from 'react-redux';

import {Actions} from 'react-native-router-flux';

import {setStatus, logout} from '../actions/auth'; //Import your actions

import {Button} from './index'; //Import your Button

import styles from '../styles/index' //Import your styles

class Home extends Component {

    componentDidMount() {
        var _this = this;

        //Check if token exist
        AsyncStorage.getItem('token', (err, token) => {
            if (token === null) Actions.welcome();
            else _this.props.setStatus(true)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    (this.props.loggedIn) &&
                    <View>
                        <Text style={[styles.welcomeText]}>Welcome to Quotes</Text>
                        <Text style={[styles.subText]}>You are logged in.</Text>
                        <Button btnText="Logout" onPress={this.props.logout}/>
                    </View>
                }
            </View>
        );
    }
};


function mapStateToProps(state, props) {
    return {
        loggedIn: state.authReducer.loggedIn
    }
}

export default connect(mapStateToProps, {setStatus, logout})(Home);
