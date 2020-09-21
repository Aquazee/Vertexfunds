import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { LOGIN, LOGOUT } from '../actions/types';
// import {getStore} from '../../App';
import { regex } from '../utils/regex';
import { White } from '../themes/constantColors';
import { connect } from "react-redux";
import { Logout } from "../actions/authAction";

class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void  {
        this.bootstrapAsync();
        regex.changeStatusStyle('default');
    }

    async bootstrapAsync(){
        let userToken;

        try {
            userToken = this.props.auth.userToken;
            //userToken = await AsyncStorage.getItem('userToken');
            if (userToken) {
                //this.props.dispatch({ type: LOGIN, payload: userToken });
                //this.props.login()
                console.log("Splashscreen usertoken : " + this.props.auth.userToken )
            } else {
                this.props.logout()
            }
        } catch (e) {
            this.props.logout()
            //this.props.dispatch({ type: LOGOUT });
        }
    };

    render() {
        const { theme, navigation } = this.props;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: White }}>
                <Image source={require('./../assets/light/appicon.png')} style={{ width: 111, height: 95 }} />
            </View>
        );
    }
}



const mapStateToProps = state => ({
    auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(Logout())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SplashScreen);
