import { useEffect, useState, useCallback, useRef } from 'react';
import { fetchReferrals } from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MetricsOverview from '../components/MetricsOverview';
import ServiceSummary from '../components/ServiceSummary';
import ReferralShare from '../components/ReferralShare';
import ReferralsTable from '../components/ReferralsTable';
import './Dashboard.css';

const PAGE_SIZE = 10;

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [serviceSummary, setServiceSummary] = useState(null);
  const [referral, setReferral] = useState(null);
  const [referrals, setReferrals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(1);

  const [copiedField, setCopiedField] = useState('');

  const loadReferrals = useCallback(async (currentSearch, currentSort) => {
    setLoading(true);
    setError('');
    try {
      const result = await fetchReferrals({
        search: currentSearch,
        sort: currentSort,
      });
      setMetrics(result.metrics);
      setServiceSummary(result.serviceSummary);
      setReferral(result.referral);
      setReferrals(result.referrals);
    } catch (e) {
      const status = e.status ? ` (${e.status})` : '';
      setError(`${e.message}${status}`);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, []);

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      loadReferrals(search, sort);
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      loadReferrals(search, sort);
      setPage(1);
    }, 300);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort]);

  const handleCopy = async (value, field) => {
    try {
      await navigator.clipboard.writeText(value || '');
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 1500);
    } catch (e) {
      // Clipboard may be unavailable-fail silently.
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">
        <h1 className="dashboard-title">Referral Dashboard</h1>
        <p className="dashboard-subtitle">
          Track your referrals, earnings, and partner activity in one place.
        </p>

        {isInitialLoad && <p className="dashboard-loading">Loading...</p>}

        {error && (
          <p className="dashboard-error" role="alert">
            {error}
          </p>
        )}

        {!isInitialLoad && (
          <>
            <MetricsOverview metrics={metrics} loading={loading} />

            <ServiceSummary serviceSummary={serviceSummary} loading={loading} />

            <ReferralShare
              referral={referral}
              copiedField={copiedField}
              handleCopy={handleCopy}
            />

            <ReferralsTable
              referrals={referrals}
              loading={loading}
              search={search}
              setSearch={setSearch}
              sort={sort}
              setSort={setSort}
              page={page}
              setPage={setPage}
              pageSize={PAGE_SIZE}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
