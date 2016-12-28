/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as firebase from 'firebase';
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
    AsyncStorage,
} from 'react-native';

/** Someday I am going to finish implementing redux
 * https://medium.com/@jonlebensold/getting-started-with-react-native-redux-2b01408c0053#.feuit18oc
 */
//import {Provider} from 'react-redux';
//import {createStore, applyMiddleware, combineReduxers, compose } from 'redux';
//import createLogger from 'redux-logger';

const LoginView = require('./components/LoginView');
const CategoryView = require('./components/CategoryView');
const styles = require('./styles.js');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCZZgxh3tDa8OAFJCKCHRj_8q3JW2FW0Ho",
    authDomain: "kards-90223.firebaseapp.com",
    databaseURL: "https://kards-90223.firebaseio.com",
    storageBucket: "kards-90223.appspot.com",
    messagingSenderId: "600593412749"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class Kards extends Component {
    constructor(props){
        super(props);
        this.state = {
            component: null,
            loaded: false,
            user: null,
        };
    }
    componentWillMount(){
        /* Redirect to login page if user is not logged in */
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({component: CategoryView, user: user});
            } else {
                this.setState({component: LoginView});
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                />
                {this.state.component ? (
                        <NavigatorIOS
                            style={styles.navigator}
                            initialRoute={{
                        title: 'Kards',
                        component: this.state.component,
                        passProps: { viewTitle: 'Kards', firebaseApp: firebaseApp, user: this.state.user }
                    }}
                            shadowHidden={false}
                            navigationBarHidden={true}
                            transcluent={false}
                        />
                    ) : (
                        null
                    ) }
            </View>
        )
    }

}


AppRegistry.registerComponent('Kards', () => Kards);
