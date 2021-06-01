import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AppProfileCard } from '../components/AppProfileCard';
import { AppProfileInfo } from '../components/AppProfileInfo';
import { AppButton } from '../components/ui/AppButton';
import { AppModalSettings } from '../components/AppModalSettings';
import { logout } from '../store/actions/user';
import { THEME } from '../theme';
import { AppModalCards } from '../components/AppModalCards';
import { AppModalPhoto } from '../components/AppModalPhoto';

export const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleCards, setModalVisibleCards] = useState(false);
    const [modalVisiblePhoto, setModalVisiblePhoto] = useState(false);

    const user = useSelector((state) => state.user.user);

    const logoutUser = () => {
        dispatch(logout());
    };

    return (
        <ScrollView style={styles.screen}>
            <AppModalSettings
                user={user}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
            <AppModalCards
                modalVisible={modalVisibleCards}
                setModalVisible={setModalVisibleCards}
            />
            <AppModalPhoto
                modalVisible={modalVisiblePhoto}
                setModalVisible={setModalVisiblePhoto}
            />
            <View style={styles.center}>
                <AppProfileCard user={user} />
                <AppProfileInfo user={user} />
                <AppButton
                    title="Сменить колоду карт"
                    styleButton={{ marginBottom: -10 }}
                    style={styles.styleButton}
                    onPress={() => setModalVisibleCards(true)}
                />
                <AppButton
                    title="Сменить фотографию"
                    styleButton={{ marginBottom: -10 }}
                    style={styles.styleButton}
                    onPress={() => setModalVisiblePhoto(true)}
                />
                <AppButton
                    title="Настройки"
                    styleButton={{ marginBottom: -10 }}
                    style={styles.styleButton}
                    onPress={() => setModalVisible(true)}
                />
                <AppButton
                    title="Сменить пользователя"
                    onPress={logoutUser}
                    styleButton={{ marginBottom: 5 }}
                    style={styles.styleButton}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.MAIN_COLOR,
    },
    center: {
        flex: 1,
        backgroundColor: THEME.MAIN_COLOR,
        alignItems: 'center',
    },
    styleButton: {
        backgroundColor: THEME.SECOND_COLOR,
        width: Dimensions.get('window').width - 20,
        marginBottom: 0,
        padding: 10,
        borderRadius: 5,
    },
});
