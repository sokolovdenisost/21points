import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';

import { AppNoAuthNavigation, AppAuthNavigation } from './navigation/AppNavigation';
import { AppHeader } from './components/AppHeader';
import { isAuth } from './store/actions/user';

export const Application = () => {
    const dispatch = useDispatch();

    setStatusBarStyle({
        color: '#000',
    });

    useEffect(() => {
        dispatch(isAuth());
    }, []);

    const user = useSelector((state) => state.user.user);
    const Authorization = useSelector((state) => state.user.isAuth);
    const loading = useSelector((state) => state.user.isLoading);
    const state = useSelector((state) => state.user);

    console.log(user);

    return (
        <View style={styles.app}>
            {loading ? (
                Authorization && user ? (
                    <View style={styles.app}>
                        <AppHeader user={user} />
                        <AppAuthNavigation>
                            <StatusBar style="auto" />
                        </AppAuthNavigation>
                    </View>
                ) : (
                    <AppNoAuthNavigation>
                        <StatusBar style="auto" />
                    </AppNoAuthNavigation>
                )
            ) : (
                <Text>LOADING...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
    },
});
