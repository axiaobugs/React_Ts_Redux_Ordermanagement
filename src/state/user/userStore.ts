import {createStore,applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducers from './reducers';

export const userStore = createStore(userReducers,{},composeWithDevTools(applyMiddleware(thunk)))
