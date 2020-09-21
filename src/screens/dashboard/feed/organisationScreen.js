import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import { } from "../../../actions/authAction";
import { Icon, Content } from 'native-base';
import { connect } from 'react-redux';
import A_LineChart from "../../../components/charts/A_LineChart";
import A_BarChart from "../../../components/charts/A_BarChart";

class Organisation extends Component {
    static navigationOptions = ({ navigation, route }) => {
        return {
            title: route.params ? route.params.title : 'Axis Bank',
            headerStyle: {
                backgroundColor: "#5927e0",
            },
            headerTintColor: "#fff",

        }
    };
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            storyData: [],
        };
    }

    static navigationOptions({ navigation, auth }) {
        return {
            headerShown: false
        }
    };
    render() {
        return (<ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={true}  contentContainerStyle={{ flexGrow:1}}>
            <View style={styles.content1}>
                <View style={styles.txt1}>
                    <Text style={styles.label}>Investment : </Text><Text style={[styles.value, { color: "#e4aa54" }]}>Rs 1220</Text>
                </View>
                <View style={styles.txt1}>
                    <Text style={styles.label}>Fund Type : </Text><Text style={styles.value}>Equity</Text>
                </View>
                <View style={styles.txt1}>
                    <Text style={styles.label}>Investment Period : </Text><Text style={styles.value}>Short Term</Text>
                </View>
                <View style={styles.txt1}>
                    <Text style={styles.label}>Risk Level : </Text><Text style={[styles.value, { color:"#0ad722" }]}>Low</Text>
                </View>
            </View>
            <View style={{paddingHorizontal:10, marginTop:10}}>
                <Text style={{marginVertical:10, color : "#6e7685", fontSize:16}}>Top Performance</Text>
                <A_LineChart />
            </View>
            <View style={{paddingHorizontal:10, marginTop:10}}>
                <Text style={{marginVertical:10, color : "#6e7685", fontSize:16}}>Monthly Performance</Text>
                <A_BarChart />
            </View>
        </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
    userId: state.auth.userId,
    token: state.auth.userToken,
});

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Organisation);


const styles = {
    header: { paddingBottom: 20, flexDirection: "row" },
    txt1: { flexDirection: "row", paddingVertical: 10, },
    label: { color: "#b09dea", fontSize: 16 },
    content1: { backgroundColor: "#5927e0", paddingVertical: 10, paddingHorizontal: 30 },
    value: { color: "#e4e5f7", fontSize: 16 }
}