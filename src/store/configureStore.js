
import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware,
} from 'redux';

import createSagaMiddleware from 'redux-saga';
import { reducer as form } from 'redux-form';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import history from '../utils/history';

import cartReducer from '../reducers/cartReducer';

const rootReducer = combineReducers({
    form,
    router: routerReducer,
    cart: cartReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const router = routerMiddleware(history);

export const sagaMiddleware = createSagaMiddleware()


const initStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, router)));
};

export default initStore;