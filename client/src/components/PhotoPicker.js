import React, { useState } from 'react';
import { View, StyleSheet, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useSelector } from 'react-redux';

import { AppTextBold } from './ui/AppTextBold';
import { AppButton } from './ui/AppButton';
import { THEME } from '../theme';

async function askForPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
        Alert.alert('Ошибка', 'Вы не дали прав на создание фото');
        return false;
    }

    return true;
}

export const PhotoPicker = ({ onPick }) => {
    const user = useSelector((state) => state.user.user);
    const [image, setImage] = useState(null);

    const takePhoto = async () => {
        const hasPermissions = await askForPermissions();

        if (!hasPermissions) {
            return;
        }

        const img = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 0.7,
            allowsEditing: true,
            aspect: [4, 3],
        });

        setImage(img.uri);
        onPick(img.uri);
    };

    const checkString = (str) => {
        const arrString = str.split('');

        if (
            arrString[0] === 'h' &&
            arrString[1] === 't' &&
            arrString[2] === 't' &&
            arrString[3] === 'p'
        )
            return str;

        return 'http://192.168.0.21:3001/' + str;
    };

    return (
        <View style={styles.wrapper}>
            <Image
                style={styles.changePhotoImage}
                source={{ uri: image ? image : checkString(user.avatar) }}
            />
            <AppButton
                styleButton={styles.styleButton}
                disabled={false}
                style={styles.styleText}
                title="Сделать фото"
                onPress={takePhoto}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
    },
    changePhotoImage: {
        width: 150,
        height: 150,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    styleButton: {
        marginBottom: 0,
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
        borderTopColor: THEME.MAIN_COLOR,
        borderTopWidth: 2,
    },
    styleText: {
        color: THEME.MAIN_COLOR,
    },
});
