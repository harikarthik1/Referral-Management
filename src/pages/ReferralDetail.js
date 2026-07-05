import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchReferralById } from '../api';
import { formatDate, formatProfit } from '../utils/format';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './ReferralDetail.css';

export default function ReferralDetail() {
  const { id } = useParams();
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setNotFound(false);

    fetchReferralById(id)
      .then((row) => {
        if (!isMounted) return;
        if (row) {
          setReferral(row);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        if (isMounted) setNotFound(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="detail-page">
      <Navbar />

      <main className="detail-main">
        <Link to="/" className="back-link">
          Back to dashboard
        </Link>

        <h1 className="detail-title">Referral Details</h1>
        <p className="detail-subtitle">Full information for this referral partner.</p>

        {loading && <p className="detail-loading">Loading...</p>}

        {!loading && notFound && (
          <h2 className="not-found-heading">Referral not found</h2>
        )}

        {!loading && !notFound && referral && (
          <div className="detail-card">
            <div className="detail-card-header">
              <h2 className="partner-name">{referral.name}</h2>
              <span className="service-badge">{referral.serviceName}</span>
            </div>

            <dl className="detail-list">
              <div className="detail-row">
                <dt>Referral ID</dt>
                <dd>{referral.id}</dd>
              </div>
              <div className="detail-row">
                <dt>Name</dt>
                <dd>{referral.name}</dd>
              </div>
              <div className="detail-row">
                <dt>Service Name</dt>
                <dd>{referral.serviceName}</dd>
              </div>
              <div className="detail-row">
                <dt>Date</dt>
                <dd>{formatDate(referral.date)}</dd>
              </div>
              <div className="detail-row">
                <dt>Profit</dt>
                <dd>{formatProfit(referral.profit)}</dd>
              </div>
            </dl>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
