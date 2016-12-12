/**
 * Created by michaelziorjen on 30.11.16.
 */
/* Gratefully copied from https://github.com/brentvatne/react-native-animated-demo-tinder */
'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Animated,
    PanResponder,
    Image,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import clamp from 'clamp';
import Emoji from 'react-native-emoji';
import Button from 'react-native-button';
const styles = require('../styles.js');
import AnimatedIcon from '../components/AnimatedIcon';
import Defaults from './Defaults.js';

var SWIPE_THRESHOLD = 120;





class SwipeCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
            enter: new Animated.Value(0.5),
            card: this.props.cards ? this.props.cards[0] : null,
            cardsKnown: [],
            cardsNotKnown: [],
            uid: this.props.uid,
        }
    }

    _goToNextCard() {

        let currentCardIdx = this.props.cards.indexOf(this.state.card);
        let newIdx = currentCardIdx + 1;

        // Checks to see if last card.
        // If props.loop=true, will start again from the first card.
        let card = newIdx > this.props.cards.length - 1
            ? this.props.loop ? this.props.cards[0] : null
            : this.props.cards[newIdx];

            if(newIdx > this.props.cards.length - 1) {
                if(this.props.loop) {
                    card = this.props.cards[0];
                } else {
                    card = null;
                }
            } else {
                card = this.props.cards[newIdx];
            }
        this.setState({
            card: card
        });
    }
    reloadAllCards = () => {
        this.setState({
            card: this.props.cards[0],
            cardsKnown: [],
            cardsNotKnown: [],
        })
    }
    reloadNotKnownCards= () => {
        this.setState({
            cardsKnown: [],
            cardsNotKnown: [],
        });
        this.props.resetCards(this.state.cardsNotKnown);
    }
    handleFavorite = (card) =>  {
        this.state.card.favorite = !this.state.card.favorite;
        this.props.handleFavorite(this.state.card)
    }
    componentDidMount() {
        this._animateEntrance();
    }

    _animateEntrance() {
        Animated.spring(
            this.state.enter,
            { toValue: 1, friction: 8 }
        ).start();
    }
    componentWillReceiveProps(nextProps){
        // if parent component set a new uid then cards are overwritten
        if(this.state.uid != nextProps.uid) {
            if (nextProps.cards && nextProps.cards.length > 0) {
                this.setState({
                    card: nextProps.cards[0],
                    uid: nextProps.uid,
                })
            }
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return gestureState.dx != 0 && gestureState.dy != 0;
            },

            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
                this.state.pan.setValue({x: 0, y: 0});
            },

            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: 0}, // modified was: this.state.pan.y
            ]),

            onPanResponderRelease: (e, {vx, vy}) => {
                this.state.pan.flattenOffset();
                var velocity;

                if (vx >= 0) {
                    velocity = clamp(vx, 3, 5);
                } else if (vx < 0) {
                    velocity = clamp(vx * -1, 3, 5) * -1;
                }

                if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {

                    if(this.state.pan.x._value > 0) {
                        this.props.handleYup(this.state.card);
                        this.state.cardsKnown.push(this.state.card);
                    } else {
                        this.props.handleNope(this.state.card);
                        this.state.cardsNotKnown.push(this.state.card);
                    }

                    this.props.cardRemoved
                        ? this.props.cardRemoved(this.props.cards.indexOf(this.state.card))
                        : null

                    Animated.decay(this.state.pan, {
                        velocity: {x: velocity, y: 0},
                        deceleration: 0.98
                    }).start(this._resetState.bind(this))
                } else {
                    Animated.spring(this.state.pan, {
                        toValue: {x: 0, y: 0},
                        friction: 4
                    }).start()
                }
            }
        })
    }

    _resetState() {
        this.state.pan.setValue({x: 0, y: 0});
        this.state.enter.setValue(0);
        this._goToNextCard();
        this._animateEntrance();
    }

    renderNoMoreCards() {
        if (this.props.renderNoMoreCards)
            return this.props.renderNoMoreCards();

        return (
            <View style={styles.noMoreCards}>
                <Text style={styles.noMoreCardsEmoji}><Emoji name="trophy"/></Text>
                <Text style={styles.noMoreCardsText}>
                    Du hast
                    <Text style={styles.textBold}>
                        {
                           " " + (this.state.cardsKnown.length + this.state.cardsNotKnown.length)
                        } { ((this.state.cardsKnown.length + this.state.cardsNotKnown.length) > 1) ? 'Karten' : 'Karte' } </Text>
                    angesehen. Davon hast du
                    <Text style={[styles.textGreen, styles.textBold]}> { this.state.cardsKnown.length } gewusst </Text>
                    und <Text style={[styles.textRed, styles.textBold]}>{this.state.cardsNotKnown.length} nicht gewusst</Text>.
                </Text>
                <View style={styles.textDivider}></View>
                <Text style={styles.noMoreCardsText}>Welche Karten möchtest du erneut abfragen?</Text>
                <Button
                    containerStyle={styles.buttonContainer}
                    style={styles.buttonText}
                    onPress={this.reloadAllCards}>
                    ALLE
                </Button>
                {
                    this.state.cardsNotKnown.length > 0 ?
                        <Button
                            containerStyle={styles.buttonContainer}
                            style={styles.buttonText}
                            onPress={this.reloadNotKnownCards}>
                            NICHT GEKONNTE
                        </Button>
                    : null
                }
                <Button
                    containerStyle={styles.buttonContainer}
                    style={styles.buttonText}
                    onPress={this.props.closeView}>
                    SCHLIESSEN
                </Button>

            </View>
        )
    }

    renderCard(cardData) {
        return this.props.renderCard(cardData)
    }
    render() {
        let { pan, enter, } = this.state;

        let [translateX, translateY] = [pan.x, pan.y];

        let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
        let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]});
        let scale = enter;

        let animatedCardstyles = {transform: [{translateX}, {translateY}, {scale}], opacity};

        let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
        let yupTranslateY = pan.x.interpolate({inputRange: [0,150],outputRange: [0, -50], extrapolate: 'clamp'});

        let animatedYupStyles = {transform: [{translateY: yupTranslateY}], opacity: yupOpacity}

        let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
        let nopeTranslateY = pan.x.interpolate({inputRange: [-150,0],outputRange: [-50, 0], extrapolate: 'clamp'});
        let animatedNopeStyles = {transform: [{translateY: nopeTranslateY}], opacity: nopeOpacity}

        return (
            <View style={[this.props.containerStyle, styles.cardsView]}>
                { this.state.card
                    ? (
                    <Animated.View style={[this.props.cardStyle, animatedCardstyles]} {...this._panResponder.panHandlers}>
                        {this.renderCard(this.state.card)}
                    </Animated.View>

                )
                    : this.renderNoMoreCards() }

                {
                    this.state.card ? (
                        <View style={styles.meta}>
                            <Text style={styles.metaText}>{ this.props.cards.indexOf(this.state.card) + 1} von { this.props.cards.length } in {this.props.categoryName }</Text>
                             <AnimatedIcon pressHandler={this.handleFavorite} size={22} colorOn="#FFE42C" colorOff="#969696" active={this.state.card.favorite} style={styles.metaButton}></AnimatedIcon>
                        </View>
                    ) : null
                }

                { this.props.renderNope
                    ? this.props.renderNope(pan)
                    : (
                    this.props.showNope
                        ? (
                        <Animated.View style={[this.props.nopeStyle, animatedNopeStyles]}>
                            {this.props.noView
                                ? this.props.noView
                                : <Text style={this.props.nopeTextStyle}>{this.props.noText ? this.props.noText : "Nope!"}</Text>
                            }
                        </Animated.View>
                    )
                        : null
                )
                }

                { this.props.renderYup
                    ? this.props.renderYup(pan)
                    : (
                    this.props.showYup
                        ? (
                        <Animated.View style={[this.props.yupStyle, animatedYupStyles]}>
                            {this.props.yupView
                                ? this.props.yupView
                                : <Text style={this.props.yupTextStyle}>{this.props.yupText? this.props.yupText : "Yup!"}</Text>
                            }
                        </Animated.View>
                    )
                        : null
                )
                }

            </View>
        );
    }
}

SwipeCards.propTypes = {
    cards: React.PropTypes.array,
    renderCards: React.PropTypes.func,
    loop: React.PropTypes.bool,
    renderNoMoreCards: React.PropTypes.func,
    showYup: React.PropTypes.bool,
    showNope: React.PropTypes.bool,
    handleYup: React.PropTypes.func,
    handleNope: React.PropTypes.func,
    yupView: React.PropTypes.element,
    yupText: React.PropTypes.string,
    noView: React.PropTypes.element,
    noText: React.PropTypes.string,
    containerStyle: View.propTypes.style,
    cardStyle: View.propTypes.style,
    yupStyle: View.propTypes.style,
    yupTextStyle: Text.propTypes.style,
    nopeStyle: View.propTypes.style,
    nopeTextStyle: Text.propTypes.style,
};

SwipeCards.defaultProps = {
    loop: false,
    showYup: true,
    showNope: true,
    containerStyle: styles.container,
    yupStyle: styles.yup,
    yupTextStyle: styles.yupText,
    nopeStyle: styles.nope,
    nopeTextStyle: styles.nopeText
};

module.exports = SwipeCards;
