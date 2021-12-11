import React from 'react';
import ReactDOM from 'react-dom';
//import App2Page from './components/pages/APP2';
//import App from './App2';
import './index.css';
//import New from './new/New';
import App from './App';
import reportWebVitals from './reportWebVitals';
import App2Page from './components/pages/APP2';
import New from './new/New';
//import "react-toastify/dist/ReactToastify.css";


ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
