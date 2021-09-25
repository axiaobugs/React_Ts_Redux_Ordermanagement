import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { userStore } from './state/user';
import axios from 'axios';


axios.interceptors.request.use(config=>{
  const token = localStorage.getItem("token");
  if(token){
      config.headers["Authorization"]="Bearer "+token;
  }
  return config;
},error=>{
  console.log(error.message);
  return Promise.reject(error);
})


ReactDOM.render(
  <>
    <Provider store={userStore}>
      <App />
    </Provider>
  </>,
  document.getElementById('root')
);

