/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


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


const MainPage = require('./components/MainPage');
const styles = require('./styles.js');

const YoloView = require('./components/YoloView');


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
                        component: MainPage,
                        passProps: { viewTitle: 'Kards' }
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
