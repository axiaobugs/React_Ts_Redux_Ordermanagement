import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { userStore } from './state/user';

ReactDOM.render(
  <>
    <Provider store={userStore}>
      <App />
    </Provider>
  </>,
  document.getElementById('root')
);

