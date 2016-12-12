/**
 * Created by michaelziorjen on 29.11.16.
 */
import React, {Component} from 'react';
import ReactNative from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = require('../styles.js')
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
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={ this.props.item.progress ? styles.liWithStat : styles.li }>
                    <Text style={styles.liText}>{this.props.item.title}</Text>
                    { this.state.cardCount > 0 ? (<View style={styles.liStats}>
                        <Text  style={styles.liSubTextSpan}>{this.state.cardCount} Karten</Text>
                        { this.props.item.progress ? <Text style={[styles.liSubTextSpan,styles.textGreen]}>{ this.state.learned } gelernt</Text> : null }
                        { this.props.item.progress ? <Text style={[styles.liSubTextSpan,styles.textRed]}>{ this.state.veryhard } Knacknüsse</Text> : null }
                    </View>) : null }
                    { this.props.item.progress ? (
                        <LinearGradient
                            start={[0.0, 0.0]} end={[1.0, 0.0]}
                            locations={[
                                0,
                                this.state.veryhard,
                                this.state.veryhard + this.state.hard,
                                this.state.veryhard + this.state.hard + this.state.normal,
                                this.state.veryhard + this.state.hard + this.state.normal + this.state.learned,
                            ]}
                            colors={['#C4615E','#E98686', '#B8E986', '#8FBB5D','#FFFFFF']}
                            style={styles.liGradient}>
                        </LinearGradient>
                    ) : null}


                </View>
            </TouchableHighlight>
        );
    }
}

module.exports = ListItem;