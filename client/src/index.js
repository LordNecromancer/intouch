import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';
//import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.min.css'
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from "redux";
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import './index.css'
import './flex.css'
import socketIOClient from "socket.io-client";
import keys from './keys'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
export const socket= socketIOClient(keys.host);

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['showMessageReducer']
}
const persistedReducer = persistReducer(persistConfig, reducers);

const store=createStore(persistedReducer,{},applyMiddleware(reduxThunk));
let persistor = persistStore(store)
ReactDOM.render(


    <Provider  store={store}>
       <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
        </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
