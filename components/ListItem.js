/**
 * Created by michaelziorjen on 29.11.16.
 */
import React, {Component} from 'react';
import ReactNative from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = require('../styles.js');
const { View, TouchableHighlight, Text, Animated } = ReactNative;

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
           cardCount: props.item.progress ? props.item.progress.counts.total : 0,
        };

    }
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress} underlayColor={ this.props.item.progress ? "transparent" : "#B9B9B9"}>
                <View style={ this.props.item.progress ? styles.liWithStat : styles.li }>
                    <View style={this.props.item.progress ? styles.liHeaderWithStat : styles.liHeader }>
                        <Text style={styles.liText}>{this.props.item.title}</Text>
                    </View>
                    { this.state.cardCount > 0 ? (
                        <View style={styles.liStats}>
                            <View style={styles.liStatsRow}>
                                <Text  style={styles.liSubTextSpan}>{this.props.item.progress.counts.total} Karten</Text>
                                <Text style={[styles.liSubTextSpan,styles.textLightGrey]}>{ this.props.item.progress.counts.unviewed } offen</Text>
                            </View>
                            <View style={styles.liStatsRow}>
                                <Text style={[styles.liSubTextSpan,styles.textGreen]}>{ this.props.item.progress.counts.learned } gelernt</Text>
                                <Text style={[styles.liSubTextSpan,styles.textLightGreen]}>{ this.props.item.progress.counts.normal } richtig</Text>
                            </View>
                            <View style={styles.liStatsRow}>
                                <Text style={[styles.liSubTextSpan,styles.textRed]}>{ this.props.item.progress.counts.veryhard } Knacknüsse</Text>
                                <Text style={[styles.liSubTextSpan,styles.textLightRed]}>{ this.props.item.progress.counts.hard } unsicher</Text>
                            </View>
                        </View>
                    ) : null }
                    { this.props.item.progress ? (
                        <View style={styles.liStatsBar}>
                            <Animated.View style={[styles.liStatsProgress,{ 'flex' : this.props.item.progress.percent.veryhard, 'backgroundColor': '#FF4B4B'}]}></Animated.View>
                            <View style={[styles.liStatsProgress,{ 'flex' : this.props.item.progress.percent.hard, 'backgroundColor': '#FF9393' }]}></View>
                            <View style={[styles.liStatsProgress,{ 'flex' : this.props.item.progress.percent.normal, 'backgroundColor': '#9CDB81' }]}></View>
                            <View style={[styles.liStatsProgress,{ 'flex' : this.props.item.progress.percent.learned, 'backgroundColor': '#72CC4B' }]}></View>
                            <View style={[styles.liStatsProgress,{ 'flex' : this.props.item.progress.percent.unviewed, 'backgroundColor': '#D6D6D6' }]}></View>
                        </View>

                    ) : null}


                </View>
            </TouchableHighlight>
        );
    }
}

module.exports = ListItem;