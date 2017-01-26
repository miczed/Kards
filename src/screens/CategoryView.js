
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
import { observer } from 'mobx-react/native';
import { app } from '../stores';

const ListItem = require('../components/ListItem');
const styles = require('../styles.js');
import Categories from '../classes/Categories';
import firebase from '../helpers/firebase';

@observer
class CategoryView extends Component {
    static navigatorStyle = {
        navBarTextColor: '#00BC80', // change the text color of the title (remembered across pushes)
        navBarButtonColor: '#D8D8D8', // change the button colors of the nav bar (eg. the back button) (remembered across pushes)
    };
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            parentCategory: props.parentCategoryKey ? props.parentCategoryKey : null,
            viewTitle: props.parentCategoryName ? props.parentCategoryName : this.props.viewTitle,
            refreshing: false,
            backBtn: this.props.backBtn ? this.props.backBtn : false
        };
        this.app = app;
        this.categoriesProvider = new Categories(firebase);
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.listenForItems();
    }


    listenForItems() {
        this.categoriesProvider.getCategoriesByParent(this.state.parentCategory,(categories) => {
            this.categoriesProvider.getProgress(this.app.user.uid,(progress) => {
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
                this.setState({
                    categories: items,
                    refreshing: false,
                    dataSource: this.state.dataSource.cloneWithRows(items)
                });
            },(error) => {
                console.error(error);
            });
        },(error) => {
            console.error(error);
        });
    }
    componentDidMount() {
        this.listenForItems();

    }
    renderLoadingView() {
        return (
            <View style={styles.viewContainer}>
                <View style={styles.loadingView}><ActivityIndicator size='large' /><Text style={styles.loadingViewText}>KARTEN WERDEN GELADEN</Text></View>
            </View>
        );
    }
    renderCategoriesView() {
        return (
            <View style={styles.container}>
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
                    screen: 'kards.CategoryView', // unique ID registered with Navigation.registerScreen
                    title: item.title, // navigation bar title of the pushed screen (optional)
                    passProps: {parentCategoryName: item.title, parentCategoryKey: item._key}, // simple serializable object that will pass as props to the pushed screen (optional)
                    animated: true, // does the push have transition animation or does it happen immediately (optional)
                    backButtonHidden: false, // hide the back button altogether (optional)
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
                            this.props.navigator.showModal({
                                screen: "kards.LearnView", // unique ID registered with Navigation.registerScreen
                                title: item.title, // title of the screen as appears in the nav bar (optional)
                                passProps: {
                                    categoryKey: item._key,
                                    categoryName: item.title,
                                    firebaseApp: this.state.firebaseApp,
                                    viewTitle: item.title,
                                    progressGroup: progressGroups[buttonIndex],
                                    user: this.state.user,
                                },
                                animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
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
