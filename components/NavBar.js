/**
 * Created by michaelziorjen on 29.11.16.
 */
'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { StyleSheet, Text, View} = ReactNative;

class NavBar extends Component {
    render() {
        return (
            <View>
                <View style={styles.navbar}>
                    <Text style={styles.navbarTitle}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}

module.exports = NavBar;