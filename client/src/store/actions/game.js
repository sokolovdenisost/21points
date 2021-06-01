import { HIDE_LOADER, SAVE_GAME } from '../types';

export const saveGame = (game) => async (dispatch) => {
    const response = await fetch('http://192.168.0.21:3001/game/save-game', {
        method: 'POST',
        body: JSON.stringify({ ...game }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    dispatch({
        type: SAVE_GAME,
        payload: data.game,
    });
};

export const hideLoader = () => async (dispatch) => {
    dispatch({
        type: HIDE_LOADER,
        payload: false,
    });
};
