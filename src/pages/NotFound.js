import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h1 className="not-found-code">404</h1>
      <p className="not-found-message">Page not found</p>
      <Link to="/" className="not-found-link">
        Back to dashboard
      </Link>
    </div>
  );
}
