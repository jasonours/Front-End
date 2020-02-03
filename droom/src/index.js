import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import {reducer} from './reducers'

const store = createStore(reducer, applyMiddleware(thunk,logger))

ReactDOM.render(
    <Provder store={store}>
        <App />
    </Provder>, 
    document.getElementById('root'));



