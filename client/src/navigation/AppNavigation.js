import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import { MainScreen } from '../screens/MainScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { PlayScreen } from '../screens/PlayScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ShopScreen } from '../screens/ShopScreen';
import { TopScreen } from '../screens/TopScreen';
import { THEME } from '../theme';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { UserScreen } from '../screens/UserScreen';

const LoginNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
    },
    {
        defaultNavigationOptions: {
            title: 'Вход',
            headerTintColor: THEME.MAIN_COLOR,
            headerTitleStyle: {
                fontFamily: 'roboto-bold',
                fontSize: 20,
                textAlign: Platform.OS === 'android' ? 'left' : 'center',
            },
            headerStyle: {
                borderBottomWidth: 2,
                borderBottomColor: THEME.MAIN_COLOR,
            },
        },
    },
);

const RegisterNavigator = createStackNavigator(
    {
        Register: {
            screen: RegisterScreen,
        },
    },
    {
        defaultNavigationOptions: {
            title: 'Регистрация',
            headerTintColor: THEME.MAIN_COLOR,
            headerTitleStyle: {
                fontFamily: 'roboto-bold',
                fontSize: 20,
                textAlign: Platform.OS === 'android' ? 'left' : 'center',
            },
            headerStyle: {
                borderBottomWidth: 2,
                borderBottomColor: THEME.MAIN_COLOR,
            },
        },
    },
);

const BottomNavigatorNoAuth = createBottomTabNavigator(
    {
        Login: {
            screen: LoginNavigator,
            navigationOptions: {
                tabBarLabel: 'Вход',
                tabBarIcon: (info) => <Ionicons name="log-in" size={40} color={info.tintColor} />,
            },
        },
        Register: {
            screen: RegisterNavigator,
            navigationOptions: {
                tabBarLabel: 'Регистрация',
                tabBarIcon: (info) => (
                    <Ionicons name="person-add" size={40} color={info.tintColor} />
                ),
            },
        },
    },
    {
        navigationOptions: {
            header: null,
        },
        defaultNavigationOptions: {
            keyboardHidesTabBar: true,
            tabBarOptions: {
                activeTintColor: THEME.MAIN_COLOR,
                labelStyle: {
                    fontSize: 14,
                    fontFamily: 'roboto-medium',
                },
                style: {
                    textAlign: 'center',
                    height: 70,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderTopWidth: 2,
                    borderTopColor: THEME.MAIN_COLOR,
                },
            },
        },
    },
);

const TopNavigator = createStackNavigator(
    {
        Top: {
            screen: TopScreen,
            navigationOptions: {},
        },
        User: {
            screen: UserScreen,
            navigationOptions: {},
        },
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerShow: false,
        },
    },
);

const BottomNavigatorAuth = createBottomTabNavigator(
    {
        Play: {
            screen: PlayScreen,
            navigationOptions: {
                tabBarIcon: (info) => (
                    <Ionicons name="play-circle" size={40} color={info.tintColor} />
                ),
                tabBarLabel: 'Играть',
            },
        },
        Top: {
            screen: TopNavigator,
            navigationOptions: {
                tabBarIcon: (info) => <Ionicons name="star" size={40} color={info.tintColor} />,
                tabBarLabel: 'Топ',
            },
        },
        Shop: {
            screen: ShopScreen,
            navigationOptions: {
                tabBarIcon: (info) => (
                    <Ionicons name="ios-basket" size={40} color={info.tintColor} />
                ),
                tabBarLabel: 'Магазин',
            },
        },
        History: {
            screen: HistoryScreen,
            navigationOptions: {
                tabBarIcon: (info) => <Ionicons name="reader" size={40} color={info.tintColor} />,
                tabBarLabel: 'История',
            },
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: (info) => (
                    <Ionicons name="md-person-circle" size={40} color={info.tintColor} />
                ),
                tabBarLabel: 'Профиль',
            },
        },
    },
    {
        navigationOptions: {
            header: null,
        },
        defaultNavigationOptions: {
            keyboardHidesTabBar: true,
            tabBarOptions: {
                activeTintColor: THEME.MAIN_COLOR,
                inactiveTintColor: '#DADADA',
                labelPosition: 'below-icon',
                labelStyle: {
                    textAlign: 'center',
                    fontSize: 13,
                    fontFamily: 'roboto-medium',
                },
                style: {
                    textAlign: 'center',
                    height: 70,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderTopWidth: 2,
                    borderTopColor: THEME.MAIN_COLOR,
                },
            },
        },
    },
);

export const AppAuthNavigation = createAppContainer(BottomNavigatorAuth);
export const AppNoAuthNavigation = createAppContainer(BottomNavigatorNoAuth);
