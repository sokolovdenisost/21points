import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { THEME } from '../theme';

export const AppTopCard = ({ login, avatar, games, raiting, onPress }) => {
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
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
            <View style={styles.block}>
                <View style={styles.info}>
                    <Image source={{ uri: checkString(avatar) }} style={styles.image} />
                    <Text style={styles.infoText}>{login}</Text>
                </View>
                <View style={styles.allInfo}>
                    <Text style={styles.textInfo}>Всего игр: {games.length}</Text>
                    <Text style={styles.textInfo}>Рейтинг: {raiting}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    block: {
        backgroundColor: THEME.SECOND_COLOR,
        borderRadius: 10,
        width: Dimensions.get('window').width - 20,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
    },
    infoText: {
        fontSize: 16,
        fontFamily: 'roboto-medium',
        textAlign: 'center',
        color: '#000',
        marginTop: 5,
        marginLeft: 5,
    },
    textInfo: {
        fontSize: 16,
        fontFamily: 'roboto-regular',
    },
});
