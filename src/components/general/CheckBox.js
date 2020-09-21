import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Icon } from "native-base";

const inactive = require('../../assets/dark/blank-check-box.png');
const active = require('../../assets/dark/checkbox.png');
const CheckBox = (props) => {
    let { label, isChecked, onPress, styel } = props;
    let isactiveicon = isChecked ? active : inactive
    return (<TouchableWithoutFeedback style={[styel]} onPress={() => onPress(label)}  >
        <View style={styles.radioParent}>
            <View style={[styles.radiobtnContainer]} >
                {/* <Icon type="FontAwesome" name={isactiveicon} style={{fontSize:28}}/> */}
                <Image source={isactiveicon} style={{ height: 20, width: 20,  }} />
            </View>
            <View style={styles.label}>
                <Text style={styles.genderText}>{label}</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>)
}

const styles = {
    label: { alignSelf: 'flex-start', paddingLeft: 5, height: '100%', justifyContent: 'center' },
    genderText: { color: '#545454', fontSize: 16 },
    radiobtn: { width: '100%', resizeMode: 'contain' },
    radioParent: { flexDirection: 'row', justifyContent: 'flex-start', height: 25, marginRight: 10, justifyContent: 'center', },
    radiobtnContainer: { alignSelf: 'center', marginRight: 3 },
}

export default CheckBox;