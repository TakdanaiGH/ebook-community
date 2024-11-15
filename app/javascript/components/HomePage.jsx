// app/javascript/components/HomePage.jsx
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="block-container">
        <div className="center-block">
          <h1>Welcome to Plot Twist</h1>
          <p>Your one-stop destination for ebooks and community engagement.</p>
        </div>
      </div>

      <div className="block-container">
        <div className="content">
          <h3>Top Collection</h3>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
