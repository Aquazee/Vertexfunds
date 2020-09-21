import React, { Component } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';
import { White } from '../../../../themes/constantColors';
import { Button } from "native-base";
import { updatePassword } from "../../../../actions/authAction";
import { showToast } from '../../../../utils/toast';

class changePasswordScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Change Password',
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
        this.oldPasswordRef = this.updateRef.bind(this, 'oldPassword');
        this.newPasswordRef = this.updateRef.bind(this, 'newPassword');
        this.confirmPasswordRef = this.updateRef.bind(this, 'confirmPassword');
    }

    componentDidMount() {
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    onSubmit() {
        let { oldPassword, newPassword, confirmPassword } = this.state;
        if (confirmPassword != newPassword) {
            showToast('Confirm password and new password should be same');
        } else {
            this.props.changePassword(this.props.userId, oldPassword, newPassword)
        }
    }

    onchangeText(label, val) {
        this.setState({ [label]: val })
    }

    render() {
        const { theme, navigation } = this.props;
        const { oldPassword, newPassword } = this.state;
        return (
            <View style={[
                styles.container,
                { backgroundColor: theme.container.backgroundColor },
            ]}>
                <ScrollView contentContainerStyle={styles.innerViewContainer}>
                    <View style={styles.innerViewContainer}>
                        <TextField
                            ref={this.oldPasswordRef}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            fontSize={14}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={true}
                            label="Old Password"
                            onChangeText={(text) => { this.onchangeText('oldPassword', text) }}
                            value={oldPassword}
                        />
                        <TextField
                            ref={this.newPasswordRef}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            fontSize={14}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={true}
                            onChangeText={(text) => { this.onchangeText('newPassword', text) }}
                            value={newPassword}
                            label="New Password"
                        />
                        <TextField
                            ref={this.confirmPasswordRef}
                            textColor={theme.primaryColor}
                            tintColor={theme.primaryColor}
                            baseColor={theme.primaryAlphaColor}
                            errorColor={theme.buttonRed}
                            fontSize={14}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={true}
                            label="Confirm Password"
                            onChangeText={(text) => { this.onchangeText('confirmPassword', text) }}
                        />
                        <Button
                            style={{ fontSize: 15, color: White }}
                            containerStyle={[
                                styles.loginButton,
                                { backgroundColor: theme.buttonRed },
                            ]}
                            onPress={() => this.onSubmit()}>
                            Change Password
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
    userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
    changePassword: (userId, oldPassword, newPassword) => dispatch(updatePassword(userId, oldPassword, newPassword)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(changePasswordScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerViewContainer: {
        flex: 1,
        padding: 12,
        paddingTop: 0,
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

