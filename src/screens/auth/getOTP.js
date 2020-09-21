import React, { Component } from "react";
import PropTypes from "prop-types";
import { Alert, Text, SafeAreaView, View, ScrollView } from "react-native";
import { Item, Label, Input, Icon, Form } from "native-base";
import { connect } from "react-redux";
import CountDown from 'react-native-countdown-component';
import { Login, updateAuthData } from "../../actions/authAction";
import Title from '../../components/general/Title';
import { TextInput } from "react-native-gesture-handler";
import { showToast } from "../../utils/toast";

class GetOtp extends Component {
  static navigationOptions = ({ navigation, route }) => {
    return {
      header: null
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      getOTP: false,
      code: "",
      mobile: "",
      hideTimer: false,
      ongetotp: false
    };
  }

  otp(code) {
    var code = this.state.code;
    if (this.props.mobile != "" && this.state.code != "") {
      this.props.userLoginSuccess({ mobile, code });
    }
  }

  _onFinishCheckingCode2(code) {
    var { otp, mobile } = this.props;
    if (code.length == 4) {
      if (otp == code) {
        this.props.Login({ mobile, code });
      }else{
        //Comment Else before going live
        this.props.updateAuthData({userToken : "12345454"});
        
        //showToast("please enter valid code")
      }
    }
    this.setState({ code: code })
  }

  render() {
    const { theme, mobile } = this.props;
    const form = (
      <Form>
        {
          !this.state.hideTimer ?
            <CountDown style={{ textAlign: 'center', background: "transparent", padding: 0, margin: 0 }}
              until={60 * 0 + 30} size={15}
              digitStyle={{ backgroundColor: '#FFF', fontSize: 10, }}
              timeToShow={['M', 'S']}
              timeLabels={{ m: '', s: '' }}
              showSeparator
              sRemaining={1000 * 120} onFinish={() => this.setState({ hideTimer: !this.state.hideTimer })} allowFontScaling={true} />
            :
            <Text onPress={() => this.setState({ hideTimer: !this.state.hideTimer })} hide={this.state.hideTimer}
              style={{ color: "#008be0", alignSelf: 'center', paddingTop: 20, fontSize: 16 }}>Resend OTP</Text>
        }
      </Form>
    );
    return (<SafeAreaView
      style={[{ backgroundColor: theme.container.backgroundColor, flex: 1 }]}>
      <ScrollView
        contentContainerStyle={{ flex: 1, }}
        style={{ paddingHorizontal: 10, }}
        scrollEnabled={false}>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Icon name="shield" type="FontAwesome" style={{ color: "#c32f27", fontSize: 204, alignItems: "center" }} />
        </View>
        <View style={[{
          marginTop: 30,
          marginHorizontal: 25,
          alignItems: "center",
          shadowColor: "#000", shadowOffset: { width: 0, height: 10, }, shadowOpacity: 0.53, shadowRadius: 13.97, elevation: 21,
        }]}>
          <Title theme={theme} title={'Enter your OTP received, to login account.'} style={{ textAlign: "center", fontSize: 24, }} />
          <Text theme={theme} style={{ textAlign: "center", fontSize: 17, color: "#333", marginTop: 10 }} >{"We've send the OTP on " + mobile + "."}</Text>
          <TextInput value={this.state.otp} placeholder={"OTP"} style={{ textAlign: "center", width: 150, fontSize: 34, borderBottomColor: "#ececec", borderBottomWidth: 1, letterSpacing: 15 }} onChangeText={(t) => { this._onFinishCheckingCode2(t) }} />
          {form}
        </View>
      </ScrollView>
    </SafeAreaView>)
  }
}

GetOtp.propTypes = {
  auth: PropTypes.object,
};

const styles = {
  itemForm: {
    marginTop: 42,
  },
  inputText: {
    fontSize: 17,
    height: 40,
    margin: 0,
    padding: 0,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
}


const mapStateToProps = state => ({
  auth: state.auth,
  theme: state.auth.theme,
  mobile: state.auth.mobile
});

const mapDispatchToProps = dispatch => ({
  userLoginSuccess: ({ mobile, code }) => dispatch(userLoginSuccess({ mobile, code })),
  updateAuthData:(data) => dispatch(updateAuthData(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetOtp);
