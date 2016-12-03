const React = require('react-native')
const {StyleSheet, Dimensions} = React
const constants = {
    actionColor: '#24CE84',
    brandMainColor: '#2D2D2D',
    brandSubColor: '#969696',
    dinNextMedium: 'DINNextRoundedLTPro-Medium',
    dinNextBold: 'DINNextRoundedLTPro-Bold',
    dinNextRegular: 'DINNextRoundedLTPro-Regular',
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
    textBold: {
      fontFamily: constants.dinNextBold,
    },
    textRed: {
        color: '#8FBB5D',
    },
    textGreen: {
        color: '#C4615E',
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
        color: constants.brandMainColor,
        fontSize: 16,
        fontFamily: constants.merriBold,
        paddingBottom: 4,
    },
    liSubText: {
        color: constants.brandMainColor,
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
        shadowColor: constants.brandMainColor,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            height: 1,
            width: 0,
        },
        zIndex: 10,
    },
    navbarButton: {
        backgroundColor: 'transparent',
        left: 15,
        position: 'absolute',
        top: 20,
        height: 42,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    navbarTitle: {
        color: '#444',
        fontSize: 16,
        fontWeight: "500",
        paddingTop: 30,
        fontFamily: constants.dinNextMedium,
    },
    viewContainer: {
        top: 0,
        flex: 1,
    },
    loadingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingViewText: {
        marginTop: 5,
        fontFamily: constants.dinNextMedium,
        fontSize: 14,
        color: constants.brandSubColor,
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
        zIndex: 2,
    },
    metaText: {
        fontSize: 14,
        color: constants.brandMainColor,
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
        width: vwidth,
    },
    viewDivider: {
        height: 1,
        width: 100,
        backgroundColor: constants.brandMainColor,
        opacity: 0.1,
        top: 0,
        marginBottom: 15,
    },
    yup: {
        backgroundColor: '#B8E986',
        position: 'absolute',
        bottom: -50,
        right: 0,
        height: 50,
        left: 0,
        alignItems: 'center',
        paddingTop: 18,
        zIndex: 100,
    },
    yupText: {
        color: 'white',
        fontFamily: constants.dinNextMedium,
        fontSize: 16,
    },
    nope: {
        backgroundColor: '#E98686',
        position: 'absolute',
        bottom: -50,
        right: 0,
        height: 50,
        left: 0,
        alignItems: 'center',
        paddingTop: 18,
        zIndex: 100,
    },
    nopeText: {
        color: 'white',
        fontFamily: constants.dinNextMedium,
        fontSize: 16,
    },
    noMoreCards: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noMoreCardsText: {
        fontFamily: constants.dinNextRegular,
        color: constants.brandSubColor,
        width: vwidth - 60,
        marginTop: 30,
        textAlign: 'center',
        fontSize: 18,
    },
    noMoreCardsEmoji: {
        fontSize: 72,
    }
});

module.exports = styles
module.exports.constants = constants;