
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
    ActionSheetIOS,
    RefreshControl,
} from 'react-native';

const LearnView = require('../components/LearnView');
const ListItem = require('../components/ListItem');
const styles = require('../styles.js');
const NavBar = require('../components/NavBar');
import Categories from '../classes/Categories';

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
            user: this.props.user,
            refreshing: false,
            backBtn: this.props.backBtn ? this.props.backBtn : false
        };

        this.categoriesProvider = new Categories(this.props.firebaseApp);
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.listenForItems();
    }


    listenForItems() {
        this.categoriesProvider.getCategoriesByParent(this.state.parentCategory,(categories) => {
            this.categoriesProvider.getProgress(this.state.user.uid,(progress) => {
                // get children as an array
                let items = [];
                categories.forEach((category) => {
                    let cardProgress = this.categoriesProvider.leftJoin(category.cards, progress);
                    let progresses;
                    if(cardProgress) {
                        progresses = this.categoriesProvider.getCategoryProgressGroups(cardProgress);
                    } else {
                        progresses = null;
                    }
                    items.push({
                        title: category.title,
                        _key: category._key,
                        cardCount: (category.cards != null ? Object.keys(category.cards).length : 0),
                        progress: progresses,
                    });
                });
                let state = this.state;
                this.setState({
                    categories: items,
                    refreshing: false,
                    dataSource: this.state.dataSource.cloneWithRows(items)
                });
            });
        });
    }
    componentDidMount() {
        this.listenForItems();
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
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                      />
                    }
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
                    passProps: { parentCategoryName: item.title, parentCategoryKey: item._key, firebaseApp: this.state.firebaseApp, backBtn: true, user: this.state.user },
                    navigationBarHidden:  true,
                    backButtonTitle: ''
                });
            } else { // category has cards
                let progressGroups = ["all"];
                let buttons = [
                    'Alle',
                ];
                if(item.progress.counts.unviewed > 0) {
                    progressGroups.push("unviewed");
                    buttons.push("Noch nicht angesehen")
                }
                if((item.progress.counts.veryhard + item.progress.counts.hard) > 0) {
                    progressGroups.push("unknown");
                    buttons.push("Nicht gekonnte")
                }
                buttons.push("Abbrechen");
                const CANCEL_INDEX = progressGroups.length;

                ActionSheetIOS.showActionSheetWithOptions({
                        options: buttons,
                        cancelButtonIndex: CANCEL_INDEX,
                        tintColor: '#2D2D2D',
                        message: "Welche Karten möchtest du lernen?"
                    },
                    (buttonIndex) => {
                        if(progressGroups[buttonIndex]) {
                            this.props.navigator.push({
                                title: item.title,
                                component: LearnView,
                                passProps: {
                                    categoryKey: item._key,
                                    categoryName: item.title,
                                    firebaseApp: this.state.firebaseApp,
                                    viewTitle: item.title,
                                    progressGroup: progressGroups[buttonIndex],
                                    user: this.state.user,
                                },
                                navigationBarHidden: true,
                                backButtonTitle: ''
                            });
                        }
                    });
            }

        };
        return (
            <ListItem item={item} onPress={onPress} />
        );
    }
}

module.exports = CategoryView;
