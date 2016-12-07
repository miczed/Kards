/**
 * Created by michaelziorjen on 29.11.16.
 */
'use strict';
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const styles = require('../styles.js')

class NavBar extends Component {
    renderBackButton() {
        return(
            <TouchableHighlight onPress={() => {this.props.navigator.pop();}} style={ styles.navbarButton } underlayColor={'transparent'}>
                <View><Icon name="arrow-left" size={18} color="#969696"/></View>
            </TouchableHighlight>
        )
    }
    render() {
        return (
            <View>
                <View style={styles.navbar}>
                    { this.props.backBtn ? this.renderBackButton() : this.props.leftButton ?  this.props.leftButton() : null }
                    <Text style={styles.navbarTitle}>{this.props.title}</Text>
                    { this.props.rightButton ?  this.props.rightButton() : null }
                </View>
            </View>
        );
    }
}

module.exports = NavBar;