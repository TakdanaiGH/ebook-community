// app/javascript/packs/books_page.js
import React from 'react';
import ReactDOM from 'react-dom';
import BooksPage from '../components/BooksPage';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BooksPage />,
    document.getElementById('react-ebooks')
  );
});
