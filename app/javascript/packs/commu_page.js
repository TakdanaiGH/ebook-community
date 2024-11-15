// app/javascript/packs/books_page.js
import React from 'react';
import ReactDOM from 'react-dom';
import CommuniyPage from '../components/CommuniyPage';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <CommuniyPage />,
    document.getElementById('react-community')
  );
});
