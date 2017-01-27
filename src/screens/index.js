/**
 * This function registers all screens that the app uses.
 * Each screen should be placed in a separate file inside the screens folder.
 */

import { Navigation } from 'react-native-navigation';

import CategoryView from './CategoryView';
import LearnView from './LearnView';
import LoginView from './LoginView';
import SettingsView from './SettingsView';


// register all screens of the app (including internal ones)
export function registerScreens() {
    Navigation.registerComponent('kards.CategoryView', () => CategoryView);
    Navigation.registerComponent('kards.LearnView', () => LearnView);
    Navigation.registerComponent('kards.LoginView', () => LoginView);
    Navigation.registerComponent('kards.SettingsView', () => SettingsView);
}