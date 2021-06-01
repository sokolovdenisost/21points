import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import { THEME } from '../theme';
import { AppTopCard } from '../components/AppTopCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../store/actions/user';

export const TopScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const users = useSelector((state) => state.user.users);

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const openUserProfile = (id) => {
        navigation.navigate('User', { userId: id });
    };

    const sortUsers = users
        .sort(function (a, b) {
            return parseFloat(a.raiting) - parseFloat(b.raiting);
        })
        .reverse();

    const mapUsers = sortUsers.map((u) => {
        return (
            <AppTopCard
                login={u.login}
                avatar={u.avatar}
                raiting={u.raiting}
                games={u.games}
                key={u.login}
                onPress={() => openUserProfile(u._id)}
            />
        );
    });

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.screen}>
                {users.length ? (
                    <View style={styles.topCard}>{mapUsers}</View>
                ) : (
                    <Text style={styles.loading}>LOADING...</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: THEME.MAIN_COLOR,
    },
    screen: {
        flex: 1,
        backgroundColor: THEME.MAIN_COLOR,
    },
    topCard: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
