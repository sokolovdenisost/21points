import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { THEME } from '../theme';
import { AppShopCard } from '../components/AppShopCard';
import { purchased } from '../store/actions/cards';
import { buyCard, getBonus, hideError, refresh } from '../store/actions/user';

export const ShopScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const cards = useSelector((state) => state.cards.cards);
    const user = useSelector((state) => state.user.user);
    const isLoading = useSelector((state) => state.cards.isLoading);
    const error = useSelector((state) => state.user.error);

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    useEffect(() => {
        dispatch(purchased());
    }, []);

    const checkInArray = (arr, string) => {
        const array = arr.filter((a) => a === string);

        if (array.length > 0) {
            return true;
        }

        return false;
    };

    const buy = (name, price) => {
        dispatch(buyCard(name, price));

        if (!error) {
            setTimeout(() => {
                dispatch(purchased());
                dispatch(refresh());
            }, 1000);
        }
    };

    const getBonusHandler = () => {
        dispatch(getBonus());
    };

    const fullDate = (today) => {
        const year = today.getFullYear();
        const month = today.getMonth() + 1 >= 10 ? today.getMonth() : '0' + (today.getMonth() + 1);
        const date = +today.getDate() >= 10 ? today.getDate() : '0' + today.getDate();

        return date + '.' + month + '.' + year;
    };

    return (
        <View style={styles.screen}>
            {isLoading ? (
                <View style={styles.shopItems}>
                    {error
                        ? Alert.alert('Ошибка', error, [
                              { title: 'Понятно', onPress: () => dispatch(hideError()) },
                          ])
                        : null}
                    <AppShopCard
                        title="Бесплатные деньги"
                        descr="Выдается случаное количество денег от 1000 до 5000 каждые 24 часа."
                        img={require('../../assets/images/money.png')}
                        styleImage={{ width: 80, height: 80 }}
                        purchased={user.bonusTime === fullDate(today) ? true : false}
                        onPress={() => getBonusHandler()}
                    />
                    <AppShopCard
                        title="Черно-белая колода"
                        descr="Черно-белый стиль для карт выглядит богато."
                        img={require('../../assets/images/cards.png')}
                        styleImage={{ width: 115, height: 60 }}
                        descript={styles.descript}
                        purchased={checkInArray(cards, 'STANDARD BLACK')}
                        price="20000"
                        onPress={() => buy('STANDARD BLACK', 20000)}
                    />
                </View>
            ) : (
                <ActivityIndicator style={styles.loader} size="large" />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.MAIN_COLOR,
    },
    descript: {
        width: (Dimensions.get('window').width - 20) / 1.7,
    },
    shopItems: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
