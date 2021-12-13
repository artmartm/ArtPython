import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MainRedux from './redux/mainredux';
//import "react-toastify/dist/ReactToastify.css";
import {createStore} from 'redux';
import { rootReducer } from './redux/redux/rootReducer';
import { Provider } from 'react-redux';

const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
      <MainRedux/>
  </Provider>  {/*<App/>*/}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
