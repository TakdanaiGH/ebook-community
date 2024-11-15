// app/javascript/components/EbookPage.jsx
import React, { useState, useEffect } from 'react';
import './BookPage.css'; // Import the CSS file

const EbookPage = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('public domain'); // Default query
  const [page, setPage] = useState(1); // Add page state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Mock data for dropdown options
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYearRange, setSelectedYearRange] = useState('');
  const languages = ['English', 'Spanish', 'French', 'German'];
  const subjects = ['Math', 'Science', 'History', 'Literature'];
  const yearRanges = ['2000-2010', '2011-2020', '2021-2024'];

  // Fetch books whenever query or page changes
  useEffect(() => {
    fetchBooks();
  }, [query, page]);

  // Fetch books from the server
  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/ebooks/search?query=${query}&page=${page}`);
      const data = await response.json();
      
      if (data.books) {
        setBooks(data.books);
      } else {
        setError('No books found or error loading books.');
      }
    } catch (err) {
      setError('Failed to fetch books from the server.');
    }
    setLoading(false);
  };

  const handleSearch = (event) => {
    setQuery(event.target.value); // Update query when user types in the search bar
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1); // Increment page
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
        <button onClick={fetchBooks} className="search-button">Search</button>
      </div>

      {/* Loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Error message */}
      {error && <p>{error}</p>}
      <div className="side-bar">
      <div>
        <b>10,000</b> Results
      </div>

      <div className="filter-section">
        <label htmlFor="language">Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label htmlFor="subject">Subject:</label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label htmlFor="yearRange">Year Range:</label>
        <select
          id="yearRange"
          value={selectedYearRange}
          onChange={(e) => setSelectedYearRange(e.target.value)}
        >
          <option value="">Select Year Range</option>
          {yearRanges.map((range, index) => (
            <option key={index} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>
    </div>

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

      {/* Next Page Button */}
      <div className="pagination">
        <button onClick={handleNextPage} className="next-page-button">Next Page</button>
      </div>
    </div>
  );
};

export default EbookPage;
