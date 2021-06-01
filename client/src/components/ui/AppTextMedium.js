import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const AppTextMedium = ({ children, style }) => {
    return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'roboto-medium',
    },
});
