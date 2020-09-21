import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button } from "native-base";
import { TextField } from 'react-native-material-textfield';
import { OS } from '../../../../utils/regex';
import { White } from '../../../../themes/constantColors';
import ActionSheet from 'react-native-action-sheet';
import { Black } from '../../../../themes/constantColors';
import Feather from 'react-native-vector-icons/Feather';
import * as talentinoErrors from '../../../../utils/talentinoErrors';
import { UpdateProfileDetails } from '../../.././../actions/userAction';

class editProfileScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edit Profile',
        }
    };
    constructor(props) {
        super(props);
        const {user} = this.props
        let initDate = new Date(user.dateOfBirth);
        this.state = {
            selectedBirthDate: initDate,
            initDate: initDate,
            username: user.username,
            errors: {},
            cityDetails: user.city,
            showDate: false,
            secureTextEntry: true,
            selectedGender: user.gender,
            genericError: '',
            cityError: '',
            phoneError: '',
            genderError: '',
            birthDateError: '',
            gender: user.gender,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.firstName,
            phone: user.phoneNumber,
            genderOptions: [{
                label: 'Male',
                value: 'M',
            }, {
                label: 'Female',
                value: 'F',
            }, {
                label: 'Rather not say',
                value: 'R',
            }],

        };
        this.firstRef = this.updateRef.bind(this, 'firstName');
        this.lastRef = this.updateRef.bind(this, 'lastName');
        this.genderRef = this.updateRef.bind(this, 'gender');
        this.birthDateRef = this.updateRef.bind(this, 'birthDate');
        this.phoneRef = this.updateRef.bind(this, 'phone');
        this.usernameRef = this.updateRef.bind(this, 'username');
        this.emailRef = this.updateRef.bind(this, 'email');
        this.passwordRef = this.updateRef.bind(this, 'password');

        this.onFocus = this.onFocus.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
        this.onSubmitLastName = this.onSubmitLastName.bind(this);
        this.onSubmitPhone = this.onSubmitPhone.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onSubmitUsername = this.onSubmitUsername.bind(this);
        this.onSubmitCity = this.onSubmitCity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.showDatePicker = this.showDatePicker.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);

        this.onChangeGender = this.onChangeGender.bind(this);

        this.onAccessoryPress = this.onAccessoryPress.bind(this);
        this.onDateAccessoryPress = this.onDateAccessoryPress.bind(this);

        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
        this.renderDateAccessory = this.renderDateAccessory.bind(this);
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    onFocus() {
        let { errors = {} } = this.state;

        for (let name in errors) {
            let ref = this[name];

            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }

        this.setState({ errors });
    }

    onChangeText(text) {
        let { errors = {} } = this.state;

        ['email', 'firstName', 'lastName', 'password', 'username']
            .map(name => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.isFocused()) {
                    delete errors[name];
                    this.setState({ errors, [name]: text });
                }
            });
    }

    onSubmitEmail() {
        this.firstName.focus();
    }

    onSubmitFirstName() {
        this.lastName.focus();
    }

    onSubmitLastName() {
        this.phone.focus();
    }

    onSubmitPhone() {
        this.password.focus();
    }

    onSubmitPassword() {
        this.password.blur();
    }

    onSubmitUsername() {
        this.email.focus();
    }

    onSubmitCity() {
        this.city.focus();
    }

    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }

    onSubmit() {
        const { theme, navigation } = this.props;

        this.setState({ genericError: "", cityError: '', phoneError: '', genderError: '' });
        let { errors = {} } = this.state;

        ['email', 'firstName', 'lastName', 'password', 'username'].forEach(name => {
            let value = this[name].value();
            console.log("name:" + name + "::" + this[name].value());


            if (!value) {
                errors[name] = 'Should not be empty';
            } else {
                if (name === 'password' && value.length < 6) {
                    errors[name] = 'Too short';
                }
            }
        });

        if (this.state.cityDetails === null) {
            this.setState({ cityError: 'Should not be empty' });
        }

        if (this.state.gender === '') {
            this.setState({ genderError: 'Should not be empty' });
        }

        console.log("this:" + this.state.selectedBirthDate + "::" + this.state.initDate);
        if (this.state.selectedBirthDate.getTime() === this.state.initDate.getTime()) {
            console.log("in select birth date if");
            this.setState({ birthDateError: 'Select birth date' });
        }

        if (this.state.phone === '') {
            this.setState({ phoneError: 'Should not be empty' });
        }

        if (Object.keys(errors).length > 0 || this.state.phoneError !== ''
            || this.state.cityError !== '' || this.state.genderError !== ''
            || this.state.birthDateError !== '') {
            console.log("in if errors" + ":" + JSON.stringify(errors));
            return;
        }

        let payload = {};
        payload.firstName = this.state.firstName;
        payload.lastName = this.state.lastName;
        payload.gender = this.state.gender;
        payload.dateOfBirth = this.state.selectedBirthDate.getTime();
        payload.phoneCountryCode = this.state.phoneCountryCode;
        payload.phoneNumber = this.state.phone;
        payload.username = this.state.username;
        payload.email = this.state.email;
        payload.password = this.state.password;
        payload.city = {};
        payload.city.placeId = this.state.cityDetails.place_id;
        payload.city.lat = this.state.cityDetails.geometry.location.lat;
        payload.city.lng = this.state.cityDetails.geometry.location.lng;
        payload.city.formattedAddress = this.state.cityDetails.formatted_address;
        payload.city.name = this.state.cityDetails.name;
        console.log("payload::" + JSON.stringify(payload));

        this.props.signUp(payload).then((response) => {
            let error = response.payload;
            if (response.payload.data.code === 3000) {
                this.scrollViewRef.scrollTo({ y: this.usernameErrorLayout.y, animated: true });
                errors['username'] = talentinoErrors[3000];
            } else if (error.data.code === 3001) {
                this.scrollViewRef.scrollTo({ y: this.emailErrorLayout.y, animated: true });
                errors['email'] = talentinoErrors[3001];
            } else if (error.data.code === 3002) {
                this.scrollViewRef.scrollTo({ y: this.phoneErrorLayout.y, animated: true });
                this.setState({ phoneError: talentinoErrors[3002] });
            } else {
                this.scrollViewRef.scrollTo({ y: this.genericErrorLayout.y, animated: true });
                this.setState({ genericError: error.data.message })
            }
            this.setState({ errors });
            console.warn('Error:' + error && error);
        })
       
        this.setState({ errors });
    }

    onChangeDate(event, selectedDate) {
        if (selectedDate) {
            this.setState({ selectedBirthDate: selectedDate, showDate: false, birthDateError: '' });
            this.birthDate.setValue(this.formatDate(selectedDate));
        }
    }

    showDatePicker() {
        this.setState({ showDate: true });
    }

    renderPasswordAccessory() {
        const { theme, navigation } = this.props;
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

    renderDateAccessory() {
        const { theme, navigation } = this.props;
        let name = 'calendar';

        return (
            <Feather
                size={20}
                name={name}
                color={theme.primaryColor}
                onPress={this.onDateAccessoryPress}
                suppressHighlighting={true}
            >
            </Feather>

        );
    }

    onDateAccessoryPress() {
        this.setState({ showDate: true, birthDateError: '' });
    }

    formatDate(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    onChangeGender(value) {
        this.setState({ gender: value, genderError: '' });
    }

    onChangeTextPhone = ({ dialCode, unmaskedPhoneNumber, phoneNumber, isVerified }) => {
        this.setState({ phone: unmaskedPhoneNumber, phoneCountryCode: dialCode, phoneError: '' });
    };

    onCitySelected(details) {
        this.setState({ cityDetails: details, cityError: '' });
    }

    onChangeTextCity(city) {
    }

    getPhotoCallback = (response) => {
        this.setState({ profilePic: response.path })
    };

    openImagePicker(type) {
        const options = {
            width: 400,
            height: 400,
            cropping: true
        };
        if (type === 'camera') {
            ImagePicker.openCamera(options).then(this.getPhotoCallback);
        } else {
            ImagePicker.openPicker(options).then(this.getPhotoCallback);
        }
    }

    render() {
        let { errors = {}, secureTextEntry, username, firstName, lastName, email, password, birthDate, gender, phone, profilepic } = this.state;
        const { theme, navigation } = this.props;
        let name = firstName + " " + lastName;
        return (
            <View style={[ styles.container, { backgroundColor: theme.container.backgroundColor }]}>
                <ScrollView contentContainerStyle={styles.innerViewContainer} >
                        {this.state.genericError !== '' && <Text
                            onLayout={event => this.genericErrorLayout = event.nativeEvent.layout}
                            ref={this.genericErrorRef} style={{ color: theme.buttonRed, paddingTop: 16 }}>{this.state.genericError}</Text>}
                        <View style={[styles.nameView, { flexDirection: 'row' }]}>
                            <TextField
                                containerStyle={[styles.nameTextView, { marginRight: 10, flex: 1 }]}
                                ref={this.firstRef}
                                textColor={theme.primaryColor}
                                tintColor={theme.primaryColor}
                                baseColor={theme.primaryAlphaColor}
                                errorColor={theme.buttonRed}
                                fontSize={14}
                                autoCapitalize="none"
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitFirstName}
                                returnKeyType="next"
                                label="First Name"
                                value={this.state.firstName}
                                error={errors.firstName}
                            />
                            <TextField
                                containerStyle={[styles.nameTextView, { marginLeft: 10, flex: 1 }]}
                                ref={this.lastRef}
                                textColor={theme.primaryColor}
                                tintColor={theme.primaryColor}
                                baseColor={theme.primaryAlphaColor}
                                errorColor={theme.buttonRed}
                                fontSize={14}
                                autoCapitalize="none"
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onFocus={this.onFocus}
                                onChangeText={this.onChangeText}
                                onSubmitEditing={this.onSubmitLastName}
                                returnKeyType="next"
                                label="Last Name"
                                value={this.state.lastName}
                                error={errors.lastName}
                            />
                        </View>
                        <View style={styles.nameView}>
                            <View style={[styles.genderTextView]}>
                                <Dropdown containerStyle={[styles.dropdown]}
                                    ref={this.genderRef}
                                    textColor={theme.primaryColor}
                                    tintColor={theme.primaryColor}
                                    fontSize={14}
                                    onFocus={this.onFocus}
                                    onChangeText={(value) => this.onChangeGender(value)}
                                    baseColor={theme.primaryAlphaColor}
                                    errorColor={theme.buttonRed}
                                    label='Gender'
                                    value={this.state.gender}
                                    data={this.state.genderOptions}
                                    error={errors.gender}

                                />
                            </View>
                            <View style={styles.nameTextView}>
                                {this.state.showDate && <DateTimePicker
                                    testID="dateTimePicker"
                                    value={this.state.selectedBirthDate}
                                    maximumDate={new Date(this.state.selectedBirthDate)}
                                    mode="date"
                                    date={null}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(event, date) => this.onChangeDate(event, date)}
                                />}
                                <TextField
                                    ref={this.birthDateRef}
                                    onLayout={event => this.phoneErrorLayout = event.nativeEvent.layout}
                                    onFocus={this.onFocus}
                                    containerStyle={[styles.nameTextView, { marginLeft: 10 }]}
                                    defaultValue={this.formatDate(this.state.selectedBirthDate)}
                                    textColor={theme.primaryColor}
                                    tintColor={theme.primaryColor}
                                    baseColor={theme.primaryAlphaColor}
                                    errorColor={theme.buttonRed}
                                    fontSize={14}
                                    label="Birth Date"
                                    error={errors.birthDate}
                                    renderRightAccessory={this.renderDateAccessory}
                                />
                            </View>
                        </View>
                        {(this.state.genderError !== '' || this.state.birthDateError !== '') && <View style={styles.nameView}>
                            <Text style={[styles.nameTextView, { color: theme.buttonRed }]}>{this.state.genderError}</Text>
                            <Text style={[styles.nameTextView, { color: theme.buttonRed, marginLeft: 10 }]}>{this.state.birthDateError}</Text>
                        </View>}
                        <IntlPhoneInput ref={this.phoneRef}
                            onFocus={this.onFocus}
                            placeholder="Phone number" 
                            phoneInputStyle={styles.phoneInputStyle} 
                            flagStyle={styles.flagStyle} 
                            onChangeText={this.onChangeTextPhone} 
                            defaultCountry="IN" 
                            value={this.state.phone}
                            />
                        {this.state.phoneError !== '' && <Text style={{ color: theme.buttonRed, paddingTop: 0 }}>{this.state.phoneError}</Text>}
                        <TextField
                            onLayout={event => this.usernameErrorLayout = event.nativeEvent.layout}
                            ref={this.usernameRef}
                            containerStyle={[styles.nameTextView, { marginLeft: 0 }]}
                            value={username}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            fontSize={14}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onFocus={this.onFocus}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitUsername}
                            enablesReturnKeyAutomatically={true}
                            label="Username"
                            error={errors.username}
                        />
                        {/* <View style={[{ zIndex: 2, backgroundColor: 'white' }]}>
                            <GooglePlacesAutocomplete
                                ref={this.cityRef}
                                placeholder='City'
                                styles={{
                                    textInputContainer: {
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        borderTopWidth: 0,
                                        borderBottomWidth: 0.5,
                                    },
                                    textInput: {
                                        marginLeft: -12,
                                        marginRight: -12,
                                        marginTop: 10,
                                        color: '#5d5d5d',
                                        fontSize: 13,
                                    },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb',
                                    },
                                }}
                                keyboardShouldPersistTaps={'handled'}
                                listUnderlayColor={'transparent'}
                                textInputProps={{
                                    //onFocus: () => focusInput(),
                                    //onBlur: () => blurInput(),
                                    onChangeText: (text) => this.onChangeTextCity(text)
                                }}
                                minLength={3} // minimum length of text to search
                                returnKeyType={'search'}
                                listViewDisplayed={false}
                                fetchDetails={true}
                                onFocus={this.onFocus}
                                onSubmitEditing={this.onSubmitCity}
                                renderDescription={row => row.description} // custom description render
                                onPress={(data, details = null) => { this.onCitySelected(details) }}
                                getDefaultValue={() => ''}
                                query={{
                                    key: 'AIzaSyD-z3UcAfy7F2SXQRQSGP_q3H2uO6a4q-Y',
                                    language: 'en', // language of the results
                                    types: '(cities)' // default: 'geocode'
                                }}
                                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                debounce={200}
                                error={errors.city}
                            />
                            {this.state.cityError !== '' && <Text style={{ color: theme.buttonRed, paddingTop: 0 }}>{this.state.cityError}</Text>}
                        </View> */}

                        <TextField
                            ref={this.emailRef}
                            onLayout={event => this.emailErrorLayout = event.nativeEvent.layout}
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
                </ScrollView>
                <Button
                    style={{ fontSize: 15, color: White, }}
                    containerStyle={[
                        styles.loginButton,
                        { backgroundColor: theme.buttonRed },
                    ]}
                    onPress={() => this.onSubmit()}>
                    Save
            </Button>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
    name: state.auth.user.name,
    user: state.auth.user,
    username: state.auth.user.username,
    gender: state.auth.user.gender,
    interests: state.auth.user.interests,
    dob: state.auth.user.dateOfBirth,
    email: state.auth.user.email,
});
const mapDispatchToProps = dispatch => ({
    UpdateProfileDetails: (data) => dispatch(UpdateProfileDetails(data)),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(editProfileScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerViewContainer: {
        flex: 1,
        padding: 12,
        paddingTop: 8,
    },
    avatarView: {
        marginTop: 25,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarImage: {
        borderWidth: 1,
        height: 90,
        width: 90,
        borderRadius: 45
    },
    avatarImageText: {
        marginTop: 8,
        fontSize: 13,
        fontWeight: '800',
    },
    loginButton: {
        marginTop: 20,
        height: 46,
        overflow: 'hidden',
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

