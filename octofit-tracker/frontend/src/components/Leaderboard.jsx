import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  return (
    <CollectionPage
      endpoint={endpoint}
      title="Leaderboard"
      emptyMessage="The leaderboard is waiting for its first results."
      renderItem={(entry, index) => (
        <article className="card h-100 shadow-sm">
          <div className="card-body d-flex align-items-center gap-3">
            <span className="badge rounded-pill text-bg-primary fs-6">
              #{entry.rank ?? index + 1}
            </span>
            <div>
              <h2 className="card-title h5 mb-1">
                {entry.user?.name ?? entry.user?.username ?? 'OctoFit member'}
              </h2>
              <p className="card-text text-body-secondary mb-0">
                {entry.team?.name ?? 'Independent'}
              </p>
              <p className="fw-semibold mb-0 mt-2">{entry.points ?? 0} points</p>
            </div>
          </div>
        </article>
      )}
    />
  )
}

export default Leaderboard
