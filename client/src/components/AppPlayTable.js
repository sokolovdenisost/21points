import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';

import { THEME } from '../theme';
import { AppTextBold } from './ui/AppTextBold';

export const AppPlayTable = ({ player, count, style, cards }) => {
    const mapToCards = cards.map((c) => {
        return <Image style={styles.image} source={c.image} key={c.title + Math.random()} />;
    });
    return (
        <View style={{ ...styles.block, ...style }}>
            <AppTextBold style={styles.text}>
                {player} - {count}
            </AppTextBold>
            <View style={styles.cards}>{mapToCards}</View>
        </View>
    );
};

const width = Dimensions.get('window').width - 10;

const styles = StyleSheet.create({
    block: {
        width: width,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingHorizontal: 4,
        paddingVertical: 5,
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: THEME.MAIN_COLOR,
    },
    cards: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 20,
        marginTop: 5,
    },
    image: {
        width: width / 4 - 5,
        height: 135,
        borderRadius: 5,
        marginLeft: -25,
    },
});
