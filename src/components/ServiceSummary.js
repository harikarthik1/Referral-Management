export default function ServiceSummary({ serviceSummary, loading = false }) {
  if (!serviceSummary) return null;

  return (
    <section className="panel" aria-label="Service summary">
      <h2 className="panel-title">Service summary</h2>
      <div className={`summary-grid ${loading ? 'loading-fade' : ''}`}>
        <div className="summary-item">
          <div className="summary-label">Service</div>
          <div className="summary-value summary-value--link">
            {serviceSummary.service}
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Your Referrals</div>
          <div className="summary-value">
            {serviceSummary.yourReferrals}
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Active Referrals</div>
          <div className="summary-value">
            {serviceSummary.activeReferrals}
          </div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Total Ref. Earnings</div>
          <div className="summary-value">
            {serviceSummary.totalRefEarnings}
          </div>
        </div>
      </div>
    </section>
  );
}
