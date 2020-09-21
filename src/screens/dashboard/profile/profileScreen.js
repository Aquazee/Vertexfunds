import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, CardItem, Content } from "native-base";
import { Tab, Tabs, TabHeading, Icon } from 'native-base';
import { regex } from '../../../utils/regex';
import { LINK } from '../../../themes/constantColors';
import { getOtherProfiles } from "../../../actions/userAction";
import Spinner from 'react-native-loading-spinner-overlay';
import { PROFILE_PIC } from "../../../../app.json";
import { updateAuthData } from '../../../actions/authAction';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { showToast } from '../../../utils/toast';
import A_PieChart from "../../../components/charts/A_PieChart";

String.prototype.Capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

class profileScreen extends Component {

    navigationOptions({ navigation, route, auth }) {
        let header = {
            title: regex.isEmpty(route.params) ? 'Profile' : route.params.user.username,
        };

        if (regex.isEmpty(route.params)) {
            header.headerRight = () => {
                return <TouchableWithoutFeedback onPress={() => { navigation.navigate('Setting') }}>
                    <View style={styles.iconView}>
                        <Image
                            resizeMode={'contain'}
                            style={styles.iconImage}
                            source={this.props.auth.theme.icons.setting}
                        />
                    </View>
                </TouchableWithoutFeedback>
            }
        }
        return header;
    };

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onChangeTab = (index) => {
        this.setState({ selectedIndex: index.i })
    };


    usernamePress = (name) => {
        const { navigation } = this.props;
        let getUsername = name.replace('@', '');
        navigation.push('OtherProfile', { user: { username: getUsername, userId: 23, profilePic: 'https://scontent-bom1-2.cdninstagram.com/v/t51.2885-19/10593515_274006656127260_1937926446_a.jpg?_nc_ht=scontent-bom1-2.cdninstagram.com&_nc_ohc=K1x_KvjQoYIAX8Oj0h7&oh=4c6f8b782dc97fef7b30c9dd5817e4d0&oe=5EB6A2AF' } });
    };

    hashTagPress = (name) => {
        const { navigation } = this.props;
        navigation.push('HashTag', { hashTag: name });
    };

    openRoute(route) {
        this.props.navigation.push(route)
    }

    renderUserInfo = () => {
        const { theme, navigation, name, mobile, email, age } = this.props;
        const { isOtherProfile } = this.state;
        return (
            <View style={styles.userView}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={[styles.profileImage, { borderWidth: 1, justifyContent: "center", alignItems: "center", borderColor: "#818689" }]}><Icon type={"FontAwesome"} name={"user"} style={{ fontSize: 40, color: "#818689" }} /></View>
                </View>
                <View style={styles.nameView}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 5 }}>
                            <Text style={[styles.nameText, { color: theme.primaryColor }]}>{name}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            {
                                !isOtherProfile && <TouchableOpacity onPress={() => this.openRoute('Setting')} >
                                    <Icon name={"cog"} type={"FontAwesome"} style={{ alignSelf: "flex-end", justifyContent: "flex-end" }} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <View style={styles.followView}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={[styles.postCountText, { color: theme.primaryColor }]}>{10}</Text>
                            <Text style={[styles.postText, { color: theme.secondaryColor }]}>Total Shares</Text>
                        </View>
                        <TouchableWithoutFeedback >
                            <View style={{ alignItems: "center" }}>
                                <Text style={[styles.postCountText, { color: theme.primaryColor }]}>{30000}</Text>
                                <Text style={[styles.postText, { color: theme.secondaryColor }]}>Funds</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback >
                            <View style={{ alignItems: "center" }}>
                                <Text style={[styles.postCountText, { color: theme.primaryColor }]}>{5}</Text>
                                <Text style={[styles.postText, { color: theme.secondaryColor }]}>Future Investments</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        )
    };

    render() {
        const { theme } = this.props;
        return (
            <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.container} >
                {this.renderUserInfo()}
                <View style={{ backgroundColor: "#5927e0", paddingHorizontal: 20, paddingVertical: 25, paddingBottom: 60 }}>
                    <Text style={{ fontSize: 16, color: "#fff", marginVertical: 10 }}>Current Value</Text>
                    <Text style={{ fontSize: 30, color: "#fff", marginVertical: 15 }}>Rs 60,100</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <Text style={{ fontSize: 16, color: "#f17f6f", marginVertical: 10 }}>Rs. 100</Text>
                        <View style={{ backgroundColor: "green", borderRadius: 10, marginHorizontal: 10, paddingHorizontal: 15, paddingVertical: 3 }}><Text style={{ color: "#fff" }}>8.2 %</Text></View>
                    </View>
                    <Text style={{ fontSize: 16, color: "#fff", marginVertical: 10 }}>Annual Return (0.7%)</Text>
                    <View style={{ backgroundColor: "#fff", flexDirection: "row", paddingVertical: 15, borderRadius: 7, position: "absolute", bottom: -60, alignSelf: "center", elevation: 999 }}>
                        <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                            <Image source={require('../../../assets/dark/handholdingusd.png')} style={{ height: 40, width: 35 }} />
                        </View>
                        <View style={{ flex: 5, flexDirection: 'column', justifyContent: "space-around" }}>
                            <Text style={{ fontSize: 16, color: "#333" }}>Investment Value</Text>
                            <Text style={{ fontSize: 20, color: "#333", marginTop: 10 }}>Rs.60,000</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 3, paddingRight: 15, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 14, color: "#333", backgroundColor: 'green', paddingVertical: 30, paddingHorizontal: 5, borderRadius: 5, color: "#fff" }}>View Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Card style={{ marginTop: 70, width:"90%", alignSelf:"center" }}>
                    <CardItem>
                        <A_PieChart />
                    </CardItem>
                </Card>
                
            </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
    loading: state.user.loading,
    userId: state.auth.userId,
    name: state.auth.name,
    email: state.auth.email,
    age: state.auth.age,
    mobile: state.auth.mobile
});

const mapDispatchToProps = dispatch => ({
    getOtherProfiles: (data) => dispatch(getOtherProfiles(data)),
    updateAuthData: (data) => dispatch(updateAuthData(data)),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(profileScreen);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    userView: {
        flexDirection: 'row',
        paddingVertical: 25,
        paddingLeft: 15,
        paddingRight: 15
    },
    profileImage: {
        width: 84,
        height: 84,
        borderRadius: 42
    },
    nameView: {
        flex: 1,
        marginLeft: 15
    },
    nameText: {
        fontSize: 16,
        fontWeight: '800',
    },
    usernameText: {
        fontSize: 14,
        fontWeight: '600',
    },
    followView: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    postCountText: {
        fontSize: 14,
        fontWeight: '800',
    },
    postText: {
        marginTop: 2,
        fontSize: 12,
        fontWeight: '600',
    },
    bioView: {
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    bioText: {
        fontSize: 13,
        fontWeight: '400',
    },
    linkColor: { color: LINK, fontWeight: '600' },
    linkText: {
        marginTop: 5,
        fontSize: 13,
        fontWeight: '600',
    },
    button: {
        flex: 1,
        margin: 15,
        height: 36,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconView: {
        width: 35,
        height: 35,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        width: 25,
        height: 25,
    },
});

