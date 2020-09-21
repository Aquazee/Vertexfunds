import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Body, Icon } from "native-base";

import { regex } from '../../utils/regex';
const t1 = "#f05956";
class FeedItem extends Component {
    constructor(props) {
        super(props);
    }

    cardPress = () => {
        const { item, navigation } = this.props;
        navigation.push('Organisation', { title: 'Axis Top Securities' });
    };

    render() {
        const { theme, item, navigation, onPress, type, index } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.cardPress}>
                <Card style={styles.cardStyle}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.parent}>
                            <View style={styles.alphabetCont}>
                                <Text style={styles.alphabet}>{item.name.charAt(0)}</Text>
                            </View>
                            <Text style={styles.cardlabel}>{item.name}</Text>
                        </View>
                        <View></View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                        <View style={{ fontSize: 14, flex: 1 }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../../assets/dark/dollarbag.png")} style={{ height: 20, width: 15, marginRight: 10 }} />
                                <Text style={styles.label}>Min Investment</Text>
                            </View>
                            <View><Text style={styles.value}>{item.min}</Text></View>
                        </View>
                        <View style={{ fontSize: 14, flex: 1 }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <Icon name={"th-large"} type={"FontAwesome5"} style={{ color: "#a3a3a3", fontSize: 14, marginRight: 7 }} />
                                <Text style={styles.label}>Category</Text>
                            </View>
                            <View><Text style={styles.value}>{item.category}</Text></View>
                        </View>
                        <View style={{ fontSize: 14, flex: 1 }}>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../../assets/dark/circledollar.png")} style={{ height: 20, width: 20, marginRight: 10 }} />
                                <Text style={styles.label}>Returns</Text>
                            </View>
                            <View><Text style={[styles.value, { color: "#ba5a7a" }]}>{item.returns}</Text></View>
                        </View>
                    </View>
                </Card>
            </TouchableWithoutFeedback>
        );
    }
}

export default FeedItem;

const styles = {
    value: { color: "#576062", fontSize: 16, alignSelf: "center", marginTop: 10, fontWeight: "bold" },
    label: { textAlign: "center", color: "#a3a3a3" },
    cardlabel: { color: "#2966ab", fontSize: 20, fontWeight: "bold", flexWrap: 'wrap' },
    alphabet: { color: "#fff", fontSize: 20 },
    alphabetCont: { borderRadius: 30, height: 35, width: 35, marginRight: 10, backgroundColor: "red", alignItems: "center", justifyContent: "center" },
    parent: { flexDirection: "row", alignItems: "center" },
    cardStyle: { width: "95%", margin: 10, alignSelf: "center", paddingHorizontal: 15, paddingVertical: 10 },
}