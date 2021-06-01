import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';

import { THEME } from '../../theme';

export const AppPlayHistory = ({ type, bet, countEnemy, countPlayer, raiting }) => {
    const [active, setActive] = useState(false);
    const backgroundColor =
        type === 'win'
            ? THEME.WIN_COLOR
            : type === 'lose'
            ? THEME.LOSE_COLOR
            : type === 'draw'
            ? THEME.DRAW_COLOR
            : null;

    const text =
        type === 'win'
            ? 'ВЫИГРЫШЬ'
            : type === 'lose'
            ? 'ПРОИГРЫШЬ'
            : type === 'draw'
            ? 'НИЧЬЯ'
            : null;

    const border = {
        borderBottomColor: active ? '#000' : null,
        borderBottomWidth: active ? 2 : 0,
        paddingBottom: active ? 5 : 0,
    };

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => setActive(!active)}>
            <View style={{ ...styles.card, backgroundColor: backgroundColor }}>
                <View style={{ ...styles.block, ...border }}>
                    <Text style={styles.text}>РЕЗУЛЬТАТ: {text}</Text>
                    <Text style={styles.text}>СТАВКА: {bet}</Text>
                </View>
                {active ? (
                    <View style={styles.info}>
                        <Text style={styles.text}>Игрок(вы): {countPlayer}</Text>
                        <Text style={styles.text}>Диллер: {countEnemy}</Text>
                        <Text style={styles.text}>
                            Рейтинг: {text === 'ПРОИГРЫШЬ' ? '-' + raiting : raiting}
                        </Text>
                    </View>
                ) : null}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width - 20,
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginBottom: 10,
        borderRadius: 10,
    },
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'roboto-medium',
    },
    info: {
        marginTop: 5,
    },
});
