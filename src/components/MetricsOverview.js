export default function MetricsOverview({ metrics = [], loading = false }) {
  return (
    <section className="panel" aria-label="Overview metrics">
      <h2 className="panel-title">Overview</h2>
      <div className={`metrics-grid ${loading ? 'loading-fade' : ''}`}>
        {metrics.map((metric) => (
          <div className="metric-card" key={metric.id}>
            <div className="metric-icon" aria-hidden="true" />
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
