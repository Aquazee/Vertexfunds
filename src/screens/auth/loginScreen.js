import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text, KeyboardAvoidingView, Dimensions, Platform } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Feather from 'react-native-vector-icons/Feather';
import { Button } from "native-base";
import { connect } from 'react-redux';
import { White } from '../../themes/constantColors';
import Title from '../../components/general/Title';
import { regex } from '../../utils/regex';
import { Login, updateAuthData } from "../../actions/authAction";
import { Icon } from 'native-base';
import CheckBox from "../../components/general/CheckBox";

class loginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      genericError: '',
      hideButton: 'false',
      statusBarHeight: 0,
      name: 'Sudip Sharma',
      email: 't@gmail.com',
      age: '41',
      mobile: '8108493587',
      password: '8108493587',
      gender: 'Male',
    };
    this.onFocus = this.onFocus.bind(this);
    this.mobileRef = this.updateRef.bind(this, 'mobile');
    this.nameRef = this.updateRef.bind(this, 'name');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.passwordRef = this.updateRef.bind(this, 'password');
    this.genderRef = this.updateRef.bind(this, 'gender');
    this.ageRef = this.updateRef.bind(this, 'age');

    this.onChangeText = this.onChangeText.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.onSubmitName = this.onSubmitName.bind(this);
    this.onSubmitMobile = this.onSubmitMobile.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitAge = this.onSubmitAge.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onFocus() {
    let { errors = {} } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.focused) {
        delete errors[name];
      }
    }

    this.setState({ errors, hideButton: true });
  }

  setStatusBarHeight() {
    const d = Dimensions.get("window")
    const isX = Platform.OS === "ios" && (d.height > 800 || d.width > 800) ? true : false

    if (Platform.isPad) {
      this.setState({ statusBarHeight: 24 });
      return
    }
    if (StatusBarManager.getHeight) {
      StatusBarManager.getHeight((statusBarFrameData) => {
        //this.statusBarHeight = statusBarFrameData.height;
        if (statusBarFrameData.height > 45) {
          this.setState({ statusBarHeight: 0 });
        }
        else {
          this.setState({ statusBarHeight: statusBarFrameData.height });
        }
      });
      Dimensions.addEventListener('change', () => {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
          this.setState({ orientation: 'portrait' }, () => {
            if (isX) {
              this.setState({ statusBarHeight: 44 });
            }

          });
        }
        else {
          this.setState({ orientation: 'landscape' }, () => {
            //this.setState({ statusBarHeight: 0 });
          });
        }
      });
      this.statusBarListener = StatusBarIOS.addListener('statusBarFrameWillChange', (statusBarData) => {
        this.statusBarHeight = statusBarData.frame.height;
        if (this.statusBarHeight) {
          if (isX) {
            if (this.statusBarHeight > 45) {
              this.setState({ statusBarHeight: 0 });
            }
            else if (Dimensions.get('window').width < Dimensions.get('window').height) {
              this.setState({ statusBarHeight: 44 });
            }
            else {
              this.setState({ statusBarHeight: this.statusBarHeight });
            }
          }
          else {
            this.setState({ statusBarHeight: this.statusBarHeight });
          }
        }
      });
    }
  }

  onChangeText(text) {
    ['mobile', 'name', 'email', 'password', 'age']
      .map(name => ({ 
        name, ref: this[name] 
      }))
      .forEach(({ name, ref }) => {
        if (ref.focused) {
          this.setState({ [name]: text });
        }
      });
  }

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
  }

  onForgotSubmit() {
    this.props.navigation.navigate('Forgot');
  }

  onSubmit1() {
    this.props.navigation.push('GetOtp');
  }

  onSubmit() {
    const self = this;
    const { navigation } = this.props;
    let errors = {};
    ['mobile', 'name', 'email', 'age', 'password'].forEach(name => {
      let value = this[name].value();
      if (name == 'email' && value == "" ) {
        errors[name] = 'Email should not be empty';
      } else if (name == 'email' && !regex.validateEmail(value)) {
        errors[name] = 'Please enter valid email.';
      }

      if (name == 'name' && value == "") {
        errors[name] = 'Name should not be empty';
      } else if (name == 'name' && value.length < 2 ) {
        errors[name] = 'Please enter your full name';
      }

      if (name == 'age' && value == '') {
        errors[name] = 'Age is required';
      }else if (name == 'age' && parseInt(value) < 18 ) {
        errors[name] = 'Please enter your full name';
      }

      if (name == 'mobile' && value.length < 10 && value.length > 10) {
        errors[name] = 'Please enter valid mobile number';
      }

      if (name == 'password' && value.length == 0 ) {
        errors[name] = 'Please enter valid password.';
      } else if (name == 'password' && value.length < 6 ) {
        errors[name] = 'Password should be minimum 6 charaters.';
      }
    });
    this.setState({ errors });
    if (Object.keys(errors).length > 0) {
      return;
    }
    let payload = {
      mobile: this.state.mobile,
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender,
      password: this.state.password,
      token : 'davbf1234541234fsccxv'
    };
    this.props.updateAuthData(payload);
    this.props.navigation.push('GetOtp');
  }

  renderPasswordAccessory() {
    const { theme } = this.props;
    let { secureTextEntry } = this.state;

    let name = secureTextEntry ? 'eye-off' : 'eye';

    return (
      <Feather
        size={20}
        name={name}
        color={theme.primaryColor}
        onPress={this.onAccessoryPress}
        suppressHighlighting={true}
      />
    );
  }


  onSubmitEmail() {
    this.age.focus();
  }

  onSubmitName() {
    this.mobile.focus();
  }

  onSubmitMobile() {
    this.email.focus();
  }

  onSubmitPassword() {
    this.password.blur();
  }

  onSubmitAge() {
    this.password.focus();
  }

  componentDidMount() {
    console.log(this)
  }
  setGender(val) {
    this.setState({ gender: val })
  }

  render() {
    let { errors = {}, secureTextEntry } = this.state;
    const { theme, navigation } = this.props;
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme.container.backgroundColor },
        ]}>
        <KeyboardAvoidingView keyboardVerticalOffset={this.state.statusBarHeight} style={styles.container} behavior={(Platform.OS === 'ios') ? "padding" : null} enabled={Platform.OS == "android" ? false : true}>
          <ScrollView keyboardShouldPersistTaps={"always"} keyboardDismissMode='on-drag'
            contentContainerStyle={styles.innerViewContainer}
            style={{ paddingHorizontal: 10, paddingVertical: 25 }}
            scrollEnabled={false}>
            {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Icon name="shield" type="FontAwesome" style={{ color: "#c32f27", fontSize: 204 }} />
          </View> */}
              <Title theme={theme} title={'Sign Up'} style={{ textAlign: "center", fontSize: 34, marginBottom: 20 }} />
              {this.state.genericError !== '' && <Text
                onLayout={event => this.genericErrorLayout = event.nativeEvent.layout}
                ref={this.genericErrorRef} style={{ color: theme.buttonRed, paddingTop: 16 }}>{this.state.genericError}</Text>}
              <TextField
                ref={this.nameRef}
                textColor={theme.primaryColor}
                tintColor={theme.primaryColor}
                baseColor={theme.primaryAlphaColor}
                errorColor={theme.buttonRed}
                fontSize={16}
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitName}
                returnKeyType="next"
                label="Name"
                value={this.state.name}
                error={errors.name}
              />
              <TextField
                ref={this.mobileRef}
                textColor={theme.primaryColor}
                tintColor={theme.primaryColor}
                baseColor={theme.primaryAlphaColor}
                errorColor={theme.buttonRed}
                fontSize={16}
                keyboardType={"numeric"}
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitMobile}
                returnKeyType="next"
                label="Mobile"
                value={this.state.mobile}
                error={errors.mobile}
              />
              <View style={{ flexDirection: 'row', marginVertical: 15 }}>
                <View style={{ flex: 3 }}>
                  <TextField
                   ref={this.emailRef}
                   textColor={theme.primaryColor}
                   tintColor={theme.primaryColor}
                   baseColor={theme.primaryAlphaColor}
                   errorColor={theme.buttonRed}
                   fontSize={14}
                   keyboardType="email-address"
                   autoCapitalize="none"
                   autoCorrect={false}
                   enablesReturnKeyAutomatically={true}
                   onFocus={this.onFocus}
                   onChangeText={this.onChangeText}
                   onSubmitEditing={this.onSubmitEmail}
                   returnKeyType="next"
                   label="Your Email"
                   value={this.state.email}
                   error={errors.email}
                  />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <TextField
                    ref={this.ageRef}
                    textColor={theme.primaryColor}
                    tintColor={theme.primaryColor}
                    baseColor={theme.primaryAlphaColor}
                    errorColor={theme.buttonRed}
                    fontSize={16}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitAge}
                    returnKeyType="next"
                    label="Age"
                    style={{ flex: 1 }}
                    value={this.state.age}
                    error={errors.mobile}
                  />
                </View>
              </View>


              <View style={{ flexDirection: 'row', alignItems: "center", marginBottom: 20, marginTop: 30 }}>
                <View style={{ marginRight: 15 }}>
                  <Text style={{ fontSize: 16 }}>Gender : </Text>
                </View>
                <CheckBox isChecked={this.state.gender == "Male"} label={"Male"} onPress={this.setGender.bind(this)} styel={{ marginRight: 22 }} />
                <CheckBox isChecked={this.state.gender == "Female"} label={"Female"} onPress={this.setGender.bind(this)} styel={{ marginRight: 12 }} />
                <CheckBox isChecked={this.state.gender == "Other"} label={"Other"} onPress={this.setGender.bind(this)} />
              </View>
              <TextField
                ref={this.passwordRef}
                textColor={theme.primaryColor}
                tintColor={theme.primaryColor}
                baseColor={theme.primaryAlphaColor}
                errorColor={theme.buttonRed}
                fontSize={14}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
                autoCorrect={false}
                //enablesReturnKeyAutomatically={true}
                onChangeText={this.onChangeText}
                //onSubmitEditing={this.onSubmitPassword}
                returnKeyType="done"
                label="Password"
                error={errors.password}
                renderRightAccessory={this.renderPasswordAccessory}
              />
              <Button
                style={{ fontSize: 15, color: White, width: "100%", marginTop:20, alignItems:"center", justifyContent:"center",}}
                onPress={() => this.onSubmit()}>
                <Text style={{color:"#fff" }}>Send OTP</Text>
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.auth.theme,
});

const mapDispatchToProps = dispatch => ({
  updateAuthData: (data) => dispatch(updateAuthData(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(loginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerViewContainer: {
    flex: 1,
    padding: 12,
    paddingTop: 8,
  },
  forgotView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '800',
  },
  forgotButton: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    width: 150,
    overflow: 'hidden',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginButton: {
    marginTop: 20,
    height: 46,
    overflow: 'hidden',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialView: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
