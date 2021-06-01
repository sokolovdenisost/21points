import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { THEME } from '../theme';

export const AppProfileInfo = ({ user }) => {
    const procent = (games) => {
        const wins = games.filter((g) => g.gameId.result === 'win');

        if (games.length) {
            return Math.round((wins.length / games.length) * 100);
        }

        return false;
    };

    return (
        <View style={styles.block}>
            <Text style={styles.infoText}>Информация</Text>
            <View style={styles.infoBlock}>
                <Text style={styles.blockText}>Всего игр: </Text>
                <Text style={styles.blockText}>{user.games.length}</Text>
            </View>
            <View style={styles.infoBlock}>
                <Text style={styles.blockText}>Денег: </Text>
                <Text style={styles.blockText}>{user.money}</Text>
            </View>
            <View style={styles.infoBlock}>
                <Text style={styles.blockText}>% Побед: </Text>
                <Text style={styles.blockText}>{procent(user.games)}%</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
        width: Dimensions.get('window').width - 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: THEME.SECOND_COLOR,
        marginBottom: 20,
    },
    infoText: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'roboto-medium',
        color: '#000',
    },
    infoBlock: {
        marginTop: 10,
        backgroundColor: THEME.MAIN_COLOR,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    blockText: {
        fontSize: 18,
        fontFamily: 'roboto-regular',
        color: '#fff',
    },
});
