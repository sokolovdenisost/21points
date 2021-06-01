import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Button,
    Image,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile, refresh } from '../store/actions/user';

import { THEME } from '../theme';
import { AppButton } from './ui/AppButton';
import { AppTextBold } from './ui/AppTextBold';
import { AppTextInput } from './ui/AppTextInput';
import { PhotoPicker } from '../components/PhotoPicker';

export const AppModalSettings = ({ modalVisible, setModalVisible, user }) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        login: user.login,
        email: user.email,
        oldPassword: '',
        newPassword: '',
    });

    const imgRef = useRef();

    const changeProfileHandler = () => {
        dispatch(changeProfile(form));
        setModalVisible(!modalVisible);
        setTimeout(() => {
            dispatch(refresh());
        }, 2000);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.screen}>
                <View style={styles.goBack}>
                    <Button
                        title="Назад"
                        color={THEME.MAIN_COLOR}
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                </View>
                <ScrollView>
                    <View style={styles.changeInfo}>
                        <AppTextBold style={styles.title}>Основные настройки</AppTextBold>
                        <AppTextInput
                            value={form.login}
                            name="login"
                            form={form}
                            setForm={setForm}
                            styleInput={styles.input}
                            title="Логин"
                        />
                        <AppTextInput
                            value={form.email}
                            name="email"
                            form={form}
                            setForm={setForm}
                            styleInput={styles.input}
                            title="Email"
                        />
                    </View>
                    <View style={styles.changePassword}>
                        <AppTextBold style={styles.title}>Смена пароля</AppTextBold>
                        <AppTextInput
                            value={form.oldPassword}
                            password={true}
                            name="oldPassword"
                            form={form}
                            setForm={setForm}
                            styleInput={styles.input}
                            title="Старый пароль"
                        />
                        <AppTextInput
                            value={form.newPassword}
                            password={true}
                            name="newPassword"
                            form={form}
                            setForm={setForm}
                            styleInput={styles.input}
                            title="Новый пароль"
                        />
                        <AppButton
                            style={styles.styleButtonText}
                            styleButton={{ ...styles.styleButton, marginTop: 20 }}
                            title="Сохранить"
                            onPress={() => changeProfileHandler()}
                        />
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    goBack: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 10,
        paddingTop: 15,
        paddingLeft: 10,
        fontSize: 16,
        fontFamily: 'roboto-medium',
    },
    changePassword: {
        marginTop: 40,
        alignItems: 'center',
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'android' ? 5 : 15,
        fontSize: 14,
        marginTop: 10,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: THEME.MAIN_COLOR,
        marginBottom: 10,
    },
    styleButton: {
        padding: Platform.OS === 'android' ? 10 : 15,
    },
    styleButtonText: {
        fontSize: 16,
    },
    changeInfo: {
        marginTop: 20,
        alignItems: 'center',
    },
});
