import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { COOKIE_NAME } from '../api';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove(COOKIE_NAME);
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand" aria-label="Go to dashboard home">
        Go Business
      </Link>
      <nav aria-label="Primary" className="navbar__nav">
        <Link to="/" className="navbar__link">
          Home
        </Link>
      </nav>
      <div className="navbar__actions">
        <button type="button" className="btn btn--primary">
          Try for free
        </button>
        <button type="button" className="btn btn--outline" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}
