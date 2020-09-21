import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'native-base';
import { POSTS_IMG } from "../../../app.json";

class StoryItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { theme, item, index, onStoryPress } = this.props;

        return (
            <TouchableWithoutFeedback onPress={() => onStoryPress('storyOpen', item, index)}>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={item.isLocal ? theme.gradientTransparentColors : theme.gradientColors} style={styles.linearGradient}>
                            <View style={[styles.imageView, { borderColor: theme.container.backgroundColor }]}>
                                {item.content && item.content.length > 0 && item.content[0].type.indexOf('image') != -1 ? <Image style={[styles.imageProfile, { backgroundColor: theme.secondarySColor, borderColor: theme.secondarySColor }]} source={{ uri: POSTS_IMG + item.content[0].name }} /> :
                                    <Icon name={"play"} type={"FontAwesome"} style={{ color: "#fff" }} />
                                }
                            </View>
                        </LinearGradient>
                        <Text numberOfLines={1} style={[styles.text, { color: theme.primaryColor }]}>{item.username}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default StoryItem;

const styles = StyleSheet.create({
    container: {
        margin: 8,
        marginRight: 0,
    },
    linearGradient: {
        width: 63,
        height: 63,
        borderRadius: 31.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 58,
        height: 58,
        borderRadius: 29,
        borderWidth: 3,
    },
    imageProfile: {
        width: 52,
        height: 52,
        borderRadius: 26,
        borderWidth: 1,
    },
    plusIcon: {
        position: 'absolute',
        marginLeft: -18,
        marginTop: -18,
        fontSize: 20
    },
    text: {
        textAlign: 'center',
        width: 70,
        marginTop: 5,
        fontSize: 13,
        fontWeight: '400'
    },
});
