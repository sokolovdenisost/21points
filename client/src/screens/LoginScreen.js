import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
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
import { isAuth, login, hideError } from '../store/actions/user';

export const LoginScreen = ({ navigation }) => {
    const [form, setForm] = useState({
        login: '',
        password: '',
    });
    const [input, setInput] = useState(false);
    const dispatch = useDispatch();

    const error = useSelector((state) => state.user.error);

    useEffect(() => {
        dispatch(isAuth());
    }, []);

    console.log(error);

    const loginHandler = () => {
        dispatch(login(form));
    };

    const handleFocus = () => {
        LayoutAnimation.spring();
        setInput(true);
    };

    const handleOnFocus = () => {
        LayoutAnimation.spring();
        setInput(false);
    };

    const justifyContent = {
        marginTop: input ? 20 : (Dimensions.get('window').height - 50) / 4,
        justifyContent: input ? 'flex-start' : 'center',
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.scroll}>
                {error
                    ? Alert.alert('Ошибка', error, [
                          { title: 'Понятно', onPress: () => dispatch(hideError()) },
                      ])
                    : null}
                <View style={{ ...styles.center, ...justifyContent }}>
                    <View style={styles.form}>
                        <AppTextInput
                            name="login"
                            title="Логин"
                            onEndEditing={handleOnFocus}
                            onFocus={handleFocus}
                            style={{ marginBottom: 20 }}
                            setForm={setForm}
                            form={form}
                        />
                        <AppTextInput
                            name="password"
                            title="Пароль"
                            onEndEditing={handleOnFocus}
                            onFocus={handleFocus}
                            style={{ marginBottom: 60 }}
                            password={true}
                            setForm={setForm}
                            form={form}
                        />
                        <AppButton title="Войти" onPress={loginHandler} />
                    </View>
                    {/* <AppButton
                    styleButton={styles.styleButton}
                    style={styles.forgotPassword}
                    title="Забыли пароль?"
                /> */}
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
    title: {
        fontSize: 20,
        fontFamily: 'roboto-bold',
        textAlign: 'center',
        color: THEME.MAIN_COLOR,
    },
    form: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotPassword: {
        backgroundColor: '#fff',
        fontSize: 16,
        fontFamily: 'roboto-regular',
        marginLeft: 'auto',
        marginRight: 'auto',
        color: THEME.MAIN_COLOR,
    },
});
