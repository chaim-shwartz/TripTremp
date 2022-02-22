import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from './components/SignUpPage';

ReactDOM.render(
  <Router>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />

    </Routes>
    

 </Router>,
  document.getElementById('root')
);
