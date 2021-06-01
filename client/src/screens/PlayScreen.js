import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { AppButton } from '../components/ui/AppButton';
import { AppModalPlay } from '../components/AppModalPlay';
import { THEME } from '../theme';
import { refresh, getAllUsers } from '../store/actions/user';

export const PlayScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        console.log('1');
    }, [user]);

    const updateStatistic = () => {
        dispatch(refresh());
        dispatch(getAllUsers());
    };

    return (
        <View style={styles.container}>
            <AppModalPlay
                user={user}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
            <AppButton
                title="Играть"
                styleButton={styles.button}
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
            />
            <AppButton
                title="Обновить статистику"
                style={styles.button}
                styleButton={styles.button}
                onPress={() => updateStatistic()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.MAIN_COLOR,
    },
    button: {
        overflow: 'hidden',
        backgroundColor: '#fff',
        color: THEME.MAIN_COLOR,
        padding: 5,
        width: (Dimensions.get('window').width - 20) / 1.3,
        borderRadius: 5,
    },
});
