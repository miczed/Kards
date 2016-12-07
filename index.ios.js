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
} from 'react-native';


const CategoryView = require('./components/CategoryView');
const styles = require('./styles.js');

const YoloView = require('./components/LearnView');

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

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                />
                <NavigatorIOS
                    style={styles.navigator}
                    initialRoute={{
                        title: 'Kards',
                        component: CategoryView,
                        passProps: { viewTitle: 'Kards', firebaseApp: firebaseApp }
                    }}
                    shadowHidden={false}
                    navigationBarHidden={true}
                    transcluent={false}
                />

            </View>
        )
    }

}


AppRegistry.registerComponent('Kards', () => Kards);
