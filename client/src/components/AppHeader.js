import React from 'react';
import { View, StyleSheet, Text, Image, Platform } from 'react-native';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { THEME } from '../theme';
import { AppTextMedium } from './ui/AppTextMedium';
import { AppTextRegular } from './ui/AppTextRegular';
import { AppTextBold } from './ui/AppTextBold';

const heightStatusBar = StatusBar.currentHeight;

export const AppHeader = ({ user }) => {
    const checkString = (str) => {
        const arrString = str.split('');

        if (
            arrString[0] === 'h' &&
            arrString[1] === 't' &&
            arrString[2] === 't' &&
            arrString[3] === 'p'
        )
            return true;

        return false;
    };

    const imageURI = checkString(user.avatar)
        ? user.avatar
        : 'http://192.168.0.21:3001/' + user.avatar;

    return (
        <View style={styles.block}>
            <View style={styles.left}>
                <Image style={styles.image} source={{ uri: imageURI }} />
                <View style={styles.info}>
                    <AppTextMedium style={styles.text}>{user.login}</AppTextMedium>
                    <View style={styles.money}>
                        <Ionicons name="ios-card-sharp" size={24} color={THEME.SECOND_COLOR} />
                        <AppTextRegular style={styles.textMoney}>{user.money}</AppTextRegular>
                    </View>
                </View>
            </View>
            <View style={styles.right}>
                <AppTextBold style={styles.rating}>Рейтинг</AppTextBold>
                <AppTextRegular style={styles.ratingNumber}>{user.raiting}</AppTextRegular>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
        marginTop: Platform.OS === 'ios' ? 25 : heightStatusBar,
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 1,
        height: 70,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        flexDirection: 'row',
    },
    image: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: THEME.MAIN_COLOR,
        borderRadius: 5,
    },
    info: {
        marginLeft: 10,
    },
    text: {
        fontSize: 18,
    },
    money: {
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textMoney: {
        marginLeft: 5,
        fontSize: 16,
    },
    right: {},
    rating: {
        fontSize: 18,
    },
    ratingNumber: {
        textAlign: 'center',
        fontSize: 16,
    },
});
