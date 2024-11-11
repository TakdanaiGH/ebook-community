import React, { useState, useEffect } from 'react';

const EbookPage = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('public domain'); // Default query
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch books whenever query changes
  useEffect(() => {
    fetchBooks();
  }, [query]);

  // Fetch books from the server
  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/ebooks/search?query=${query}`);
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

  return (
    <div>
      <h1>Ebooks</h1>

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

      {/* Styles */}
      <style>
        {`
          /* Search bar styling */
          .search-container {
            display: flex;
            justify-content: center;
            margin: 20px 0;
          }
          .search-bar {
            width: 300px;
            padding: 10px;
            font-size: 1em;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .search-button {
            padding: 10px 15px;
            font-size: 1em;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            margin-left: 10px;
            border-radius: 4px;
          }

          /* Book grid styling */
          .book-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr); /* Forces 6 columns per row */
            gap: 20px; /* Adds spacing between grid items */
            margin: 20px;
          }

          /* Styling for each book item */
          .book-item {
            text-align: center;
            display: block; /* Block-level element to fill grid space */
          }

          /* Book cover image styling */
          .book-cover {
            height: 200px; /* Fixed height */
            width: 150px;  /* Fixed width */
            object-fit: cover; /* Ensures the image fills the box without distortion */
            margin-bottom: 10px;
            border-radius: 4px;
          }

          /* Button styling */
          .add-to-shelf {
            padding: 5px 10px;
            background-color: #a0522d;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 0.9em;
            border-radius: 4px;
            text-decoration: none;
          }

          .add-to-shelf:hover {
            background-color: #8b4513;
          }

          /* Responsive design for smaller screens */
          @media (max-width: 1200px) {
            .book-grid {
              grid-template-columns: repeat(4, 1fr); /* 4 columns on medium screens */
            }
          }

          @media (max-width: 900px) {
            .book-grid {
              grid-template-columns: repeat(3, 1fr); /* 3 columns on smaller screens */
            }
          }

          @media (max-width: 600px) {
            .book-grid {
              grid-template-columns: repeat(2, 1fr); /* 2 columns on mobile screens */
            }
          }
        `}
      </style>
    </div>
  );
};

export default EbookPage;
