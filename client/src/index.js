import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from './components/SignUpPage';


//redux
import { Provider } from 'react-redux';
import store from './redux/index';
//redux

ReactDOM.render(
  <Provider store={store}>
    <Router>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />

      </Routes>
      
    </Router>
  </Provider>,
  document.getElementById('root')
);
