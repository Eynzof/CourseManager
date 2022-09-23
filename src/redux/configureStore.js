import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';


export default function configureStore(initialState) {
    // add support for redux devtools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // 这里的reduxImmutableStateInvariant()很重要
    // 这个中间件会在你修改state时提醒你
    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())));
}