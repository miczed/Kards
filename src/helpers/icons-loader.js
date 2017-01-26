// Define all your icons once,
// load them once,
// and use everywhere

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const active_color = "#00BC80";
const normal_color = "#D8D8D8";
const icons = {
    "ios-albums": [30, normal_color],
    "ios-albums--active": [30, active_color],

    "ios-cog": [30, normal_color],
    "ios-cog--active": [30, active_color],

    // Use other Icon provider, see the logic at L39
    "facebook": [30, "#bbb", FontAwesome],
    "facebook--active": [30, "#fff", FontAwesome],
}

const defaultIconProvider = Ionicons;

let iconsMap = {};
let iconsLoaded = new Promise((resolve, reject) => {
    new Promise.all(
        Object.keys(icons).map(iconName => {
            const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
            return Provider.getImageSource(
                iconName.replace(replaceSuffixPattern, ''),
                icons[iconName][0],
                icons[iconName][1]
            )
        })
    ).then(sources => {
        Object.keys(icons)
            .forEach((iconName, idx) => iconsMap[iconName] = sources[idx])

        // Call resolve (and we are done)
        resolve(true);
    })
});

export {
    iconsMap,
    iconsLoaded
};