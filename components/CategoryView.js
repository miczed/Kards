
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
} from 'react-native';

const LearnView = require('../components/LearnView');
const ListItem = require('../components/ListItem');
const styles = require('../styles.js');
const NavBar = require('../components/NavBar');


class CategoryView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            parentCategory: props.parentCategoryKey ? props.parentCategoryKey : "",
            viewTitle: props.parentCategoryName ? props.parentCategoryName : this.props.viewTitle,
            firebaseApp: this.props.firebaseApp,
            backBtn: this.props.backBtn ? this.props.backBtn : false
        };
        this.categoriesRef = this.getRef().child('categories').orderByChild("parent").equalTo(this.state.parentCategory);
        this.cardsRef = this.getRef().child('cards');
    }

    getRef() {
        return this.state.firebaseApp.database().ref();
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
                categories: items,
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }

    componentDidMount() {
        this.listenForItems(this.categoriesRef);
    }
    renderLoadingView() {
        return (
            <View style={styles.viewContainer}>
                <NavBar style={styles.navbar} title={this.state.viewTitle } backBtn = {this.state.backBtn} navigator={this.props.navigator}/>
                <View style={styles.loadingView}><ActivityIndicator size='large' /><Text style={styles.loadingViewText}>KARTEN WERDEN GELADEN</Text></View>
            </View>
        );
    }
    renderCategoriesView() {
        return (
            <View style={styles.container}>
                <NavBar style={styles.navbar} title={this.state.viewTitle } backBtn = {this.state.backBtn} navigator={this.props.navigator}/>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    style={styles.listview}/>
            </View>
        )
    }
    render() {
        if(this.state.categories) {
            return this.renderCategoriesView();
        } else {
            return this.renderLoadingView();
        }
    }

    _renderItem(item) {
        const onPress = () => {
            // it is an empty category or a parent category
            if(item.cardCount == 0) {
                this.props.navigator.push({
                    title: item.title,
                    component: CategoryView,
                    passProps: { parentCategoryName: item.title, parentCategoryKey: item._key, firebaseApp: this.state.firebaseApp, backBtn: true },
                    navigationBarHidden:  true,
                    backButtonTitle: ''
                });
            } else { // category has cards
                this.props.navigator.push({
                    title: item.title,
                    component: LearnView,
                    passProps: {categoryKey: item._key, categoryName: item.title, firebaseApp: this.state.firebaseApp, viewTitle: item.title},
                    navigationBarHidden:  true,
                    backButtonTitle: ''
                });
            }

        };
        return (
            <ListItem item={item} onPress={onPress} />
        );
    }
}

module.exports = CategoryView;
