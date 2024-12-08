import React, { useState, useEffect } from 'react';
import './BookPage.css'; // Import the CSS file

const EbookPage = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('public domain');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0);
  const [yearBegin, setYearBegin] = useState(2000);
  const [yearEnd, setYearEnd] = useState(2024);

  useEffect(() => {
    fetchBooks();
  }, [query, yearBegin, yearEnd, offset]);

  const fetchBooks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/ebooks/search?query=${query}&year_range=${yearBegin}-${yearEnd}&offset=${offset}`);
      const data = await response.json();

      if (data.books) {
        setBooks((prevBooks) => [...prevBooks, ...data.books]);
      } else {
        setError('No books found or error loading books.');
      }
    } catch (err) {
      setError('Failed to fetch books from the server.');
    }
    setLoading(false);
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setOffset(0);
    setBooks([]);
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 24);
  };

  const handleYearBeginChange = (event) => {
    setYearBegin(parseInt(event.target.value, 10));
  };

  const handleYearEndChange = (event) => {
    setYearEnd(parseInt(event.target.value, 10));
  };

  return (
    <div className="ebook-page-container">
      {/* Header */}
      <div className="header-ebooks">
        <h1 className="header-title">Dive Into Free eBooks</h1>
      </div>

      {/* Search bar */}
      <div className="search-container">
        <input 
          type="text" 
          value={query} 
          onChange={handleSearch} 
          placeholder="Search for ebooks" 
          className="search-bar"
        />
      </div>

      {/* Year Range Filter */}
      <div className="filter-container">
        <label className="filter-label">
          Year Range: {yearBegin} - {yearEnd}
        </label>
        <div className="year-range-inputs">
          <input 
            type="number" 
            min="1900" 
            max="2024" 
            value={yearBegin} 
            onChange={handleYearBeginChange} 
            className="year-input"
            placeholder="Start Year"
          />
          <span> - </span>
          <input 
            type="number" 
            min="1900" 
            max="2024" 
            value={yearEnd} 
            onChange={handleYearEndChange} 
            className="year-input"
            placeholder="End Year"
          />
        </div>
      </div>

      {/* Loading indicator */}
      {loading && <p className="loading-text">Loading...</p>}

      {/* Error message */}
      {error && <p>{error}</p>}

      {/* Book Grid */}
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-item" key={book.key}>
            <img 
              src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'default_cover.jpg'} 
              alt={book.title} 
              className="book-cover" 
            />
            <p><strong>{book.title}</strong></p>
            <p>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
            <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer" className="add-to-shelf">
              Read eBook
            </a>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="pagination">
        <button onClick={handleLoadMore} className="next-page-button">Load More</button>
      </div>
    </div>
  );
};

export default EbookPage;
