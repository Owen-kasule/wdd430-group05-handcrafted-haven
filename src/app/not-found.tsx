import Link from 'next/link';
import './not-found.css';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Page Not Found</h2>
      <p className="not-found-description">
        The page you're looking for doesn't exist.
      </p>
      <Link href="/" className="not-found-link">
        Go Home
      </Link>
    </div>
  );
}
