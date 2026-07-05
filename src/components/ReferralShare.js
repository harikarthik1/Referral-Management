export default function ReferralShare({ referral, copiedField, handleCopy }) {
  if (!referral) return null;

  return (
    <section className="panel" aria-label="Share referral">
      <h2 className="panel-title">Refer friends and earn more</h2>
      <div className="share-grid">
        <div className="share-field">
          <label className="share-label" htmlFor="referral-link">
            Your Referral Link
          </label>
          <div className="share-row">
            <input
              id="referral-link"
              className="share-input"
              readOnly
              value={referral.link || ''}
            />
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => handleCopy(referral.link, 'link')}
            >
              {copiedField === 'link' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <div className="share-field">
          <label className="share-label" htmlFor="referral-code">
            Your Referral Code
          </label>
          <div className="share-row">
            <input
              id="referral-code"
              className="share-input"
              readOnly
              value={referral.code || ''}
            />
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => handleCopy(referral.code, 'code')}
            >
              {copiedField === 'code' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
