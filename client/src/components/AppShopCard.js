import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';

import { THEME } from '../theme';
import { AppTextBold } from './ui/AppTextBold';
import { AppTextRegular } from './ui/AppTextRegular';

export const AppShopCard = ({
    styleImage,
    title,
    descr,
    img,
    descript,
    price,
    purchased,
    onPress,
}) => {
    const purchasedStyle = {
        backgroundColor: purchased ? THEME.PURCHASED : THEME.SECOND_COLOR,
    };

    return (
        <TouchableOpacity activeOpacity={0.4} disabled={purchased} onPress={onPress}>
            <View style={{ ...styles.block, ...purchasedStyle }}>
                <View style={styles.left}>
                    <AppTextBold style={styles.title}>{title}</AppTextBold>
                    <AppTextRegular style={{ ...styles.descr, ...descript }}>
                        {descr}
                    </AppTextRegular>
                    {price ? (
                        <AppTextRegular>
                            СТОИМОСТЬ: <AppTextBold>{price}</AppTextBold>
                        </AppTextRegular>
                    ) : null}
                </View>
                <View style={styles.rigth}>
                    <Image style={{ ...styles.image, ...styleImage }} source={img} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    block: {
        width: Dimensions.get('window').width - 20,
        borderRadius: 10,
        backgroundColor: THEME.SECOND_COLOR,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        marginBottom: 10,
    },
    image: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 18,
    },
    left: {
        marginRight: 10,
    },
    descr: {
        fontSize: 14,
        color: THEME.SHOP_TEXT,
        width: (Dimensions.get('window').width - 20) / 1.5,
    },
});
