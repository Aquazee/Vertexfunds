import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

class PostActivity extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { theme, item, navigation, onPress, userid } = this.props;
        let isliked = item.likes && item.likes.length > 0 ? (item.likes.filter(i => i.userId == userid)).length > 0 : false
        return (
            <View style={styles.container}>
                <View style={styles.likeView}>
                    <TouchableWithoutFeedback onPress={() => onPress(isliked ? 'dislike' : 'like')}>
                        <View style={styles.iconView}>
                            <Image resizeMode={"contain"} style={styles.iconImage} source={isliked ? theme.icons.like : theme.icons.unlike} />
                        </View>
                    </TouchableWithoutFeedback>
                   
                </View>
              
            </View>
        );
    }
}

export default PostActivity;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingTop: 2,
        paddingBottom: 2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    likeView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    imageProfile: {
        width: 34,
        height: 34,
        borderRadius: 17
    },
    iconView: {
        width: 35,
        height: 35,
        justifyContent: 'center',
    },
    iconImage: {
        width: 20,
        height: 20,
    },
});
