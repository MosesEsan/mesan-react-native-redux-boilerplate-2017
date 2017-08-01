/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 7/27/2017
 * Project: How to Build a React Native/Redux app using a JWT-Powered API.
 */

'use strict';

import React, {Component} from 'react';
var { View, Text } = require('react-native');

import {Actions} from 'react-native-router-flux';

import { Button, NavBar, AuthTextInput } from '../index';

import styles from '../../styles/auth'

export class Authentication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            error: {username:"", email:"", password: "", general:""},

        };
    }

    render() {

        var title = "Register";
        if (this.props.login) title = "Login";
        else if (this.props.recover) title = "Recover Password";

        return (
            <View style={styles.wrapper}>
                <NavBar/>

                <View style={styles.container}>
                    <Text style={[styles.headerText]}>{title}</Text>
                    <Text style={[styles.errorText]}>{this.state.error['general']}</Text>

                    {//if the container type is Register, show the
                        // username input
                        (this.props.register) &&
                        <AuthTextInput
                            onChangeText={(text) => this.setState({username: text})}
                            placeholder={"Username"}
                            autoFocus={false}
                            value={this.state.username}
                            error={this.state.error['username']}
                            secureTextEntry={false}
                        />
                    }

                    <AuthTextInput
                        onChangeText={(text) => this.setState({email: text})}
                        placeholder={"Email Address"}
                        autoFocus={true}
                        value={this.state.email}
                        error={this.state.error['email']}
                        secureTextEntry={false}
                    />

                    {//if the container type is not Recover Password, show the password input
                        (!this.props.recover) &&
                        <AuthTextInput
                            onChangeText={(text) => this.setState({password: text})}
                            placeholder={"Password"}
                            autoFocus={false}
                            value={this.state.password}
                            error={this.state.error['password']}
                            secureTextEntry={true}
                        />
                    }


                    {//if the container type is Login, show the
                        // username input
                        (this.props.login) &&
                        <Text style={[styles.forgotText]} onPress={Actions.password}>{"Forgot Password"}</Text>
                    }

                    <Button onPress={this.submit.bind(this)}
                            btnText={(this.props.recover) ? "Submit" : title}/>

                </View>
            </View>
        );
    }

    submit() {
        var state = this.state;
        var error = state.error;
        var errCount = 0;

        if (state.email.length <= 0) errCount++; //check email first
        error["email"] = (state.email.length <= 0) ? "Your email is required!" : "";

        if (!this.props.recover) {
            if (state.password.length <= 0) errCount++; //if login or register, check password
            error["password"] = (state.password.length < 6) ? "Password should be Min 6 characters" : "";

            if (this.props.register) {//if register, check username
                if (state.username.length <= 0) errCount++;
                error["username"] = (state.username.length <= 0) ? "Your username is required" : "";
            }
        }

        this.setState({error: error});

        if (errCount <= 0) {
            var data = {
                username: state.username,
                email:state.email,
                password: state.password,
            }

            this.props.onPress(data, this.errorCB.bind(this));
        }
    }

    errorCB(err) {
        var error = this.state.error;

        if (err.username) error["username"] = err.username;
        else if (err.email) error["email"] = err.email;
        else error["general"] = err;

        this.setState({error: error});
    }
};