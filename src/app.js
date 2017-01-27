/**
 * Created by michaelziorjen on 26.01.17.
 */

import { reaction } from 'mobx';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import { app } from './stores';

registerScreens();

import { iconsMap, iconsLoaded } from './helpers/icons-loader';


export default class App {
    constructor() {
        // when the user of the app changes, call the startApp function
        reaction(() => app.user, () => this.startApp(app.user));

        iconsLoaded.then(() => { // load icons async
            app.appInitialized();
        });
    }
    startApp(user) {
        // if user isn't set then load login form
        if(!user) {
            this.showLogin();
         } else { // start application
            this.showTabs();
        }
    }
    showLogin() {
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'kards.LoginView', // unique ID registered with Navigation.registerScreen
            },
            animationType: 'none' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
        })
    }
    showTabs() {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'Sets',
                    screen: 'kards.CategoryView',
                    title: 'Sets',
                    icon: iconsMap['ios-albums'],
                    selectedIcon: iconsMap['ios-albums--active'],
                },
                {
                    label: 'Settings',
                    screen: 'kards.SettingsView',
                    title: 'Settings',
                    icon: iconsMap['ios-cog'],
                    selectedIcon: iconsMap['ios-cog--active'],
                }
            ],
            tabsStyle: {
                tabBarButtonColor: '#D8D8D8', // change the color of the tab icons and text (also unselected)
                tabBarSelectedButtonColor: '#00BC80', // change the color of the selected tab icon and text (only selected)
                tabBarBackgroundColor: '#FFFFFF' // change the background color of the tab bar
            },
        });
    }
}