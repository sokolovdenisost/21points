import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    LayoutAnimation,
    Alert,
    ScrollView,
    Dimensions,
} from 'react-native';

import { AppTextInput } from '../components/ui/AppTextInput';
import { AppButton } from '../components/ui/AppButton';
import { THEME } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { register, isAuth, hideError } from '../store/actions/user';

export const RegisterScreen = ({ navigation }) => {
    const [input, setInput] = useState(false);
    const [form, setForm] = useState({
        login: '',
        password: '',
        currentPassword: '',
        email: '',
    });
    const dispatch = useDispatch();
    const error = useSelector((state) => state.user.error);

    useEffect(() => {
        dispatch(isAuth());
    }, []);

    const handleFocus = () => {
        LayoutAnimation.spring();
        setInput(true);
    };

    const handleOnFocus = () => {
        LayoutAnimation.spring();
        setInput(false);
    };

    const registerHandler = async () => {
        dispatch(register(form));
    };

    const justifyContent = {
        justifyContent: input ? 'flex-start' : 'center',
        marginTop: input ? 20 : (Dimensions.get('window').height - 50) / 8,
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.scroll}>
                <View style={styles.center}>
                    <View style={{ ...styles.form, ...justifyContent }}>
                        <AppTextInput
                            name="login"
                            onEndEditing={handleOnFocus}
                            onFocus={handleFocus}
                            title="Логин"
                            style={{ marginBottom: 15 }}
                            setForm={setForm}
                            form={form}
                        />
                        <AppTextInput
                            name="password"
                            onEndEditing={handleOnFocus}
                            onFocus={handleFocus}
                            title="Пароль"
                            style={{ marginBottom: 15 }}
                            password={true}
                            setForm={setForm}
                            form={form}
                            field="password"
                        />
                        <AppTextInput
                            name="currentPassword"
                            onEndEditing={handleOnFocus}
                            onFocus={handleFocus}
                            title="Подтверждение пароля"
                            style={{ marginBottom: 15 }}
                            password={true}
                            setForm={setForm}
                            form={form}
                            field="currentPassword"
                        />
                        <AppTextInput
                            name="email"
                            onEndEditing={handleOnFocus}
                            onFocus={handleFocus}
                            title="Емаил"
                            style={{ marginBottom: 30 }}
                            setForm={setForm}
                            form={form}
                            field="email"
                        />
                        <AppButton title="Зарегистрироваться" onPress={registerHandler} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
