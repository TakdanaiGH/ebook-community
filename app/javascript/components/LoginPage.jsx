import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // For remember me checkbox
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a form data object similar to what Devise expects
    const formData = new FormData();
    formData.append('user[email]', email);
    formData.append('user[password]', password);
    formData.append('user[remember_me]', rememberMe ? '1' : '0'); // Set remember me value

    try {
      const response = await fetch('/users/sign_in', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
        credentials: 'same-origin', // Ensure that cookies are included in the request
      });

      if (response.ok) {
        window.location.href = '/'; // Redirect on success
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid email or password');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="welcome-section">
        <h2>Welcome Back!</h2>
        <img src="/images/login-cover.jpeg" className="login-image" alt="Welcome" />
        <p>Please log in to access your account.</p>
      </div>
      <div className="form-container">
        <h1>Log in</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember me checkbox */}
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
          </div>

          <div className="actions">
            <button type="submit" className="btn">Log in</button>
          </div>
        </form>

        {/* Render additional links, like the ones rendered in the Devise shared links partial */}
        <div className="links">
          <a href="/users/password/new">Forgot your password?</a>
          <br />
          <a href="/users/sign_up">Don't have an account? Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
