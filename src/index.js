import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './AppAsClass';
import reportWebVitals from './reportWebVitals';

import Assignment1 from "./assignments/assignment1/Assignment1";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
    <React.StrictMode>
        <Assignment1 />
    </React.StrictMode>,
    document.getElementById('assignment1')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
