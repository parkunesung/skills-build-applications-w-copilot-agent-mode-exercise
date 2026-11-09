import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  return (
    <CollectionPage
      endpoint={endpoint}
      title="Activities"
      emptyMessage="No activities have been recorded yet."
      renderItem={(activity) => (
        <article className="card h-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title h5">{activity.type}</h2>
            <p className="card-text">
              {activity.user?.name ?? activity.user?.username ?? 'OctoFit member'}
            </p>
            <div className="d-flex flex-wrap gap-3 text-body-secondary small">
              <span>{activity.durationMinutes} min</span>
              <span>{activity.calories ?? 0} calories</span>
              {activity.steps != null && <span>{activity.steps.toLocaleString()} steps</span>}
            </div>
            {activity.date && (
              <p className="card-text mt-3 mb-0 small">
                {new Date(activity.date).toLocaleDateString()}
              </p>
            )}
          </div>
        </article>
      )}
    />
  )
}

export default Activities
