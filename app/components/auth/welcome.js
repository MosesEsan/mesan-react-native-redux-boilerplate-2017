/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 7/27/2017
 * Project: How to Build a React Native/Redux app using a JWT-Powered API.
 */

'use strict';

import React, {Component} from 'react';
var { View, Text } = require('react-native');

import {Actions} from 'react-native-router-flux';

import {Button} from '../index';

import styles from '../../styles/index'


export default class Welcome extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={[styles.welcomeText]}>Welcome to Quotes</Text>
                    <Text style={[styles.subText]}>This app will let you create an account, login, view, add, update and delete quotes.</Text>
                    <Button onPress={Actions.login} btnText={"Login"}/>
                    <Button onPress={Actions.register} btnText={"Register"} bordered/>
                </View>
            </View>
        );
    }
};
