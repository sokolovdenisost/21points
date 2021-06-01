import React, { useRef } from 'react';
import { View, StyleSheet, Text, Modal, Button, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';

import { THEME } from '../theme';
import { PhotoPicker } from './PhotoPicker';
import { AppButton } from './ui/AppButton';
import { AppTextBold } from './ui/AppTextBold';
import { changeAvatar, refresh } from '../store/actions/user';

export const AppModalPhoto = ({ modalVisible, setModalVisible }) => {
    const dispatch = useDispatch();
    const imgRef = useRef();

    const photoPickHandler = (uri) => {
        imgRef.current = uri;

        console.log(imgRef);
    };

    const saveHandler = () => {
        dispatch(changeAvatar(imgRef.current));
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
            <View style={styles.modal}>
                <View style={styles.goBack}>
                    <Button
                        title="Назад"
                        color={THEME.MAIN_COLOR}
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                </View>
                <AppTextBold style={styles.changePasswordTitle}>Смена фотографии</AppTextBold>
                <View style={styles.changePhoto}>
                    <PhotoPicker onPick={photoPickHandler} />
                </View>
                <AppButton
                    style={styles.styleButtonText}
                    styleButton={styles.styleButton}
                    title="Сохранить"
                    onPress={() => saveHandler()}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
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
    changePhoto: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    changePhotoImage: {
        width: 150,
        height: 150,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
    },
    changePasswordTitle: {
        fontSize: 20,
        textAlign: 'center',
        color: THEME.MAIN_COLOR,
        marginBottom: 10,
    },
    styleButton: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});
