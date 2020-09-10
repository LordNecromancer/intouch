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
export const socket= socketIOClient(keys.host);

const store=createStore(reducers,{},applyMiddleware(reduxThunk));

ReactDOM.render(


    <Provider  store={store}><App /></Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
