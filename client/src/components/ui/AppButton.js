import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { THEME } from '../../theme';
import { AppTextBold } from './AppTextBold';

export const AppButton = ({ title, style, onPress, styleButton, disabled }) => {
    const disabledStyle = {
        backgroundColor: disabled ? '#D2D2D2' : THEME.MAIN_COLOR,
    };

    return (
        <TouchableOpacity activeOpacity={0.4} onPress={onPress} disabled={disabled || false}>
            <View style={{ ...styles.button, ...disabledStyle, ...styleButton }}>
                <AppTextBold style={{ ...styles.text, ...style }}>{title}</AppTextBold>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: Dimensions.get('window').width - 60,
        borderRadius: 10,
        backgroundColor: THEME.MAIN_COLOR,
        padding: 9,
        marginBottom: 15,
        alignItems: 'center',
    },
    text: {
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    },
});
