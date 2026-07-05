import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { signIn, COOKIE_NAME } from '../api';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const result = await signIn(email, password);
      if (result.success && result.token) {
        Cookies.set(COOKIE_NAME, result.token);
        navigate('/');
      } else {
        setError(result.message || 'Invalid email or password');
      }
    } catch (e) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-brand">Go Business</h1>
        <p className="login-tagline">Sign in to open your referral dashboard.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="login-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••••"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="login-submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
