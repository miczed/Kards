import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    ListView,
    WebView,
    ActivityIndicator,
} from 'react-native';
const styles = require('../styles.js');
const SwipeCards = require('../components/SwipeCards.js');
const NavBar = require('../components/NavBar');

const cardCSS = "<style>body,html { color: #2D2D2D; margin: 10px; padding: 0; font-family: 'Merriweather'; font-size: 16px; line-height: 1.5rem;}p,ol,ul,pre,blockquote,h1,h2,h3,h4,h5,h6{margin:0;padding:0;counter-reset:list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9}ol,ul{padding-left:0}ol > li,ul > li{list-style-type:none}ul > li::before{content:'\\25CF'}li::before{display:inline-block;margin-right:.3em;text-align:right;white-space:nowrap;width:1.2em}li:not(.ql-direction-rtl)::before{margin-left:-1.5em}ol li,ul li{padding-left:0.9em}ol li{counter-reset:list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;counter-increment:list-num}ol li:before{content:counter(list-num, decimal) '. '}ol li.ql-indent-1{counter-increment:list-1}ol li.ql-indent-1:before{content:counter(list-1, lower-alpha) '. '}ol li.ql-indent-1{counter-reset:list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9}ol li.ql-indent-2{counter-increment:list-2}ol li.ql-indent-2:before{content:counter(list-2, lower-roman) '. '}ol li.ql-indent-2{counter-reset:list-3 list-4 list-5 list-6 list-7 list-8 list-9}ol li.ql-indent-3{counter-increment:list-3}ol li.ql-indent-3:before{content:counter(list-3, decimal) '. '}ol li.ql-indent-3{counter-reset:list-4 list-5 list-6 list-7 list-8 list-9}ol li.ql-indent-4{counter-increment:list-4}ol li.ql-indent-4:before{content:counter(list-4, lower-alpha) '. '}ol li.ql-indent-4{counter-reset:list-5 list-6 list-7 list-8 list-9}ol li.ql-indent-5{counter-increment:list-5}ol li.ql-indent-5:before{content:counter(list-5, lower-roman) '. '}ol li.ql-indent-5{counter-reset:list-6 list-7 list-8 list-9}ol li.ql-indent-6{counter-increment:list-6}ol li.ql-indent-6:before{content:counter(list-6, decimal) '. '}ol li.ql-indent-6{counter-reset:list-7 list-8 list-9}ol li.ql-indent-7{counter-increment:list-7}ol li.ql-indent-7:before{content:counter(list-7, lower-alpha) '. '}ol li.ql-indent-7{counter-reset:list-8 list-9}ol li.ql-indent-8{counter-increment:list-8}ol li.ql-indent-8:before{content:counter(list-8, lower-roman) '. '}ol li.ql-indent-8{counter-reset:list-9}ol li.ql-indent-9{counter-increment:list-9}ol li.ql-indent-9:before{content:counter(list-9, decimal) '. '}.ql-indent-1:not(.ql-direction-rtl){padding-left:3em}li.ql-indent-1:not(.ql-direction-rtl){padding-left:4.5em}.ql-indent-1.ql-direction-rtl.ql-align-right{padding-right:3em}li.ql-indent-1.ql-direction-rtl.ql-align-right{padding-right:4.5em}.ql-indent-2:not(.ql-direction-rtl){padding-left:6em}li.ql-indent-2:not(.ql-direction-rtl){padding-left:7.5em}.ql-indent-2.ql-direction-rtl.ql-align-right{padding-right:6em}li.ql-indent-2.ql-direction-rtl.ql-align-right{padding-right:7.5em}.ql-indent-3:not(.ql-direction-rtl){padding-left:9em}li.ql-indent-3:not(.ql-direction-rtl){padding-left:10.5em}.ql-indent-3.ql-direction-rtl.ql-align-right{padding-right:9em}li.ql-indent-3.ql-direction-rtl.ql-align-right{padding-right:10.5em}.ql-indent-4:not(.ql-direction-rtl){padding-left:12em}li.ql-indent-4:not(.ql-direction-rtl){padding-left:13.5em}.ql-indent-4.ql-direction-rtl.ql-align-right{padding-right:12em}li.ql-indent-4.ql-direction-rtl.ql-align-right{padding-right:13.5em}.ql-indent-5:not(.ql-direction-rtl){padding-left:15em}li.ql-indent-5:not(.ql-direction-rtl){padding-left:16.5em}.ql-indent-5.ql-direction-rtl.ql-align-right{padding-right:15em}li.ql-indent-5.ql-direction-rtl.ql-align-right{padding-right:16.5em}.ql-indent-6:not(.ql-direction-rtl){padding-left:18em}li.ql-indent-6:not(.ql-direction-rtl){padding-left:19.5em}.ql-indent-6.ql-direction-rtl.ql-align-right{padding-right:18em}li.ql-indent-6.ql-direction-rtl.ql-align-right{padding-right:19.5em}.ql-indent-7:not(.ql-direction-rtl){padding-left:21em}li.ql-indent-7:not(.ql-direction-rtl){padding-left:22.5em}.ql-indent-7.ql-direction-rtl.ql-align-right{padding-right:21em}li.ql-indent-7.ql-direction-rtl.ql-align-right{padding-right:22.5em}.ql-indent-8:not(.ql-direction-rtl){padding-left:24em}li.ql-indent-8:not(.ql-direction-rtl){padding-left:25.5em}.ql-indent-8.ql-direction-rtl.ql-align-right{padding-right:24em}li.ql-indent-8.ql-direction-rtl.ql-align-right{padding-right:25.5em}.ql-indent-9:not(.ql-direction-rtl){padding-left:27em}li.ql-indent-9:not(.ql-direction-rtl){padding-left:28.5em}.ql-indent-9.ql-direction-rtl.ql-align-right{padding-right:27em}li.ql-indent-9.ql-direction-rtl.ql-align-right{padding-right:28.5em}.ql-video{display:block;max-width:100%}.ql-video.ql-align-center{margin:0 auto}.ql-video.ql-align-right{margin:0 0 0 auto}.ql-bg-black{background-color:#000}.ql-bg-red{background-color:#e60000}.ql-bg-orange{background-color:#f90}.ql-bg-yellow{background-color:#ff0}.ql-bg-green{background-color:#008a00}.ql-bg-blue{background-color:#06c}.ql-bg-purple{background-color:#93f}.ql-color-white{color:#fff}.ql-color-red{color:#e60000}.ql-color-orange{color:#f90}.ql-color-yellow{color:#ff0}.ql-color-green{color:#008a00}.ql-color-blue{color:#06c}.ql-color-purple{color:#93f}</style>";


class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { showSide: 'front'}
    }
    switchSide = () => {
        if(this.state.showSide == 'front') {
            this.setState({ showSide : 'back'});
        } else {
            this.setState({showSide : 'front'});
        }
    };
    render() {
        if(this.state.showSide == 'front') {
            return(
                <TouchableHighlight onPress={this.switchSide} activeOpacity={1} underlayColor={'transparent'} >
                    <View style={styles.card}>
                        <WebView
                        source={{html: cardCSS + this.props.front_html}}
                        style={styles.cardBack}
                        bounces={false}
                        contentInset={{top: 15, left: 15, bottom: 15, right: 15}}
                        automaticallyAdjustContentInsets={false}
                        scrollEnabled={false}
                        />
                    </View>
                </TouchableHighlight>
            )
        } else {
            return (
            <TouchableHighlight onPress={this.switchSide} activeOpacity={1} underlayColor={'transparent'} >
                <View style={styles.card}>
                    <WebView
                        source={{html: cardCSS + this.props.back_html}}
                        style={styles.cardBack}
                        bounces={false}
                        contentInset={{top: 15, left: 15, bottom: 15, right: 15}}
                        automaticallyAdjustContentInsets={false}
                        scrollEnabled={false}
                    />
                </View>
            </TouchableHighlight>
            )
        }
    }
}


class LearnView extends Component {
    constructor(props) {
        super(props);

        // Real data state
        this.state = {
            categoryKey: this.props.categoryKey,
            categoryName: this.props.categoryName,
            firebaseApp: this.props.firebaseApp,
        };
         this.cardsRef = this.getRef().child('cards').orderByChild("category").equalTo(this.state.categoryKey);


        // Mock Data
        /*this.state = {
            categoryKey: 'yoloboy',
            categoryName: 'Software Engineering',
            cards: [{front_html: '<p>Front 1</p>', back_html: '<p>Back 1</p>'},{front_html: '<p>Front 1</p>', back_html: '<p>Back 1</p>'},{front_html: '<p>Front 1</p>', back_html: '<p>Back 1</p>'}],
            cardCount: 3,
            actCard: 1,
        };*/
    }
    getRef() {
        return this.state.firebaseApp.database().ref();
    }
    listenForCards(cardsRef) {

        cardsRef.on('value', (cardSnap) => {
            // get children as an array
            console.log()
            console.log(cardSnap.val());
            let items = [];
            cardSnap.forEach((card) => {
                items.push({
                    title: card.val().title,
                    front_html: card.val().front_html,
                    back_html: card.val().back_html,
                    _key: card.key
                });
                console.log(items);
            });

            this.setState({
                cards: items,
                cardCount: items.length,
                actCard: 1
            });

        });
    }
    componentDidMount() {
        this.listenForCards(this.cardsRef);
    }
    nextCard = (card) => {
        var newCount = this.state.actCard;
        if(newCount == this.state.cardCount) {
            newCount = 1;
        } else {
            newCount = newCount + 1;
        }
        this.setState({
            actCard: newCount
        });
    }
    renderLoadingView() {
        return (
            <View><ActivityIndicator size='large' /></View>
        );
    }
    renderCardsView() {
        return (
            <View style={styles.viewContainer}>
                <NavBar style={styles.navbar} title={this.props.viewTitle }/>
                <SwipeCards
                    cards={this.state.cards}
                    renderCard={(cardData) => <Card {...cardData} />}
                    renderNoMoreCards={() => <Text>No more Cards.</Text>}
                    loop={true}
                    handleYup={this.nextCard}
                    handleNope={this.nextCard}
                    noText={"Nicht gewusst"}
                    yupText={"Gewusst"}
                />
                <View style={styles.meta}>
                    <View style={styles.viewDivider} />
                    <Text style={styles.metaText}>{this.state.actCard} von {this.state.cardCount} in {this.state.categoryName}</Text>
                </View>
            </View>
        );
    }
    render() {

        if(this.state.cards) {
            return this.renderCardsView();
        } else {
            return this.renderLoadingView();
        }
    }
}

module.exports = LearnView;