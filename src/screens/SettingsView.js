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
class SettingsView extends Component {
    static navigatorStyle = {
        navBarTextColor: '#00BC80', // change the text color of the title (remembered across pushes)
        navBarButtonColor: '#D8D8D8', // change the button colors of the nav bar (eg. the back button) (remembered across pushes)
    };
    constructor(props) {
        super(props);
        this.app = app;
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Ola Chicas!</Text>
                <Button onPress={this.app.logout}>Logout</Button>
            </View>
        );
    }

}

module.exports = SettingsView;
