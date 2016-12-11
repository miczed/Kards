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
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Cards from '../classes/Cards';
const styles = require('../styles.js');
const SwipeCards = require('../components/SwipeCards.js');
const NavBar = require('../components/NavBar');

/* if we decide to work with katex again uncomment this line */
//const katexCSS = "<link rel='stylesheet' href='katex/katex.min.css'>";

const cardCSS = "<style>::-webkit-scrollbar {display: none;} span.katex-html { display: none; } img { max-width: 100%; } span.katex-mathml { font-size: 18px; } body,html { overflow-x: hidden; max-width: 100%; height: auto; color: #2D2D2D; margin: 0px; padding: 10px; font-family: 'Merriweather'; font-size: 16px; line-height: 1.8em; }p,ol,ul,pre,blockquote,h1,h2,h3,h4,h5,h6{margin:0;padding:0;counter-reset:list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9}ol,ul{padding-left:0}ol > li,ul > li{list-style-type:none}ul > li::before{content:'\\25CF'}li::before{display:inline-block;margin-right:.3em;text-align:right;white-space:nowrap;width:1.2em}li:not(.ql-direction-rtl)::before{margin-left:-1.5em}ol li,ul li{padding-left:0.9em}ol li{counter-reset:list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;counter-increment:list-num}ol li:before{content:counter(list-num, decimal) '. '}ol li.ql-indent-1{counter-increment:list-1}ol li.ql-indent-1:before{content:counter(list-1, lower-alpha) '. '}ol li.ql-indent-1{counter-reset:list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9}ol li.ql-indent-2{counter-increment:list-2}ol li.ql-indent-2:before{content:counter(list-2, lower-roman) '. '}ol li.ql-indent-2{counter-reset:list-3 list-4 list-5 list-6 list-7 list-8 list-9}ol li.ql-indent-3{counter-increment:list-3}ol li.ql-indent-3:before{content:counter(list-3, decimal) '. '}ol li.ql-indent-3{counter-reset:list-4 list-5 list-6 list-7 list-8 list-9}ol li.ql-indent-4{counter-increment:list-4}ol li.ql-indent-4:before{content:counter(list-4, lower-alpha) '. '}ol li.ql-indent-4{counter-reset:list-5 list-6 list-7 list-8 list-9}ol li.ql-indent-5{counter-increment:list-5}ol li.ql-indent-5:before{content:counter(list-5, lower-roman) '. '}ol li.ql-indent-5{counter-reset:list-6 list-7 list-8 list-9}ol li.ql-indent-6{counter-increment:list-6}ol li.ql-indent-6:before{content:counter(list-6, decimal) '. '}ol li.ql-indent-6{counter-reset:list-7 list-8 list-9}ol li.ql-indent-7{counter-increment:list-7}ol li.ql-indent-7:before{content:counter(list-7, lower-alpha) '. '}ol li.ql-indent-7{counter-reset:list-8 list-9}ol li.ql-indent-8{counter-increment:list-8}ol li.ql-indent-8:before{content:counter(list-8, lower-roman) '. '}ol li.ql-indent-8{counter-reset:list-9}ol li.ql-indent-9{counter-increment:list-9}ol li.ql-indent-9:before{content:counter(list-9, decimal) '. '}.ql-indent-1:not(.ql-direction-rtl){padding-left:3em}li.ql-indent-1:not(.ql-direction-rtl){padding-left:4.5em}.ql-indent-1.ql-direction-rtl.ql-align-right{padding-right:3em}li.ql-indent-1.ql-direction-rtl.ql-align-right{padding-right:4.5em}.ql-indent-2:not(.ql-direction-rtl){padding-left:6em}li.ql-indent-2:not(.ql-direction-rtl){padding-left:7.5em}.ql-indent-2.ql-direction-rtl.ql-align-right{padding-right:6em}li.ql-indent-2.ql-direction-rtl.ql-align-right{padding-right:7.5em}.ql-indent-3:not(.ql-direction-rtl){padding-left:9em}li.ql-indent-3:not(.ql-direction-rtl){padding-left:10.5em}.ql-indent-3.ql-direction-rtl.ql-align-right{padding-right:9em}li.ql-indent-3.ql-direction-rtl.ql-align-right{padding-right:10.5em}.ql-indent-4:not(.ql-direction-rtl){padding-left:12em}li.ql-indent-4:not(.ql-direction-rtl){padding-left:13.5em}.ql-indent-4.ql-direction-rtl.ql-align-right{padding-right:12em}li.ql-indent-4.ql-direction-rtl.ql-align-right{padding-right:13.5em}.ql-indent-5:not(.ql-direction-rtl){padding-left:15em}li.ql-indent-5:not(.ql-direction-rtl){padding-left:16.5em}.ql-indent-5.ql-direction-rtl.ql-align-right{padding-right:15em}li.ql-indent-5.ql-direction-rtl.ql-align-right{padding-right:16.5em}.ql-indent-6:not(.ql-direction-rtl){padding-left:18em}li.ql-indent-6:not(.ql-direction-rtl){padding-left:19.5em}.ql-indent-6.ql-direction-rtl.ql-align-right{padding-right:18em}li.ql-indent-6.ql-direction-rtl.ql-align-right{padding-right:19.5em}.ql-indent-7:not(.ql-direction-rtl){padding-left:21em}li.ql-indent-7:not(.ql-direction-rtl){padding-left:22.5em}.ql-indent-7.ql-direction-rtl.ql-align-right{padding-right:21em}li.ql-indent-7.ql-direction-rtl.ql-align-right{padding-right:22.5em}.ql-indent-8:not(.ql-direction-rtl){padding-left:24em}li.ql-indent-8:not(.ql-direction-rtl){padding-left:25.5em}.ql-indent-8.ql-direction-rtl.ql-align-right{padding-right:24em}li.ql-indent-8.ql-direction-rtl.ql-align-right{padding-right:25.5em}.ql-indent-9:not(.ql-direction-rtl){padding-left:27em}li.ql-indent-9:not(.ql-direction-rtl){padding-left:28.5em}.ql-indent-9.ql-direction-rtl.ql-align-right{padding-right:27em}li.ql-indent-9.ql-direction-rtl.ql-align-right{padding-right:28.5em}.ql-video{display:block;max-width:100%}.ql-video.ql-align-center{margin:0 auto}.ql-video.ql-align-right{margin:0 0 0 auto}.ql-bg-black{background-color:#000}.ql-bg-red{background-color:#e60000}.ql-bg-orange{background-color:#f90}.ql-bg-yellow{background-color:#ff0}.ql-bg-green{background-color:#008a00}.ql-bg-blue{background-color:#06c}.ql-bg-purple{background-color:#93f}.ql-color-white{color:#fff}.ql-color-red{color:#e60000}.ql-color-orange{color:#f90}.ql-color-yellow{color:#ff0}.ql-color-green{color:#008a00}.ql-color-blue{color:#06c}.ql-color-purple{color:#93f}</style>";


/**
 * returns a unique ID
 * @returns {string}
 */
function generateUID() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
}


/**
 * React Native Component for the Card
 */
class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { showSide: (this.props.showSide ? this.props.showSide :'front')}
    }

    /**
     * Callback function that switches the side of the card
     */
    switchSide = () => {
        if(this.state.showSide == 'front') {
            this.setState({ showSide : 'back'});
        } else {
            this.setState({showSide : 'front'});
        }
    };

    /**
     * Function that is called when view is updated with component
     * @param nextProps
     */
    componentWillReceiveProps(nextProps){
        // Switch side to front when card is reloaded
         this.setState({
            showSide: 'front'
         })
    };
    render() {
        if(this.state.showSide == 'front') {
            return(
                <TouchableHighlight onPress={this.switchSide} activeOpacity={1} underlayColor={'transparent'} >
                    <View style={styles.card}>
                        <WebView
                        source={{html:  cardCSS + this.props.front_html, baseUrl: 'web/'}}
                        style={styles.cardBack}
                        bounces={false}
                        contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                        automaticallyAdjustContentInsets={false}
                        scrollEnabled={true}
                        />
                    </View>
                </TouchableHighlight>
            )
        } else {
            return (
            <TouchableHighlight onPress={this.switchSide} activeOpacity={1} underlayColor={'transparent'} >
                <View style={styles.card}>
                    <WebView
                        source={{html:  cardCSS + this.props.back_html, baseUrl: 'web/'}}
                        style={styles.cardBack}
                        bounces={false}
                        contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
                        automaticallyAdjustContentInsets={false}
                        scrollEnabled={true}
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
            cardsProvider: new Cards(this.props.firebaseApp),
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
    /**
     * Shuffles array in place. ES6 version
     * @param {Array} a items The array containing the items.
     */
    shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    }
    getRef() {
        return this.state.firebaseApp.database().ref();
    }
    listenForCards(cardsRef) {
        cardsRef.on('value', (cardSnap) => {
            // get children as an array
            let items = [];
            cardSnap.forEach((card) => {
                items.push({
                    front_html: card.val().front_html,
                    back_html: card.val().back_html,
                    _key: card.key
                });
            });
            this.shuffle(items); // we shuffle the array so card order is randomized
            this.setState({
                cards: items,
                uid: generateUID(),
            });
        });
    }
    componentDidMount() {
        this.listenForCards(this.cardsRef);
    }
    handleYup = (card) => {
        this.state.cardsProvider.increaseCardProgress(card._key);
    }
    handleNope = (card) => {
        this.state.cardsProvider.decreaseCardProgress(card._key);
    }
    handleFavorite = (card) => {
        this.state.cardsProvider.setCardFavorite(card._key,true);
    }
    /**
     * Resets the cards state and creates a new uid so that the SwipeCards implementation will change
     * its internal card state
     * @param newCards : Array of cards which should be loaded by the component
     */
    resetCards = (newCards) => {
        this.setState({
            cards: newCards,
            uid: generateUID(),
        })
    }
    renderLoadingView() {
        return (
            <View style={styles.viewContainer}>
                <NavBar style={styles.navbar} title={this.props.viewTitle } backBtn={true} navigator={this.props.navigator}/>
                <View style={styles.loadingView}><ActivityIndicator size='large' /><Text style={styles.loadingViewText}>KARTEN WERDEN GELADEN</Text></View>
            </View>
        );
    }
    renderCardsView() {
        return (
            <View style={styles.viewContainer}>
                <NavBar style={styles.navbar} title={this.props.viewTitle } backBtn={true} navigator={this.props.navigator}/>
                <SwipeCards
                    cards={this.state.cards}
                    renderCard={(cardData) => <Card {...cardData} />}
                    loop={false}
                    handleYup={this.handleYup}
                    handleNope={this.handleNope}
                    handleFavorite={this.handleFavorite}
                    noText={"NICHT GEWUSST"}
                    yupText={"GEWUSST"}
                    yupStyle={styles.yup}
                    yupTextStyle={styles.yupText}
                    nopeStyle={styles.nope}
                    nopeTextStyle={styles.nopeText}
                    resetCards={this.resetCards}
                    cardStyle={styles.cardWrapper}
                    categoryName={this.state.categoryName}
                    closeView={() => {this.props.navigator.pop();}}
                    uid={this.state.uid}

                />
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