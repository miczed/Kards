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
                    { this.props.leftButton ?  this.props.leftButton() : null }
                    <Text style={styles.navbarTitle}>{this.props.title}</Text>
                    { this.props.rightButton ?  this.props.rightButton() : null }
                </View>
            </View>
        );
    }
}

module.exports = NavBar;