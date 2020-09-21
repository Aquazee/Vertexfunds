import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import loginScreen from '../screens/auth/loginScreen';
import organisationScreen from '../screens/dashboard/feed/organisationScreen';
import GetOTP from '../screens/auth/getOTP';
import { connect } from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import feedScreen from '../screens/dashboard/feed/feedScreen';
import profileScreen from '../screens/dashboard/profile/profileScreen';
import editProfileScreen from '../screens/dashboard/profile/menu/editProfileScreen';
import searchScreen from '../screens/dashboard/feed/searchScreen';
import settingScreen from '../screens/dashboard/profile/menu/settingScreen';
import { Red } from '../themes/constantColors';
import { regex } from '../utils/regex';
import Feather from 'react-native-vector-icons/Feather';

let RootStack = createStackNavigator();
let Tab = createBottomTabNavigator();

const styleBack = { width: 20, height: 20, marginLeft: 15 };

const loginNavigationOption = (theme, navigationVisible) => {
  return {
    headerShown: navigationVisible,
    headerBackTitleVisible: false,
    headerBackImage: () => {
      return <Image style={styleBack} source={theme.icons.back} />;
    },
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: "#5927e0",
      shadowOpacity: 0,
      shadowOffset: { height: 0, width: 0 },
      shadowRadius: 0,
      elevation: 0,
    },
  };
};

const mapStateToPropsStack = state => ({
  loading: state.auth.loading,
  theme: state.auth.theme,
  competition: state.competition.data,
  profile: state.competition.profile,
});

let FeedStack = createStackNavigator();

class FeedStackScreenWrapper extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { theme, loading, navigation, route } = this.props;
    navigation.setOptions({
      tabBarVisible: regex.isEmpty(route.state) || route.state.index === 0,
    });
    let navigationVisible = !loading;

    return (
      <FeedStack.Navigator
        initialRouteName="Feed"
        screenOptions={loginNavigationOption(theme, navigationVisible)}>
        <FeedStack.Screen
          name="Dashboard"
          component={feedScreen}
          options={feedScreen.navigationOptions}
        />
        <FeedStack.Screen
          name="SearchScreen"
          component={searchScreen}
          options={searchScreen.navigationOptions}
        />
        <FeedStack.Screen
          name="Organisation"
          component={organisationScreen}
          options={organisationScreen.navigationOptions}
        />
      </FeedStack.Navigator>
    );
  }
}

export const FeedStackScreen = connect(mapStateToPropsStack)(
  FeedStackScreenWrapper,
);


let ProfileStack = createStackNavigator();

class ProfileStackScreenWrapper extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { theme, loading, navigation, route } = this.props;
    navigation.setOptions({
      tabBarVisible: regex.isEmpty(route.state) || route.state.index === 0,
    });
    let navigationVisible = !loading;

    return (
      <ProfileStack.Navigator
        screenOptions={loginNavigationOption(theme, navigationVisible)}>
        <ProfileStack.Screen
          name="Profile"
          component={profileScreen}
          options={{ headerShown: false }}
        />
        <ProfileStack.Screen
          name="Setting"
          component={settingScreen}
          options={settingScreen.navigationOptions}
        />
      </ProfileStack.Navigator>
    );
  }
}

export const ProfileStackScreen = connect(mapStateToPropsStack)(
  ProfileStackScreenWrapper,
);

let appNav = null;

class AppNavigator extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    appNav = this;
  }

  tabBarIcon = ({ color, size }) => (
    <Feather name="home-outline" color={color} size={size} />
  );

  render() {
    const { theme, interests, userToken, loading } = this.props;
    let navigationVisible = !loading;
    if (loading) {
      return <SplashScreen />;
    }

    if (!userToken || userToken == "") {
      return (
        <NavigationContainer>
          <RootStack.Navigator
            initialRouteName="Login"
            screenOptions={loginNavigationOption(theme, navigationVisible)}>
            <RootStack.Screen
              {...this.props}
              name="Login"
              component={loginScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="GetOtp"
              component={GetOTP}
              options={{ title: '' }}
            />
          </RootStack.Navigator>
        </NavigationContainer>);
    } 
    // else if (true) {
    //   return (<NavigationContainer>
    //     <RootStack.Navigator
    //       screenOptions={loginNavigationOption(theme, navigationVisible)}>
    //     <FeedStack.Screen
    //       name="Organisation"
    //       component={organisationScreen}
    //       options={organisationScreen.navigationOptions}
    //     />
    //     </RootStack.Navigator>
    //   </NavigationContainer>);
    // }
    else {
      return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
              showLabel: false,
              activeTintColor: "#5927e0",
              inactiveTintColor: theme.primaryColor,
              activeBackgroundColor: theme.container.backgroundColor,
              inactiveBackgroundColor: theme.container.backgroundColor,
              style: {
                backgroundColor: theme.container.backgroundColor,
                borderTopWidth: 0,
              },
            }}>
            <Tab.Screen
              name="Home"
              component={FeedStackScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Feather name="home" color={color} size={size} />
                ),
              }}
            />

            <Tab.Screen
              name="Profile"
              component={ProfileStackScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Feather name="user" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>);
    }
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  userToken: state.auth.userToken,
  interests: state.auth.interests,
  theme: state.auth.theme,
  auth: state.auth,
});

export default connect(mapStateToProps)(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconImage: {
    width: 18,
    height: 18,
  },
});
