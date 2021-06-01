import React from 'react';
import { TextInput, StyleSheet, Dimensions, View } from 'react-native';
import { THEME } from '../../theme';

export const AppTextInput = ({
    title,
    style,
    password,
    styleInput,
    type,
    onFocus,
    onEndEditing,
    name,
    setForm,
    form,
    value,
}) => {
    return (
        <View style={{ ...styles.text, ...style }}>
            <TextInput
                value={value}
                onEndEditing={onEndEditing}
                keyboardType={type}
                onFocus={onFocus}
                secureTextEntry={password || false}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ ...styles.textInput, ...styleInput }}
                placeholder={title}
                onChangeText={(text) => setForm({ ...form, [name]: text })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#EDEDED',
        borderWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        width: Dimensions.get('window').width - 60,
        borderRadius: 10,
        fontSize: 18,
        fontFamily: 'roboto-medium',
    },
});
