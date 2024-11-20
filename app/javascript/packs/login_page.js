// app/javascript/packs/home_page.js
import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from '../components/LoginPage';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <LoginPage />,
    document.getElementById('react-login')
  );
});
