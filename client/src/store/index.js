import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { gameReducer } from './reducers/gameReducer';
import { userReducer } from './reducers/userReducer';
import { cardReducer } from './reducers/cardsReducer';

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    cards: cardReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
