import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './compo./App';
import App from './container/App'
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase'
// Initialize Firebase
import store from "./store/index";
import { Provider } from "react-redux";
// var config = {
//   apiKey: "AIzaSyDqPpxlIGjEikoqzvZqB7_-10158KdfxOs",
//   authDomain: "reactreduxtodoappfirebase.firebaseapp.com",
//   databaseURL: "https://reactreduxtodoappfirebase.firebaseio.com",
//   projectId: "reactreduxtodoappfirebase",
//   storageBucket: "",
//   messagingSenderId: "866095779438"
// };
// firebase.initializeApp(config);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>

  , document.getElementById('root'));
registerServiceWorker();
