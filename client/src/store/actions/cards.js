import { PURCHASED_CARDS } from '../types';

export const purchased = () => async (dispatch) => {
    const response = await fetch('http://192.168.0.21:3001/cards/purchased');
    const data = await response.json();

    dispatch({
        type: PURCHASED_CARDS,
        payload: data,
    });
};
