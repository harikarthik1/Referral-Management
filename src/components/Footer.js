import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__brand">Go Business</span>
      <nav aria-label="Footer" className="footer__nav">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms</a>
      </nav>
      <span className="footer__copyright">© 2024 Go Business, Inc.</span>
    </footer>
  );
}
