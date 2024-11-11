// app/javascript/packs/home_page.js
import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from '../components/HomePage';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <HomePage />,
    document.getElementById('home-page-react')
  );
});
