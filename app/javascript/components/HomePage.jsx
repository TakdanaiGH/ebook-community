import React, { useState } from 'react';
import './HomePage.css';

const HomePage = ({ userId }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [formData, setFormData] = useState({
    userId,
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    comment: '',
  });

  const toggleFeedbackModal = () => setIsFeedbackOpen(!isFeedbackOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
        },
        body: JSON.stringify({ feedback: formData }),
      });

      if (response.ok) {
        alert('Thank you for your feedback!');
        resetForm();
        toggleFeedbackModal();
      } else {
        alert('Error submitting feedback.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    }
  };

  const resetForm = () => {
    setFormData({
      userId,
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      comment: '',
    });
  };

  const renderRadioButtons = (question) => (
    <div className="radio-group">
      {[1, 2, 3, 4, 5].map((value) => (
        <label key={value} className="radio-label">
          <input
            type="radio"
            name={question}
            value={value}
            checked={formData[question] === `${value}`}
            onChange={handleInputChange}
            className="radio-input"
          />
          {value}
        </label>
      ))}
    </div>
  );

  return (
    <div>
      <div className="magicbook-animation"></div>

      <div className="group-1">
        <header>
          <h1 className="story-heading">Find your story. Share your journey</h1>
          <h2 className="subtitle">
            Where the love of books becomes the start of something extraordinary.
          </h2>
        </header>
        <main>
          <p className="description">
            PlotTwist is a vibrant community where readers come together to share
            their journeys. Discover your next great read, join clubs diving into
            books you love, or start your own to bring others along for the
            adventure. With free eBooks, active discussions, and a shared passion
            for stories.
          </p>
        </main>
        <footer className="group-2">
          <a href="/users/sign_up" className="button-container">
            <span className="button-text">GET STARTED</span>
          </a>
        </footer>
        
        <div>

      {/* Tagline Section */}
      <div className="tagline">
        Discover your tribe, share your passion, and let the books lead the way.
      </div>

      {/* Join Description Section */}
      <div className="join-description">
        Join PlotTwist and unlock a world of stories waiting to be discovered! Explore our collection of free eBooks, connect with like-minded readers, 
        and dive into vibrant book clubs where discussions bring stories to life. Discover your next favorite book, set reading goals, 
        and be part of a community that shares your passion for the written word. Start your literary adventure with us today and make every page a shared experience!
      </div>

      {/* What They Say Section */}
      <div className="what-they-say">
        What they say?
      </div>
    </div>
    <div className="image-container">
        <img className="rounded-image" />
      </div>
        
        {/* Feedback Button */}
        <button className="feedback-button" onClick={toggleFeedbackModal}>
          Feedback
        </button>

        {/* Feedback Modal */}
        {isFeedbackOpen && (
          <div className="feedback-modal">
            <div className="modal-background" onClick={toggleFeedbackModal}></div>
            <div className="modal-content">
              <h2>We Value Your Feedback!</h2>
              <form onSubmit={handleSubmit} className="feedback-form">
                {/* Feedback Questions */}
                {['question1', 'question2', 'question3', 'question4', 'question5'].map((question, index) => (
                  <div key={index} className="question">
                    <label>How would you rate {question.replace('question', '')}?</label>
                    {renderRadioButtons(question)}
                  </div>
                ))}

                {/* Additional Comments */}
                <div className="comment">
                  <label>Any additional comments?</label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows="4"
                    className="textarea-field"
                  />
                </div>
                <button type="submit" className="submit-button">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
