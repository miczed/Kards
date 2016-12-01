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

const ListItem = require('../components/ListItem');
const styles = require('../styles.js');
const YoloView = require('../components/YoloView');
const NavBar = require('../components/NavBar');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCZZgxh3tDa8OAFJCKCHRj_8q3JW2FW0Ho",
    authDomain: "kards-90223.firebaseapp.com",
    databaseURL: "https://kards-90223.firebaseio.com",
    storageBucket: "kards-90223.appspot.com",
    messagingSenderId: "600593412749"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.categoriesRef = this.getRef().child('categories');
        this.cardsRef = this.getRef().child('cards');
    }

    getRef() {
        return firebaseApp.database().ref();
    }

    listenForItems(categoriesRef) {
        categoriesRef.on('value', (categorySnap) => {
            // get children as an array
            let items = [];
            categorySnap.forEach((category) => {
                items.push({
                    title: category.val().title,
                    _key: category.key,
                    cardCount: (category.val().cards != null ? Object.keys(category.val().cards).length : 0),
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }

    componentDidMount() {
        this.listenForItems(this.categoriesRef);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar style={styles.navbar} title={this.props.viewTitle }/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    style={styles.listview}/>
            </View>
        )
    }


    _renderItem(item) {
        const onPress = () => {
            this.props.navigator.push({
                title: item.title,
                component: YoloView,
                passProps: {categoryKey: item._key, categoryName: item.title, firebaseApp: firebaseApp, viewTitle: item.title},
                navigationBarHidden:  true,
                backButtonTitle: ''
            });
        };
        return (
            <ListItem item={item} onPress={onPress} />
        );
    }
}

module.exports = MainPage;
