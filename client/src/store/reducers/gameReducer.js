import { SAVE_GAME, HIDE_LOADER } from '../types';

const initialState = {
    isLoadingGame: false,
};

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_GAME:
            return {
                ...state,
                isLoadingGame: true,
            };

        case HIDE_LOADER:
            return {
                ...state,
                isLoadingGame: false,
            };

        default:
            return state;
    }
};
