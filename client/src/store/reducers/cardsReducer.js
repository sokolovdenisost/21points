import { PURCHASED_CARDS } from '../types';

const initialState = {
    cards: [],
    isLoading: false,
};

export const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case PURCHASED_CARDS:
            return {
                ...state,
                cards: action.payload.cards,
                isLoading: true,
            };

        default:
            return state;
    }
};
