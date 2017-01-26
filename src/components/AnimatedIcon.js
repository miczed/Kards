/**
 * Created by michaelziorjen on 11/12/16.
 */
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const constants = styles.constants;
const { StyleSheet, Text, View, Animated,TouchableHighlight} = ReactNative;
import Icon from 'react-native-vector-icons/FontAwesome';
class AnimatedIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0), // init opacity 0
            active: this.props.active ? this.props.active : false,
        };
        this.onPress = this.onPress.bind(this)
    }
    componentDidMount() {
        Animated.spring(          // Uses easing functions
            this.state.fadeAnim,    // The value to drive
            {toValue: 1}            // Configuration
        ).start();                // Don't forget start!
    }
    componentDidUpdate() {
        Animated.spring(          // Uses easing functions
            this.state.fadeAnim,    // The value to drive
            {toValue: 1}            // Configuration
        ).start();
    }
    onPress() {
        this.setState({
            active: !this.state.active,
        });
        this.state.fadeAnim.setValue(0);
        this.props.pressHandler();
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            active: nextProps.active,
        });
        this.state.fadeAnim.setValue(0);
    }
    render() {
        return (
        <TouchableHighlight onPress={this.onPress} style={this.props.style} underlayColor={'transparent'}>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                { this.state.active ? (
                <Animated.View          // Special animatable View
                    style={{transform: [{scale: this.state.fadeAnim}]} }>
                    {this.props.children}
                    <Icon name="star" size={this.props.size} color={this.props.colorOn}/>
                </Animated.View>
                ) : (
                <Animated.View          // Special animatable View
                    style={{transform: [{scale: this.state.fadeAnim}]} }>
                    {this.props.children}
                    <Icon name="star-o" size={this.props.size} color={this.props.colorOff}/>
                </Animated.View>
                )}
            </View>
        </TouchableHighlight>
        );
    }
}

module.exports = AnimatedIcon;