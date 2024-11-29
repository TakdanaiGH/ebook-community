import React, { useState, useEffect } from 'react';
import './BookPage.css'; // Import the CSS file

const EbookPage = () => {
  const [books, setBooks] = useState([]);  // Books to display
  const [query, setQuery] = useState('public domain');  // Default query
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(0); // Track the offset for pagination
  const [yearBegin, setYearBegin] = useState(2000);  // Default start year
  const [yearEnd, setYearEnd] = useState(2024);    // Default end year
  
  // Fetch books whenever query, year range, or offset changes
  useEffect(() => {
    fetchBooks();
  }, [query, yearBegin, yearEnd, offset]);

  // Fetch books from the server
  const fetchBooks = async () => {
    setLoading(true);
    setError('');

    try {
      // Send query, year range, and offset to the backend
      const response = await fetch(`/ebooks/search?query=${query}&year_range=${yearBegin}-${yearEnd}&offset=${offset}`);
      const data = await response.json();

      if (data.books) {
        setBooks((prevBooks) => [...prevBooks, ...data.books]);  // Append new books to the existing list
      } else {
        setError('No books found or error loading books.');
      }
    } catch (err) {
      setError('Failed to fetch books from the server.');
    }
    setLoading(false);
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);  // Update query when user types in the search bar
    setOffset(0);  // Reset offset when a new search is performed
    setBooks([]);  // Clear previous books on new search
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 24);  // Increment offset for the next batch
  };

  // Handle change in start year
  const handleYearBeginChange = (event) => {
    setYearBegin(parseInt(event.target.value, 10));
  };

  // Handle change in end year
  const handleYearEndChange = (event) => {
    setYearEnd(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <div className="block-container">
        <div className="content">
          <h3>Ebooks</h3>
        </div>
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
      <div className="side-bar">
        <div>
          <b>{books.length} Results</b>
        </div>

        {/* Year Range Filter Inputs */}
        <div className="filter-section">
          <label htmlFor="yearRange">
            Year Range: {yearBegin} - {yearEnd}
          </label>
          <div>
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
      </div>

      {/* Loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Error message */}
      {error && <p>{error}</p>}

      {/* Book grid */}
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
