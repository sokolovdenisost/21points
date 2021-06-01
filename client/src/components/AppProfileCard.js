import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { THEME } from '../theme';

export const AppProfileCard = ({ user }) => {
    const checkString = (str) => {
        const arrString = str.split('');

        if (
            arrString[0] === 'h' &&
            arrString[1] === 't' &&
            arrString[2] === 't' &&
            arrString[3] === 'p'
        )
            return str;

        return 'http://192.168.0.21:3001/' + str;
    };
    return (
        <View style={styles.block}>
            <Image style={styles.image} source={{ uri: checkString(user.avatar) }} />
            <View style={styles.info}>
                <View style={styles.infoBlock}>
                    <Text style={styles.textLabel}>Логин: </Text>
                    <Text style={styles.textInfo}>{user.login}</Text>
                </View>
                <View style={styles.infoBlock}>
                    <Text style={styles.textLabel}>Рейтинг: </Text>
                    <Text style={styles.textInfo}>{user.raiting}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
        marginVertical: 20,
        width: Dimensions.get('window').width - 20,
        backgroundColor: THEME.SECOND_COLOR,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 5,
    },
    info: {
        marginLeft: 20,
    },
    infoBlock: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textLabel: {
        fontSize: 20,
        fontFamily: 'roboto-medium',
    },
    textInfo: {
        fontSize: 18,
        fontFamily: 'roboto-regular',
    },
});
