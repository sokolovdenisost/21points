import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import { THEME } from '../../theme';
import { AppTextBold } from './AppTextBold';

export const AppCard = ({ title, image, select, onPress }) => {
    const styleSelect = {
        backgroundColor: select ? THEME.MAIN_COLOR : '#fff',
    };
    const styleSelectText = {
        color: select ? '#fff' : THEME.MAIN_COLOR,
    };

    return (
        <TouchableOpacity activeOpacity={0.4} onPress={onPress}>
            <View style={{ ...styles.block, ...styleSelect }}>
                <Image style={styles.image} source={image} />
                <AppTextBold style={{ ...styles.title, ...styleSelectText }}>{title}</AppTextBold>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    block: {
        width: Dimensions.get('window').width - 20,
        borderColor: THEME.MAIN_COLOR,
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
        marginBottom: 15,
    },
    image: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 330,
        height: 170,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 10,
        color: THEME.MAIN_COLOR,
    },
});
