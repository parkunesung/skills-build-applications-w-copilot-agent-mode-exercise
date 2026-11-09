import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  return (
    <CollectionPage
      endpoint={endpoint}
      title="Workouts"
      emptyMessage="No workouts are available right now."
      renderItem={(workout) => (
        <article className="card h-100 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start gap-2">
              <h2 className="card-title h5">{workout.name}</h2>
              {workout.difficulty && (
                <span className="badge text-bg-secondary text-capitalize">{workout.difficulty}</span>
              )}
            </div>
            <p className="card-text">{workout.description}</p>
            {workout.durationMinutes != null && (
              <p className="small text-body-secondary">{workout.durationMinutes} minutes</p>
            )}
            {workout.instructions?.length > 0 && (
              <ol className="mb-0">
                {workout.instructions.map((instruction, index) => (
                  <li key={`${instruction}-${index}`}>{instruction}</li>
                ))}
              </ol>
            )}
          </div>
        </article>
      )}
    />
  )
}

export default Workouts
