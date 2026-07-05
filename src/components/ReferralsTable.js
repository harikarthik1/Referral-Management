import { useNavigate } from 'react-router-dom';
import { formatDate, formatProfit } from '../utils/format';

export default function ReferralsTable({
  referrals = [],
  loading = false,
  search,
  setSearch,
  sort,
  setSort,
  page,
  setPage,
  pageSize = 10,
}) {
  const navigate = useNavigate();

  const totalEntries = referrals.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEntries);
  const pageRows = referrals.slice(startIndex, endIndex);

  const goToPage = (nextPage) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  return (
    <section className="panel" aria-label="All referrals">
      <div className="table-header">
        <h2 className="panel-title">
          All referrals
          {loading && <span className="inline-spinner" aria-hidden="true" />}
        </h2>
        <div className="table-controls">
          <label className="search-label">
            Search
            <input
              type="text"
              className="search-input"
              placeholder="Name or service…"
              aria-label="Search referrals"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <label className="sort-label">
            Sort by date
            <select
              className="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </label>
        </div>
      </div>

      <div className={`table-wrapper ${loading ? 'loading-fade' : ''}`}>
        <table className="referrals-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={4} className="empty-state">
                  No matching entries
                </td>
              </tr>
            ) : (
              pageRows.map((row) => (
                <tr
                  key={row.id}
                  className="referral-row"
                  tabIndex={0}
                  onClick={() => navigate(`/referral/${row.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate(`/referral/${row.id}`);
                    }
                  }}
                >
                  <td>{row.name}</td>
                  <td>{row.serviceName}</td>
                  <td>{formatDate(row.date)}</td>
                  <td className="profit-cell">
                    {formatProfit(row.profit)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span className="table-summary">
          {totalEntries === 0
            ? 'Showing 0–0 of 0 entries'
            : `Showing ${startIndex + 1}–${endIndex} of ${totalEntries} entries`}
        </span>

        <div className="pagination">
          <button
            type="button"
            className="page-btn"
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage === 1}
          >
            Previous
          </button>

          {totalPages > 1 &&
            Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={
                  pageNumber === safePage
                    ? 'page-btn page-btn--active'
                    : 'page-btn'
                }
                onClick={() => goToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

          <button
            type="button"
            className="page-btn"
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
