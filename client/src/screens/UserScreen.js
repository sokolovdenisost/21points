import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { THEME } from '../theme';
import { AppProfileCard } from '../components/AppProfileCard';
import { AppProfileInfo } from '../components/AppProfileInfo';
import { getUser } from '../store/actions/user';

export const UserScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const userId = navigation.getParam('userId');
    const user = useSelector((state) => state.user.userProfile);

    useEffect(() => {
        dispatch(getUser(userId));
    }, []);

    console.log(user);

    return (
        <View style={styles.center}>
            {user.login ? (
                <>
                    <AppProfileCard user={user} />
                    <AppProfileInfo user={user} />
                </>
            ) : (
                <Text>LOADING...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.MAIN_COLOR,
    },
});
