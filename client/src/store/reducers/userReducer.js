import {
    IS_AUTH,
    LOGIN,
    LOGOUT,
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

const initialState = {
    user: {},
    isAuth: false,
    isLoading: false,
    error: null,
    notification: '',
    users: [],
    selectDesk: '',
    userProfile: {},
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTH:
            return {
                ...state,
                user: action.payload,
                isAuth: action.payload ? true : false,
                isLoading: true,
            };

        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuth: false,
                isLoading: true,
            };

        case LOGIN:
            return {
                ...state,
                user: action.payload.user,
                isAuth: action.payload.user ? true : false,
                isLoading: true,
                error: action.payload.message === 'Успешно зашли!' ? null : action.payload.message,
                selectDesk: action.payload.user.selectDesk,
            };

        case REGISTER:
            return {
                ...state,
                user: action.payload.user,
                isAuth: false,
                isLoading: true,
                error: action.payload.message === 'Аккаунт создан!' ? null : action.payload.message,
                selectDesk: action.payload.user.selectDesk,
            };

        case CHANGE_PASSWORD:
            return {
                ...state,
            };

        case CHANGE_AVATAR:
            return {
                ...state,
                user: action.payload.user,
            };

        case HIDE_ERROR:
            return {
                ...state,
                error: null,
            };

        case SHOW_ERROR:
            return {
                ...state,
                error: true,
            };

        case REFRESH:
            return {
                ...state,
                user: action.payload,
                isLoading: true,
                error: null,
                isAuth: true,
                notification: '',
            };

        case BUY_CARD:
            return {
                ...state,
                error: action.payload === 'Набор куплен' ? null : action.payload,
            };

        case GET_BONUS:
            return {
                ...state,
                user: action.payload.user,
                notification: action.payload.message,
            };

        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload.users,
            };

        case CHANGE_DESK:
            return {
                ...state,
                selectDesk: action.payload,
            };

        case GET_USER:
            return {
                ...state,
                userProfile: action.payload.user,
            };

        default:
            return state;
    }
};
