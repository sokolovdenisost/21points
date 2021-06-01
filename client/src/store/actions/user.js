import {
    IS_AUTH,
    LOGOUT,
    LOGIN,
    HIDE_ERROR,
    REGISTER,
    REFRESH,
    BUY_CARD,
    GET_BONUS,
    GET_ALL_USERS,
    SHOW_ERROR,
    CHANGE_PASSWORD,
    CHANGE_AVATAR,
    CHANGE_DESK,
    GET_USER,
} from '../types';
import * as FileSystem from 'expo-file-system';

export const isAuth = () => async (dispatch) => {
    const response = await fetch('http://192.168.0.21:3001/auth/check-auth');
    const user = await response.json();

    dispatch({
        type: IS_AUTH,
        payload: user,
    });
};

export const logout = () => async (dispatch) => {
    const response = await fetch('http://192.168.0.21:3001/auth/logout');
    const logout = await response.json();

    dispatch({
        type: LOGOUT,
        payload: logout,
    });
};

export const login = (body) => async (dispatch) => {
    const response = await fetch('http://192.168.0.21:3001/auth/login', {
        method: 'POST',
        body: JSON.stringify({ ...body }),
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    dispatch({
        type: LOGIN,
        payload: data,
    });
};

export const register = (body) => async (dispatch) => {
    const response = await fetch('http://192.168.0.21:3001/auth/register', {
        method: 'POST',
        body: JSON.stringify({ ...body }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    dispatch({
        type: REGISTER,
        payload: data,
    });
};

export const changeProfile = (body) => async (dispatch) => {
    const response = await fetch('http://192.168.0.21:3001/auth/change-profile', {
        method: 'POST',
        body: JSON.stringify({ ...body }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    dispatch({
        type: CHANGE_PASSWORD,
        payload: data,
    });
};

export const changeAvatar = (body) => async (dispatch) => {
    const fileName = body.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;
    const files = new FormData();

    const file = {
        uri: newPath,
        name: fileName,
        type: 'image/*',
    };

    files.append('file', file);

    await FileSystem.moveAsync({
        to: newPath,
        from: body,
    });

    const response = await fetch('http://192.168.0.21:3001/auth/change-avatar', {
        method: 'POST',
        body: files,
        headers: {
            Accept: '*/*',
        },
    });

    const data = await response.json();

    dispatch({
        type: CHANGE_AVATAR,
        payload: data,
    });
};

export const hideError = () => async (dispatch) => {
    dispatch({
        type: HIDE_ERROR,
    });
};

export const refresh = () => async (dispatch) => {
    const response = await fetch('http://192.168.0.21:3001/auth/refresh-user');
    const date = await response.json();

    dispatch({
        type: REFRESH,
        payload: date,
    });
};

export const buyCard = (name, price) => async (dispatch) => {
    const response = await fetch('http://192.168.0.21:3001/cards/buy-card', {
        method: 'POST',
        body: JSON.stringify({ name, price }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    dispatch({
        type: BUY_CARD,
        payload: data.message,
    });
};

export const getBonus = () => async (dispatch) => {
    const response = await fetch('http://192.168.0.21:3001/auth/bonus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    dispatch({
        type: GET_BONUS,
        payload: data,
    });
};

export const getAllUsers = () => async (dispatch) => {
    const response = await fetch('http://192.168.0.21:3001/auth/all-users');
    const data = await response.json();

    dispatch({
        type: GET_ALL_USERS,
        payload: data,
    });
};

export const changeDesk = (title) => async (dispatch) => {
    const response = await fetch('http://192.168.0.21:3001/cards/select-card', {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    dispatch({
        type: CHANGE_DESK,
        payload: data.title,
    });
};

export const getUser = (id) => async (dispatch) => {
    const response = await fetch(`http://192.168.0.21:3001/auth/user/${id}`);
    const data = await response.json();

    dispatch({
        type: GET_USER,
        payload: data,
    });
};
