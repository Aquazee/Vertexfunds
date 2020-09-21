import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import StoryItem from '../../../components/feed/StoryItem';
import FeedItem from '../../../components/feed/FeedItem';
import stories from '../story/stories';
import { } from "../../../actions/feedAction";
import { Icon } from 'native-base';

class feedScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            storyData: [],
        };
        this.onEndReachedCalledDuringMomentum = true;
    }

    static navigationOptions({ navigation, auth }) {
        return {
            headerShown: false
        }
    };

    onPress(type) {
        if (type === 'SearchScreen') {
            this.props.navigation.push(type);
        }
    };

    onStoryPress = (type, item, index) => {
        if (type === 'storyOpen') {
            this.props.navigation.navigate('Stories', { stories });
        }
    };

    renderHeader = () => {
        var { storyData } = this.state;
        const { theme, navigation, tposts } = this.props;
        storyData = tposts ? tposts.content : storyData;
        return <View style={{ paddingTop: 10, paddingBottom: 5 }}>
            <FlatList
                data={storyData}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <StoryItem
                    theme={theme}
                    item={item}
                    navigation={navigation}
                    onStoryPress={this.onStoryPress} />
                }
                keyExtractor={(item, index) => index.toString()}
                extraData={storyData}
                horizontal={true}
            />
        </View>;
    };

    FlatListSeparator = () => {
        return (
            <View style={styles.separator}></View>
        );
    }

    Header = () => (
        <View>
            <View style={{ backgroundColor: "#5927e0", height: 220, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, padding: 15 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", marginBottom: 15 }}>
                    <View style={{ height: 150, width: 170, backgroundColor: "#fff", borderRadius: 5, justifyContent: "center", alignItems: "center", marginRight: 15 }}>
                        <Image source={require('../../../assets/dark/stocksGrow.png')} style={{ height: 40, width: 35 }} />
                        <Text style={{ color: "#546074" }}>Current Value</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                            <Text style={{ fontSize: 22, color: "#546074" }}>Rs. 60,100 </Text>
                            <Icon type={"FontAwesome"} name={"angle-double-up"} style={{ color: "green" }} />
                        </View>
                    </View>
                    <View style={{ height: 150, width: 170, backgroundColor: "#fff", borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                        <Image source={require('../../../assets/dark/handholdingusd.png')} style={{ height: 40, width: 35 }} />
                        <Text style={{ color: "#546074" }}>Current Value</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                            <Text style={{ fontSize: 22, color: "#546074" }}>Rs. 60,000 </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={{ alignSelf: "flex-end", color: "#fff", marginRight: 10 }}>View Your Portfolio</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row", color:"#fff", alignItems:"center", width:"100%", justifyContent:"space-between", paddingHorizontal: 15, marginTop:10}}>
                <Text style={{ color: "#66707c", marginVertical: 10,  fontSize: 16, alignSelf:"flex-start" }}>Top Rated Funds</Text>
                <TouchableWithoutFeedback onPress={() =>this.onPress('SearchScreen')}><Icon type="FontAwesome" name="search" style={{color : "#66707c"}} /></TouchableWithoutFeedback>
            </View>
        </View>
    )

    render() {
        const { theme, navigation, feeds, userId } = this.props;
        const data = stories;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ color: "#fff", fontSize: 24, }}>Dashboard</Text>
                </View>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this.Header}
                    renderItem={({ item }) => <FeedItem
                        theme={theme}
                        item={item}
                        navigation={navigation}
                        onPress={(type) => this.onPress(type, item)}
                    />
                    }
                    //ItemSeparatorComponent={this.FlatListSeparator}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={feeds}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(feedScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerViewContainer: {
        flex: 1,
        padding: 12,
        paddingTop: 8,
        paddingBottom: 8,
    },
    iconView: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        width: 25,
        height: 25,
    },
    modal: {
        flex: 1
    },
    separator: {
        height: 0.5,
        width: '100%',
        marginTop: 16,
        backgroundColor: '#C8C8C8'
    },
    header: { backgroundColor: "#5927e0", paddingBottom: 20, justifyContent: "center", alignItems: "center", }
});
