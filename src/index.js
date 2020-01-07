import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import configuration from './configuration/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'react-notifications/lib/notifications.css';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './style.css';
import { socket_init } from './configuration/socket';
import { axios_init } from './configuration/axios';
socket_init();
axios_init();
const store = createStore(
    configuration,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
