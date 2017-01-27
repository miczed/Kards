import React, { Component } from 'react';
import {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AlertIOS,
    NavigatorIOS,
    StatusBar,
    ActivityIndicator,
    Image,
    TextInput,
} from 'react-native';
import { observer } from 'mobx-react/native';
import {app} from '../stores';

import Button from 'react-native-button';
import firebaseApp from '../helpers/firebase';

const styles = require('../styles.js');


@observer
class LoginView extends Component {
    // Hide the navbar
    static navigatorStyle = {
        navBarHidden: true
    };
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            loaded : false,
            user: this.props.user
        };
        this.app = app;
    }

    login = () => {
        this.setState({
            loaded: false
        });
        if(this.state.email && this.state.password) {
            firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
                this.app.login(user);
            }, (error) => {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else if (errorCode === 'auth/user-not-found') {
                    alert('User not found.');
                } else {
                    alert(errorMessage);
                }
            });
        } else {
            alert("Please enter email address and password.");
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.backgroundImageContainer}>
                <Image source={require('../images/bg@2x.png')} style={styles.backgroundImage} />
                </View>
                <View style={styles.loginView}>
                    <View style={styles.loginBox}>
                        <TextInput
                            style={ styles.loginTextInput}
                            onChangeText={(text) => this.setState({email: text})}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="E-Mail"
                        />
                        <View style={styles.textInputSeparator}></View>
                        <TextInput
                            style={ styles.loginTextInput}
                            onChangeText={(text) => this.setState({password: text})}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder="Password"
                            secureTextEntry={true}
                        />
                    </View>
                    <Button
                        containerStyle={[styles.buttonContainer,styles.buttonGreenContainer]}
                        style={[styles.buttonGreenText,styles.buttonGreenText]}
                        onPress={this.login}>
                        LOGIN
                    </Button>
                </View>
            </View>
        );
    }

}

module.exports = LoginView;
