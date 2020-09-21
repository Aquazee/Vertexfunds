import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { regex } from '../../utils/regex';
import { PROFILE_PIC } from "../../../app.json";
import { List, ListItem, Thumbnail,  Left, Body, Right, Button } from 'native-base'

class UserProfileItem extends Component {
    constructor(props) {
        super(props);
    }


    onProfilePress = () => {
        const { item, navigation } = this.props;
        navigation.push('OtherProfile', { user: item });
    };

    render() {
        const { theme, item, onPress, userid, index } = this.props;
        //let highestCount = item.likes != null ? `${item.likes.length} likes` : '0 likes';

        return (
                <ListItem onPress={this.onProfilePress}>
                    <View style={{flex:2}}>
                        <Thumbnail avatar source={{ uri: (PROFILE_PIC + item.profileImageUrl) }} />
                    </View>
                    <View style={{flex:6}}>
                        <Text style={{fontSize:15}}>{item.username}</Text>
                        <Text note numberOfLines={1}>Interests : { item.interests.map(i => i.name).join(', ') }</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Button transparent onPress={this.onProfilePress}>
                            <Text>View</Text>
                        </Button>
                    </View>
                </ListItem>
        );
    }
}

export default UserProfileItem;

const styles = StyleSheet.create({
    container: {

    },
    description: { flex: 1, paddingLeft: 15, paddingRight: 15 },
    textLikes: {
        fontSize: 14,
        fontWeight: '800'
    },
    descriptionView: { flex: 1, paddingTop: 5 },
    descriptionText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '400'
    },
    linkColor: { fontWeight: '600' },
    commentView: { flex: 1, paddingTop: 5, paddingBottom: 15 },
    commentText: {
        fontSize: 14,
        fontWeight: '500'
    }
});
