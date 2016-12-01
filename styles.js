const React = require('react-native')
const {StyleSheet, Dimensions} = React
const constants = {
    actionColor: '#24CE84',
    brandColor: '#2D2D2D',
    dinNextMedium: 'DINNextRoundedLTPro-Medium',
    dinNextBold: 'DINNextRoundedLTPro-Bold',
    merriBold: 'Merriweather-Bold',
    merriRegular: 'Merriweather-Regular',
    merriItalic: 'Merriweather-Italic',
    merriBoldItalic: 'MerriWeather-BoldItalic',
};
var dimensions = Dimensions.get('window');
var vheight = dimensions.height;
var vwidth = dimensions.width;

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    navigator: {
        top: 0,
        flex: 1,
    },
    listview: {
        flex: 1,
        top:0,
        zIndex:1,
    },
    li: {
        backgroundColor: '#fff',
        borderBottomColor: '#E9E9E9',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingBottom: 9,
        paddingTop: 12,
        paddingHorizontal: 15,
        flex: 1,
        zIndex:1,
    },
    liContainer: {
        flex: 2,
    },
    liText: {
        color: constants.brandColor,
        fontSize: 16,
        fontFamily: constants.merriBold,
        paddingBottom: 4,
    },
    liSubText: {
        color: constants.brandColor,
        opacity: 0.5,
        fontFamily: constants.dinNextMedium,
        fontSize: 14,
        marginRight: 15,
    },
    navbar: {
        backgroundColor: '#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        justifyContent: 'center',
        height: 65,
        flexDirection: 'row',
        shadowColor: constants.brandColor,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            height: 1,
            width: 0,
        },
        zIndex: 10,
    },
    navbarTitle: {
        color: '#444',
        fontSize: 16,
        fontWeight: "500",
        paddingTop: 30,
    },
    viewContainer: {
        top: 0,
        flex: 1,
    },
    cardWrapper: {
        backgroundColor: '#ff0010',
        flex: 1,
    },
    meta: {
        height: 50,
        alignItems: 'center',
        flex: 0,
        justifyContent: 'flex-start',
    },
    metaText: {
        fontSize: 14,
        color: constants.brandColor,
        fontFamily: constants.dinNextMedium,
        opacity: 0.5,
    },
    card: {
        height: vheight - 20 - 45 - 50, // Statusbar - Navbar - Footer
        width: vwidth,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'transparent',
        zIndex: 1,
    },
    cardBack: {
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        borderColor: 'transparent',
        zIndex: 1,
        width: vwidth - 60,
    },
    viewDivider: {
        height: 1,
        width: 100,
        backgroundColor: constants.brandColor,
        opacity: 0.1,
        top: 0,
        marginBottom: 15,
    }
});

module.exports = styles
module.exports.constants = constants;