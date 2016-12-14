/**
 * Created by michaelziorjen on 29.11.16.
 */
import React, {Component} from 'react';
import ReactNative from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = require('../styles.js');
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
           cardCount: this.props.item.cardCount,

        };

        if(this.props.item.progress && this.state.cardCount != 0) {
            this.state.learned = this.props.item.progress.learned ? Object.keys(this.props.item.progress.learned).length : 0;
            this.state.veryhard = this.props.item.progress.veryhard ? Object.keys(this.props.item.progress.veryhard).length : 0;
            this.state.hard = this.props.item.progress.hard ? Object.keys(this.props.item.progress.hard).length : 0;
            this.state.unviewed = this.props.item.progress.unviewed ? Object.keys(this.props.item.progress.unviewed).length : 0;
            this.state.normal = this.props.item.progress.normal ? Object.keys(this.props.item.progress.normal).length : 0;
            this.state.learnedPercent = this.state.learned / this.state.cardCount;
            this.state.veryhardPercent =  this.state.veryhard / this.state.cardCount;
            this.state.hardPercent = this.state.hard / this.state.cardCount;
            this.state.unviewedPercent = this.state.unviewed / this.state.cardCount;
            this.state.normalPercent = this.state.normal / this.state.cardCount ;

        }
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
                                <Text  style={styles.liSubTextSpan}>{this.state.cardCount} Karten</Text>
                                <Text style={[styles.liSubTextSpan,styles.textLightGrey]}>{ this.state.unviewed } offen</Text>
                            </View>
                            <View style={styles.liStatsRow}>
                                <Text style={[styles.liSubTextSpan,styles.textGreen]}>{ this.state.learned } gelernt</Text>
                                <Text style={[styles.liSubTextSpan,styles.textLightGreen]}>{ this.state.normal } richtig</Text>
                            </View>
                            <View style={styles.liStatsRow}>
                                <Text style={[styles.liSubTextSpan,styles.textRed]}>{ this.state.veryhard } Knacknüsse</Text>
                                <Text style={[styles.liSubTextSpan,styles.textLightRed]}>{ this.state.hard } unsicher</Text>
                            </View>
                        </View>
                    ) : null }
                    { this.props.item.progress ? (
                        <View style={styles.liStatsBar}>
                            <View style={[styles.liStatsProgress,{ 'flex' : this.state.veryhardPercent, 'backgroundColor': '#FF4B4B' }]}></View>
                            <View style={[styles.liStatsProgress,{ 'flex' : this.state.hardPercent, 'backgroundColor': '#FF9393' }]}></View>
                            <View style={[styles.liStatsProgress,{ 'flex' : this.state.normalPercent, 'backgroundColor': '#9CDB81' }]}></View>
                            <View style={[styles.liStatsProgress,{ 'flex' : this.state.learnedPercent, 'backgroundColor': '#72CC4B' }]}></View>
                            <View style={[styles.liStatsProgress,{ 'flex' : this.state.unviewedPercent, 'backgroundColor': '#D6D6D6' }]}></View>
                        </View>

                    ) : null}


                </View>
            </TouchableHighlight>
        );
    }
}

module.exports = ListItem;