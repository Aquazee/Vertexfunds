// @flow
import * as React from 'react';
import {StyleSheet, View, Image, SafeAreaView, TextInput, Platform, TouchableWithoutFeedback, Text, Image} from 'react-native';
import type { ImageSourcePropType } from 'react-native/Libraries/Image/ImageSourcePropType';
import Feather from 'react-native-vector-icons/Feather';

import {White} from '../../../themes/constantColors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type Story = {
    id: string,
    source: ImageSourcePropType,
    user: string,
    avatar: ImageSourcePropType,
};

type StoryProps = {
    story: Story,
};

export default class extends React.PureComponent<StoryProps> {
    constructor(props){
        super(props)
        this.state={
            storyText : ""
        }
    }
    renderTop = () => {
      const { story: { username, profilePic }, navigation, theme } = this.props;
      return (
          <View style={styles.topContainer}>
              <TouchableWithoutFeedback onPress={() => navigation.push('OtherProfile', {user:  this.props.story})}>
                  <View style={[styles.imageView, {borderColor: theme.container.backgroundColor}]}>
                      <Image style={[styles.imageProfile, {borderColor: theme.secondarySColor}]} source={{uri: profilePic}}/>
                  </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => navigation.push('OtherProfile', {user:  this.props.story})}>
                  <View style={styles.textView}>
                      <Text style={[styles.text, {color: White}]}>{username}</Text>
                  </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => navigation.pop()}>
                  <View style={styles.optionView}>
                      <Feather name="x" color="white" size={25} />
                  </View>
              </TouchableWithoutFeedback>
          </View>
      )
    };

    addStory(){
        console.log("adding story");
    }

    render(): React.Node {
        const { story: { source } } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <Image style={styles.image} source={{uri: source}} />
                    {this.renderTop()}
                </View>
                <View style={styles.footer}>
                    <TextInput value={this.state.storyText} onChangeText={(t)=>{this.setState({ storyText : t })}} placeholder={'Send Message'} placeholderTextColor={White} style={styles.input} />
                    <TouchableOpacity onPress={()=> this.addStory()} style={{padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <Feather name="send" color="white" size={25} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
        borderRadius: 5,
    },
    topContainer: {
        padding: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    linearGradient: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    imageProfile: {
        width: 38,
        height: 38,
        borderRadius: 19,
        borderWidth: 1,
    },
    textView: {
        flex: 1,
        marginRight: 10,
        marginLeft: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: '600'
    },
    optionView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionImage: {
        width: 20,
        height: 20,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 10
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: Platform.OS === 'android' ? 0 : 20,
        borderWidth: 1,
        borderColor: White,
        color: White,
        paddingLeft: 15,
        paddingRight: 15
    },
});
