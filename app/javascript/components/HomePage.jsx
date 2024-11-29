import React, { useState } from 'react';
import './HomePage.css';

const HomePage = ({ userId }) => { // Receive userId as a prop
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false); // Add state
  const [formData, setFormData] = useState({
    userId: userId, // Add userId to form data
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    comment: '',
  });

  
  const toggleFeedbackModal = () => {
    setIsFeedbackOpen(!isFeedbackOpen);
  };

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
        setFormData({
          userId: userId,
          question1: '',
          question2: '',
          question3: '',
          question4: '',
          question5: '',
          comment: '',
        });
        setIsFeedbackOpen(false); // Close the modal after successful submission
      } else {
        alert('Error submitting feedback.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    }
  };
  


  const renderRadioButtons = (question) => (
    <div className="radio-group">
      {[1, 2, 3, 4, 5].map((value) => (
        <label key={value}>
          <input
            type="radio"
            name={question}
            value={value}
            checked={formData[question] === `${value}`}
            onChange={handleInputChange}
          />
          {value}
        </label>
      ))}
    </div>
  );

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

      <button className="feedback-button" onClick={toggleFeedbackModal}>
        Feedback
      </button>

      {isFeedbackOpen && (
        <div className="feedback-modal">
          <div className="modal-background" onClick={toggleFeedbackModal}></div>
          <div className="modal-content">
            <h2>We Value Your Feedback!</h2>
            <form onSubmit={handleSubmit}>
              <div className="question">
                <label>How would you rate our website's usability? (1-5)</label>
                {renderRadioButtons('question1')}
              </div>
              <div className="question">
                <label>How satisfied are you with the content available? (1-5)</label>
                {renderRadioButtons('question2')}
              </div>
              <div className="question">
                <label>How would you rate the community engagement? (1-5)</label>
                {renderRadioButtons('question3')}
              </div>
              <div className="question">
                <label>How likely are you to recommend us? (1-5)</label>
                {renderRadioButtons('question4')}
              </div>
              <div className="question">
                <label>Overall satisfaction (1-5)</label>
                {renderRadioButtons('question5')}
              </div>
              <div className="comment">
                <label>Any additional comments?</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
