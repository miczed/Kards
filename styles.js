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
        backgroundColor: '#FAFAFA',
        flex: 1,
    },
    textBold: {
      fontFamily: constants.dinNextBold,
    },
    textRed: {
        color: '#C4615E',
    },
    textGreen: {
        color: '#8FBB5D',
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
        paddingHorizontal: 15,
        flex: 1,
        zIndex:1,
    },
    liWithStat: {
        backgroundColor: '#fff',
        borderBottomColor: '#E9E9E9',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingBottom: 0,
        paddingHorizontal: 15,
        flex: 1,
        zIndex:1,
    },
    liContainer: {
        flex: 2,
    },
    liText: {
        color: constants.brandMainColor,
        fontSize: 18,
        fontFamily: constants.dinNextRegular,
        marginTop: 15,

    },
    liStats: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    liSubTextSpan: {
        paddingTop: 4,
        color: constants.brandSubColor,
        opacity: 1,
        fontFamily: constants.dinNextMedium,
        fontSize: 14,
        marginRight: 15,
    },
    liGradient: {
        height: 8,
        flex: 1,
        marginLeft: -15,
        marginRight: -15,
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
        shadowOpacity: 0.15,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        zIndex: 10,
    },
    navbarButton: {
        backgroundColor: 'transparent',
        left: 15,
        position: 'absolute',
        top: 18,
        height: 42,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    navbarTitle: {
        color: '#444',
        fontSize: 16,
        fontWeight: "500",
        paddingTop: 32,
        fontFamily: constants.dinNextMedium,
    },
    viewContainer: {
        top: 0,
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    loadingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingViewText: {
        marginTop: 15,
        fontFamily: constants.dinNextMedium,
        fontSize: 14,
        color: constants.brandSubColor,
    },
    cardWrapper: {
        flex: 1,
    },
    meta: {
        height: 50,
        alignItems: 'center',
        flex: 0,
        justifyContent: 'center',
        zIndex: 2,
        alignSelf: 'center',
        flexDirection: 'row',
        width: vwidth,
    },
    metaText: {
        fontSize: 14,
        color: constants.brandSubColor,
        fontFamily: constants.dinNextMedium,
        alignSelf: 'center',
        paddingTop: 5,
    },
    metaButton: {
        right: 20,
        position: 'absolute',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: vheight - 20 - 45 - 50 - 8, // Statusbar - Navbar - Footer - 8px offset from top
        width: vwidth - 16,
        top: 8,
        backgroundColor: 'white',
        borderRadius: 6,
        flexDirection: 'column',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        zIndex: 1,
        shadowColor: constants.brandMainColor,
        shadowOpacity: 0.15,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0,
        },
    },
    cardsView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    cardBack: {
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        borderColor: 'transparent',
        zIndex: 1,
        width: vwidth - 16,
        flex: 1,
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
        width: vwidth - 120,
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    noMoreCardsEmoji: {
        fontSize: 72,
        marginBottom: 15,
    },
    buttonContainer: {
        marginTop: 15,
        padding:10, height:50, borderRadius:50, backgroundColor: 'white',
        shadowColor: constants.brandMainColor,
        shadowOpacity: 0.15,

        shadowRadius: 5,
        shadowOffset: {
            height: 4,
            width: 0,
        },
        borderColor: '#E0E0E0',
        borderWidth: 1,
        paddingTop: 16,
        width: vwidth - 120,
    },
    buttonText: {
        fontFamily: constants.dinNextMedium,
        color: constants.brandSubColor,
        fontSize: 18,
        backgroundColor: 'white',
        letterSpacing: 2,
    },
    textDivider: {
        height: 1,
        width: 100,
        backgroundColor: constants.brandMainColor,
        opacity: 0.1,
        marginBottom: 15,
        marginTop: 15,
    }
});

module.exports = styles;
module.exports.constants = constants;